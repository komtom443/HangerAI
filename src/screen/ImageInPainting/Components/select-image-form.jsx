import CommonStyles from '../../../components/CommonStyles';
import AssetImage from './asset-image';
import DragAndDropImg from './drag-and-drop';
import { useTheme } from '@emotion/react';

/**
 *
 * @param {{
 *  currentImage: File | null,
 *  setCurrentImage: () => void
 * }} props
 */

// eslint-disable-next-line react/prop-types
const SelectImageForm = () => {
  const theme = useTheme();
  return (
    <CommonStyles.Box
      sx={{
        bgcolor: theme.colors.custom.backgroundSecondary,
        width: '100%',
        height: '100%',
        border: '1px green solid',
        borderRadius: '1.25rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
      }}
    >
      <DragAndDropImg/>
      <AssetImage/>
    </CommonStyles.Box>
  );
};
export default SelectImageForm;
