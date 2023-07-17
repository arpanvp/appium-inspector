/* eslint-disable space-in-parens */
/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */

import React, { useRef, useState, useEffect } from 'react';
import HighlighterRects from './HighlighterRects';
import { Spin, Tooltip } from 'antd';
import B from 'bluebird';
import styles from './Inspector.css';
import {
  SCREENSHOT_INTERACTION_MODE, INTERACTION_MODE, POINTER_TYPES,
  DEFAULT_TAP, DEFAULT_SWIPE, DEFAULT_LONGPRESS, DEFAULT_DRAG_AND_DROP, DEFAULT_ZOOM
} from './shared';
import { use } from 'chai';

const { POINTER_UP, POINTER_DOWN, PAUSE, POINTER_MOVE } = POINTER_TYPES;
const { TAP, SELECT, SLIDE, SWIPE, LONGPRESS, DRAG_AND_DROP, DOUBLE_TAP, SLIDE_SWIPE, ZOOMIN, SELECT_LONG, SELECT_DOUBLE, FILE_UPLOAD, SELECT_FILE } = SCREENSHOT_INTERACTION_MODE;
const TYPES = { FILLED: 'filled', NEW_DASHED: 'newDashed', WHOLE: 'whole', DASHED: 'dashed', DRAG: 'drag' };



/**
 * Shows screenshot of running application and divs that highlight the elements' bounding boxes
 */
const Screenshot = (props) => {
  const { screenshot, mjpegScreenshotUrl, methodCallInProgress, selectScreenshotInteractionMode, screenshotInteractionMode, swipeStart, swipeEnd1, swipeStart1, swipeEnd, scaleRatio, selectedTick, selectedInteractionMode, applyClientMethod, t, hoveredElement } = props;
  // console.log("inside the screenshot function props!!!", props);
  const [xLongPress, setXLongPress] = useState(null);
  const [yLongPress, setYLongPress] = useState(null);
  const [element, setElement] = useState({});

  useEffect(() => {
    if (hoveredElement && hoveredElement.attributes && hoveredElement.attributes.bounds) {
      const coordinatesString = hoveredElement.attributes.bounds;
      const coordinatesArray = coordinatesString.match(/\d+/g); // Extract all numbers from the string
      if (coordinatesArray.length >= 4) {
        const x1 = parseInt(coordinatesArray[0], 10);
        const y1 = parseInt(coordinatesArray[1], 10);
        const x2 = parseInt(coordinatesArray[2], 10);
        const y2 = parseInt(coordinatesArray[3], 10);

        // console.log("x1:", x1);
        // console.log("y1:", y1);
        // console.log("x2:", x2);
        // console.log("y2:", y2);
        const centerX = Math.round(x2);
        const centerY = Math.round(y2);
        // setX(centerX);
        // setY(centerY);
        setXLongPress(centerX);
        setYLongPress(centerY);
      }

    }
  }, [hoveredElement]);

  if (hoveredElement) {
    console.log("hoveredElement.attributes.bounds:", hoveredElement.attributes.bounds);
  }


  const containerEl = useRef();
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [isLongPress, setIsLongPress] = useState(false);

  const [coords, setCoords] = useState({});
  // const [dragging, setDragging] = useState(false);
  // const [coords, setCoords] = useState(false);
  // const [state, setState] = useState({});

  // const [zoomLevel, setZoomLevel] = useState(1);
  // const svgRef = useRef(null);

  // function getInitialState() {
  //   return {
  //     x: 0,
  //     y: 0,
  //     scale: 1,
  //   };
  // };

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

  const handleScreenshotClick = async () => {
    const { setSwipeStart, setSwipeEnd, tapTickCoordinates, setSwipeStart1, setSwipeEnd1 } = props;
    const { POINTER_NAME, DURATION_1, DURATION_2, BUTTON } = DEFAULT_TAP;
    // const { LONGPRESS_POINTER_NAME, LONGPRESS_DURATION_1, LONGPRESS_DURATION_2, LONGPRESS_BUTTON } = DEFAULT_LONGPRESS;


    if (screenshotInteractionMode === TAP) {
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
      console.log('xxxxxxxxxx: YYYYYYYYYYY: from the long', xLongPress, yLongPress);
      console.log('xxxxxxxxxx: YYYYYYYYYYY: after the set', x, y);
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
    const { clearSwipeAction } = props;
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
    // if (element.xpath) {
    //   longdata.xpath = element.xpath;
    // }; 
    await applyClientMethod(longdata);
    selectScreenshotInteractionMode(LONGPRESS);
    // clearSwipeAction();
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
  };


  const handleDoSwipeSlide = async (swipeEndLocal) => {
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
    if (element.xpath) {
      data.xpath = element.xpath;
    }
    console.log("🚀 ~ file: Screenshot.js:281 ~ handleDoSwipeSlide ~ data:", data);
    await applyClientMethod(data);
    selectScreenshotInteractionMode(SLIDE);
    clearSwipeAction();
  };

  const handleDoDragAndDrop = async (swipeEndLocal) => {
    const { clearSwipeAction } = props;
    console.log("value of the x and y", swipeEndLocal);
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


  const handleMouseMove = (e) => {
    if (screenshotInteractionMode !== (SELECT)) {
      const offsetX = e.nativeEvent.offsetX;
      const offsetY = e.nativeEvent.offsetY;
      const newX = offsetX * scaleRatio;
      const newY = offsetY * scaleRatio;
      setX(Math.round(newX));
      setY(Math.round(newY));
    }
    // if (screenshotInteractionMode === ZOOMIN) {
    //   if (!dragging) {
    //     return;
    //   }
    //   e.preventDefault();
    //   //Get mouse change differential
    //   let xDiff = coords.x - e.pageX,
    //       yDiff = coords.y - e.pageY;

    //   //Update to our new coordinates
    //   coords.x = e.pageX;
    //   coords.y = e.pageY;
    //   //Adjust our x,y based upon the x/y diff from before
    //   state.x = state.x - xDiff;
    //   state.y = state.y - yDiff;

    //   //Re-render
    //   setState(state);
    // }
  };

  // function isNegative (n) {
  //   return ((n = +n) || 1 / n) < 0;
  // };

  const handleMouseOut = () => {
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

    setTimeout(async () => {
      await handleDoDragAndDrop({ x: roundedDropX, y: roundedDropY });
    }, 1000);

  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };


  // function handleMouseWheel (e) {
  //   if (screenshotInteractionMode === ZOOMIN) {

  //     let ZOOM_STEP = 0.03;

  //     //require the shift key to be pressed to scroll
  //     if (!e.shiftKey) {
  //       return;
  //     }
  //     e.preventDefault();
  //     let direction = isNegative(e.deltaX) && isNegative(e.deltaY) ? 'down' : 'up';

  //     if (direction === 'up') {
  //       state.scale += ZOOM_STEP;
  //     } else {
  //       state.scale -= ZOOM_STEP;
  //     }
  //     state.scale = state.scale < 0 ? 0 : state.scale;
  //     setState(state);
  //   }
  // }

  // retrieve and format gesture for svg drawings
  const getGestureCoordinates = () => {
    const { showGesture } = props;
    const { FILLED, NEW_DASHED, WHOLE, DASHED } = TYPES;
    const defaultTypes = { pointerDown: WHOLE, pointerUp: DASHED };

    if (!showGesture) { return null; }
    return showGesture.map((pointer) => {
      // 'type' is used to keep track of the last pointerup/pointerdown move
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
  const screenImg = <img src={screenSrc} id="screenshot" />;
  const points = getGestureCoordinates();

  // const screenshotStyle1 = {
  //   transform: `scale(${2})`, // Apply the zoom level to the transform style
  // };
  // Show the screenshot and highlighter rects.
  // Show loading indicator if a method call is in progress, unless using MJPEG mode.
  return (
    <Spin size='large' spinning={!!methodCallInProgress && !mjpegScreenshotUrl}>
      <div className={styles.innerScreenshotContainer}>
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
    </Spin>
  );
};

export default Screenshot;
