/* eslint-disable import/no-unresolved */
/* eslint-disable object-shorthand */
/* eslint-disable require-await */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable dot-notation */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { debounce, drop } from 'lodash';
import { SCREENSHOT_INTERACTION_MODE, INTERACTION_MODE } from './shared';
import { Card, Button, Spin, Tooltip, Modal, Tabs, Space, Input, Switch, Menu, Select, } from 'antd';
import Screenshot from './Screenshot';
import HeaderButtons from './HeaderButtons';
import SelectedElement from './SelectedElement';
import Source from './Source';
import InspectorStyles from './Inspector.css';
import RecordedActions from './RecordedActions';
import Commands from './Commands';
import SavedGestures from './SavedGestures';
import GestureEditor from './GestureEditor';
import SessionInfo from './SessionInfo';
import menuButton from '../../../../assets/images/hamburger.jpg';
import { clipboard } from '../../polyfills';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import LineChart from 'echarts-for-react';
import {
  SelectOutlined,
  ScanOutlined,
  SwapRightOutlined,
  EditOutlined,
  HeatMapOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  BarsOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  CopyOutlined,
  DownloadOutlined,
  FileTextOutlined,
  LikeOutlined,
  RotateRightOutlined,
  NotificationOutlined,
  AimOutlined,
  SwitcherOutlined,
  TagOutlined,
  SlidersOutlined,
  InfoCircleOutlined,
  ThunderboltOutlined,
  HighlightOutlined,
  CodeOutlined,
  ShrinkOutlined,
  DollarOutlined,
  DragOutlined,
  InfoOutlined,
  UpCircleOutlined,
  FileAddOutlined,
  FundProjectionScreenOutlined,
  CaretDownOutlined,
  FieldTimeOutlined,
  PaperClipOutlined,
  LockOutlined,
  UnlockOutlined,
  ShakeOutlined,
  AppstoreAddOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { BUTTON } from '../AntdTypes';

const { SELECT, SWIPE, TAP, LONGPRESS, DRAG_AND_DROP, DOUBLE_TAP, ZOOMIN, SLIDE, FILE_UPLOAD, EXPECTED_VALUE, ROTATE, TAKE_SCREENSHOT, SCRATCH, HIDE_KEYBOARD, GET_DEVICE_TIME, GET_CLIPBOARD, LOCK, UNLOCK, SHAKE, OTP } = SCREENSHOT_INTERACTION_MODE;

const ButtonGroup = Button.Group;

const MIN_WIDTH = 870;
const MIN_HEIGHT = 610;
const MAX_SCREENSHOT_WIDTH = 500;
const { Option } = Select;

const MJPEG_STREAM_CHECK_INTERVAL = 1000;

function downloadXML(sourceXML) {
  let element = document.createElement('a');
  element.setAttribute('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(sourceXML));
  element.setAttribute('download', 'source.xml');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default class Inspector extends Component {

  constructor() {
    super();
    this.getAllGraphData = this.getAllGraphData.bind(this);
    this.didInitialResize = false;
    this.state = {
      scaleRatio: 1,
      activeIndex: 0,
      activeCategory: 1,
      nestedDropIndex: 0,
      showPane: false,
      currentSelection: "Select Elements",
      step_array: [],
      total_array: [],
      isLongPress: false,
      action: '',
      mode_orientation: 'PORTRAIT',
      showModal: false,
      selectedAssertion: '',
      inputText: '',
      cpu_graph_data: [],
      cpu_graph_options: [],
      memory_graph_data: [],
      memory_graph_options: [],
      battery_graph_data: [],
      battery_graph_options: [],
      network_graph_data: [],
      network_graph_options: [],
    };
    this.screenAndSourceEl = null;
    this.lastScreenshot = null;
    this.screenshotEl = null;
    this.updateSourceTreeWidth = debounce(this.updateSourceTreeWidth.bind(this), 50);
    this.updateScaleRatio = debounce(this.updateScaleRatio.bind(this), 500);
    this.mjpegStreamCheckInterval = null;
    this.handleAssertionClick = this.handleAssertionClick.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }
  /**
   * Calculates the ratio that the image is being scaled by
   */
  updateScaleRatio() {
    const screenshotImg = this.screenshotEl.querySelector('img');

    // now update scale ratio
    this.setState({
      scaleRatio: (this.props.windowSize.width / screenshotImg.offsetWidth)
    });
  }

  updateSourceTreeWidth() {
    // the idea here is to keep track of the screenshot image width. if it has
    // too much space to the right or bottom, adjust the max-width of the
    // screenshot container so the source tree flex adjusts to always fill the
    // remaining space. This keeps everything looking tight.
    if (!this.screenAndSourceEl) {
      return;
    }

    const screenshotBox = this.screenAndSourceEl.querySelector('#screenshotContainer');
    const img = this.screenAndSourceEl.querySelector('#screenshotContainer img#screenshot');

    if (!img) {
      return;
    }
    const imgRect = img.getBoundingClientRect();
    const screenshotRect = screenshotBox.getBoundingClientRect();
    screenshotBox.style.flexBasis = `${imgRect.width}px`;
    if (imgRect.height < screenshotRect.height) {
      // get what the img width would be if it fills screenshot box height
      const attemptedWidth = (screenshotRect.height / imgRect.height) * imgRect.width;
      screenshotBox.style.maxWidth = attemptedWidth > MAX_SCREENSHOT_WIDTH ?
        `${MAX_SCREENSHOT_WIDTH}px` :
        `${attemptedWidth}px`;
    } else if (imgRect.width < screenshotRect.width) {
      screenshotBox.style.maxWidth = `${imgRect.width}px`;
    }

    this.updateScaleRatio();
  }

  componentDidMount() {
    const curHeight = window.innerHeight;
    const curWidth = window.innerWidth;
    const needsResize = (curHeight < MIN_HEIGHT) || (curWidth < MIN_WIDTH);
    if (!this.didInitialResize && needsResize) {
      const newWidth = curWidth < MIN_WIDTH ? MIN_WIDTH : curWidth;
      const newHeight = curHeight < MIN_HEIGHT ? MIN_HEIGHT : curHeight;
      // resize width to something sensible for using the inspector on first run
      window.resizeTo(newWidth, newHeight);
    }
    this.didInitialResize = true;
    // setInterval(() => {
    //   this.props.applyClientMethod({methodName: 'getPageSource', ignoreResult: true});
    // }, 8000);
    console.log('props in the inspector', this.props);
    this.props.applyClientMethod({ methodName: 'getPageSource', ignoreResult: true });
    this.props.getSavedActionFramework();
    this.props.runKeepAliveLoop();
    window.addEventListener('resize', this.updateSourceTreeWidth);
    this.props.setSessionTime(Date.now());

    if (this.props.mjpegScreenshotUrl) {
      this.mjpegStreamCheckInterval = setInterval(this.checkMjpegStream.bind(this),
        MJPEG_STREAM_CHECK_INTERVAL);
    }
  }

  async checkMjpegStream() {
    const { mjpegScreenshotUrl, isAwaitingMjpegStream, setAwaitingMjpegStream } = this.props;
    const img = new Image();
    img.src = mjpegScreenshotUrl;
    let imgReady = false;
    try {
      await img.decode();
      imgReady = true;
    } catch (ign) { }
    if (imgReady && isAwaitingMjpegStream) {
      setAwaitingMjpegStream(false);
      this.updateSourceTreeWidth();
    } else if (!imgReady && !isAwaitingMjpegStream) {
      setAwaitingMjpegStream(true);
    }
  }

  componentDidUpdate() {
    const { screenshot } = this.props;
    // only update when the screenshot changed, not for any other kind of
    // update
    if (screenshot !== this.lastScreenshot) {
      this.updateSourceTreeWidth();
      this.lastScreenshot = screenshot;
    }
  }

  componentWillUnmount() {
    if (this.mjpegStreamCheckInterval) {
      clearInterval(this.mjpegStreamCheckInterval);
      this.mjpegStreamCheckInterval = null;
    }
  }

  handlePanel() {
    this.setState({ showPane: !this.state.showPane });
    console.log("showPanel", this.state.showPane);
  }
  screenshotInteractionChange(mode, option) {
    const { selectScreenshotInteractionMode, clearSwipeAction } = this.props;
    clearSwipeAction();
    selectScreenshotInteractionMode(mode);
    this.setState({ currentSelection: option });
  }

  async handleActions(action, step) {
    const { driver } = this.props;
    console.log("🚀 ~ file: Inspector.js:223 ~ handleActions ~ action:", action);
    let postdata = {
      'session_id': driver.sessionId,
      'step-name': step,
      action
    };
    this.setState({ nestedDropIndex: 0 });
    this.setActiveIndex(0);
    console.log('🚀 ~ file: Inspector.js:219 ~ Inspector ~ handleActions ~ postdata:', postdata);

    await fetch('https://apprecord.testing24x7.ai/appAction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postdata),
    })
      .then((response) => {
        console.log('API response:', response);
        postdata.response = response;
      })
      .catch((error) => {
        console.error('API error:', error);
      });


    let data1 = {
      "session_id": driver.sessionId,
      'step-name': 'steps'
    };
    await fetch("https://apprecord.testing24x7.ai/appAction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    })
      .then((res) =>
        res.json()
      )
      .then((res) => {
        console.log("Response data:", res);
        this.setState({ total_array: res.steps });
      })
      .catch((error) => {
        console.log("🚀 ~ file: Inspector.js:901 ~ return ~ error:", error);
      });
  }

  setActiveIndex(val) {
    this.setState({ activeIndex: val });
  }
  async hideKeyboard() {
    const { driver, screenshotInteractionMode } = this.props;
    driver.client.hideKeyboard();
    console.log('hide keyboard^^^^^^^^^^^^^^^^');
    this.props.applyClientMethod({ methodName: 'getPageSource', ignoreResult: true });

    let postdata = {
      'session_id': driver.sessionId,
      'step-name': 'hideKeyboard',
    };
    console.log('🚀 ~ file: Inspector.js:219 ~ Inspector ~ hideKeyboard ~ postdata:', postdata);

    await fetch('https://apprecord.testing24x7.ai/appAction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postdata),
    })
      .then((response) => {
        console.log('API response:', response);
        postdata.response = response;
      })
      .catch((error) => {
        console.error('API error:', error);
      });
  }
  async getDeviceTime() {
    const { driver } = this.props;
    const time = await driver.client.getDeviceTime();
    console.log('get device timeeeeeeeeeeeeeeeeee', time);
    const deviceTime = moment.utc(time).utcOffset('+05:30');
    const formattedTime = deviceTime.format('YYYY-MM-DD HH:mm:ss');
    let postdata = {
      'session_id': driver.sessionId,
      'step-name': 'getDeviceTime',
    };
    console.log('🚀 ~ file: Inspector.js:219 ~ Inspector ~ getDeviceTime ~ postdata:', postdata);

    await fetch('https://apprecord.testing24x7.ai/appAction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postdata),
    })
      .then((response) => {
        console.log('API response:', response);
        postdata.response = response;
      })
      .catch((error) => {
        console.error('API error:', error);
      });
    alert(formattedTime);
  }
  // async getDeviceclipBoard() {
  //   const { driver } = this.props;
  //   const clipboard = await driver.getClipboard();
  //   console.log('🚀 ~ file: Inspector.js:228 ~ Inspector ~ getDeviceclipBoard ~ clipboard:', clipboard);
  //   alert(clipboard);
  // }
  async isLocked() {
    const { driver } = this.props;
    const islocked = await driver.client.pressKeyCode(26);
    console.log("🚀 ~ file: Inspector.js:286 ~ isLocked ~ islocked:", islocked);
    let postdata = {
      'session_id': driver.sessionId,
      'step-name': 'lock',
    };
    console.log('🚀 ~ file: Inspector.js:219 ~ Inspector ~ lock ~ postdata:', postdata);
    this.callParticularSteps(postdata);
    // await fetch('https://apprecord.testing24x7.ai/appAction', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(postdata),
    // })
    //   .then((response) => {
    //     console.log('API response:', response);
    //     postdata.response = response;
    //   })
    //   .catch((error) => {
    //     console.error('API error:', error);
    //   });
    this.fetchAllSteps();
    await this.props.applyClientMethod({ methodName: 'getPageSource' });
  }
  async shake() {
    console.log('this is shake shake ittt');
    const { driver } = this.props;
    const isShake = await driver.client.shake();
    console.log("🚀 ~ file: Inspector.js:295 ~ shakeBooty ~ isShake:", isShake);
  }

  async callParticularSteps(data) {
    console.log('this is the data for the single step', data);
    await fetch('https://apprecord.testing24x7.ai/appAction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log('API response:', response);
      })
      .catch((error) => {
        console.error('API error:', error);
      });
  }

  async getAllGraphData() {
    const {driver} = this.props;
    await driver.client.getCurrentPackage().then((res) => {
      console.log('package name>>>>>>>>>>>>>>>', res);
      if (res !== '') {
        driver.client.getPerformanceData(res, "cpuinfo", 5).then((res1) => {
          console.log('res>>>>>>>>>>>>>>>>>>>>>>>>????????????????', res1);
          this.setState({cpu_graph_options: res1[0], cpu_graph_data: res1[1]});
        });

        driver.client.getPerformanceData(res, "memoryinfo", 5).then((res1) => {
          console.log('res>>>>>>>>>>>>>>>>>>>>>>>>????????????????', res1);
          this.setState({memory_graph_options: res1[0], memory_graph_data: res1[1]});
        });

        driver.client.getPerformanceData(res, "batteryinfo", 5).then((res1) => {
          console.log('res>>>>>>>>>>>>>>>>>>>>>>>>????????????????', res1);
          this.setState({battery_graph_options: res1[0], battery_graph_data: res1[1]});
        });

        driver.client.getPerformanceData(res, "networkinfo", 5).then((res1) => {
          console.log('res>>>>>>>>>>>>>>>>>>>>>>>>????????????????', res1);
          this.setState({network_graph_options: res1[0], network_graph_data: res1[1]});
        });
      }
    });
  }


  async getPerformance(data1) {
    const {driver} = this.props;
      await driver.client.getCurrentPackage().then((res) => {
        console.log('package name>>>>>>>>>>>>>>>', res);
        if (res !== '') {
          driver.client.getPerformanceData(res, data1, 5).then((res1) => {

            let reqData = {"session_id": driver.sessionId, "step-name": "performance", "data": res1};
            console.log('res>>>>>>>>>>>>>>>>>>>>>>>>????????????????', res1);
            this.setState({graph_options: res1[0], graph_data: res1[1]});

          fetch('https://apprecord.testing24x7.ai/appAction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqData),
        })
          .then((res) =>
            // Convert the response to JSON
            res.json()
          )
          .then((res) => {
            console.log('Response data:>>>>>>>>>>>>>>', res);
          })
          .catch((error) => {
            console.log('🚀 ~ file: Inspector.js:901 ~ return ~ error:', error);
          });
          });
        }
        this.setState({ package_name: res });
      });
  }

  async fetchAllSteps() {
    const { driver } = this.props;
    let data1 = {
      'session_id': driver.sessionId,
      'step-name': 'steps'
    };
    await fetch('https://apprecord.testing24x7.ai/appAction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data1),
    })
      .then((res) =>
        res.json()
      )
      .then((res) => {
        console.log('Response data:', res);
        this.setState({ total_array: res.steps });
      })
      .catch((error) => {
        console.log('🚀 ~ file: Inspector.js:901 ~ return ~ error:', error);
      });
  }

  handleAssertionClick(methodName) {
    this.setState({
      showModal: true,
      selectedAssertion: methodName,
    });
  };

  async handleModalSubmit() {
    const { driver, selectedElement, applyClientMethod } = this.props;

    let data = {
      'session_id': driver.sessionId,
      'step-name': 'assertion',
      'selectedElement': selectedElement,
      'params': {
        'methodName': this.state.selectedAssertion,
        'args': this.state.inputText,
      },
    };
    console.log("🚀 ~ file: Inspector.js:448 ~ handleModalSubmit ~ data:", data);

    await applyClientMethod({ methodName: 'getPageSource' });
    this.callParticularSteps(data);
    this.fetchAllSteps();

    // Close the modal after submitting
    this.setState({
      showModal: false,
      selectedAssertion: '',
      inputText: '',
    });
  };


  render() {
    const { screenshot, screenshotError, selectedElement = {},
      quitSession, showRecord,
      screenshotInteractionMode, visibleCommandMethod,
      selectedInteractionMode, selectInteractionMode, setVisibleCommandResult,
      showKeepAlivePrompt, keepSessionAlive, sourceXML, t, visibleCommandResult,
      mjpegScreenshotUrl, isAwaitingMjpegStream, toggleShowCentroids, showCentroids,
      isGestureEditorVisible, toggleShowAttributes, isSourceRefreshOn, applyClientMethod
    } = this.props;
    const { showModal, selectedAssertion, inputText } = this.state;
    const { path } = selectedElement;
    const { driver } = this.props;
    const { flow_steps } = this.props;
    const options = [
      'Return', 'Space', 'BackSpace', 'Enter',
      'Back', 'Search', 'Call', 'Endcall'
    ];

    if (flow_steps) {
      console.log('🚀 ~ file: Inspector.js:210 ~ Inspector ~ render ~ flow_steps:', flow_steps);
      this.state.total_array = flow_steps.steps;
    }
    console.log('driver for iddddddd', driver);
    const showScreenshot = ((screenshot && !screenshotError) ||
      (mjpegScreenshotUrl && (!isSourceRefreshOn || !isAwaitingMjpegStream)));

    let screenShotControls =
      <div className={InspectorStyles['screenshot-controls']}>

        <Tooltip title={t(showCentroids ? 'Hide Element Handles' : 'Show Element Handles')} placement="topRight">
          <Switch
            checkedChildren={<CheckCircleOutlined />}
            unCheckedChildren={<CloseCircleOutlined />}
            defaultChecked={false}
            onChange={() => toggleShowCentroids()}
            disabled={isGestureEditorVisible}
            style={{ width: '40px' }}
          />
        </Tooltip>
        {/* <Button icon={<BarsOutlined />} onClick={() => this.handlePanel(this.state.showPanel)}></Button> */}

        {showScreenshot &&
          <div style={{ display: "flex", flexDirection: "column", width: "fit-content" }}>
            <Button icon={<SelectOutlined />} onClick={() => { this.screenshotInteractionChange(SELECT, 'Select Elements'); }}
              type={screenshotInteractionMode === SELECT ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Select Elements</span></Button>
            <div onMouseOver={() => this.state.showPane ? this.setState({ activeCategory: 1 }) : this.setActiveIndex(1)}
              onMouseOut={() => this.setState({ activeIndex: 0 })}
              onClick={() => this.setState({ activeCategory: 1 })}
              style={{ textAlign: 'center', padding: '5px', position: 'relative', cursor: 'pointer' }}
              className={this.state.activeCategory === 1 ? InspectorStyles['activeCategory'] : ""}>
              <LikeOutlined style={{ fontSize: '20px' }} />
              <div>Gestures</div>
              {this.state.activeIndex === 1 &&
                <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: '999', left: '100%', top: '10%' }}>
                  <Button icon={<SwapRightOutlined />} onClick={() => { this.screenshotInteractionChange(SWIPE, 'Swipe by coordinates'); }}
                    type={screenshotInteractionMode === SWIPE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Swipe By Coordinates</span></Button>
                  <Button icon={<ScanOutlined />} onClick={() => { this.screenshotInteractionChange(TAP, 'Tap by coordinates'); }}
                    type={screenshotInteractionMode === TAP ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Tap By Coordinates</span></Button>
                  <Button icon={<InfoOutlined />} onClick={() => { this.screenshotInteractionChange(LONGPRESS, 'Longpress'); }}
                    type={screenshotInteractionMode === LONGPRESS ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>LongPress</span></Button>
                  <Button icon={<DragOutlined />} onClick={() => { this.screenshotInteractionChange(DRAG_AND_DROP, 'Drag & Drop'); }}
                    type={screenshotInteractionMode === DRAG_AND_DROP ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Drag & Drop</span></Button>
                  <Button icon={<UpCircleOutlined />} onClick={() => { this.screenshotInteractionChange(DOUBLE_TAP, 'Double tap'); }}
                    type={screenshotInteractionMode === DOUBLE_TAP ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    className={InspectorStyles['user_actions']}
                  ><span>Double Tap</span></Button>
                  <Button icon={<ShrinkOutlined />} onClick={() => { this.screenshotInteractionChange(ZOOMIN, 'Zoom'); }}
                    type={screenshotInteractionMode === ZOOMIN ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Zoom</span></Button>
                  <Button icon={<SlidersOutlined />} onClick={() => { this.screenshotInteractionChange(SLIDE, 'Slider'); }}
                    type={screenshotInteractionMode === SLIDE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Slider</span></Button>
                  {/* <Button icon={<LockOutlined />} onClick={() => { this.screenshotInteractionChange(LOCK, 'Lock'); this.isLocked(); }}
                    type={screenshotInteractionMode === LOCK ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Lock</span></Button> */}
                  <Button icon={<DollarOutlined />} onClick={() => { this.screenshotInteractionChange(SCRATCH, 'Scratch'); }}
                    type={screenshotInteractionMode === SCRATCH ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Scratch</span></Button>
                  <Button icon={<ShakeOutlined />} onClick={() => { this.screenshotInteractionChange(SHAKE, 'shake'); this.shakeBooty(); }}
                    type={screenshotInteractionMode === SHAKE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Shake</span></Button>
                  {/* <Button icon={<UnlockOutlined />} onClick={() => { this.screenshotInteractionChange(UNLOCK, 'Unlock'); this.isUnlocked();}}
              type={screenshotInteractionMode === UNLOCK ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Unlock</span></Button> */}
                </div>}
            </div>
            {/* <div onMouseOver={() => this.setActiveIndex(2)} onMouseOut={() => this.setActiveIndex(0)}
          style={{ textAlign: 'center', padding: '5px', position: 'relative', cursor: 'pointer' }}>
          <EditOutlined style={{ fontSize: '20px' }} />
          <div>Actions</div>
          {this.state.activeIndex === 2 && <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: '999', left: '100%', top: '10%' }}>
            <Button icon={<DollarOutlined />} onClick={() => { this.screenshotInteractionChange(EXPECTED_VALUE, 'Expected Value'); }}
              type={screenshotInteractionMode === EXPECTED_VALUE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Expected value</span></Button>
            <Button icon={<FundProjectionScreenOutlined />} onClick={() => { this.screenshotInteractionChange(TAKE_SCREENSHOT, 'Take screenshot'); }}
              type={screenshotInteractionMode === TAKE_SCREENSHOT ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Take Screenshot</span></Button>
            <Button icon={<CaretDownOutlined />} onClick={async () => {
              this.screenshotInteractionChange(HIDE_KEYBOARD, 'Hide keyword');
              this.hideKeyboard();
              let data1 = {
                'session_id': driver.sessionId,
                'step-name': 'steps'
              };

              await fetch('https://apprecord.testing24x7.ai/appAction', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1),
              })
                .then((res) =>
                  // Convert the response to JSON
                  res.json()
                )
                .then((res) => {
                  console.log('Response data:', res);
                  this.setState({ total_array: res.steps.steps });
                })
                .catch((error) => {
                  console.log('🚀 ~ file: Inspector.js:901 ~ return ~ error:', error);
                });
              await applyClientMethod({ methodName: 'getPageSource' });

            }}
              type={screenshotInteractionMode === HIDE_KEYBOARD ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Hide Keyboard</span></Button>
            <Button icon={<FieldTimeOutlined />} onClick={async () => {
              this.screenshotInteractionChange(GET_DEVICE_TIME, 'Get Device Time');
              this.getDeviceTime();
              let data1 = {
                'session_id': driver.sessionId,
                'step-name': 'steps'
              };

              await fetch('https://apprecord.testing24x7.ai/appAction', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data1),
              })
                .then((res) =>
                  // Convert the response to JSON
                  res.json()
                )
                .then((res) => {
                  console.log('Response data:', res);
                  this.setState({ total_array: res.steps.steps });
                })
                .catch((error) => {
                  console.log('🚀 ~ file: Inspector.js:901 ~ return ~ error:', error);
                });
              await applyClientMethod({ methodName: 'getPageSource' });
            }}
              type={screenshotInteractionMode === GET_DEVICE_TIME ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Get Device Time</span></Button>
            <Button icon={<PaperClipOutlined />} onClick={async () => {
              this.screenshotInteractionChange(GET_CLIPBOARD, 'Get clipboard');
              await applyClientMethod({ methodName: 'getPageSource' });
            }}
              type={screenshotInteractionMode === GET_CLIPBOARD ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Get clipboard</span></Button>
            <Button icon={<RotateRightOutlined />} onClick={async () => { await driver.client.setOrientation('LANDSCAPE'); }}
              type={screenshotInteractionMode === ROTATE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Rotate</span></Button>
            <Button icon={<NotificationOutlined />}
              onClick={async () => {
                await driver.client.openNotifications();
                let data = {
                  'session_id': driver.sessionId,
                  'step-name': 'notification',
                };
                await fetch('https://apprecord.testing24x7.ai/appAction', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })
                  .then((response) => {
                    console.log('API response:', response);
                  })
                  .catch((error) => {
                    console.error('API error:', error);
                  });

                let data1 = {
                  'session_id': driver.sessionId,
                  'step-name': 'steps'
                };
                console.log('🚀 ~ file: Inspector.js:440 ~ Inspector ~ onClick={async ~ driver.sessionId:', driver.sessionId);
                await fetch('https://apprecord.testing24x7.ai/appAction', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data1),
                })
                  .then((res) =>
                    // Convert the response to JSON
                    res.json()
                  )
                  .then((res) => {
                    console.log('Response data:', res);
                    this.setState({ total_array: res.steps.steps });
                  })
                  .catch((error) => {
                    console.log('🚀 ~ file: Inspector.js:901 ~ return ~ error:', error);
                  });
                await applyClientMethod({ methodName: 'getPageSource' });
              }}
              type={screenshotInteractionMode === ROTATE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Open Notifications</span></Button>
            {!this.state.isInput ? (<Button icon={<SwitcherOutlined />} onClick={() => this.setState({ isInput: true })}
              type={screenshotInteractionMode === ROTATE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Switch App</span></Button>) : (
              <div>
                <Input
                  placeholder="enter bundle id"
                  onChange={(event) => this.setState({ inputBundleId: event.target.value })}
                />
                <Button
                  onClick={async () => {
                    await driver.client.activateApp(this.state.inputBundleId);

                    let data = {
                      'session_id': driver.sessionId,
                      'step-name': 'switch_app',
                      'bundle_id': this.state.inputBundleId
                    };
                    await fetch('https://apprecord.testing24x7.ai/appAction', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data),
                    })
                      .then((response) => {
                        console.log('API response:', response);
                      })
                      .catch((error) => {
                        console.error('API error:', error);
                      });

                    let data1 = {
                      'session_id': driver.sessionId,
                      'step-name': 'steps'
                    };
                    await fetch('https://apprecord.testing24x7.ai/appAction', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data1),
                    })
                      .then((res) =>
                        // Convert the response to JSON
                        res.json()
                      )
                      .then((res) => {
                        console.log('Response data:', res);
                        this.setState({ total_array: res.steps.steps });
                      })
                      .catch((error) => {
                        console.log('🚀 ~ file: Inspector.js:901 ~ return ~ error:', error);
                      });

                    await applyClientMethod({ methodName: 'getPageSource' });
                    this.setState({ isInput: false, inputBundleId: '' });
                  }}
                  style={{ backgroundColor: 'blue' }}
                >
                  Activate App
                </Button>
                <Button icon={<AimOutlined />} onClick={async () => { await driver.client.resetApp(); }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                > <span>Reset App</span></Button>
              </div>
            )}
          </div>}
        </div> */}
            <div onMouseOver={() => this.state.showPane ? this.setState({ activeCategory: 3 }) : this.setActiveIndex(3)}
              onMouseOut={() => this.setState({ activeIndex: 0 })}
              onClick={() => this.setState({ activeCategory: 3 })}
              style={{ textAlign: 'center', padding: '5px', position: 'relative', cursor: 'pointer' }}
              className={this.state.activeCategory === 3 ? InspectorStyles['activeCategory'] : ""}>
              <HeatMapOutlined style={{ fontSize: '20px' }} />
              <div>Device Actions</div>
              {this.state.activeIndex === 3 &&
                <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: '999', left: '100%', top: '10%' }}>
                  <Button icon={<FundProjectionScreenOutlined />}
                    type={screenshotInteractionMode === TAKE_SCREENSHOT ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    onClick={() => this.state.nestedDropIndex !== 1 ? this.setState({ nestedDropIndex: 1 }) : this.setState({ nestedDropIndex: 0 })}
                    // disabled={isGestureEditorVisible}
                    className={InspectorStyles['user_actions']}
                  >long press key</Button>
                  {this.state.nestedDropIndex === 1 &&
                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                      {options.map((option, index) => (
                        <Button key={index}
                          onClick={async () => await this.handleActions(option, 'long_press_key')}>
                          {option}
                        </Button>
                      ))}

                    </div>
                  }

                  <Button icon={<FundProjectionScreenOutlined />}
                    type={screenshotInteractionMode === TAKE_SCREENSHOT ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    onClick={() => this.state.nestedDropIndex !== 2 ? this.setState({ nestedDropIndex: 2 }) : this.setState({ nestedDropIndex: 0 })}
                    // disabled={isGestureEditorVisible}
                    className={InspectorStyles['user_actions']}
                  >press key</Button>
                  {this.state.nestedDropIndex === 2 &&
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {options.map((option, index) => (
                        <Button style={{ width: '100%' }} key={index}
                          onClick={async () => await this.handleActions(option, 'press_key')}>
                          {option}
                        </Button>
                      ))}

                    </div>
                  }

                  <Button className={InspectorStyles['user_actions']} icon={<FileAddOutlined />} onClick={async () => {
                    if (screenshotInteractionMode === FILE_UPLOAD) {
                      this.screenshotInteractionChange(null, null);
                      let data = {
                        'session_id': driver.sessionId,
                        'step-name': 'select_file',
                        'status': 'done',
                      };
                      this.callParticularSteps(data);
                    } else {
                      this.screenshotInteractionChange(FILE_UPLOAD, 'File Upload');
                    }
                  }}
                    type={screenshotInteractionMode === FILE_UPLOAD ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible}><span>File Upload</span></Button>
                  <Button icon={<FundProjectionScreenOutlined />} onClick={() => { this.screenshotInteractionChange(TAKE_SCREENSHOT, 'Take screenshot'); }}
                    type={screenshotInteractionMode === TAKE_SCREENSHOT ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Take Screenshot</span></Button>
                  <Button icon={<CaretDownOutlined />} onClick={async () => {
                    this.screenshotInteractionChange(HIDE_KEYBOARD, 'Hide keyword');
                    this.hideKeyboard();
                    this.fetchAllSteps();
                    await applyClientMethod({ methodName: 'getPageSource' });
                  }}
                    type={screenshotInteractionMode === HIDE_KEYBOARD ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Hide Keyboard</span></Button>
                  <Button icon={<FieldTimeOutlined />} onClick={async () => {
                    this.screenshotInteractionChange(GET_DEVICE_TIME, 'Get Device Time');
                    this.getDeviceTime();
                    this.fetchAllSteps();
                    await applyClientMethod({ methodName: 'getPageSource' });
                  }}
                    type={screenshotInteractionMode === GET_DEVICE_TIME ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Get Device Time</span></Button>
                  <Button icon={<PaperClipOutlined />} onClick={async () => {
                    this.screenshotInteractionChange(GET_CLIPBOARD, 'Get clipboard');
                    await applyClientMethod({ methodName: 'getPageSource' });
                  }}
                    type={screenshotInteractionMode === GET_CLIPBOARD ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Get clipboard</span></Button>
                  {this.state.mode_orientation === 'PORTRAIT' ? (<Button icon={<RotateRightOutlined />} onClick={async () => {
                    await driver.client.setOrientation('LANDSCAPE');
                    await applyClientMethod({ methodName: 'getPageSource' });
                    let data = {
                      'session_id': driver.sessionId,
                      'step-name': 'rotate',
                      'action': 'landscape'
                    };
                    this.callParticularSteps(data);
                    this.fetchAllSteps();
                    await driver.client.getOrientation().then((res) => {
                      console.log("🚀 ~ file: Inspector.js:363 ~ driver.client.getOrientation ~ res:", res);
                      this.setState({ mode_orientation: res });
                    });
                  }}
                    type={screenshotInteractionMode === ROTATE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Rotate/Landscape</span></Button>) :
                    (
                      <Button icon={<RotateRightOutlined />} onClick={async () => {
                        await driver.client.setOrientation('PORTRAIT');
                        let data = {
                          'session_id': driver.sessionId,
                          'step-name': 'rotate',
                          'action': 'portrait'
                        };
                        this.callParticularSteps(data);
                        this.fetchAllSteps();
                        driver.client.getOrientation().then((res) => {
                          console.log("🚀 ~ file: Inspector.js:363 ~ driver.client.getOrientation ~ res:", res);
                          this.setState({ mode_orientation: res });
                        });
                        await applyClientMethod({ methodName: 'getPageSource' });
                      }}
                        type={screenshotInteractionMode === ROTATE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                        disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                      ><span>Rotate/Potrait</span></Button>
                    )}
                  <Button icon={<NotificationOutlined />}
                    onClick={async () => {
                      await driver.client.openNotifications();
                      let data = {
                        'session_id': driver.sessionId,
                        'step-name': 'notification',
                      };
                      this.callParticularSteps(data);
                      this.fetchAllSteps();
                      await applyClientMethod({ methodName: 'getPageSource' });
                    }}
                    type={screenshotInteractionMode === ROTATE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                    disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Open Notifications</span></Button>
                </div>}
            </div>

            <div onMouseOver={() => this.state.showPane ? this.setState({ activeCategory: 4 }) : this.setActiveIndex(4)} onMouseOut={() => this.setActiveIndex(0)}
              onClick={() => this.setState({ activeCategory: 4 })}
              style={{ textAlign: 'center', padding: '5px', position: 'relative', cursor: 'pointer' }}
              className={this.state.activeCategory === 4 ? InspectorStyles['activeCategory'] : ""}>
              <EditOutlined style={{ fontSize: '20px' }} />
              <div>Assertions</div>
              {this.state.activeIndex === 4 && <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: '999', left: '100%', top: '10%' }}>
                <Button icon={<CheckCircleOutlined />} onClick={() => { this.screenshotInteractionChange(EXPECTED_VALUE, 'Expected Value'); }}
                  type={screenshotInteractionMode === EXPECTED_VALUE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
                  <span>Expected value</span></Button>
                <Button icon={<CheckCircleOutlined />}
                  onClick={async () => {
                    this.handleAssertionClick('text_equal');
                  }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
                  <span>text equals</span></Button>
                <Button icon={<CheckCircleOutlined />}
                  onClick={async () => {
                    this.handleAssertionClick('text_contains');
                  }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
                  <span>text contains</span></Button>
                <Button icon={<CheckCircleOutlined />}
                  onClick={async () => {
                    this.handleAssertionClick('attribute_equals');
                  }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
                  <span>attribute equals</span></Button>
                <Button icon={<CheckCircleOutlined />}
                  onClick={async () => {
                    this.handleAssertionClick('attribute_contains');
                  }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
                  <span>attribute contains</span></Button>
                <Button icon={<CheckCircleOutlined />}
                  onClick={async () => {
                    let data = {
                      'session_id': driver.sessionId,
                      'step-name': 'assertion',
                      'selectedElement': selectedElement,
                      'params': {
                        'methodName': 'is_element_displayed',
                        'args': true
                      }
                    };
                    await applyClientMethod({ methodName: 'getPageSource' });
                    this.callParticularSteps(data);
                    this.fetchAllSteps();
                  }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
                  <span>Is Element Displayed</span></Button>
                <Button icon={<CheckCircleOutlined />}
                  onClick={async () => {
                    let data = {
                      'session_id': driver.sessionId,
                      'step-name': 'assertion',
                      'selectedElement': selectedElement,
                      'params': {
                        'methodName': 'is_element_selected',
                        'args': true
                      }
                    };
                    await applyClientMethod({ methodName: 'getPageSource' });
                    this.callParticularSteps(data);
                    this.fetchAllSteps();
                  }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
                  <span>Is Element Selected</span></Button>
                <Button icon={<CheckCircleOutlined />}
                  onClick={async () => {
                    let data = {
                      'session_id': driver.sessionId,
                      'step-name': 'assertion',
                      'selectedElement': selectedElement,
                      'params': {
                        'methodName': 'is_element_enabled',
                        'args': true
                      }
                    };
                    await applyClientMethod({ methodName: 'getPageSource' });
                    this.callParticularSteps(data);
                    this.fetchAllSteps();
                  }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
                  <span>Is Element Enabled</span></Button>
                <Button icon={<CheckCircleOutlined />}
                  onClick={async () => {
                    let data = {
                      'session_id': driver.sessionId,
                      'step-name': 'assertion',
                      'selectedElement': selectedElement,
                      'params': {
                        'methodName': 'is_element_disabled',
                        'args': false
                      }
                    };
                    await applyClientMethod({ methodName: 'getPageSource' });
                    this.callParticularSteps(data);
                    this.fetchAllSteps();
                  }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
                  <span>Is Element Disabled</span></Button>
              </div>}
            </div>
            <div onMouseOver={() => this.state.showPane ? this.setState({ activeCategory: 5 }) : this.setActiveIndex(5)} onMouseOut={() => this.setActiveIndex(0)}
              onClick={() => this.setState({ activeCategory: 5 })}
              style={{ textAlign: 'center', padding: '5px', position: 'relative', cursor: 'pointer' }}
              className={this.state.activeCategory === 5 ? InspectorStyles['activeCategory'] : ""}>
              <AppstoreAddOutlined style={{ fontSize: '20px' }} />
              <div>App management</div>
              {this.state.activeIndex === 5 && <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: '999', left: '100%', top: '10%' }}>
                {!this.state.isInput ? (<Button icon={<SwitcherOutlined />} onClick={() => this.setState({ isInput: true })}
                  type={screenshotInteractionMode === ROTATE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                ><span>Switch App</span></Button>) : (
                  <div>
                    <Input
                      placeholder="enter bundle id"
                      onChange={(event) => this.setState({ inputBundleId: event.target.value })}
                    />
                    <Button
                      onClick={async () => {
                        await driver.client.activateApp(this.state.inputBundleId);
                        let data = {
                          'session_id': driver.sessionId,
                          'step-name': 'switch_app',
                          'bundle_id': this.state.inputBundleId
                        };
                        this.callParticularSteps(data);
                        this.fetchAllSteps();
                        await applyClientMethod({ methodName: 'getPageSource' });
                        this.setState({ isInput: false, inputBundleId: '' });
                      }}
                      style={{ backgroundColor: 'blue' }}
                    >
                      Activate App
                    </Button>
                  </div>
                )}
                <Button icon={<AimOutlined />} onClick={async () => { await driver.client.resetApp(); }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                > <span>Reset App</span></Button>
              </div>}
            </div>



            <div onMouseOver={() => this.setActiveIndex(6)} onMouseOut={() => this.setActiveIndex(0)}
              style={{ textAlign: 'center', padding: '5px', position: 'relative', cursor: 'pointer' }}
              className={this.state.activeCategory === 5 ? InspectorStyles['activeCategory'] : ""}>
              <AppstoreAddOutlined style={{ fontSize: '20px' }} />
              <div>Performance Matrices</div>
              {this.state.activeIndex === 6 && <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', zIndex: '999', left: '100%', top: '10%' }}>
                <Button icon={<AimOutlined />} onClick={async () => { await this.getPerformance('cpuinfo'); }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                > <span>Cpu Performance</span></Button>
                <Button icon={<AimOutlined />} onClick={async () => { await this.getPerformance('memoryinfo'); }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                > <span>Memory Performance</span></Button>
                <Button icon={<AimOutlined />} onClick={async () => { await this.getPerformance('batteryinfo'); }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                > <span>Battery Performance</span></Button>
                <Button icon={<AimOutlined />} onClick={async () => { await this.getPerformance('networkinfo'); }}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                > <span>Network Performance</span></Button>
              </div>}
            </div>

          </div>}


        {/* <ButtonGroup value={screenshotInteractionMode} style={{ display: 'flex', flexDirection: 'column', position:"absolute", top:"150px", zIndex:"99" }}>

        <Button onMouseOver={()=>this.setActiveIndex(1)} onMouseOut={()=>this.setActiveIndex(0)} icon={<SelectOutlined />} onClick={() => { this.screenshotInteractionChange(SELECT); }}
          type={screenshotInteractionMode === SELECT ? BUTTON.PRIMARY : BUTTON.DEFAULT}
          disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
        >{this.state.activeIndex===1 && <span>Select Elements</span>}</Button>


        <Button onMouseOver={()=>this.setActiveIndex(2)} onMouseOut={()=>this.setActiveIndex(0)} icon={<SwapRightOutlined />} onClick={() => { this.screenshotInteractionChange(SWIPE); }}
          type={screenshotInteractionMode === SWIPE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
          disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
        >{this.state.activeIndex===2 && <span>Swipe By Coordinates</span>}</Button>


        <Button onMouseOver={()=>this.setActiveIndex(3)} onMouseOut={()=>this.setActiveIndex(0)} icon={<ScanOutlined />} onClick={() => { this.screenshotInteractionChange(TAP); }}
          type={screenshotInteractionMode === TAP ? BUTTON.PRIMARY : BUTTON.DEFAULT}
          disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
        >{this.state.activeIndex===3 && <span>Tap By Coordinates</span>}</Button>


        <Button onMouseOver={()=>this.setActiveIndex(4)} onMouseOut={()=>this.setActiveIndex(0)} icon={<InfoOutlined />} onClick={() => { this.screenshotInteractionChange(LONGPRESS); }}
          type={screenshotInteractionMode === LONGPRESS ? BUTTON.PRIMARY : BUTTON.DEFAULT}
          disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
        >{this.state.activeIndex===4 && <span>LongPress</span>}</Button>


        <Button onMouseOver={()=>this.setActiveIndex(5)} onMouseOut={()=>this.setActiveIndex(0)} icon={<DragOutlined />} onClick={() => { this.screenshotInteractionChange(DRAG_AND_DROP); }}
          type={screenshotInteractionMode === DRAG_AND_DROP ? BUTTON.PRIMARY : BUTTON.DEFAULT}
          disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
        >{this.state.activeIndex===5 && <span>Drag & Drop</span>}</Button>

          <Button onMouseOver={()=>this.setActiveIndex(6)} onMouseOut={()=>this.setActiveIndex(0)} icon={<UpCircleOutlined />} onClick={() => { this.screenshotInteractionChange(DOUBLE_TAP); }}
            type={screenshotInteractionMode === DOUBLE_TAP ? BUTTON.PRIMARY : BUTTON.DEFAULT}
            className={InspectorStyles['user_actions']}
          >{this.state.activeIndex===6 && <span>Double Tap</span>}</Button>

          <Button onMouseOver={()=>this.setActiveIndex(7)} onMouseOut={()=>this.setActiveIndex(0)} icon={<ShrinkOutlined />} onClick={() => { this.screenshotInteractionChange(ZOOMIN); }}
            type={screenshotInteractionMode === ZOOMIN ? BUTTON.PRIMARY : BUTTON.DEFAULT}
            disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
          >{this.state.activeIndex===7 && <span>Zoom</span>}</Button>
          <Button onMouseOver={()=>this.setActiveIndex(8)} onMouseOut={()=>this.setActiveIndex(0)} icon={<SlidersOutlined />} onClick={() => { this.screenshotInteractionChange(SLIDE); }}
            type={screenshotInteractionMode === SLIDE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
            disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
          >{this.state.activeIndex===8 && <span>Slider</span>}</Button>
          <Button onMouseOver={()=>this.setActiveIndex(9)} onMouseOut={()=>this.setActiveIndex(0)} className={InspectorStyles['user_actions']} icon={<FileAddOutlined />} onClick={async () => {
            if (screenshotInteractionMode === FILE_UPLOAD) {
              this.screenshotInteractionChange(null);
              let data = {
                'session_id': driver.sessionId,
                'step-name': 'select_file',
                'status': 'done',
              };
              await fetch('https://apprecord.testing24x7.ai/appAction', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then((response) => {
                  console.log('API response:', response);
                })
                .catch((error) => {
                  console.error('API error:', error);
                });
            } else {
              this.screenshotInteractionChange(FILE_UPLOAD);
            }
          }}
            type={screenshotInteractionMode === FILE_UPLOAD ? BUTTON.PRIMARY : BUTTON.DEFAULT}
            disabled={isGestureEditorVisible}>{this.state.activeIndex===9 && <span>File Upload</span>}</Button>
          <Button onMouseOver={()=>this.setActiveIndex(10)} onMouseOut={()=>this.setActiveIndex(0)} icon={<DollarOutlined />} onClick={() => { this.screenshotInteractionChange(EXPECTED_VALUE); }}
            type={screenshotInteractionMode === EXPECTED_VALUE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
            disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
          >{this.state.activeIndex===10 && <span>Expected value</span>}</Button>
          <Button onMouseOver={()=>this.setActiveIndex(11)} onMouseOut={()=>this.setActiveIndex(0)} icon={<FundProjectionScreenOutlined />} onClick={() => { this.screenshotInteractionChange(TAKE_SCREENSHOT); }}
            type={screenshotInteractionMode === TAKE_SCREENSHOT ? BUTTON.PRIMARY : BUTTON.DEFAULT}
            disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
          >{this.state.activeIndex===11 && <span>Take Screenshot</span>}</Button>
          <Button onMouseOver={()=>this.setActiveIndex(12)} onMouseOut={()=>this.setActiveIndex(0)} icon={<DollarOutlined />} onClick={() => { this.screenshotInteractionChange(SCRATCH); }}
            type={screenshotInteractionMode === SCRATCH ? BUTTON.PRIMARY : BUTTON.DEFAULT}
            disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
          >{this.state.activeIndex===12 && <span>Scratch</span>}</Button>
      </ButtonGroup> */}
      </div>;

    let sideMenu =
      <>
        {this.state.activeCategory === 1 && this.state.showPane &&
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: "40px", maxWidth: "180px", minWidth: "180px" }}>
            <Button icon={<SwapRightOutlined />} onClick={() => { this.screenshotInteractionChange(SWIPE, 'Swipe by coordinates'); }}
              type={screenshotInteractionMode === SWIPE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Swipe By Coordinates</span></Button>
            <Button icon={<ScanOutlined />} onClick={() => { this.screenshotInteractionChange(TAP, 'Tap by coordinates'); }}
              type={screenshotInteractionMode === TAP ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Tap By Coordinates</span></Button>
            <Button icon={<InfoOutlined />} onClick={() => { this.screenshotInteractionChange(LONGPRESS, 'Longpress'); }}
              type={screenshotInteractionMode === LONGPRESS ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>LongPress</span></Button>
            <Button icon={<DragOutlined />} onClick={() => { this.screenshotInteractionChange(DRAG_AND_DROP, 'Drag & Drop'); }}
              type={screenshotInteractionMode === DRAG_AND_DROP ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Drag & Drop</span></Button>
            <Button icon={<UpCircleOutlined />} onClick={() => { this.screenshotInteractionChange(DOUBLE_TAP, 'Double tap'); }}
              type={screenshotInteractionMode === DOUBLE_TAP ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              className={InspectorStyles['user_actions']}
            ><span>Double Tap</span></Button>
            <Button icon={<ShrinkOutlined />} onClick={() => { this.screenshotInteractionChange(ZOOMIN, 'Zoom'); }}
              type={screenshotInteractionMode === ZOOMIN ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Zoom</span></Button>
            <Button icon={<SlidersOutlined />} onClick={() => { this.screenshotInteractionChange(SLIDE, 'Slider'); }}
              type={screenshotInteractionMode === SLIDE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Slider</span></Button>
            {/* <Button icon={<LockOutlined />} onClick={() => { this.screenshotInteractionChange(LOCK, 'Lock'); this.isLocked(); }}
              type={screenshotInteractionMode === LOCK ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Lock</span></Button> */}
            <Button icon={<DollarOutlined />} onClick={() => { this.screenshotInteractionChange(SCRATCH, 'Scratch'); }}
              type={screenshotInteractionMode === SCRATCH ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Scratch</span></Button>
            <Button icon={<ShakeOutlined />} onClick={() => { this.screenshotInteractionChange(SHAKE, 'shake'); this.shakeBooty(); }}
              type={screenshotInteractionMode === SHAKE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Shake</span></Button>
            {/* <Button icon={<UnlockOutlined />} onClick={() => { this.screenshotInteractionChange(UNLOCK, 'Unlock'); this.isUnlocked();}}
                       type={screenshotInteractionMode === UNLOCK ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                   disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                  ><span>Unlock</span></Button> */}
          </div>}
        {
          this.state.activeCategory === 3 && this.state.showPane &&
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: "40px", maxWidth: "180px", minWidth: "180px" }}>
            <Button icon={<FundProjectionScreenOutlined />}
              type={screenshotInteractionMode === TAKE_SCREENSHOT ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              onClick={() => this.state.nestedDropIndex !== 1 ? this.setState({ nestedDropIndex: 1 }) : this.setState({ nestedDropIndex: 0 })}
              // disabled={isGestureEditorVisible}
              className={InspectorStyles['user_actions']}
            ><span> long press key</span></Button>
            {this.state.nestedDropIndex === 1 && this.state.showPane &&
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                  {options.map((option, index) => (
                    <Button style={{ width: '100%' }} key={index}
                      onClick={async () => await this.handleActions(option, 'long_press_key')}>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            }

            <Button icon={<FundProjectionScreenOutlined />}
              type={screenshotInteractionMode === TAKE_SCREENSHOT ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              onClick={() => this.state.nestedDropIndex !== 2 ? this.setState({ nestedDropIndex: 2 }) : this.setState({ nestedDropIndex: 0 })}
              // disabled={isGestureEditorVisible}
              className={InspectorStyles['user_actions']}
            ><span>press key</span></Button>
            {this.state.nestedDropIndex === 2 && this.state.showPane &&
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%' }}>
                  {options.map((option, index) => (
                    <Button style={{ width: '100%' }} key={index}
                      onClick={async () => await this.handleActions(option, 'press_key')}>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            }

            <Button className={InspectorStyles['user_actions']} icon={<FileAddOutlined />} onClick={async () => {
              if (screenshotInteractionMode === FILE_UPLOAD) {
                this.screenshotInteractionChange(null, null);
                let data = {
                  'session_id': driver.sessionId,
                  'step-name': 'select_file',
                  'status': 'done',
                };
                this.callParticularSteps(data);
              } else {
                this.screenshotInteractionChange(FILE_UPLOAD, 'File Upload');
              }
            }}
              type={screenshotInteractionMode === FILE_UPLOAD ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible}><span>File Upload</span></Button>
            <Button icon={<FundProjectionScreenOutlined />} onClick={() => { this.screenshotInteractionChange(TAKE_SCREENSHOT, 'Take screenshot'); }}
              type={screenshotInteractionMode === TAKE_SCREENSHOT ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Take Screenshot</span></Button>
            <Button icon={<CaretDownOutlined />} onClick={async () => {
              this.screenshotInteractionChange(HIDE_KEYBOARD, 'Hide keyword');
              this.hideKeyboard();
              this.fetchAllSteps();
              await applyClientMethod({ methodName: 'getPageSource' });
            }}
              type={screenshotInteractionMode === HIDE_KEYBOARD ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Hide Keyboard</span></Button>
            <Button icon={<FieldTimeOutlined />} onClick={async () => {
              this.screenshotInteractionChange(GET_DEVICE_TIME, 'Get Device Time');
              this.getDeviceTime();
              this.fetchAllSteps();
              await applyClientMethod({ methodName: 'getPageSource' });
            }}
              type={screenshotInteractionMode === GET_DEVICE_TIME ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Get Device Time</span></Button>
            <Button icon={<PaperClipOutlined />} onClick={async () => {
              this.screenshotInteractionChange(GET_CLIPBOARD, 'Get clipboard');
              await applyClientMethod({ methodName: 'getPageSource' });
            }}
              type={screenshotInteractionMode === GET_CLIPBOARD ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Get clipboard</span></Button>
            {this.state.mode_orientation === 'PORTRAIT' ? (<Button icon={<RotateRightOutlined />} onClick={async () => {
              await driver.client.setOrientation('LANDSCAPE');
              await applyClientMethod({ methodName: 'getPageSource' });
              let data = {
                'session_id': driver.sessionId,
                'step-name': 'rotate',
                'action': 'landscape'
              };
              this.callParticularSteps(data);
              this.fetchAllSteps();
              await driver.client.getOrientation().then((res) => {
                console.log("🚀 ~ file: Inspector.js:363 ~ driver.client.getOrientation ~ res:", res);
                this.setState({ mode_orientation: res });
              });
            }}
              type={screenshotInteractionMode === ROTATE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Rotate/Landscape</span></Button>) :
              (
                <Button icon={<RotateRightOutlined />} onClick={async () => {
                  await driver.client.setOrientation('PORTRAIT');
                  let data = {
                    'session_id': driver.sessionId,
                    'step-name': 'rotate',
                    'action': 'portrait'
                  };
                  this.callParticularSteps(data);
                  this.fetchAllSteps();
                  driver.client.getOrientation().then((res) => {
                    console.log("🚀 ~ file: Inspector.js:363 ~ driver.client.getOrientation ~ res:", res);
                    this.setState({ mode_orientation: res });
                  });
                  await applyClientMethod({ methodName: 'getPageSource' });
                }}
                  type={screenshotInteractionMode === ROTATE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
                  disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
                ><span>Rotate/Potrait</span></Button>
              )}
            <Button icon={<NotificationOutlined />}
              onClick={async () => {
                await driver.client.openNotifications();
                let data = {
                  'session_id': driver.sessionId,
                  'step-name': 'notification',
                };
                this.callParticularSteps(data);
                this.fetchAllSteps();
                await applyClientMethod({ methodName: 'getPageSource' });
              }}
              type={screenshotInteractionMode === ROTATE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Open Notifications</span></Button>
          </div>
        }
        {
          this.state.activeCategory === 4 && this.state.showPane &&
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: "40px", maxWidth: "180px", minWidth: "180px" }}>
            <Button icon={<CheckCircleOutlined />} onClick={() => { this.screenshotInteractionChange(EXPECTED_VALUE, 'Expected Value'); }}
              type={screenshotInteractionMode === EXPECTED_VALUE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
              <span>Expected value</span></Button>
            <Button icon={<CheckCircleOutlined />}
              onClick={async () => {
                let data = {
                  'session_id': driver.sessionId,
                  'step-name': 'text_equal',
                };
                this.callParticularSteps(data);
                this.fetchAllSteps();
                await applyClientMethod({ methodName: 'getPageSource' });
              }}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
              <span>text equals</span></Button>
            <Button icon={<CheckCircleOutlined />}
              onClick={async () => {
                let data = {
                  'session_id': driver.sessionId,
                  'step-name': 'text_contains',
                };
                this.callParticularSteps(data);
                this.fetchAllSteps();
                await applyClientMethod({ methodName: 'getPageSource' });
              }}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
              <span>text contains</span></Button>
            <Button icon={<CheckCircleOutlined />}
              onClick={async () => {
                let data = {
                  'session_id': driver.sessionId,
                  'step-name': 'attribute_equals',
                };
                this.callParticularSteps(data);
                this.fetchAllSteps();
                await applyClientMethod({ methodName: 'getPageSource' });
              }}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
              <span>attribute equals</span></Button>
            <Button icon={<CheckCircleOutlined />}
              onClick={async () => {
                let data = {
                  'session_id': driver.sessionId,
                  'step-name': 'attribute_contains',
                };
                this.callParticularSteps(data);
                this.fetchAllSteps();
                await applyClientMethod({ methodName: 'getPageSource' });
              }}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
              <span>attribute contains</span></Button>
            <Button icon={<CheckCircleOutlined />}
              onClick={async () => {
                let data = {
                  'session_id': driver.sessionId,
                  'step-name': 'is_element_displayed',
                };
                this.callParticularSteps(data);
                this.fetchAllSteps();
                await applyClientMethod({ methodName: 'getPageSource' });
              }}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
              <span>Is Element Displayed</span></Button>
            <Button icon={<CheckCircleOutlined />}
              onClick={async () => {
                let data = {
                  'session_id': driver.sessionId,
                  'step-name': 'is_element_selected',
                };
                this.callParticularSteps(data);
                this.fetchAllSteps();
                await applyClientMethod({ methodName: 'getPageSource' });
              }}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
              <span>Is Element Selected</span></Button>
            <Button icon={<CheckCircleOutlined />}
              onClick={async () => {
                let data = {
                  'session_id': driver.sessionId,
                  'step-name': 'is_element_enabled',
                };
                this.callParticularSteps(data);
                this.fetchAllSteps();
                await applyClientMethod({ methodName: 'getPageSource' });
              }}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
              <span>Is Element Enabled</span></Button>
            <Button icon={<CheckCircleOutlined />}
              onClick={async () => {
                let data = {
                  'session_id': driver.sessionId,
                  'step-name': 'is_element_disabled',
                };
                this.callParticularSteps(data);
                this.fetchAllSteps();
                await applyClientMethod({ methodName: 'getPageSource' });
              }}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}>
              <span>Is Element Disabled</span></Button>
          </div>
        }
        {
          this.state.activeCategory === 5 && this.state.showPane &&
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: "40px", maxWidth: "180px", minWidth: "180px" }}>
            {!this.state.isInput ? (<Button icon={<SwitcherOutlined />} onClick={() => this.setState({ isInput: true })}
              type={screenshotInteractionMode === ROTATE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            ><span>Switch App</span></Button>) : (
              <div>
                <Input
                  placeholder="enter bundle id"
                  onChange={(event) => this.setState({ inputBundleId: event.target.value })}
                />
                <Button
                  onClick={async () => {
                    await driver.client.activateApp(this.state.inputBundleId);
                    let data = {
                      'session_id': driver.sessionId,
                      'step-name': 'switch_app',
                      'bundle_id': this.state.inputBundleId
                    };
                    this.callParticularSteps(data);
                    this.fetchAllSteps();
                    await applyClientMethod({ methodName: 'getPageSource' });
                    this.setState({ isInput: false, inputBundleId: '' });
                  }}
                  style={{ backgroundColor: 'blue' }}
                >
                  Activate App
                </Button>
              </div>
            )}
            <Button icon={<AimOutlined />} onClick={async () => { await driver.client.resetApp(); }}
              disabled={isGestureEditorVisible} className={InspectorStyles['user_actions']}
            > <span>Reset App</span></Button>
          </div>
        }
      </>;

    let main = <div className={InspectorStyles['inspector-main']} ref={(el) => { this.screenAndSourceEl = el; }}>
      <div id='screenshotContainer' className={InspectorStyles['screenshot-container']} ref={(el) => { this.screenshotEl = el; }}>
        {screenShotControls}
        {showScreenshot && sideMenu}
        {showScreenshot &&
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {this.state.currentSelection !== null && <div style={{ textAlign: 'center', color: "white", fontWeight: "bold", background: 'rgb(24, 119, 242)', width: '89%', borderRadius: '5px', padding: "10px", marginLeft: "18px" }}>Current Selection : {this.state.currentSelection}</div>}
            <Screenshot {...this.props} scaleRatio={this.state.scaleRatio} />
          </div>}
        {screenshotError && t('couldNotObtainScreenshot', { screenshotError })}
        {!showScreenshot &&
          <Spin size="large" spinning={true}>
            <div className={InspectorStyles.screenshotBox} />
          </Spin>
        }
      </div>
      <div id='sourceTreeContainer' className={InspectorStyles['interaction-tab-container']} >
        {showRecord &&
          <RecordedActions {...this.props} />
        }
        <Tabs activeKey={selectedInteractionMode}
          size="small"
          onChange={(tab) => selectInteractionMode(tab)}
          items={[{
            label: t('Source'), key: INTERACTION_MODE.SOURCE, children:
              <div className='action-row'>
                {/* <div className='action-col'>
                <Card title={<span><FileTextOutlined /> {t('App Source')} </span>}
                  extra={
                    <span>
                      <Tooltip title={t('Toggle Attributes')}>
                        <Button type='text' id='btnToggleAttrs' icon={<CodeOutlined/>} onClick={toggleShowAttributes} />
                      </Tooltip>
                      <Tooltip title={t('Copy XML Source to Clipboard')}>
                        <Button type='text' id='btnSourceXML' icon={<CopyOutlined/>} onClick={() => clipboard.writeText(sourceXML)} />
                      </Tooltip>
                      <Tooltip title={t('Download Source as .XML File')}>
                        <Button type='text' id='btnDownloadSourceXML' icon={<DownloadOutlined/>} onClick={() => downloadXML(sourceXML)}/>
                      </Tooltip>
                    </span>
                  }>
                  <Source {...this.props} />
                </Card>
              </div> */}
                <div style={{ fontWeight: 'bold' }}>
                  FLOW TABLE:
                </div>
                <div style={{ width: '100%' }}>
                  <table>
                    <tr>
                      <th>S No.</th>
                      <th>Step</th>
                      <th>Step Name</th>
                      <th>Search By</th>
                      <th>Search By Value</th>
                    </tr>
                    {this.state.total_array.length > 0 && this.state.total_array.map((item, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item['step']}</td>
                        <td>{item['step_name']}</td>
                        <td>{item['search_by']}</td>
                        <td style={{ maxWidth: '200px', wordWrap: 'break-word' }}>{item['search_by_value']}</td>
                        {/* {item.response.status === 200 ?
                     <td><span style={{color:'green'}}>Success</span></td> :
                    <td><span style={{color:'red'}}>Failed</span></td>
                    } */}
                      </tr>
                    ))}
                  </table>
                </div>
                {/* <div id='selectedElementContainer'
                  className={`${InspectorStyles['interaction-tab-container']} ${InspectorStyles['element-detail-container']} action-col`}>
                  <Card title={<span><TagOutlined /> {t('selectedElement')}</span>}
                    className={InspectorStyles['selected-element-card']}>
                    {path && <SelectedElement {...this.props} />}
                    {!path && <i>{t('selectElementInSource')}</i>}
                  </Card>
                </div> */}
              </div>
          }, {
  label: (
    <div onClick={this.getAllGraphData}>
      {t('Performance matrices')}
    </div>
  ),
  key: INTERACTION_MODE.COMMANDS,
  children: (
    <div style={{overflowY: 'auto'}}>
      <h2>Performance Graph</h2>
      {this.state.cpu_graph_data.length > 0 &&
      this.state.memory_graph_data.length > 0 &&
      this.state.battery_graph_data.length > 0 &&
      this.state.network_graph_data.length > 0 ? (
        <div>
        <div>
        <h4> Cpu Performance</h4>
          <LineChart
            option={{
              xAxis: {
                type: 'category',
                data: this.state.cpu_graph_options,
              },
              yAxis: {
                type: 'value',
              },
              series: [
                {
                  data: this.state.cpu_graph_data,
                  type: 'line',
                },
              ],
            }}
          />
        </div>
          <div>
          <h4> Memory Performance</h4>
          <LineChart
            option={{
              xAxis: {
                type: 'category',
                data: this.state.memory_graph_options,
              },
              yAxis: {
                type: 'value',
              },
              series: [
                {
                  data: this.state.memory_graph_data,
                  type: 'line',
                },
              ],
            }}
          />
          </div>

          <div>
          <h4> Battery Performance</h4>
          <LineChart
            option={{
              xAxis: {
                type: 'category',
                data: this.state.battery_graph_options,
              },
              yAxis: {
                type: 'value',
              },
              series: [
                {
                  data: this.state.battery_graph_data,
                  type: 'line',
                },
              ],
            }}
          />
          </div>

          <div>
          <h4> Network Performance</h4>
          <LineChart
            option={{
              xAxis: {
                type: 'category',
                data: this.state.network_graph_options,
              },
              yAxis: {
                type: 'value',
              },
              series: [
                {
                  data: this.state.network_graph_data,
                  type: 'line',
                },
              ],
            }}
          />
          </div>
        </div>
      ) : (
        <div>No data found</div>
      )
      }
    </div>
  ),
},
 {
            label: t('Gestures'), key: INTERACTION_MODE.GESTURES, children:
              isGestureEditorVisible ?
                <Card
                  title={<span><HighlightOutlined /> {t('Gesture Builder')}</span>}
                  className={InspectorStyles['interaction-tab-card']}>
                  <GestureEditor {...this.props} />
                </Card>
                :
                <Card
                  title={<span><HighlightOutlined /> {t('Saved Gestures')}</span>}
                  className={InspectorStyles['interaction-tab-card']}>
                  <SavedGestures {...this.props} />
                </Card>
          }, {
            label: t('Session Information'), key: INTERACTION_MODE.SESSION_INFO, children:
              <Card
                title={<span><InfoCircleOutlined /> {t('Session Information')}</span>}
                className={InspectorStyles['interaction-tab-card']}>
                <SessionInfo {...this.props} />
              </Card>
          }]}
        />
      </div>
    </div>;

    return (<div className={InspectorStyles['inspector-container']}>
      <HeaderButtons {...this.props} handlePanel={() => {
        this.setState({ showPane: !this.state.showPane });
        // this.state.activeIndex !== 1 ? this.setActiveIndex(1) : this.setActiveIndex(0);
        console.log("showPane", this.state.showPane);
      }} />
      {main}
      <Modal
        title={t('Session Inactive')}
        open={showKeepAlivePrompt}
        onOk={() => keepSessionAlive()}
        onCancel={() => quitSession()}
        okText={t('Keep Session Running')}
        cancelText={t('Quit Session')}
      >
        <p>{t('Your session is about to expire')}</p>
      </Modal>
      <Modal
        title={t('methodCallResult', { methodName: visibleCommandMethod })}
        open={!!visibleCommandResult}
        onOk={() => setVisibleCommandResult(null)}
        onCancel={() => setVisibleCommandResult(null)}
      >
        <pre><code>{visibleCommandResult}</code></pre>
      </Modal>
      <Modal
        title={'Enter arguments for '}
        open={showModal}
        onOk={this.handleModalSubmit}
        onCancel={() => this.setState({ showModal: false })}
      >
        <Input
          value={inputText}
          onChange={(e) => this.setState({ inputText: e.target.value })}
        />
      </Modal>

    </div>);
  }
}
