 
import aboutImage from '../../../assets/images/dog/dog2.png';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-16  dark:bg-gray-800  dark:text-white   ">
      <div className="container mx-auto px-6 lg:px-20 lg:flex items-center  dark:bg-gray-800  dark:text-white ">
        <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10  dark:bg-gray-800  dark:text-white ">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6  dark:bg-gray-800  dark:text-white ">
            About Us
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed  dark:bg-gray-800  dark:text-white ">
            Welcome to our website! We are dedicated to connecting loving homes with pets in need. Our mission is to reduce the number of homeless pets by facilitating adoptions and raising awareness about the importance of responsible pet ownership.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed  dark:bg-gray-800  dark:text-white ">
            Our platform allows users to browse profiles of pets available for adoption from various shelters and rescues. You can search for pets based on your preferences, such as breed, size, age, and location. Each pet profile includes detailed information to help you make an informed decision.
          </p>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed  dark:bg-gray-800  dark:text-white ">
            In addition to adopting pets, you can also support our mission by contributing to our Donation Campaigns. Your donations help us provide better care for the animals and support the shelters and rescues in their efforts.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed  dark:bg-gray-800  dark:text-white ">
            This website was created out of a passion for helping animals and a belief that every pet deserves a loving home. We aim to make the adoption process easier and more accessible for everyone, and to support the efforts of shelters and rescues in finding forever homes for their animals.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img src={aboutImage} alt="About Us" className="w-full h-auto rounded-lg shadow-xl transform transition-transform hover:scale-105"/>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
