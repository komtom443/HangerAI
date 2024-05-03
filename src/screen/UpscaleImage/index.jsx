import { Box } from '@mui/material';
import CommonStyles from '../../components/CommonStyles';
import SelectImageForm from './components/select-image-form';
import UpscaleImageProvider from './context/upscale-image';
import EditImagePage from './components/edit-image-page';

const UpscaleImagePage = () => {
  return (
    <UpscaleImageProvider>
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
    </UpscaleImageProvider>
  );
};
export default UpscaleImagePage;
