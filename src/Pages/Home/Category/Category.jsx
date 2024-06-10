 
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import category2 from'../../../../src//assets/images/category/dog1.png'
import category1 from'../../../../src//assets/images/category/cat1.jpg'
import category4 from'../../../../src//assets/images/category/fish1.jpg'
import category3 from'../../../../src//assets/images/category/rabbit1.png'
import category5 from'../../../../src//assets/images/category/bird2.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
 

// import required modules
import { Pagination } from 'swiper/modules';


const Category = () => {
    return (
        <div className='overflow-x-auto '>
          <Swiper
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
         
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
       
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center mx-auto h-96' src={category1} alt="" />
        {/* <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Cats</h1> */}
        <button type="button" className="inline-flex absolute top-1/2 left-32 mr-4 items-center  text-center justify-center p-0.5    me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 mb-20">
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 uppercase bg-green-400 dark:bg-gray-900 rounded-md group-hover:bg-white  bg-opacity-0  ">
                         Cats
                        </span>
                    </button>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center h-96 mx-auto' src={category2} alt="" />
        {/* <h1 className='text-white  font-bold text-3xl -mt-12 mx-auto  uppercase text-center  bg-green-400'>Dogs</h1> */}
      
        <button type="button" className="inline-flex absolute top-1/2 left-32 mr-4 items-center  text-center justify-center p-0.5    me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 mb-20">
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 uppercase bg-green-400 dark:bg-gray-900 rounded-md group-hover:bg-white  bg-opacity-0  ">
                         Dogs
                        </span>
                    </button>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center mx-auto h-96' src={category3} alt="" />
        {/* <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Rabbit</h1> */}
        <button type="button" className="inline-flex absolute top-1/2 left-32 mr-4 items-center  text-center justify-center p-0.5    me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 mb-20">
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 uppercase bg-green-400 dark:bg-gray-900 rounded-md group-hover:bg-white  bg-opacity-0  ">
                        Rabbit
                        </span>
                    </button>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center mx-auto h-96' src={category4} alt="" />
        {/* <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Fish</h1> */}
        <button type="button" className="inline-flex absolute top-1/2 left-32 mr-4 items-center  text-center justify-center p-0.5    me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 mb-20">
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 uppercase bg-green-400 dark:bg-gray-900 rounded-md group-hover:bg-white  bg-opacity-0  ">
                        Fish
                        </span>
                    </button>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center mx-auto h-96' src={category1} alt="" />
        {/* <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Cats</h1> */}
        <button type="button" className="inline-flex absolute top-1/2 left-32 mr-4 items-center  text-center justify-center p-0.5    me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 mb-20">
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 uppercase bg-green-400 dark:bg-gray-900 rounded-md group-hover:bg-white  bg-opacity-0  ">
                        Cats
                        </span>
                    </button>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center h-96 mx-auto' src={category2} alt="" />
        {/* <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Dogs</h1> */}
        <button type="button" className="inline-flex absolute top-1/2 left-32 mr-4 items-center  text-center justify-center p-0.5    me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 mb-20">
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 uppercase bg-green-400 dark:bg-gray-900 rounded-md group-hover:bg-white  bg-opacity-0  ">
                         Dogs
                        </span>
                    </button>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center mx-auto h-96' src={category3} alt="" />
        {/* <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Rabbit</h1> */}
        <button type="button" className="inline-flex absolute top-1/2 left-32 mr-4 items-center  text-center justify-center p-0.5    me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 mb-20">
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 uppercase bg-green-400 dark:bg-gray-900 rounded-md group-hover:bg-white  bg-opacity-0  ">
                        Rabbit
                        </span>
                    </button>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center mx-auto h-96' src={category5} alt="" />
        {/* <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Fish</h1> */}
        <button type="button" className="inline-flex absolute top-1/2 left-32 mr-4 items-center  text-center justify-center p-0.5    me-2 overflow-hidden text-xl font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 mb-20">
                        <span className="px-5 py-2.5 transition-all ease-in duration-75 uppercase bg-green-400 dark:bg-gray-900 rounded-md group-hover:bg-white  bg-opacity-0  ">
                         Bird
                        </span>
                    </button>
        </div>
        </SwiperSlide>
        
        
      </Swiper>
        </div>
    );
};

export default Category;