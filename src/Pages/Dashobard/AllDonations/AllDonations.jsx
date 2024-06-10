 
 

import { useMemo, useState, useRef } from 'react';
import {  useQuery } from '@tanstack/react-query';
import { Table, Thead, Tbody, Tr, Th, Td, Image, Box, Text } from '@chakra-ui/react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { useTable } from 'react-table';
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { BsFillMicMuteFill } from "react-icons/bs";

const AllDonations = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [pageIndex, setPageIndex] = useState(0);
    const [sortBy, setSortBy] = useState({ field: 'serialNumber', direction: 'asc' });
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPetId, setSelectedPetId] = useState(null);
    const dialogRef = useRef(null);
    const axiosSecure = useAxiosSecure();


    const openModal = (id) => {
        setSelectedPetId(id);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedPetId(null);
    };

    const fetchPets = async () => {
        if (!user?.email) throw new Error('User email not available');
        const { data } = await axiosPublic.get('/all-donate', {
            params: {
               
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
            {
                Header: 'Maximum donation amount',
                accessor: 'maximumDonationAmount'
                // Cell: ({ value }) => value ? 'Adopted' : 'Not Adopted'
            },
            {
                Header: 'Pet Image',
                accessor: 'image',
                Cell: ({ value }) => <Image src={value} alt="Pet" boxSize="50px" />
            },
            {
                Header: 'Donate Status',
                accessor: 'adopted',
                Cell: ({ value }) => value ? 'Paused' : 'Not Paused'
            },
            {
                Header: 'Actions',
                accessor: '_id',
                Cell: ({ value }) => (
                    <div className='px-6 gap-6 flex '>
                        <Link to={`/dashboard/updateDonate/${value}`}>
                            <button className="btn pl-5 ml-0 border-4 border-red-400 p-3">
                                <FaEdit className='text-2xl' />
                            </button>
                        </Link>
                        <button onClick={() => openModal(value)} className="btn pl-5 ml-0 border-4 border-red-400 p-3">
                            <FaTrash className='text-2xl' />
                        </button>
                        <button onClick={() => handlePause(value)} className="btn pl-5 ml-0 border-4 border-red-400 p-3">
                            <BsFillMicMuteFill className='text-2xl' />
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const handlePause = async (id) => {
       
        Swal.fire({
            title: "Are you sure, You want to Pause Donate?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Pause it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // const res = await axiosSecure.put(`/petList/${id}`, { adopted: true });
                axiosSecure.put(`/donate/${id}`, { adopted: true })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Paused Campaign!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };


    const handleDelete = async () => {
        try {
            
            // const response = await axiosSecure.delete(`/petList/${selectedPetId}`);
            const res = await axiosSecure.delete(`/donate/${selectedPetId}`);
            if(res.data.deletedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title:`${selectedPetId} has been deleted`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            
            closeModal();
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    // const handleAdopt = async (id) => {
    //     try {
    //         const res = await axiosSecure.put(`/petList/${id}`, { adopted: true });
    //         if (res.data.modifiedCount > 0) {
    //             refetch();
    //             Swal.fire({
    //                 position: "top-end",
    //                 icon: "success",
    //                 title: `${id} has been adopted`,
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error adopting pet:', error);
    //     }
    // };

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
            <Text className='text-5xl text-slate-100 text-center font-bold bg-black  '  as="h2" fontSize="2xl" mb="4"> All Donation Campaigns</Text>
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

            {/* Modal Dialog */}
            <Dialog open={isOpen} onClose={closeModal}>
                <div ref={dialogRef} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={(e) => e.target === dialogRef.current && closeModal()}>
                    <div className="bg-white p-6 rounded" onClick={(e) => e.stopPropagation()}>
                        <Dialog.Title>Delete Pet</Dialog.Title>
                        <Dialog.Description>
                            Are you sure you want to delete {} this pet?
                        </Dialog.Description>
                        <div className="mt-4">
                            <button onClick={handleDelete} className="btn bg-red-500 p-3 text-white">Yes, Delete</button>
                            <button onClick={closeModal} className="btn bg-gray-500 p-3 text-white ml-2">Cancel</button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Box>
    );
};

export default AllDonations;
 