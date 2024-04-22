import { Box, Collapse, Slider, TextField } from '@mui/material';
import { useImageInPainting } from '../../context/image-inpainting';
import { VscZoomIn, VscMove, VscZoomOut } from 'react-icons/vsc';
import {
  PiPaintBrushHouseholdThin,
  PiEraserThin,
  PiWaveSineBold,
} from 'react-icons/pi';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useMemo } from 'react';
import { Fragment } from 'react';

const PictureTool = () => {
  const {
    currentZoom,
    setCurrentZoom,
    styleAttributes,
    currentZoomStr,
    setCurrentZoomStr,
    currentBrushSize,
    setCurrentBrushSize,
    currentTool,
    setCurrentTool,
    canvasHistory,
    setCanvasHistory,
  } = useImageInPainting();

  const toolButtons = useMemo(
    () => [
      {
        section: 0,
        icon: <PiPaintBrushHouseholdThin />,
        onClick: () => {},
      },
      {
        section: 0,
        icon: <PiEraserThin />,
        onClick: () => {
          const canvas = document.getElementById('canvas');
          if (!canvas) {
            return;
          }
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        isOntime: true
      },
      {
        section: 0,
        icon: <PiWaveSineBold />,
        onClick: () => {},
      },
      {
        section: 0,
        icon: <BsArrowReturnLeft />,
        onClick: async () => {
          const canvas = document.getElementById('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          if(canvasHistory.length === 1) {
            setCanvasHistory([])
            ctx.clearRect(0,0,canvas.width,canvas.height)
            return
          }
          img.onload = () => {
            ctx.clearRect(0,0,canvas.width,canvas.height)
            ctx.drawImage(img, 0, 0);
            console.log('test');
            setCanvasHistory((canvas) => canvas.slice(0, canvas.length - 1));
          };
          img.src = canvasHistory[canvasHistory.length - 2]
        },
        isOntime: true
      },
      {
        section: 1,
        icon: <VscMove />,
        onClick: () => {},
      },
      {
        section: 1,
        icon: <VscZoomIn />,
        onClick: () => {
          if(currentZoom + 10 > 900) {
            setCurrentZoom(900)
            setCurrentZoomStr('900 %')
            return
          }
          setCurrentZoom(currentZoom + 10)
          setCurrentZoomStr(`${currentZoom + 10} %`)
        },
      },
      {
        section: 1,
        icon: <VscZoomOut />,
        onClick: () => {
          if(currentZoom - 10 < 10) {
            setCurrentZoom(10)
            setCurrentZoomStr('10 %')
            return
          }
          setCurrentZoom(currentZoom - 10)
          setCurrentZoomStr(`${currentZoom - 10} %`)
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canvasHistory, currentZoom]
  );
  return (
    <Fragment>
      <Collapse
        in={currentTool === 5 || currentTool === 6}
        orientation="horizontal"
        sx={{
          position: 'absolute',
          top: `${3 + currentTool * 3.5 + 0.5}rem`,
          left: '4rem',
          display: currentTool === 5 || currentTool === 6 ? 'block' : 'none',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '3rem',
            width: '5.5rem',
          }}
        >
          <Box
            sx={{
              height: '2.5rem',
              bgcolor: styleAttributes.bgcolorHover,
              padding: '.25rem',
              paddingLeft: '1rem',
              boxSizing: 'border-box',
              borderTopRightRadius: '.375rem',
              borderBottomRightRadius: '.375rem',
            }}
          >
            <TextField
              autoComplete={false}
              sx={{
                input: {
                  padding: '.25rem',
                  textAlign: 'right',
                  color: styleAttributes.colorHover,
                },
                '&:hover, &': {
                  fieldset: {
                    border: 'none !important',
                    borderRight: 'none !important',
                    borderTopRightRadius: '0',
                    borderBottomRightRadius: '0',
                  },
                },
              }}
              value={currentZoomStr}
              onChange={(e) => {
                let tmp = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                tmp = tmp > 900 ? 900 : tmp;
                setCurrentZoom(isNaN(tmp) ? 0 : tmp);
                setCurrentZoomStr(`${isNaN(tmp) ? 0 : tmp} %`);
              }}
              onBlur={() => {
                setCurrentTool(4)
              }}
            />
          </Box>
        </Box>
      </Collapse>
      <Collapse
        in={currentTool === 2}
        orientation="horizontal"
        sx={{
          position: 'absolute',
          left: '3.5rem',
          top: `${currentTool * 3.5 + 1.5}rem`,
          display: currentTool === 2 ? 'block' : 'none',
        }}
      >
        <Box
          sx={{
            height: '3rem',
            width: '10rem',
            '&,*': {
              display: 'flex',
              alignItems: 'center',
            },
            '> *': {
              bgcolor: styleAttributes.bgcolorHover,
              width: '9.5rem',
              height: '2.0rem',
              paddingX: '1rem',
              paddingLeft: '2rem',
              boxSizing: 'border-box',
              borderTopRightRadius: '.375rem',
              borderBottomRightRadius: '.375rem',
            },
          }}
        >
          <Box>
            <Slider
              min={0.1}
              max={10}
              step={0.1}
              aria-label="Disabled slider"
              sx={{ color: styleAttributes.colorHover }}
              value={currentBrushSize}
              onChange={(e, number) => setCurrentBrushSize(number)}
            />
          </Box>
        </Box>
      </Collapse>
      {toolButtons.map((toolButton, index) => (
        <Box
          key={`toolButton-${index}`}
          className={'toolButton'}
          sx={{
            position: 'absolute',
            left: '1.5rem',
            top: `${toolButton.section * 2 + index * 3.5 + 1.5}rem`,
            ...(index === currentTool
              ? {
                  bgcolor: `${styleAttributes.bgcolorHover} !important`,
                  fontWeight: 'bold !important',
                  color: `${styleAttributes.colorHover} !important`,
                  borderColor: styleAttributes.colorHover,
                }
              : {}),
          }}
          onClick={() => {
            if(toolButton.isOntime) {
              toolButton.onClick();
              return  
            }
            if(currentTool === index && currentTool < 4) {
              setCurrentTool(0)
              return
            }
            setCurrentTool(index);
            toolButton.onClick();
            console.log(index);
          }}
        >
          {toolButton.icon}
        </Box>
      ))}
    </Fragment>
  );
};
export default PictureTool;
