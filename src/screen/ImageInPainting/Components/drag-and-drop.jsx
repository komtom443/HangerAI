import { Box } from '@mui/material';
import CommonStyles from '../../../components/CommonStyles';
import UploadIcon from '../../../assets/icon/upload-icon';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { useImageInPainting } from '../context/image-inpainting';

// eslint-disable-next-line react/prop-types
function DragAndDropImg() {
  const [isDragOver, setIsDragOver] = useState(false);
  const { setCurrentImage, setAddedImage } = useImageInPainting();
  useEffect(() => {
    const dragElement = document.getElementById('file-image-input');
    const hiddenFileInput = document.getElementById('hidden-file-input');

    const clickFunc = () => {
      hiddenFileInput.click();
    };

    const onChange = (event) => {
      const tmpFile = event.target.files[0];
      const validImageTypes = [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/jpg',
      ];
      if (validImageTypes.includes(tmpFile.type.toLowerCase())) {
        setCurrentImage(tmpFile);
        setAddedImage(tmpFile);
      }
    };

    const dragoverFunc = (event) => {
      event.preventDefault();
      setIsDragOver(true);
    };

    const dragleaveFunc = (event) => {
      event.preventDefault();
      setIsDragOver(false);
    };

    const dropFunc = (event) => {
      event.preventDefault();
      if (event.dataTransfer.files[0]) {
        setCurrentImage(event.dataTransfer.files[0]);
        setAddedImage(event.dataTransfer.files[0])
      }
      setIsDragOver(false);
    };

    dragElement.addEventListener('dragover', dragoverFunc);
    dragElement.addEventListener('dragleave', dragleaveFunc);
    dragElement.addEventListener('drop', dropFunc);
    dragElement.addEventListener('click', clickFunc);
    hiddenFileInput.addEventListener('change', onChange);

    return () => {
      dragElement.removeEventListener('dragover', dragoverFunc);
      dragElement.removeEventListener('dragleave', dragleaveFunc);
      dragElement.removeEventListener('drop', dropFunc);
      dragElement.removeEventListener('click', clickFunc);
      hiddenFileInput.removeEventListener('change', onChange);
    };
  }, [setCurrentImage]);

  const theme = useTheme();
  return (
    <Box
      sx={{
        outline: '2px #737277 dashed',
        borderRadius: '.375rem',
        bgcolor: theme.colors.custom.background,
        height: '200px !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        svg: {
          fontSize: '6rem',
        },
      }}
    >
      <input
        accept={'image/*'}
        style={{ display: 'none' }}
        type="file"
        id="hidden-file-input"
      />
      <Box sx={{ width: '400px', textAlign: 'center' }}>
        <CommonStyles.Typography
          sx={{
            color: '#737277',
            fontWeight: '800',
          }}
        >
          <UploadIcon />
        </CommonStyles.Typography>
        <CommonStyles.Typography
          sx={{
            color: '#737277',
            fontWeight: '800',
          }}
        >
          Drag and drop (image) here
        </CommonStyles.Typography>
        <CommonStyles.Typography
          sx={{
            color: '#737277',
            fontWeight: '600',
            span: {
              color: '#d6b6ff',
            },
          }}
        >
          or <span>upload here</span>
        </CommonStyles.Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          transition: '.2s',
          width: '100vw',
          height: '100vh',
          bgcolor: isDragOver ? 'rgba(0,0,0,0.5)' : 'transparent',
          cursor: 'pointer',
        }}
        id={'file-image-input'}
        htmlFor={'hidden-file-input'}
      />
    </Box>
  );
}
export default DragAndDropImg;
