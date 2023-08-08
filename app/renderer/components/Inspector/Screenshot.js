/* eslint-disable import/no-duplicates */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable import/no-unresolved */
/* eslint-disable space-before-blocks */
/* eslint-disable space-in-parens */
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */

import React, { useRef, useState, useEffect } from 'react';
import HighlighterRects from './HighlighterRects';
import { Card, Spin, Tooltip, Button } from 'antd';
import InspectorStyles from './Inspector.css';
import SelectedElement from './SelectedElement';
import B from 'bluebird';
import styles from './Inspector.css';
import {TagOutlined} from '@ant-design/icons';
import {
  SCREENSHOT_INTERACTION_MODE, INTERACTION_MODE, POINTER_TYPES,
  DEFAULT_TAP, DEFAULT_SWIPE, DEFAULT_LONGPRESS, DEFAULT_DRAG_AND_DROP, DEFAULT_ZOOM
} from './shared';
import { IoChevronBackOutline } from 'react-icons/io5';
import { BiSquare, BiCircle } from 'react-icons/bi';
const { POINTER_UP, POINTER_DOWN, PAUSE, POINTER_MOVE } = POINTER_TYPES;
const { TAP, SELECT, SLIDE, SWIPE, LONGPRESS, DRAG_AND_DROP, DOUBLE_TAP, SLIDE_SWIPE, ZOOMIN, SELECT_LONG, SELECT_DOUBLE, FILE_UPLOAD, SELECT_FILE, EXPECTED_VALUE, TAKE_SCREENSHOT, SCRATCH, ROTATE } = SCREENSHOT_INTERACTION_MODE;
const TYPES = { FILLED: 'filled', NEW_DASHED: 'newDashed', WHOLE: 'whole', DASHED: 'dashed', DRAG: 'drag' };



/**
 * Shows screenshot of running application and divs that highlight the elements' bounding boxes
 */
const Screenshot = (props) => {
  const { screenshot, selectedElement = {}, mjpegScreenshotUrl, methodCallInProgress, driver, selectScreenshotInteractionMode, screenshotInteractionMode, step_object, swipeStart, swipeEnd1, swipeStart1, swipeEnd, scaleRatio, selectedTick, selectedInteractionMode, applyClientMethod, t, hoveredElement, locatorTestElement } = props; const [xLongPress, setXLongPress] = useState(null);
  const [yLongPress, setYLongPress] = useState(null);
  const [element, setElement] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [scratch, setScratch] = useState(false);



  useEffect(() => {
    if (hoveredElement && hoveredElement.attributes && hoveredElement.attributes.bounds) {
      const coordinatesString = hoveredElement.attributes.bounds;
      console.log("coordinatestring", coordinatesString);
      const coordinatesArray = coordinatesString.match(/\d+/g);
      if (coordinatesArray.length >= 4) {
        const x1 = parseInt(coordinatesArray[0], 10);
        const y1 = parseInt(coordinatesArray[1], 10);
        const x2 = parseInt(coordinatesArray[2], 10);
        const y2 = parseInt(coordinatesArray[3], 10);

        const centerX = Math.round(x2);
        const centerY = Math.round(y2);
        setXLongPress(centerX);
        setYLongPress(centerY);
      }

    }
  }, [hoveredElement]);

  if (hoveredElement) {
    // console.log("hoveredElement.attributes.bounds:", hoveredElement.attributes.bounds);
  }


  const containerEl = useRef();
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [isLongPress, setIsLongPress] = useState(false);

  const [coords, setCoords] = useState({});

  let [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });
  let imageElement = containerEl.current;
  let imageRef = useRef();
  // eslint-disable-next-line no-console
  // console.log('🚀 ~ file: Screenshot.js:41 ~ Screenshot ~ imageRef:', imageRef);
  // // let imageElement = imageRef.querySelector('img');
  // let image = imageRef && imageRef.getElementById('#screenshot');
  // // eslint-disable-next-line no-console
  // console.log('🚀 ~ file: Screenshot.js:45 ~ Screenshot ~ imageElement:', imageElement);
  // if (screenshotInteractionMode === ZOOMIN) {
  //   useGesture(
  //   {
  //     onDrag: ({ offset: [dx, dy] }) => {
  //       setCrop((crop) => ({ ...crop, x: dx, y: dy }));
  //     },
  //     onPinch: ({ offset: [d] }) => {
  //       setCrop((crop) => ({ ...crop, scale: 1 + d / 50 }));
  //     },
  //   },
  //   {
  //     domTarget: containerEl.current,
  //     eventOptions: { passive: false },
  //   }
  //   );
  // }

  const handleScreenshotClick = async (e) => {
    const { setSwipeStart, setSwipeEnd, tapTickCoordinates, setSwipeStart1, setSwipeEnd1 } = props;
    const { POINTER_NAME, DURATION_1, DURATION_2, BUTTON } = DEFAULT_TAP;


    if (screenshotInteractionMode === TAP) {
      console.log('inside the sreenshot page!!!!!! tap');
      applyClientMethod({
        methodName: TAP,
        args: [
          {
            [POINTER_NAME]: [
              { type: POINTER_MOVE, duration: DURATION_1, x, y },
              { type: POINTER_DOWN, button: BUTTON },
              { type: PAUSE, duration: DURATION_2 },
              { type: POINTER_UP, button: BUTTON }
            ],
          }
        ],
      });
    } else if (screenshotInteractionMode === LONGPRESS) {
      console.log("inside the condition of the longpress!!");
      setTimeout(() => {
        selectScreenshotInteractionMode(SELECT_LONG);
      }, 2000);
    } else if (screenshotInteractionMode === SELECT_LONG) {
      await useLongPress();
    } else if (screenshotInteractionMode === DOUBLE_TAP) {
      console.log("inside the double tap function!!!");
      setTimeout(() => {
        selectScreenshotInteractionMode(SELECT_DOUBLE);
      }, 1000);
    } else if (screenshotInteractionMode === SELECT_DOUBLE) { 
      await useDoubleTap();
    } else if (screenshotInteractionMode === DRAG_AND_DROP) {
      console.log("inside the drage and drop condition value!!!!!!");
      if (!swipeStart) {
        setSwipeStart(x, y);
      } else if (!swipeEnd) {
        setSwipeEnd(x, y);
        if (isLongPress) {
          // await B.delay(500);
          // await applyClientMethod({ methodName: SWIPE, args: { /* ... */ } });
          // await handleDoDragAndDrop({ x, y });
        }
        handleDoDragAndDrop({ x, y });
      }
    } else if (selectedTick) {
      tapTickCoordinates(x, y);
    } else if (screenshotInteractionMode === SWIPE) {
      if (!swipeStart) {
        setSwipeStart(x, y);
      } else if (!swipeEnd) {
        setSwipeEnd(x, y);
        await B.delay(500);
        await handleDoSwipe({ x, y });
      }
    } else if (screenshotInteractionMode === ZOOMIN) {
      if (!swipeStart) {
        setSwipeStart(x, y);
      } else if (!swipeEnd) {
        setSwipeEnd(x, y);
        await B.delay(500);
        setCoords({ x, y });
        // setTimeout(() => {
        //  handleDoZoom({x, y});
        // }, 2000);
      } else if (!swipeStart1) {
        setSwipeStart1(x, y);
      } else if (!swipeEnd1) {
        setSwipeEnd1(x, y);
        await B.delay(500);
        await handleDoZoom({ x, y }, coords);
      }
    } else if (screenshotInteractionMode === SLIDE) {
      setTimeout(() => {
        selectScreenshotInteractionMode(SLIDE_SWIPE);
      }, 1000);
      if (props.selectedElement) {
        setElement(props.selectedElement);
      }
    } else if (screenshotInteractionMode === SLIDE_SWIPE) {
      if (!swipeStart) {
        setSwipeStart(x, y);
      } else if (!swipeEnd) {
        setSwipeEnd(x, y);
        await B.delay(500);
        await handleDoSwipeSlide({ x, y });
      }
    } else if (screenshotInteractionMode === FILE_UPLOAD) {
      console.log("inside the file upload condition!!!!!!!!!");
      setTimeout(() => {
        selectScreenshotInteractionMode(SELECT_FILE);
      }, 1000);
    } else if (screenshotInteractionMode === SELECT_FILE) {
      console.log("inside the select file condition!!!!!!!!!");
      await useFileUpload();
    } else if (screenshotInteractionMode === EXPECTED_VALUE) {
      let expected_value = '';
      let data = {};
      if (props.selectedElement){
        expected_value = props.selectedElement.attributes.text;
        data = {
          expectedValue: expected_value,
          xpath: props.selectedElement.xpath
        };
      }
      await fetchExpectedValue(data);
    } else if (screenshotInteractionMode === TAKE_SCREENSHOT) {
      const image = await driver.client.takeScreenshot();
    //   console.log("🚀 ~ file: Screenshot.js:203 ~ handleScreenshotClick ~ image:", image);
    //   let sendData = {
    //     "session_id": driver.sessionId,
    //     "step-name": "take_screenshot",
    //   };
    //   await fetch("https://apprecord.testing24x7.ai/appAction", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(sendData),
    //   })
    //   .then((response) => {*
    //     console.log("API response:", response);
    //   })
    //   .catch((error) => {
    //     console.error("API error:", error);
    //   });
    } else if (screenshotInteractionMode === SCRATCH){
      console.log("🚀 ~ file: Screenshot.js:201 ~ handleScreenshotClick ~ e:", e);
      if (!swipeStart){
        setScratch(true);
        setCoordinates([]);
        await scratchCard(e);
        setSwipeStart(x, y);
      }
    }
  };


  const handleLongPress = () => {
    setIsLongPress(true);
  };

  const useFileUpload = () => {
    console.log("inside the use file upload function!!!!!!");
    const { POINTER_NAME, DURATION_1, DURATION_2, BUTTON } = DEFAULT_TAP;
    const { clearSwipeAction } = props;
    applyClientMethod({
      methodName: TAP,
      args: [
        {
          [POINTER_NAME]: [
            { type: POINTER_MOVE, duration: DURATION_1, x, y },
            { type: POINTER_DOWN, button: BUTTON },
            { type: PAUSE, duration: DURATION_2 },
            { type: POINTER_UP, button: BUTTON }
          ],
        }
      ],
    });
    clearSwipeAction();
    selectScreenshotInteractionMode(FILE_UPLOAD);

  };

  const useLongPress = async () => {
    const { LONGPRESS_POINTER_NAME, LONGPRESS_DURATION_1, LONGPRESS_DURATION_2, LONGPRESS_BUTTON } = DEFAULT_LONGPRESS;
    let longdata = {
      methodName: TAP,
      args: {
        [LONGPRESS_POINTER_NAME]: [
          { type: POINTER_MOVE, duration: LONGPRESS_DURATION_1, x, y },
          { type: POINTER_DOWN, button: LONGPRESS_BUTTON },
          { type: PAUSE, duration: LONGPRESS_DURATION_2 },
          { type: POINTER_UP, button: LONGPRESS_BUTTON }
        ],
      }
    };
    await applyClientMethod(longdata);
    selectScreenshotInteractionMode(LONGPRESS);
  };

  const useDoubleTap = () => {
    const { POINTER_NAME, DURATION_1, DURATION_2, BUTTON } = DEFAULT_TAP;
    applyClientMethod({
      methodName: TAP,
      args: [
        {
          [POINTER_NAME]: [
            { type: POINTER_MOVE, duration: DURATION_1, x, y },
            { type: POINTER_DOWN, button: BUTTON },
            { type: PAUSE, duration: DURATION_2 },
            { type: POINTER_UP, button: BUTTON }
          ],
        }
      ],
    });
    const delay = 50;
    setTimeout(() => {
      applyClientMethod({
        methodName: TAP,
        args: [
          {
            [POINTER_NAME]: [
              { type: POINTER_MOVE, duration: DURATION_1, x, y },
              { type: POINTER_DOWN, button: BUTTON },
              { type: PAUSE, duration: DURATION_2 },
              { type: POINTER_UP, button: BUTTON },

            ],
          }
        ],
      });
    }, delay);
    selectScreenshotInteractionMode(DOUBLE_TAP);
  };

  const scratchCard = async (e) => {
    console.log("🚀 ~ file: Screenshot.js:293 ~ scratchCard ~ e:", e);
    console.log('scratching');
    if (scratch === true){
      await handleMouseMove(e);
    }
  };


  const handleDoSwipe = async (swipeEndLocal) => {
    const { clearSwipeAction } = props;
    const { POINTER_NAME, DURATION_1, DURATION_2, BUTTON, ORIGIN } = DEFAULT_SWIPE;
    await applyClientMethod({
      methodName: SWIPE,
      args: {
        [POINTER_NAME]: [
          { type: POINTER_MOVE, duration: DURATION_1, x: swipeStart.x, y: swipeStart.y },
          { type: POINTER_DOWN, button: BUTTON },
          { type: POINTER_MOVE, duration: DURATION_2, origin: ORIGIN, x: swipeEndLocal.x, y: swipeEndLocal.y },
          { type: POINTER_UP, button: BUTTON }
        ]
      },
    });
    clearSwipeAction();
    if (step_object){
      console.log("🚀 ~ file: Screenshot.js:97 ~ Screenshot ~ step_object:", step_object);
    }
  };


  const handleDoSwipeSlide = async (swipeEndLocal) => {
    console.log("🚀 ~ file: Screenshot.js:332 ~ handleDoSwipeSlide ~ props:", props);
    let xpath = props.selectedElement.xpath;
    console.log("🚀 ~ file: Screenshot.js:304 ~ handleDoSwipeSlide ~ xpath:", xpath);
    const { clearSwipeAction } = props;
    const { POINTER_NAME, DURATION_1, DURATION_2, BUTTON, ORIGIN } = DEFAULT_SWIPE;
    let data = {
      methodName: SWIPE,
      args: {
        [POINTER_NAME]: [
          { type: POINTER_MOVE, duration: DURATION_1, x: swipeStart.x, y: swipeStart.y },
          { type: POINTER_DOWN, button: BUTTON },
          { type: POINTER_MOVE, duration: DURATION_2, origin: ORIGIN, x: swipeEndLocal.x, y: swipeEndLocal.y },
          { type: POINTER_UP, button: BUTTON }
        ]
      },
    };
    if (xpath) {
      data.xpath = xpath;
    }
    await applyClientMethod(data);
    selectScreenshotInteractionMode(SLIDE);
    clearSwipeAction();
  };

  const handleDoDragAndDrop = async (swipeEndLocal) => {
    const { clearSwipeAction } = props;
    const { POINTER_NAME, DURATION_1, DURATION_2, BUTTON, ORIGIN } = DEFAULT_DRAG_AND_DROP;
    await applyClientMethod({
      methodName: TAP,
      args: {
        [POINTER_NAME]: [
          { type: POINTER_MOVE, duration: DURATION_1, origin: ORIGIN, x: swipeStart.x, y: swipeStart.y },
          { type: POINTER_DOWN, button: BUTTON },
          { type: PAUSE, duration: DURATION_2 },
          { type: POINTER_MOVE, duration: DURATION_2, origin: ORIGIN, x: swipeEndLocal.x, y: swipeEndLocal.y },
          { type: POINTER_UP, button: BUTTON }
        ]
      },
    });
    clearSwipeAction();
  };

  const handleDoZoom = async (swipeEndLocal, swipeEndLocal1) => {
    const { clearSwipeAction } = props;
    const { POINTER_NAME1, POINTER_NAME2, DURATION_1, DURATION_2, BUTTON, ORIGIN } = DEFAULT_ZOOM;
    console.log(`swipeStart.x : ${swipeStart.x}, swipeStart.y : : ${swipeStart.y} , swipeEndLocal1.x : ${swipeEndLocal1.x} , swipeEndLocal1.y : ${swipeEndLocal1.y} , swipeStart1.x : ${swipeStart1.x} , swipeStart1.y : ${swipeStart1.y}, swipeEndLocal.x : ${swipeEndLocal.x} , swipeEndLocal.y : ${swipeEndLocal.y}`);
    if (swipeEndLocal && swipeEndLocal1) {
      await applyClientMethod({
        methodName: SWIPE,
        args: {
          [POINTER_NAME1]: [
            { type: POINTER_MOVE, duration: DURATION_1, x: swipeStart.x, y: swipeStart.y },
            { type: POINTER_DOWN, button: BUTTON },
            { type: POINTER_MOVE, duration: DURATION_2, origin: ORIGIN, x: swipeEndLocal1.x, y: swipeEndLocal1.y },
            { type: POINTER_UP, button: BUTTON }
          ],
          [POINTER_NAME2]: [
            { type: POINTER_MOVE, duration: DURATION_1, x: swipeStart1.x, y: swipeStart1.y },
            { type: POINTER_DOWN, button: BUTTON },
            { type: POINTER_MOVE, duration: DURATION_2, origin: ORIGIN, x: swipeEndLocal.x, y: swipeEndLocal.y },
            { type: POINTER_UP, button: BUTTON }
          ]
        },
      });
      clearSwipeAction();
    }
  };

  const fetchExpectedValue = async (value) => {
    const { POINTER_NAME, DURATION_1, DURATION_2, BUTTON, ORIGIN } = DEFAULT_SWIPE;
    let data = {
      methodName: TAP,
      args: {
        [POINTER_NAME]: [
          { type: POINTER_MOVE, duration: DURATION_1, origin: ORIGIN, x: swipeStart.x, y: swipeStart.y },
          { type: POINTER_DOWN, button: BUTTON },
          { type: PAUSE, duration: DURATION_2 }
        ]
      },
      xpath: value.xpath,
      expected_value: value.expected_value
    };
    await applyClientMethod(data);
  };


  const handleMouseMove = (e) => {
    const { clearSwipeAction } = props;
    const { POINTER_NAME1, POINTER_NAME2, DURATION_1, DURATION_2, BUTTON, ORIGIN } = DEFAULT_ZOOM;
    if (screenshotInteractionMode !== SELECT) {
      const offsetX = e.nativeEvent.offsetX;
      const offsetY = e.nativeEvent.offsetY;
      const newX = offsetX * scaleRatio;
      const newY = offsetY * scaleRatio;
      setX(Math.round(newX));
      setY(Math.round(newY));
  
      if (screenshotInteractionMode === SCRATCH) {
      // console.log("🚀 ~ file: Screenshot.js:299 ~ scratchCard ~ coordinates.length:", coordinates.length)
        setCoordinates((prevCoordinates) => [
          ...prevCoordinates,
          { x: Math.round(newX), y: Math.round(newY) },
        ]);

        if (coordinates.length > 250){
          console.log("🚀 ~ file: Screenshot.js:440 ~ handleMouseMove ~ coordinates.length:", coordinates);
          // setTimeout(() => {
          let data = {
            methodName: SWIPE,
            args: {
              [POINTER_NAME1]: [
                { type: POINTER_MOVE, duration: DURATION_1, x: coordinates[0].x, y: coordinates[0].y },
                { type: POINTER_DOWN, button: BUTTON },
                { type: POINTER_MOVE, duration: DURATION_2, origin: ORIGIN, x: coordinates[80].x, y: coordinates[80].y },
                { type: POINTER_UP, button: BUTTON }
              ],
              [POINTER_NAME2]: [
                { type: POINTER_MOVE, duration: DURATION_1, x: coordinates[80].x, y: coordinates[80].y },
                { type: POINTER_DOWN, button: BUTTON },
                { type: POINTER_MOVE, duration: DURATION_2, origin: ORIGIN, x: coordinates[160].x, y: coordinates[160].y },
                { type: POINTER_UP, button: BUTTON }
              ]
            },
          };
          applyClientMethod(data);
          // }, 500);
          clearSwipeAction();
          setCoordinates([]);
          // selectScreenshotInteractionMode(SELECT);
          setScratch(false);
        }
        
      }
    }
    console.log("🚀 ~ file: Screenshot.js:406 ~ handleMouseMove ~ e:", e);
  };
  


  const handleMouseOut = () => {
    // setCoordinates([])
    setX(null);
    setY(null);
  };
  const handleDragStart = (startPoint) => {
    console.log('Drag start:', startPoint);

  };

  const handleDrop = (event) => {
    // event.preventDefault();
    const { offsetX, offsetY } = event.nativeEvent;
    const dropX = offsetX * scaleRatio;
    const dropY = offsetY * scaleRatio;
    const roundedDropX = Math.round(dropX);
    const roundedDropY = Math.round(dropY);
    console.log('Drop position:', { x: roundedDropX, y: roundedDropY });
    setX(roundedDropX);
    setY(roundedDropY);
    setCoordinates([]);
    setScratch(false);
    setTimeout(async () => {
      await handleDoDragAndDrop({ x: roundedDropX, y: roundedDropY });
    }, 1000);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };


  // retrieve and format gesture for svg drawings
  const getGestureCoordinates = () => {
    const { showGesture } = props;
    const { FILLED, NEW_DASHED, WHOLE, DASHED } = TYPES;
    const defaultTypes = { pointerDown: WHOLE, pointerUp: DASHED };

    if (!showGesture) { return null; }
    return showGesture.map((pointer) => {
      let type = DASHED;
      const temp = [];
      for (const tick of pointer.ticks) {
        if (tick.type === PAUSE) { continue; }
        const len = temp.length;
        type = tick.type !== POINTER_MOVE ? defaultTypes[tick.type] : type;
        if (tick.type === POINTER_MOVE && tick.x !== undefined && tick.y !== undefined) {
          temp.push({ id: tick.id, type, x: tick.x, y: tick.y, color: pointer.color });
        }
        if (len === 0) {
          if (tick.type === POINTER_DOWN) {
            temp.push({ id: tick.id, type: FILLED, x: 0, y: 0, color: pointer.color });
          }
        } else {
          if (tick.type === POINTER_DOWN && temp[len - 1].type === DASHED) {
            temp[len - 1].type = FILLED;
          }
          if (tick.type === POINTER_UP && temp[len - 1].type === WHOLE) {
            temp[len - 1].type = NEW_DASHED;
          }
        }
      }
      return temp;
    });
  };

  // If we're tapping or swiping, show the 'crosshair' cursor style
  const screenshotStyle = {};
  if ([TAP, SWIPE].includes(screenshotInteractionMode) || selectedTick) {
    screenshotStyle.cursor = 'crosshair';
  } else if ([DRAG_AND_DROP].includes(screenshotInteractionMode) || selectedTick) {
    screenshotStyle.cursor = 'move';
  } else {
    screenshotStyle.cursor = 'pointer';
  }
  if ([ZOOMIN, SLIDE_SWIPE].includes(screenshotInteractionMode) || selectedTick) {
    screenshotStyle.cursor = 'crosshair';
  }


  let swipeInstructions = null;
  if (screenshotInteractionMode === SWIPE && (!swipeStart || !swipeEnd)) {
    if (!swipeStart) {
      swipeInstructions = t('Click swipe start point');
    } else if (!swipeEnd) {
      swipeInstructions = t('Click swipe end point');
    }
  }

  const screenSrc = mjpegScreenshotUrl || `data:image/gif;base64,${screenshot}`;
  const screenImg = <img src={screenSrc} id="screenshot" className={styles.screenimage} />;
  const points = getGestureCoordinates();
  // const { screenshotError,
  //     quitSession, showRecord,
  //     visibleCommandMethod,
  //     selectInteractionMode, setVisibleCommandResult,
  //     showKeepAlivePrompt, keepSessionAlive, sourceXML, visibleCommandResult,
  //     isAwaitingMjpegStream, toggleShowCentroids, showCentroids,
  //     isGestureEditorVisible, toggleShowAttributes, isSourceRefreshOn,
  //   } = this.props;
  const { path } = selectedElement;


  // const screenshotStyle1 = {
  //   transform: `scale(${2})`, // Apply the zoom level to the transform style
  // };
  // Show the screenshot and highlighter rects.
  // Show loading indicator if a method call is in progress, unless using MJPEG mode.
  return (
    <Spin size='large' spinning={!!methodCallInProgress && !mjpegScreenshotUrl} style={{display: "flex!important"}}>
      <div className={styles.innerScreenshotContainer}>
        <div id='selectedElementContainer'
          className={`${InspectorStyles['interaction-tab-container']} ${InspectorStyles['element-detail-container']} action-col`}>
          <Card title={<span><TagOutlined /> {t('selectedElement')}</span>}
            className={InspectorStyles['selected-element-card']}>
            {path && <SelectedElement {...props} />}
            {!path && <i>{t('selectElementInSource')}</i>}
          </Card>
        </div>
        <div ref={containerEl}
          style={screenshotStyle}
          onMouseDown={handleScreenshotClick}
          onMouseMove={handleMouseMove}
          onMouseOut={handleMouseOut}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={styles.screenshotBox}>
          {screenshotInteractionMode !== SELECT && <div className={styles.coordinatesContainer}>
            <p>{t('xCoordinate', { x })}</p>
            <p>{t('yCoordinate', { y })}</p>
          </div>}
          {swipeInstructions && <Tooltip open={true} title={swipeInstructions} placement="topLeft">{screenImg}</Tooltip>}
          {!swipeInstructions && screenImg}
          {screenshotInteractionMode === SELECT && containerEl.current &&
            <HighlighterRects {...props} containerEl={containerEl.current} />
          }
          {screenshotInteractionMode === SLIDE && containerEl.current &&
            <HighlighterRects {...props} containerEl={containerEl.current} />
          }
          {screenshotInteractionMode === DOUBLE_TAP && containerEl.current &&
            <HighlighterRects {...props} containerEl={containerEl.current} />
          }
          {screenshotInteractionMode === LONGPRESS && containerEl.current &&
            <HighlighterRects {...props} containerEl={containerEl.current} />
          }
          {screenshotInteractionMode === EXPECTED_VALUE && containerEl.current &&
            <HighlighterRects {...props} containerEl={containerEl.current} />
          }
          {screenshotInteractionMode === FILE_UPLOAD && containerEl.current &&
            <HighlighterRects {...props} containerEl={containerEl.current} />

          }
          {screenshotInteractionMode === SWIPE &&
            <svg className={styles.swipeSvg}>
              {swipeStart && !swipeEnd && <circle
                cx={swipeStart.x / scaleRatio}
                cy={swipeStart.y / scaleRatio}
              />}
              {swipeStart && swipeEnd && <line
                x1={swipeStart.x / scaleRatio}
                y1={swipeStart.y / scaleRatio}
                x2={swipeEnd.x / scaleRatio}
                y2={swipeEnd.y / scaleRatio}
              />}
            </svg>
          }
          {screenshotInteractionMode === SCRATCH && (
            <svg className={styles.swipeSvg}>
              {swipeStart && scratch && coordinates.map((coord, index) => (
                <circle key={index} cx={coord.x / scaleRatio} cy={coord.y / scaleRatio} />
              ))}
            </svg>
          )}


          {screenshotInteractionMode === SLIDE_SWIPE &&
            <svg className={styles.swipeSvg}>
              {swipeStart && !swipeEnd && <circle
                cx={swipeStart.x / scaleRatio}
                cy={swipeStart.y / scaleRatio}
              />}
              {swipeStart && swipeEnd && <line
                x1={swipeStart.x / scaleRatio}
                y1={swipeStart.y / scaleRatio}
                x2={swipeEnd.x / scaleRatio}
                y2={swipeEnd.y / scaleRatio}
              />}
            </svg>
          }

          {screenshotInteractionMode === DRAG_AND_DROP &&
            <svg className={styles.swipeSvg}>
              {swipeStart && !swipeEnd && <circle
                cx={swipeStart.x / scaleRatio}
                cy={swipeStart.y / scaleRatio}
              />}
              {swipeStart && swipeEnd && <line
                x1={swipeStart.x / scaleRatio}
                y1={swipeStart.y / scaleRatio}
                x2={swipeEnd.x / scaleRatio}
                y2={swipeEnd.y / scaleRatio}
              />}
            </svg>
          }

          {screenshotInteractionMode === ZOOMIN &&
            <svg className={styles.swipeSvg}>
              {swipeStart && !swipeEnd && <circle
                cx={swipeStart.x / scaleRatio}
                cy={swipeStart.y / scaleRatio}
              />}
              {swipeStart && swipeEnd && <line
                x1={swipeStart.x / scaleRatio}
                y1={swipeStart.y / scaleRatio}
                x2={swipeEnd.x / scaleRatio}
                y2={swipeEnd.y / scaleRatio}
              />}
              {swipeStart1 && !swipeEnd1 && <circle
                cx={swipeStart1.x / scaleRatio}
                cy={swipeStart1.y / scaleRatio}
              />}
              {swipeStart1 && swipeEnd1 && <line
                x1={swipeStart1.x / scaleRatio}
                y1={swipeStart1.y / scaleRatio}
                x2={swipeEnd1.x / scaleRatio}
                y2={swipeEnd1.y / scaleRatio}
              />}
            </svg>
          }
          {screenshotInteractionMode === TAP &&
            <div className={styles.tapDiv}></div>
          }
          {selectedInteractionMode === INTERACTION_MODE.GESTURES && points &&
            <svg key='gestureSVG' className={styles.gestureSvg}>
              {points.map((pointer) =>
                pointer.map((tick, index) =>
                  <React.Fragment key={tick.id}>
                    {index > 0 && <line
                      className={styles[tick.type]}
                      key={`${tick.id}.line`}
                      x1={pointer[index - 1].x / scaleRatio}
                      y1={pointer[index - 1].y / scaleRatio}
                      x2={tick.x / scaleRatio}
                      y2={tick.y / scaleRatio}
                      style={{ stroke: tick.color }} />
                    }
                    <circle
                      className={styles[`circle-${tick.type}`]}
                      key={`${tick.id}.circle`}
                      cx={tick.x / scaleRatio}
                      cy={tick.y / scaleRatio}
                      style={tick.type === TYPES.FILLED ? { fill: tick.color } : { stroke: tick.color }} />
                  </React.Fragment>
                )
              )}
            </svg>
          }
        </div>
      </div>
      {driver && driver.client.isAndroid && <div className={styles['whole-btn']}>
        <Tooltip title={t('Press Back Button')}>
          <Button id='btnPressHomeButton' className={styles['phone-btn1']}
            icon={<IoChevronBackOutline className={styles['custom-button-icon']}/>}
            onClick={() => applyClientMethod({ methodName: 'pressKeyCode', args: [4]})} />
        </Tooltip>
        <Tooltip title={t('Press Home Button')}>
          <Button id='btnPressHomeButton' className={styles['phone-btn2']}
            icon={<BiCircle className={styles['custom-button-icon']}/>}
            onClick={() => applyClientMethod({ methodName: 'pressKeyCode', args: [3]})} />
        </Tooltip>
        <Tooltip title={t('Press App Switch Button')}>
          <Button id='btnPressHomeButton' className={styles['phone-btn3']}
            icon={<BiSquare className={styles['custom-button-icon']}/>}
            onClick={() => applyClientMethod({ methodName: 'pressKeyCode', args: [187]})} />
        </Tooltip>
      </div>}
    </Spin>
  );
};

export default Screenshot;
