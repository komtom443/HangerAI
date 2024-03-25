import { useTheme } from '@emotion/react';
import CommonStyles from '../../../components/CommonStyles';
import { Box } from '@mui/material';

const EditImagePage = () => {
  const theme = useTheme();
  return (
    <CommonStyles.Box
      sx={{
        bgcolor: theme.colors.custom.backgroundSecondary,
        mt: '3rem',
        width: '100%',
        height: '100%',
        border: '1px green solid',
        borderRadius: '1.25rem',
        flexWrap: 'wrap',
        padding: '2rem',
        display: 'flex',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          aspectRatio: '1/1',
          width: 'auto',
          height: '100%',
          bgcolor: 'red',
        }}
      ></Box>
      <Box
        sx={{
          width: '100px',
          bgcolor: 'blue',
          '@media (min-width: 880px)': {
            ml: '1rem !important'
          },
        }}
      ></Box>
    </CommonStyles.Box>
  );
};

export default EditImagePage;
