import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useState } from 'react';
import { useUpscaleImage } from '../context/upscale-image';
import { CiLock } from 'react-icons/ci';
import { useEffect } from 'react';

function PictureTool() {
  const [learnMoreClick, setLearnMoreClick] = useState(false);
  const [selectMode, setSelectMode] = useState('1');
  const handleChange = (event) => {
    setSelectMode(event.target.value);
  };
  const { imageSize, styleAttributes } = useUpscaleImage();
  useEffect(() => {
    const max = Math.max(imageSize.width, imageSize.height);
    // if (max < 640) {
    //   setSelectMode(0);
    //   return;
    // }
    if (max < 854) {
      setSelectMode(1);
      return;
    }
    if (max < 1280) {
      setSelectMode(2);
      return;
    }
    if (max < 1920) {
      setSelectMode(3);
      return;
    }
  }, [imageSize]);
  return (
    <Box
      sx={{
        width: '300px',
        height: '100%',
        // bgcolor: 'red',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          '> *': {
            border: `1px solid ${styleAttributes.color}`,
            width: '100%',
            borderRadius: '8px',
            padding: '.5rem',
          },
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography>Upscale Image</Typography>
            <Box flexGrow={1} />
            <Button
              sx={{
                '&, &:hover': {
                  color: 'white',
                  bgcolor: 'gray',
                  textTransform: 'none',
                },
              }}
              onClick={() => {
                setLearnMoreClick(!learnMoreClick);
              }}
            >
              {learnMoreClick ? 'Got it' : 'Learn more'}
            </Button>
          </Box>
          <Typography mt={'.5rem'}>
            {learnMoreClick ? (
              'Convert images from low-resolution to high-resolution.'
            ) : (
              <Fragment />
            )}
          </Typography>
        </Box>
        <Box mt={'.5rem'}>
          <Box sx={{ display: 'flex' }}>
            <Typography>Scale</Typography>
            <Box flexGrow={1} />
            <Typography>{`Input Size: ${imageSize.width} x ${imageSize.height}`}</Typography>
          </Box>
          <Select
            sx={{
              width: '100%',
              input: {
                padding: '.5rem',
              },
              marginY: '.5rem',
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectMode}
            onChange={handleChange}
          >
            {/* <MenuItem value={0}>640 x 360 (360p)</MenuItem> */}
            <MenuItem value={1}>854 x 480 (480p)</MenuItem>
            <MenuItem value={2}>1280 x 720 (720p)</MenuItem>
            <MenuItem value={3}>1920 x 1080 (1080p)</MenuItem>
            <MenuItem value={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>2560 x 1440 (2K)</Typography>
              <Box flexGrow={1} />
              <CiLock />
            </MenuItem>
            <MenuItem value={5} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>3840 x 2160 (4K)</Typography>
              <Box flexGrow={1} />
              <CiLock />
            </MenuItem>
          </Select>
          <Button
            sx={{
              width: '100%',
              '&, &:hover': {
                color: 'white',
                bgcolor: 'rgb(105, 4, 233)',
                textTransform: 'none',
              },
            }}
          >
            Process
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default PictureTool;
