import { Box } from '@mui/material';
import { useMemo } from 'react';
import { Fragment } from 'react';
import { PiDownloadSimple, PiFolderDuotone  } from "react-icons/pi";
import { GrNext,GrPrevious  } from "react-icons/gr";

const QuickTool = () => {
  const toolButtons = useMemo(
    () => [
      {
        section: 0,
        icon: <PiDownloadSimple />,
        onClick: () => {},
      },
      {
        section: 0,
        icon: <PiFolderDuotone />,
        onClick: () => {},
      },
      {
        section: 1,
        icon: <GrNext/>
      },
      {
        section: 1,
        icon: <GrPrevious/>
      }
    ],
    []
  );
  return (
    <Fragment>
      {toolButtons.map((toolButton, index) => (
        <Box
          className="toolButton"
          key={`saveButton_${index}`}
          sx={{ position: 'absolute', top: '1rem', right: `${toolButton.section * 1.5 +2.25*index+1}rem` }}
        >
          {toolButton.icon}
        </Box>
      ))}
    </Fragment>
  );
};
export default QuickTool;
