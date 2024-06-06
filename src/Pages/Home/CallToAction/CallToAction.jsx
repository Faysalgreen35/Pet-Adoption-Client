import dog from '../../../assets/images/dog/dog7.png'
import dog1 from '../../../assets/images/dog/dog3.png'

import './call-to-action.css'

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
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
            Adopt Now
          </button>
        </div>
      </div>
    </div>
    );
};

export default CallToAction;