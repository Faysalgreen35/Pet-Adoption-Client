// import dog1 from'../../../assets/images/dog/dog1.png'
// import dog2 from'../../../assets/images/dog/dog2.png'
// import dog3 from'../../../assets/images/dog/dog3.png'
// import logo from'../../../assets/images/logo/logo.jpeg'

import './Banner.css'

const Banner = () => {
    return (
        <div className="container banner border-t-4 border-blue-500 px-6 py-16 mx-auto">
            <div className="flex flex-col   items-center justify-center mx-auto bg-slate-600 bg-opacity-50 ">
                <h1 className="text-4xl font-bold text-center text-white mb-8 mt-20">
                Join Us in Making a Difference, One Paw at a Time
                </h1>
                <div className="relative top-1/2">
                    <button type="button" className="inline-flex items-center justify-center p-0.5   me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 mb-20">
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          DONATE NOW
                        </span>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Banner;