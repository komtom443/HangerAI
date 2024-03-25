import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

const ImageInPaintingContext = createContext({
  currentImage: null,
  setCurrentImage: () => {},
  imageHistory: [],
  setImageHistory: () => {},
  addedImage: null,
  setAddedImage: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useImageInPainting = () => {
  return useContext(ImageInPaintingContext);
};

// eslint-disable-next-line react/prop-types
export const ImageInPaintingProvider = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(null);
  const [imageHistory, setImageHistory] = useState([]);
  const [addedImage, setAddedImage] = useState(null);
  useEffect(() => {
    if(addedImage) {
      setImageHistory([...imageHistory, addedImage]);
    }
  }, [addedImage]);
  return (
    <ImageInPaintingContext.Provider
      value={{
        currentImage,
        setCurrentImage,
        imageHistory,
        setImageHistory,
        addedImage,
        setAddedImage,
      }}
    >
      {children}
    </ImageInPaintingContext.Provider>
  );
};
export default ImageInPaintingProvider;
