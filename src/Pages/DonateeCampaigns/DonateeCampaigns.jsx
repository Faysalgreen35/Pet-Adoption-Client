import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../Shared/LoadingSpinner';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import DonateCard from './DonateCard';
import { Helmet } from 'react-helmet-async';
// import useAxiosPublic from './../../hooks/useAxiosPublic'; 
// import PetCard from './PetCard';
// import SearchBar from './SearchBar'; // Import the SearchBar component

const DonateeCampaigns = () => {


  const axiosPublic = useAxiosPublic();
  const { ref, inView } = useInView();
  //   const [searchQuery, setSearchQuery] = useState('');
  //   const [category, setCategory] = useState('');

  const donateCampagign = async ({ pageParam = 0 }) => {
    // const { data } = await axiosPublic.get(`/donate?offset=${pageParam}&limit=3`);
    const { data } = await axiosPublic.get(`/donate?offset=${pageParam}&limit=3`);
    return data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['donate'],
    queryFn: donateCampagign,
    getNextPageParam: (lastPage, allPages) => {

      if (lastPage.length > 0) {
        return allPages.length * 3;
      }
      // Calculate the next offset
      // if (lastPage.length === 3||lastPage.length === 2||lastPage.length === 1) {  
      //   return allPages.length * 1*1||allPages.length * 2*2||allPages.length * 3*1;  
      // }
      else {
        return undefined; // Stop fetching when there are no more items
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
        <Helmet>
                <title>Pet Adoption | DonateeCampaigns</title>

            </Helmet>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 py-24 '>
        {data.pages.map((page) =>
          page.map((pet) => <DonateCard key={pet._id} pet={pet} />)
        )}
      </div>
      <div ref={ref}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>

    </div>
  );
};

export default DonateeCampaigns;