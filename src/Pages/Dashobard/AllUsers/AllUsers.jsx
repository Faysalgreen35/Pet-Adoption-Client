
import { useMemo, useState } from 'react';
import {  useQuery } from '@tanstack/react-query';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text,Image  } from '@chakra-ui/react';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { useTable } from 'react-table';
import {  FaTrash, FaUsers,  } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
 

const AllUsers = () => {
    const { user } = useAuth();
    // const axiosPublic = useAxiosPublic(); 
    const [sortBy, setSortBy] = useState({ field: 'serialNumber', direction: 'asc' });
    const axiosSecure = useAxiosSecure();

    const handleDeleteUser = user => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
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
    }

    
   const handleMakeAdmin = user =>{
    axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
}
    const fetchPets = async () => {
        if (!user?.email) throw new Error('User email not available');
        const { data } = await axiosSecure.get('/users', {
            // params: {
            //     email: user.email,
            //     limit: 10,
                
            //     sortBy: sortBy.field,
            //     sortDirection: sortBy.direction
            // },
        });
        return data;
    };

    const { data: donate = [], isLoading, isError,refetch, error } = useQuery({
        queryKey: ['donate', user?.email, sortBy],
        queryFn: fetchPets,
        keepPreviousData: true,
    });

    const columns = useMemo(
        () => [
            { Header: 'Serial Number', accessor: 'serialNumber' },
            { Header: ' Name', accessor: 'name' },
            { Header: ' Email', accessor: 'email' },
            { Header: ' Role', accessor: 'role' },
            {
                Header: 'Pet Image',
                accessor: 'photoURL',
                Cell: ({ value }) => <Image src={value} alt="Pet" boxSize="50px" />
            },

            {
                Header: 'Make Admin',
                accessor: '',
                Cell: ({ cell }) => {
                    const user = cell.row.original;
                    return (
                        <div className='px-6 gap-6'>
                            {user.role === 'admin' ? 'Admin' : 
                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-lg text-2xl bg-orange-400">
                                    <FaUsers className="text-white" />
                                </button>
                            }
                        </div>
                    );
                },
            },

            {
                Header: 'Actions',
                accessor: '_id',
                Cell: ({cell}) =>
                    {
                        const user = cell.row.original;
                        return (
                            <div className='px-6 gap-6'>
                                {
                                    <button onClick={() => handleDeleteUser(user)}
                                    className="text-red-500 btn btn-lg text-2xl "><FaTrash />
                                </button>
                                }
                            </div>
                        );
                    },
                   
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
            <Text className='text-5xl text-slate-100 text-center font-bold bg-black uppercase  ' as="h1" fontSize="5xl" mb="4">All Users Lists</Text>
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

export default AllUsers;
 

 



// import { useQuery } from "@tanstack/react-query"
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// import { FaTrash, FaUsers } from "react-icons/fa";
// import Swal from "sweetalert2";



// const AllUsers = () => {
//     const axiosSecure = useAxiosSecure()
//     const { data: users = [], refetch } = useQuery({
//         queryKey: ['users'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/users');
//             return res.data;
//         }
//     })


// const handleMakeAdmin = user =>{
//     axiosSecure.patch(`/users/admin/${user._id}`)
//         .then(res =>{
//             console.log(res.data)
//             if(res.data.modifiedCount > 0){
//                 refetch();
//                 Swal.fire({
//                     position: "top-end",
//                     icon: "success",
//                     title: `${user.name} is an Admin now!`,
//                     showConfirmButton: false,
//                     timer: 1500
//                   });
//             }
//         })
// }

//     const handleDeleteUser = user => {

//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then((result) => {
//             if (result.isConfirmed) {

//                 axiosSecure.delete(`/users/${user._id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             refetch();
//                             Swal.fire({
//                                 title: "Deleted!",
//                                 text: "Your file has been deleted.",
//                                 icon: "success"
//                             });
//                         }
//                     })
//             }
//         });
//     }
//     return (



//         <div>
//             <div className="flex justify-evenly my-4 ">
//                 <h2 className="text-3xl  ">All Users</h2>
//                 <h2 className="text-3xl  ">Total Users: {users.length}</h2>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table   w-full">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th></th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             users.map((user, index) =>
//                                 <tr key={user._id}>
//                                     <th>{index + 1}</th>
//                                     <td>{user.name}</td>
//                                     <td>{user.email}</td>
//                                     <td>
//                                         { user.role === 'admin' ? 'Admin' : 
                                        
//                                         <button
                                            
//                                             onClick={()=>handleMakeAdmin(user)}
//                                             className=" btn btn-lg text-2xl  bg-orange-400"><FaUsers className="text-white " />
//                                         </button>
                                        
//                                         }

//                                     </td>
//                                     <td>
//                                         <button
//                                             onClick={() => handleDeleteUser(user)}
//                                             className="text-red-500 btn btn-lg text-2xl "><FaTrash />
//                                         </button>

//                                     </td>
//                                 </tr>)
//                         }


//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     );
// };

// export default AllUsers;