  
import { useMemo, useState } from 'react';
import {  useQuery } from '@tanstack/react-query';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text,  } from '@chakra-ui/react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { useTable } from 'react-table';
import { FaEdit,  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import useAxiosSecure from './../../../hooks/useAxiosSecure';
// import Swal from 'sweetalert2';

// import ProgressBar from './ProgressBar';

const ProgressBar = ({ currentDonation, donateAmount }) => {
    const progress = (currentDonation / donateAmount) * 100;

    return (
        // <div className="w-full bg-gray-200 rounded-full h-4">
        //     <div
        //         className="bg-green-500 h-4 rounded-full"
        //         style={{ width: `${progress}%` }}
        //     ></div>
        // </div>
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
        >
            {`${progress.toFixed(2)}%`}
        </div>
    </div>
    );
};


const MyDonationCampaigns = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic(); 
    const [sortBy, setSortBy] = useState({ field: 'serialNumber', direction: 'asc' });
    // const axiosSecure = useAxiosSecure();


   
    const fetchPets = async () => {
        if (!user?.email) throw new Error('User email not available');
        const { data } = await axiosPublic.get('/DonateByEmail', {
            params: {
                email: user.email,
                limit: 10,
                
                sortBy: sortBy.field,
                sortDirection: sortBy.direction
            },
        });
        return data;
    };

    const { data: donate = [], isLoading, isError, error } = useQuery({
        queryKey: ['donate', user?.email, sortBy],
        queryFn: fetchPets,
        keepPreviousData: true,
    });

    const columns = useMemo(
        () => [
            { Header: 'Serial Number', accessor: 'serialNumber' },
            { Header: 'Pet Name', accessor: 'name' },
           
            {
                Header: 'Maximum donation amount',
                accessor: 'donateAmount'
                // Cell: ({ value }) => value ? 'Adopted' : 'Not Adopted'
            },
            {
                Header: 'Donation Progress',
                accessor: 'progress',
                Cell: ({ row }) => {
                    const { donateAmount } = row.original;
                    const currentDonation = row.original.currentDonation || 10; // Default to 0 if not present
                    return <ProgressBar currentDonation={currentDonation} donateAmount={donateAmount} />;
               
                }
            },
            {
                Header: 'Actions',
                accessor: '_id',
                Cell: ({ value }) => (
                    <div className='px-6 gap-6 '>
                        <Link to={`/dashboard/updateDonate/${value}`}>
                            <button className="btn pl-5 ml-0 border border-red-400 p-3 rounded-full">
                                <FaEdit className='text-2xl' />
                            </button>
                        </Link>
                      
                    </div>
                ),
            },
            {
                Header: 'Donation Status',
                accessor: 'ids',
                Cell: () => (
                    <div className='px-6 gap-6 '>
                      
                            <button className="btn pl-5 ml-0 border border-red-400 p-3 bg-green-400 rounded-full">
                                Pause Button
                            </button>
                       
                      
                    </div>
                ),
            },
            {
                Header: 'Donars',
                accessor: 'id',
                Cell: () => (
                    <div className='px-6 gap-6 '>
                        
                            <button className="btn pl-5 ml-0 border border-red-400 p-3 bg-blue-400 rounded-full">
                               View Donators
                            </button>
                        
                      
                    </div>
                ),
            },
        ],
        []
    );

    
    

    const handleSort = (field) => {
        setSortBy((prevSortBy) => ({
            field,
            direction: prevSortBy.field === field && prevSortBy.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
    } = useTable(
        {
            columns,
            data: donate.map((pet, index) => ({ ...pet, serialNumber: index + 1 })),
            initialState: { sortBy: [] },
        }
    );

    return (
        <Box className="p-4 lg:px-10">
            <Text className='text-5xl text-slate-100 text-center font-bold bg-black  ' as="h1" fontSize="5xl" mb="4">My Donation Campagign</Text>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error fetching data: {error.message}</div>}
            <Table variant="simple" {...getTableProps()} className="mb-4">
                <Thead className=''>
                    {headerGroups.map((headerGroup) => (
                        <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th className='p-4  border border-red-400 bg-slate-400 ' key={column.id} onClick={() => handleSort(column.id)} {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    <span className='text-red-900  '>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <Tr key={row.id} {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <Td className='bg-gray-50 border text-center' key={cell.id} {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                ))}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
           

            
        </Box>
    );
};

export default MyDonationCampaigns;
 

 