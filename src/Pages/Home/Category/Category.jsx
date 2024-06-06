 
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import category2 from'../../../../src//assets/images/category/dog1.png'
import category1 from'../../../../src//assets/images/category/cat1.jpg'
import category4 from'../../../../src//assets/images/category/fish1.jpg'
import category3 from'../../../../src//assets/images/category/rabbit1.png'

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
        <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Cats</h1>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center h-96 mx-auto' src={category2} alt="" />
        <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Dogs</h1>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center mx-auto h-96' src={category3} alt="" />
        <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Rabbit</h1>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center mx-auto h-96' src={category4} alt="" />
        <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Fish</h1>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center mx-auto h-96' src={category1} alt="" />
        <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Cats</h1>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center h-96 mx-auto' src={category2} alt="" />
        <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Dogs</h1>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center mx-auto h-96' src={category3} alt="" />
        <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Rabbit</h1>
        </div>
        </SwiperSlide>
       <SwiperSlide><div className='  '>
        <img className='text-center items-center justify-center mx-auto h-96' src={category4} alt="" />
        <h1 className='text-white    font-bold text-3xl -mt-12 mx-auto  uppercase text-center '>Fish</h1>
        </div>
        </SwiperSlide>
        
        
      </Swiper>
        </div>
    );
};

export default Category;