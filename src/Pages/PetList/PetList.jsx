import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../Shared/LoadingSpinner';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import PetCard from './PetCard';
import SearchBar from './SearchBar'; // Import the SearchBar component
import { Helmet } from 'react-helmet-async';

const PetList = () => {
  const axiosPublic = useAxiosPublic();
  const { ref, inView } = useInView();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');

  const fetchPetLists = async ({ pageParam = 0 }) => {
    const { data } = await axiosPublic.get(`/petLists?offset=${pageParam}&limit=3&name=${searchQuery}&category=${category}`);
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
    queryKey: ['petLists', searchQuery, category],
    queryFn: fetchPetLists,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 3 || lastPage.length === 2 || lastPage.length === 1) { // Continue fetching if lastPage has 3 items
        return allPages.length * 1 || allPages.length * 2 || allPages.length * 3; // Calculate the correct next offset
      } else {
        return undefined; // Stop fetching when there are no more items
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [searchQuery, category, refetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <Helmet>
        <title>Pet Adoption | PetList</title>

      </Helmet>

      <SearchBar // Render the SearchBar component
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        category={category}
        setCategory={setCategory}
      />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 py-40' >
        {data.pages.map((page) =>
          page.map((pet) => <PetCard key={pet._id} pet={pet} />)
        )}
      </div>
      <div ref={ref}>
        {isFetchingNextPage && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default PetList;
