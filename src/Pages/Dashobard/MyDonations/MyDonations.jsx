 
 
 

import { useMemo, useState } from 'react';
import {  useQuery } from '@tanstack/react-query';
import { Table, Thead, Tbody, Tr, Th, Td, Image, Box, Text } from '@chakra-ui/react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { useTable } from 'react-table';  
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import useAxiosSecure from './../../../hooks/useAxiosSecure';
// import Swal from 'sweetalert2';

const MyDonations = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState({ field: 'serialNumber', direction: 'asc' });  
    const axiosSecure = useAxiosSecure();

 
 

    const fetchPets = async () => {
        if (!user?.email) throw new Error('User email not available');
        const { data } = await axiosPublic.get('/donationByEmail', {
            params: {
                email: user.email,
                limit: 10,
                offset: pageIndex * 10,
                sortBy: sortBy.field,
                sortDirection: sortBy.direction
            },
        });
        return data;
    };

    const { data: petList = [], isLoading, isError, error,refetch } = useQuery({
        queryKey: ['petList', user?.email, pageIndex, sortBy],
        queryFn: fetchPets,
        keepPreviousData: true,
    });

    const columns = useMemo(
        () => [
            { Header: 'Serial Number', accessor: 'serialNumber' },
            { Header: 'Pet Name', accessor: 'name' },
            { Header: 'Donate Amont', accessor: 'price' },
            
            {
                Header: 'Pet Image',
                accessor: 'image',
                Cell: ({ value }) => <Image src={value} alt="Pet" boxSize="50px" />
            },
            
            {
                Header: 'Actions',
                accessor: '_id',
                Cell: ({ value }) => (
                    <div className='px-6 gap-6 '>
                         
                        <button onClick={() => handleAskRefund(value)} className="btn pl-5 ml-0 bg-green-500 border border-red-400 p-3">
                            Ask For Refund
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    // const handleDelete = async () => {
    //     try {
            
    //         // const response = await axiosSecure.delete(`/petList/${selectedPetId}`);
    //         const res = await axiosSecure.delete(`/petList/${selectedPetId}`);
    //         if(res.data.deletedCount > 0){
    //             refetch()
    //             Swal.fire({
    //                 position: "top-end",
    //                 icon: "success",
    //                 title:`${selectedPetId} has been deleted`,
    //                 showConfirmButton: false,
    //                 timer: 1500
    //               });
    //         }
            
    //         closeModal();
    //     } catch (error) {
    //         console.error('Error deleting pet:', error);
    //     }
    // };




    const handleAskRefund = async (id) => {
       
        Swal.fire({
            title: "Are you sure, You want to Refund?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Refund it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/payment/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

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
            data: petList.map((pet, index) => ({ ...pet, serialNumber: index + 1 })),
            initialState: { sortBy: [] },
        }
    );

    return (
        <Box className="p-4 lg:px-10">
            <Text className='text-5xl text-slate-100 text-center font-bold bg-black  uppercase '  as="h2" fontSize="2xl" mb="4">My Donations</Text>
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
            <div className="flex items-center justify-evenly  gap-5  ">
                <button
                    onClick={() => setPageIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
                    hidden={petList.length < 10}
                    className=" btn w-1/2 rounded-md   bg-green-400 p-4"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPageIndex((prevIndex) => petList.length >= 10 ? prevIndex + 1 : prevIndex)}
                    hidden={petList.length < 10}
                    className=" btn w-1/2 rounded-md  bg-green-400 p-4"
                >
                    Next
                </button>
            </div>
 
        </Box>
    );
};

export default MyDonations;
 

 
  