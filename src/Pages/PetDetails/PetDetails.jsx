
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const PetDetails = () => {
    const { id } = useParams(); // Use destructuring to extract id from useParams
    const axiosPublic = useAxiosPublic();

    const { data: petList, isLoading, isError } = useQuery({
        queryKey: ['petList', id],
        queryFn: async () => {
            try {
                const { data } = await axiosPublic.get(`/petList/${id}`);
                return data;
            } catch (error) {
                throw new Error("Failed to fetch pet details");
            }
        },
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error: Failed to fetch pet details</div>;

    if (!petList) return <div>No pet found with the given ID</div>;

    return (


        //     <div className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">

        //      <div className="w-1/3" style={{ overflow: 'hidden' }}>
        //         <img src={petList.image} alt={petList.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        //     </div>


        //     <div className="w-2/3 p-4 md:p-4">
        //         <h1 className="text-xl font-bold text-gray-800 dark:text-white">{petList.name}</h1>


        //         <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"> Category: {petList.category}</p>
        //         <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"> {petList.location}</p>

        //         <div className="flex mt-2 item-center">

        //         </div>

        //         <div className="flex justify-between mt-3 item-center">
        //             <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">Age: {petList.age}</h1>
        //             <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-gray-600">Adopt Now</button>
        //         </div>
        //     </div>
        // </div>

        <section className="bg-white dark:bg-gray-900">


            <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
                <div className="w-full lg:w-1/2">
                    <div className="lg:max-w-lg">
                        <h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">
                            {petList.name}
                        </h1>

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
                    </div>

                    <div className="w-full mt-8 bg-transparent   rounded-md lg:max-w-sm focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-400 focus-within:ring-opacity-40">

                        <button type="button" className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400">Adopt Now</button>
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



















