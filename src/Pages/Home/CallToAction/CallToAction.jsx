import dog from '../../../assets/images/dog/dog7.png'
import dog1 from '../../../assets/images/dog/dog3.png'

import './call-to-action.css'
import { Link } from 'react-router-dom';

const CallToAction = () => {
    return (
       
        <div className="bg-gray-100 py-12 min-h-screen  dark:bg-gray-800  dark:text-white ">
      <div className="container mx-auto px-4 lg:flex lg:flex-row-reverse items-center">
        <div className="relative lg:w-1/2 flex justify-center">
          <img src={dog1} className="max-w-sm w-full translate-x-20   rounded-lg shadow-2xl" alt="Happy Dog"/>
          <img src={dog} className="max-w-sm w-1/2 rounded-lg shadow-2xl absolute left-5 top-1/2 border-8 border-white transform -translate-y-1/2" alt="Happy Dog"/>
        </div>
        <div className="lg:w-1/2 space-y-5 p-4">
          <h4 className="text-red-500 text-3xl font-bold">Call To Action</h4>
          <h1 className="text-5xl font-bold">Adopt Happiness</h1>
          <p className="py-6">
            Bring home more than just a pet; bring home happiness, laughter, and endless love. Adopt today and start a beautiful journey of mutual affection and joy.
          </p>
          <p className="py-6">
            Every pet deserves a loving home. By adopting, you not only give a pet a second chance at life but also enrich your own life with their unconditional love and companionship. Join us in our mission to provide forever homes for these wonderful animals. Your new best friend is waiting for you!
          </p>
         
         <Link to='pets'>
         <button type="button" className="inline-flex  mr-4 items-center  text-center justify-center p-0.5    me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 mb-20">
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 uppercase bg-green-400 dark:bg-gray-900 rounded-md group-hover:bg-white  bg-opacity-0  ">
                        Adopt Now
                        </span>
                    </button>
         </Link>
          {/* <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
            Adopt Now
          </button> */}
        </div>
      </div>
    </div>
    );
};

export default CallToAction;