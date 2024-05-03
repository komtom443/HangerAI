import { useTheme } from '@emotion/react';
import CommonStyles from '../../../components/CommonStyles';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { useUpscaleImage } from '../context/upscale-image';
import { Fragment } from 'react';
import PictureTool from './picture-tool';
import QuickTool from './quick-tool';

const EditImagePage = () => {
  const theme = useTheme();
  const {
    currentImage,
    styleAttributes,
    currentBrushSize,
    currentTool,
    setCanvasHistory,
    canvasHistory,
    setCurrentTool,
    imageSize,
    adjustImageSize,
  } = useUpscaleImage();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  const url = useMemo(() => {
    if (currentImage) {
      return typeof currentImage === 'string'
        ? currentImage
        : URL.createObjectURL(currentImage);
    }
    return null;
  }, [currentImage]);

  // Function
//   const updateSize = async () => {
//     console.log('Resize');
//     const canvasWrapper = document.getElementById('canvas-wrapper');
//     if (!canvasWrapper) {
//       return;
//     }
//     const { width, height } = canvasWrapper.getBoundingClientRect();
//     setCanvasSize({ width, height });
//   };

//   const canvasMouseDown = (e) => {
//     setIsDrawing(true);
//     const canvas = document.getElementById('canvas');
//     if(!canvas) {
//       return
//     }
//     const { left: p_left, top: p_top } = e.target.getBoundingClientRect();
//     const { left, top } = canvas.getBoundingClientRect();
//     const ctx = canvas.getContext('2d');
//     const X = p_left + e.nativeEvent.offsetX - left;
//     const Y = p_top + e.nativeEvent.offsetY - top;
//     console.log({ ...canvas });
//     if (currentTool === 0) {
//       ctx.beginPath();
//       ctx.arc(X, Y, 10 * currentBrushSize, 0, 2 * Math.PI);
//       ctx.fillStyle = 'lime';
//       ctx.fill();
//     }
//     if(currentTool === 5 || currentTool === 6) {
//       setCurrentTool(4)
//     }
//   };

//   const canvasMouseMove = (e) => {
//     const mouseCtx = e.target.getContext('2d');
//     mouseCtx.clearRect(0, 0, e.target.width, e.target.height);
//     if(currentTool == 4) {
//       return
//     }
//     mouseCtx.beginPath();
//     mouseCtx.arc(
//       e.nativeEvent.offsetX,
//       e.nativeEvent.offsetY,
//       10 * currentBrushSize,
//       0,
//       2 * Math.PI
//     );
//     mouseCtx.fillStyle = 'lime';
//     mouseCtx.fill();
//     if (isDrawing && currentTool !== 4) {
//       if (currentTool !== 0) {
//         setCurrentTool(0);
//       }
//       const canvas = document.getElementById('canvas');
//       const { left: p_left, top: p_top } = e.target.getBoundingClientRect();
//       const { left, top } = canvas.getBoundingClientRect();
//       const ctx = canvas.getContext('2d');
//       const X = p_left + e.nativeEvent.offsetX - left;
//       const Y = p_top + e.nativeEvent.offsetY - top;
//       ctx.beginPath();
//       ctx.arc(X, Y, 10 * currentBrushSize, 0, 2 * Math.PI);
//       ctx.fillStyle = 'lime';
//       ctx.fill();
//     }
//   };

//   const canvasMouseUp = () => {
//     setIsDrawing(false);
//     if (currentTool === 0) {
//       const canvas = document.getElementById('canvas');
//       setCanvasHistory([...canvasHistory, canvas.toDataURL()]);
//     }
//   };
//   const canvasMouseLeave = (e) => {
//     const ctx = e.target.getContext('2d');
//     ctx.clearRect(0, 0, e.target.width, e.target.height);
//     if (isDrawing) {
//       canvasMouseUp();
//     }
//   };
//   useEffect(() => {
//     const onResize = () => {
//       updateSize();
//     };
//     updateSize();
//     const tmp = document.getElementById('impainting-element')
//     tmp.addEventListener('resize', onResize);
//     return () => tmp.removeEventListener('resize', onResize);
//   }, []);

// //   useEffect(() => {
// //     const bgCanvas = document.getElementById('bgcanvas');
// //     const bgCtx = bgCanvas.getContext('2d');
// //     bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
// //     for (let i = 0; i < bgCanvas.width; i += 30) {
// //       for (let j = 0; j < bgCanvas.height; j += 30) {
        
// //       bgCtx.beginPath();
// //       bgCtx.arc(i, j,1 ,0, 2 * Math.PI);
// //       bgCtx.strokeStyle = 'gray';
// //       bgCtx.stroke();
// //       console.log('draws');
// //       }
// //     }
// //   }, [canvasSize]);
  return (
    <CommonStyles.Box
      id={'impainting-element'}
      sx={{
        bgcolor: theme.colors.custom.backgroundSecondary,
        mt: '3rem',
        width: '100%',
        height: '100%',
        borderRadius: '1.25rem',
        flexWrap: 'wrap',
        padding: '2rem',
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        canvas: {
          opacity: 0.45,
        },
        '> *': {
          color: `${styleAttributes.color}`
        },
        // cursor: 'none',
        ' .toolButton': {
          bgcolor: `${styleAttributes.bgcolor}`,
          color: styleAttributes.color,
          border: `1px solid ${styleAttributes.color} !important`,
          // boxShadow: '5px 5px 5px black',
          width: '1.5rem',
          height: '1.5rem',
          cursor: 'pointer',
          borderRadius: '.25rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1rem',
          transition: '.2s',
          '&:active': {
            bgcolor: `${styleAttributes.bgcolorHover} !important`,
            fontWeight: 'bold !important',
            color: `${styleAttributes.colorHover} !important`,
            borderColor: styleAttributes.colorHover,
          },
        },
      }}
    >
      <Box
        id="canvas-wrapper"
        sx={{
          flexGrow: 1,
          height: '100%',
          display: 'flex',
          overflow:'hidden !important',
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          border: `1px solid ${styleAttributes.color}`,
          borderRadius: '1rem',
          mr: '1rem'
        }}
      >
        <Box
          id="image-wrapper"
          sx={{
            width: imageSize.width,
            height: imageSize.height,
            maxHeight: '75%',
            maxWidth: '75%',
            overflow: 'hidden',
            position: 'absolute',
            img: {
              backgroundSize: 'contain',
              width: '100%',
              height: '100%',
              backgroundRepeat: 'no-repeat',
            },
            canvas: {
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0.45,
            },
          }}
        >
          {currentImage && (
            <Fragment>
              <canvas id="canvas" {...adjustImageSize} />
              <img src={`${url}`} id='current-picture' crossOrigin='anonymous'/>
            </Fragment>
          )}
        </Box>
        <QuickTool/>
      </Box>
      <PictureTool/>
    </CommonStyles.Box>
  );
};

export default EditImagePage;
