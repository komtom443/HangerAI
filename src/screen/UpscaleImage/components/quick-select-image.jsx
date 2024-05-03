import { Fragment } from 'react';
import { useUpscaleImage } from '../context/upscale-image';
import QuickSelectImageBox from './quick-select-image-box';
// import { useMemo } from 'react';

const QuickSelectImage = () => {
  const { imageHistory } = useUpscaleImage();
//   const fakeAssets = useMemo(() => {
//     const tmp = [];
//     for (let i = 0; i < 10; i++) {
//       tmp.push(
//         `https://placehold.co/420x280/${i % 2 ? 'red' : 'blue'}/white?text=${i}`
//       );
//     }
//     return tmp;
//   }, []);
  console.log('MKI');
  return (
    <Fragment>
      {imageHistory.map((img, index) => {
        console.log(URL.createObjectURL(img));
        return (
          <Fragment key={`1_${index}`}>
            <QuickSelectImageBox file={img} isUpload={true} />
          </Fragment>
        );
      })}

      {/* {fakeAssets.map((img, index) => {
        return (
          <Fragment key={`2_${index}`}>
            <QuickSelectImageBox file={img} isAssets={true} />
          </Fragment>
        );
      })} */}
    </Fragment>
  );
};
export default QuickSelectImage;
