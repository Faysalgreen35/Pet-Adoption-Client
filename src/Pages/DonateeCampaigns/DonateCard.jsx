import { Link } from "react-router-dom";



const DonateCard = ({ pet }) => {


  return (
    <div className="flex max-w-md overflow-hidden lg:w-full md:h[1500px] bg-white rounded-lg shadow-2xl  dark:bg-gray-800"> 
      <div className="lg:w-1/3" style={{ overflow: 'hidden' }}>
        <img src={pet.image} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>


      <div className="w-2/3 p-4 md:p-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">{pet.name}</h1>


        <div className=" mt-2 item-center">
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-sm">Maximum donation amount: {pet.maximumDonationAmount}</h1>
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-sm">Donate amount: {pet.donatedAmount||30}</h1>
        </div>

        <div className="flex justify-between mt-3 item-center">


          <Link to={`/donateDetails/${pet?._id}`} className='col-span-1 cursor-pointer group'>
            <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonateCard;