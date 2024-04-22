import { Box, TextField } from '@mui/material';
import { useImageInPainting } from '../../context/image-inpainting';
import { MdSend } from 'react-icons/md';
import { useState } from 'react';

const PictureForm = () => {
  const { styleAttributes, downloadFunc } = useImageInPainting();
  const [formText, setFormText] = useState('');
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: '1.5rem',
        left: '4.5rem',
        right: '4.5rem',
        height: '3rem',
        display: 'flex',
        justifyContent: 'center',
        // paddingX: '3rem',
        boxSizing: 'border-box',
        borderRadius: '.5rem',
        boxShadow: '5px 5px 5px black',
        '> .toolButton': {
          borderLeft: 'none !important',
          boxShadow: 'none',
        },
        '*': {
          transition: '.2s',
        },
      }}
    >
      <TextField
        placeholder="Type anything you want ..."
        value={formText}
        autoComplete="off"
        sx={{
          '&,input,>div': { height: '100%' },
          input: { padding: '0 .5rem', paddingLeft: '2rem' },
          flexGrow: 1,
          bgcolor: styleAttributes.bgcolor,
          border: `1px solid ${styleAttributes.color}`,
          borderTopLeftRadius: '.5rem',
          borderBottomLeftRadius: '.5rem',
          fieldset: { border: 'none' },
        }}
        onChange={(e) => {
          setFormText(e.target.value);
        }}
      />
      {/* <Box className={'toolButton'} sx={{ borderRadius: '0rem !important' }}>
        min
      </Box> */}
      <Box
        className={'toolButton'}
        sx={{
          borderTopLeftRadius: '0rem !important',
          borderBottomLeftRadius: '0rem !important',
        }}
        onClick={() => {
          console.log("KOM");
          downloadFunc(formText);
        }}
      >
        <MdSend />
      </Box>
    </Box>
  );
};
export default PictureForm;
