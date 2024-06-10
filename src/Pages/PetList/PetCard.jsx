import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  return (
    <>
      {!pet.adopted ? (
        <div className="flex max-w-xl overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800">
          <div className="w-1/3" style={{ overflow: 'hidden' }}>
            <img src={pet.image} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="w-2/3 p-4 md:p-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">{pet.name}</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Category: {pet.category}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{pet.location}</p>
            <div className="flex justify-between mt-3 item-center">
              <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">Age: {pet.age}</h1>
              <Link to={`/petList/${pet?._id}`} className="col-span-1 cursor-pointer group">
                <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default PetCard;

// import { Link } from "react-router-dom";

// const PetCard = ({ pet }) => {
//   return (

    

//     <div className="flex max-w-xl overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-gray-800">

//       <div className="w-1/3" style={{ overflow: 'hidden' }}>
//         <img src={pet.image} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//       </div>


//       <div className="w-2/3 p-4 md:p-4">
//         <h1 className="text-xl font-bold text-gray-800 dark:text-white">{pet.name}</h1>


//         <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"> Category: {pet.category}</p>
//         <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"> {pet.location}</p>

//         <div className="flex mt-2 item-center">

//         </div>

//         <div className="flex justify-between mt-3 item-center">
//           <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">Age: {pet.age}</h1>

//           <Link to={`/petList/${pet?._id}`} className='col-span-1 cursor-pointer group'>
//             <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">View Details</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PetCard;
