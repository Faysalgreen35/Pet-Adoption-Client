 
import { Dialog } from '@headlessui/react';
import { useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import LoadingSpinner from '../Shared/LoadingSpinner'; 
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import AdoptForm from '../../components/Form/AdoptForm';
import Swal from 'sweetalert2';

const PetDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth() || {};
  const [isOpen, setIsOpen] = useState(false);
  
  const { data: petList, isLoading, isError } = useQuery({
    queryKey: ['petList', id],
    queryFn: async () => {
      try {
        const { data } = await axiosPublic.get(`/petList/${id}`);
        return data;
      } catch (error) {
        throw new Error('Failed to fetch pet details');
      }
    },
  });

  const dialogRef = useRef(null);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: Failed to fetch pet details</div>;
  if (!petList) return <div>No pet found with the given ID</div>;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
 


const handleAdoptSubmit = async (adoptionData) => {
    try {
      const adoptionDatas = await axiosPublic.post('/adoptRequests', adoptionData);
      console.log('Adoption request submitted');
      if (adoptionDatas.data.insertedId) {
         
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${adoptionData?.petName} is added to the  adoption request`,
            showConfirmButton: false,
            timer: 1500
        });
    }
    } catch (error) {
      console.error('Error:', error);
    }
    closeModal();
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2">
          <div className="lg:max-w-lg">
            <h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">{petList.name}</h1>
            <div className="mt-8 space-y-5">
              <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                <span className="mx-2"> Category: {petList.category}</span>
              </p>
              <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                <span className="mx-2"> Age: {petList.age}</span>
              </p>
              <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                <span className="mx-2"> Location: {petList.location}</span>
              </p>
              <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                <span className="mx-2"> Date Posted: {petList.createdDate}</span>
              </p>
            </div>
            <div className="w-full mt-8 bg-transparent lg:max-w-sm">
              <button
                onClick={openModal}
                type="button"
                className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
              >
                Adopt Now
              </button>
              <Dialog open={isOpen} onClose={closeModal}>
                <div ref={dialogRef} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={(e) => e.target === dialogRef.current && closeModal()}>
                  <AdoptForm petList={petList} user={user} onClose={closeModal} onSubmit={handleAdoptSubmit} />
                </div>
              </Dialog>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
          <img className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl" src={petList.image} alt={petList.name} />
        </div>
      </div>
    </section>
  );
};

export default PetDetails;

 