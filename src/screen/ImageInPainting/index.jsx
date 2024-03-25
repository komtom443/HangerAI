import { Box } from '@mui/material';
import CommonStyles from '../../components/CommonStyles';
import SelectImageForm from './Components/select-image-form';
import ImageInPaintingProvider from './context/image-inpainting';
import EditImagePage from './Components/edit-image-page';

const ImageInPaintingPage = () => {
  return (
    <ImageInPaintingProvider>
      <CommonStyles.Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '3rem',
          paddingBottom: '0',
          boxSizing: 'border-box',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        <Box sx={{width: '100%'}}>
          <SelectImageForm />
          <EditImagePage/>
        </Box>
      </CommonStyles.Box>
    </ImageInPaintingProvider>
  );
};
export default ImageInPaintingPage;
