import { useTheme } from '@emotion/react';
import { useContext } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const UpscaleImageContext = createContext({
  currentZoom: null,
  currentImage: null,
  setCurrentImage: () => {},
  imageHistory: [],
  setImageHistory: () => {},
  addedImage: null,
  setAddedImage: () => {},
  setCurrentZoom: () => {},
  styleAttributes: {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useUpscaleImage = () => {
  return useContext(UpscaleImageContext);
};

// eslint-disable-next-line react/prop-types
export const UpscaleImageProvider = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [imageHistory, setImageHistory] = useState([]);
  const [addedImage, setAddedImage] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(100);
  const [currentZoomStr, setCurrentZoomStr] = useState('100 %');
  const [currentBrushSize, setCurrentBrushSize] = useState(1);
  const [currentTool, setCurrentTool] = useState(0);
  const [canvasHistory, setCanvasHistory] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [submitText, setSubmitText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adjustImageSize, setAdjustImageSize] = useState({
    width: 0,
    height: 0,
  });
  const mode = useTheme().palette.mode;

  const styleAttributes = useMemo(() => {
    console.log('test');
    return mode === 'light'
      ? {
          color: 'black',
          bgcolor: 'gray',
          colorHover: 'gray',
          bgcolorHover: 'black',
        }
      : {
          color: 'gray',
          bgcolor: '#2a2b2f',
          colorHover: 'black',
          bgcolorHover: 'gray',
        };
  }, [mode]);

  useEffect(() => {
    if (addedImage) {
      console.log([addedImage, ...imageHistory]);
      setImageHistory([addedImage, ...imageHistory]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedImage]);

  useEffect(() => {
    const element = document.getElementById('image-wrapper');
    if (!element) {
      return;
    }
    console.log({ width: element.offsetWidth, height: element.offsetHeight });
    setAdjustImageSize({
      width: element.offsetWidth * (currentZoom / 100),
      height: element.offsetHeight * (currentZoom / 100),
    });
  }, [imageSize, currentZoom]);

  useEffect(() => {
    if (!currentImage) {
      return;
    }
    const element = document.getElementById('impainting-element');
    if (element) {
      element.scrollIntoView();
    }
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src =
      typeof currentImage === 'string'
        ? currentImage
        : URL.createObjectURL(currentImage);
  }, [currentImage]);

  const downloadFunc = (inputStr) => {
    console.log('WMINi');
    if (!inputStr) {
      return;
    }
    console.log('WMINi 2');
    const image = document.getElementById('current-picture');
    const canvas = document.createElement('canvas');
    const canvas2 = document.getElementById('canvas');

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);

    const imageList = [
      canvas.toDataURL('image/jpeg'),
      canvas2.toDataURL('image/jpeg'),
    ];
    const img = new Image();
    img.width = image.offsetWidth;
    img.height = image.offsetHeight;
    img.onload = () => {
      let scaleFactorX = image.naturalWidth / img.naturalWidth;
      let scaleFactorY = image.naturalHeight / img.naturalHeight;

      ctx.globalAlpha = 0.4;
      ctx.scale(scaleFactorX, scaleFactorY);
      ctx.drawImage(img, 0, 0);
      imageList.push(canvas.toDataURL('image/jpeg'));
      imageList.forEach((image) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = image;
        downloadLink.download = 'image.jpg';
        downloadLink.click();
      });
    };
    img.src = imageList[1];
    console.log('KOMO');
  };
  return (
    <UpscaleImageContext.Provider
      value={{
        currentImage,
        setCurrentImage,
        imageHistory,
        setImageHistory,
        addedImage,
        setAddedImage,
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
        imageSize,
        setImageSize,
        adjustImageSize,
        setAdjustImageSize,
        submitText,
        setSubmitText,
        isLoading,
        setIsLoading,
        downloadFunc,
      }}
    >
      {children}
    </UpscaleImageContext.Provider>
  );
};
export default UpscaleImageProvider;
