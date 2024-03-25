import { Box, Typography } from '@mui/material';

// eslint-disable-next-line react/prop-types
const LineBox = ({ enable }) => {
  return (
    <Box
      sx={{
        border: `2px solid #737277`,
        ...(enable ? { width: '1rem' } : { flexGrow: 1 }),
      }}
    />
  );
};

// eslint-disable-next-line react/prop-types
function TextDivider({ name, mode = 'left' }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: '4rem' }}>
      <LineBox enable={mode === 'left' || mode === 'center'} />
      <Box
        sx={{
          padding: '1rem',
          '*': { fontSize: '1.25rem !important', color: '#737277', fontWeight: '800 !important' },
        }}
      >
        <Typography>{name}</Typography>
      </Box>
      <LineBox enable={mode === 'right' || mode === 'center'} />
    </Box>
  );
}
export default TextDivider;
