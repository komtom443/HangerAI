import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useMemo } from 'react';
import { AiFillBook } from 'react-icons/ai';
import { GrDocumentUpload } from 'react-icons/gr';
import { useImageInPainting } from '../context/image-inpainting';

// eslint-disable-next-line react/prop-types
const QuickSelectImageBox = ({ file, isAssets, isUpload }) => {
  const { setCurrentImage } = useImageInPainting();
  const url = useMemo(() => {
    if(typeof file === 'string') {
      return file
    }
    return URL.createObjectURL(file);
  }, []);
  const [isClicked, setIsClicked] = useState(false);
  const theme = useTheme();
  const mode = theme.palette.mode;
  return (
    <Box
      sx={{
        width: '200px',
        height: '150px',
        background: `url(${url})`,
        backgroundSize: 'cover',
        position: 'relative',
        borderRadius: '1rem',
        border: '3px solid #737277',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: '.2s',
        ...(isClicked ? { border: `3px solid #6904e9` } : {}),
      }}
      onClick={() => setIsClicked(!isClicked)}
      onDoubleClick={() => setCurrentImage(file)}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
          height: '2rem',
          width: `${(Boolean(isAssets) + Boolean(isUpload)) * 2}rem`,
          borderBottomLeftRadius: '.5rem',
          overflow: 'hidden',
          '> *': {
            height: '2rem',
            width: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            ...(isClicked
              ? { bgcolor: '#6904e9' }
              : {
                  backgroundImage: 'linear-gradient(#737277 1%,#6904e9)',
                  '&:last-of-type': {
                    borderTopRightRadius: '.5rem',
                    boxShadow: '-5px 2px 5px inset #737277 !important',
                  },
                }),
          },
        }}
      >
        {isUpload ? (
          <Box>
            <GrDocumentUpload />
          </Box>
        ) : (
          <></>
        )}
        {isAssets ? (
          <Box>
            <AiFillBook />
          </Box>
        ) : (
          <></>
        )}
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          boxShadow: '0 0 5px inset white',
          borderTopLeftRadius: '.8rem',
          borderTopRightRadius: '.8rem',
        }}
      />
      <Box
        sx={{
          bottom: 0,
          height: '50px',
          padding: '.5rem',
          boxSizing: 'border-box',
          borderTop: '3px solid #737277',
          ...(mode === 'light'
            ? { bgcolor: 'white' }
            : { bgcolor: theme.colors.custom.backgroundSecondary }),
          '&, *': {
            transition: '.5s !important',
          },
        }}
      >
        <Typography
          sx={{
            fontSize: '.75rem',
            fontWeight: 800,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          {
            // eslint-disable-next-line react/prop-types
            file?.name ?? ''
          }
        </Typography>
      </Box>
    </Box>
  );
};
export default QuickSelectImageBox;
