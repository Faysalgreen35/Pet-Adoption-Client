
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ScaleLoader } from 'react-spinners';

const LoadingSpinner = ({ smallHeight, showSkeleton }) => {
  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      {showSkeleton ? (
        <div className="w-full px-4">
          <Skeleton count={smallHeight ? 1 : 5} height={smallHeight ? 20 : 40} />
        </div>
      ) : (
        <ScaleLoader size={100} color='blue' />
      )}
    </div>
  );
};

export default LoadingSpinner;

 
// import { ScaleLoader } from 'react-spinners'

// const LoadingSpinner = ({ smallHeight }) => {
//   return (
//     <div
//       className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
//       flex 
//       flex-col 
//       justify-center 
//       items-center `}
//     >
//       <ScaleLoader size={100} color='red' />
//     </div>
//   )
// }
 

// export default LoadingSpinner
