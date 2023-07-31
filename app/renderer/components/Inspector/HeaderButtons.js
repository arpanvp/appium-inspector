/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Tooltip, Space } from 'antd';
import InspectorStyles from './Inspector.css';
import { HiOutlineMicrophone, HiOutlineHome } from 'react-icons/hi';
import { BiSquare, BiCircle } from 'react-icons/bi';
import { IoChevronBackOutline } from 'react-icons/io5';
import { APP_MODE } from './shared';
import { BUTTON } from '../AntdTypes';
import {
  ReloadOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  EyeOutlined,
  PauseOutlined,
  SearchOutlined,
  CloseOutlined,
  AppstoreOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import  logo  from '../../../../assets/images/testinglogo.png';
import menuButton from '../../../../assets/images/hamburger.jpg';
const HeaderButtons = (props) => {
  const { selectAppMode, appMode, mjpegScreenshotUrl, isSourceRefreshOn, toggleRefreshingState,
    isRecording, startRecording, pauseRecording, showLocatorTestModal, showSiriCommandModal,
    applyClientMethod, quitSession, driver, t } = props;

  const headerLogo =
    <div className={InspectorStyles['logoContainer']}>
      <div>
        <img src={menuButton} alt="toggleButton" style={{height:"45px"}}></img>
      </div>
      <div>
        <img src={logo} alt="testingLogo" style={{height:"45px"}}></img>
      </div>
    </div>
  const deviceControls = <Button.Group>
    {driver && driver.client.isIOS && <>
      <Tooltip title={t('Press Home Button')}>
        <Button id='btnPressHomeButton'
          icon={<HiOutlineHome className={InspectorStyles['custom-button-icon']} />}
          onClick={() =>
            applyClientMethod({ methodName: 'executeScript', args: ['mobile:pressButton', [{ name: 'home' }]] })
          } />
      </Tooltip>
      <Tooltip title={t('Execute Siri Command')}>
        <Button id='siriCommand'
          icon={<HiOutlineMicrophone className={InspectorStyles['custom-button-icon']} />}
          onClick={showSiriCommandModal} />
      </Tooltip>
    </>}
    {/* {driver && driver.client.isAndroid && <>
      <Tooltip title={t('Press Back Button')}>
        <Button id='btnPressHomeButton'
          icon={<IoChevronBackOutline className={InspectorStyles['custom-button-icon']}/>}
          onClick={() => applyClientMethod({ methodName: 'pressKeyCode', args: [4]})} />
      </Tooltip>
      <Tooltip title={t('Press Home Button')}>
        <Button id='btnPressHomeButton'
          icon={<BiCircle className={InspectorStyles['custom-button-icon']}/>}
          onClick={() => applyClientMethod({ methodName: 'pressKeyCode', args: [3]})} />
      </Tooltip>
      <Tooltip title={t('Press App Switch Button')}>
        <Button id='btnPressHomeButton'
          icon={<BiSquare className={InspectorStyles['custom-button-icon']}/>}
          onClick={() => applyClientMethod({ methodName: 'pressKeyCode', args: [187]})} />
      </Tooltip>
    </>} */}
  </Button.Group>;

  const appModeControls = <Button.Group value={appMode} style={{ display: "flex", gap: "10px" }}>
    {/* <Tooltip title={t('Native App Mode')}> */}
    <Button className={InspectorStyles['actionButton']} icon={<AppstoreOutlined />} onClick={() => { selectAppMode(APP_MODE.NATIVE); }}
    // type={appMode === APP_MODE.NATIVE ? BUTTON.PRIMARY : BUTTON.DEFAULT}
    >Native Mode</Button>
    {/* </Tooltip> */}
    {/* <Tooltip title={t('Web/Hybrid App Mode')}> */}
    <Button className={InspectorStyles['actionButton']} icon={<GlobalOutlined />} onClick={() => { selectAppMode(APP_MODE.WEB_HYBRID); }}
    // type={appMode === APP_MODE.WEB_HYBRID ? BUTTON.PRIMARY : BUTTON.DEFAULT}
    >Hybrid Mode</Button>
    {/* </Tooltip> */}
  </Button.Group>;

  const generalControls = <Button.Group style={{ display: "flex", gap: "10px" }}>
    {mjpegScreenshotUrl && !isSourceRefreshOn &&
      <Tooltip title={t('Start Refreshing Source')}>
        <Button className={InspectorStyles['actionButton']} id='btnStartRefreshing' icon={<PlayCircleOutlined />} onClick={toggleRefreshingState} />
      </Tooltip>
    }
    {mjpegScreenshotUrl && isSourceRefreshOn &&
      <Tooltip title={t('Pause Refreshing Source')}>
        <Button className={InspectorStyles['actionButton']} id='btnPauseRefreshing' icon={<PauseCircleOutlined />} onClick={toggleRefreshingState}>Pause Recording</Button>
      </Tooltip>
    }
    {/* <Tooltip title={t('refreshSource')}> */}
    <Button className={InspectorStyles['actionButton']} id='btnReload' icon={<ReloadOutlined />} onClick={() => applyClientMethod({ methodName: 'getPageSource' })}>Refresh</Button>
    {/* </Tooltip> */}
    {/* <Tooltip title={t('Search for element')}> */}
    <Button className={InspectorStyles['actionButton']} id='searchForElement' icon={<SearchOutlined />} onClick={showLocatorTestModal}>Search</Button>
    {/* </Tooltip> */}
    {!isRecording &&
      <Tooltip title={t('Start Recording')}>
        <Button className={InspectorStyles['actionButton']} id='btnStartRecording' icon={<EyeOutlined />} onClick={startRecording}>Start Recording</Button>
      </Tooltip>
    }
    {isRecording &&
      // <Tooltip title={t('Pause Recording')}>
      <Button className={InspectorStyles['actionButton']} id='btnPause' icon={<PauseOutlined />} type={BUTTON.DANGER} onClick={pauseRecording}>Pause Recording</Button>
      // </Tooltip>
    }
  </Button.Group>;

  const quitSessionButton =
    // <Tooltip title={t('Close')}>
    <Button style={{ borderRadius: "50%" }} className={InspectorStyles['actionButton']} id='btnClose' icon={<CloseOutlined />} onClick={() => quitSession()} />
  // </Tooltip>;

  return <div className={InspectorStyles['inspector-toolbar']}>
    <Space className={InspectorStyles['button_wrapper']}>
      <div style={{ display: "flex", gap: "10px", alignItems:"center" }}>
        {headerLogo}
        {deviceControls}
        {appModeControls}
        {generalControls}
      </div>
      <div>
        {quitSessionButton}
      </div>
    </Space>
  </div>;
};

export default HeaderButtons;
