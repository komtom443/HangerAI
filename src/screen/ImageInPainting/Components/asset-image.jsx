import { Box, TextField, useTheme } from '@mui/material';
import TextDivider from '../../../components/common/miscellaneous/TextDivider';
import { useState } from 'react';
import { useEffect } from 'react';
import CommonIcons from '../../../components/CommonIcons';
import QuickSelectImage from './quick-select-image';

const AssetImage = () => {
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    const searchElement = document.getElementById('ImageSearchParam');

    const enterHandle = (e) => {
      if (e.key === 'Enter') {
        console.log(e.target.value);
        searchElement.blur();
      }
    };
    searchElement.addEventListener('keydown', enterHandle);
    return () => {
      searchElement.removeEventListener('keydown', enterHandle);
    };
  }, []);
  const theme = useTheme();
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0}}>
      <TextDivider name={'Select from assets'} />
      <Box sx={{ display: 'flex' }}>
        <TextField
          sx={{
            width: '100%',
            input: { padding: '.5rem' },
            '&:hover, &': {
              fieldset: {
                border: '1px solid #737277 !important',
                borderRight: 'none !important',
                borderTopRightRadius: '0',
                borderBottomRightRadius: '0',
              },
            },
          }}
          id="ImageSearchParam"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Box
          sx={{
            width: '39px',
            height: '39px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
            border: '1px solid #737277',
            transition: '.5s',
            cursor: 'pointer',
            '*': {
              color: '#737277',
            },
            '&:hover': {
              bgcolor: '#737277',
              '*': {
                color: theme.colors.custom.backgroundSecondary,
              },
            },
          }}
        >
          <CommonIcons.Search />
        </Box>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          mt: '.5rem',
          minHeight: 0,
          overflowY: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          paddingTop: '1rem',
          boxSizing: 'border-box',
          gap: '1rem',
          // justifyContent: 'start',
          '::-webkit-scrollbar': {
            width: '12px',
          },
          '::-webkit-scrollbar-thumb': {
            background: '#737277',
            borderRadius: '6px'
          },
        }}
      >
        <QuickSelectImage/>
      </Box>
    </Box>
  );
};
export default AssetImage;
