
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const DonateDetails = () => {
    const { id } = useParams(); // Use destructuring to extract id from useParams
    const axiosPublic = useAxiosPublic();

    const { data: donate, isLoading, isError } = useQuery({
        queryKey: ['donate', id],
        queryFn: async () => {
            try {
                const { data } = await axiosPublic.get(`/donate/${id}`);
                return data;
            } catch (error) {
                throw new Error("Failed to fetch pet details");
            }
        },
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <div>Error: Failed to fetch pet details</div>;

    if (!donate) return <div>No pet found with the given ID</div>;
    
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">


                <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="lg:max-w-lg">
                            <h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">
                                {donate.name}
                            </h1>

                            <div className="mt-8 space-y-5">


                                <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">

                                    <span className="mx-2"> Category: {donate.category}</span>
                                </p>

                                <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">

                                    <span className="mx-2"> Age: {donate.age}</span>
                                </p>
                                <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">

                                    <span className="mx-2"> Location: {donate.location}</span>
                                </p>
                                <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">

                                    <span className="mx-2"> Date Posted: {donate.createdDate}</span>
                                </p>


                            </div>
                        </div>

                        <div className="w-full mt-8 bg-transparent   rounded-md lg:max-w-sm focus-within:border-blue-400 focus-within:ring focus-within:ring-blue-300 dark:focus-within:border-blue-400 focus-within:ring-opacity-40">

                            <button type="button" className="h-10 px-4 py-2 m-1 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400">Adopt Now</button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
                        <img className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl" src={donate.image} alt={donate.name} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DonateDetails;