 
 import { useMemo, useState } from 'react';
 import { useQuery } from '@tanstack/react-query';
 import { Table, Thead, Tbody, Tr, Th, Td, Box, Text } from '@chakra-ui/react';
 import useAxiosPublic from '../../../hooks/useAxiosPublic';
 import useAuth from '../../../hooks/useAuth';
 import { useTable } from 'react-table';
 
 const AdoptRequest = () => {
     const { user } = useAuth();
     const axiosPublic = useAxiosPublic();
    //  const queryClient = useQueryClient();
     const [sortBy, setSortBy] = useState({ field: 'serialNumber', direction: 'asc' });
 
     const fetchAdoptionRequests = async () => {
         if (!user?.email) throw new Error('User email not available');
         const { data } = await axiosPublic.get('/adoptRequests', {
             params: {
                 email: user.email,
                 sortBy: sortBy.field,
                 sortDirection: sortBy.direction,
             },
         });
         return data;
     };
 
     const { data: adoptionRequests = [], isLoading, isError, error } = useQuery({
         queryKey: ['adoptionRequests', user?.email, sortBy],
         queryFn: fetchAdoptionRequests,
         keepPreviousData: true,
     });
 
    //  const acceptAdoptionRequest = useMutation(
    //      (requestId) => axiosPublic.post('/acceptAdoptionRequest', { requestId }),
    //      {
    //          onSuccess: () => {
    //              queryClient.invalidateQueries('adoptionRequests');
    //          },
    //      }
    //  );
 
    //  const rejectAdoptionRequest = useMutation(
    //      (requestId) => axiosPublic.post('/rejectAdoptionRequest', { requestId }),
    //      {
    //          onSuccess: () => {
    //              queryClient.invalidateQueries('adoptionRequests');
    //          },
    //      }
    //  );
 
     const columns = useMemo(
         () => [
             { Header: 'Serial Number', accessor: 'serialNumber' },
             { Header: 'Pet Name', accessor: 'petName' },
             { Header: 'Requester Name', accessor: 'userName' },
             { Header: 'Email', accessor: 'userEmail' },
             { Header: 'Phone', accessor: 'phoneNumber' },
             { Header: 'Address', accessor: 'address' },
            //  {
            //      Header: 'Actions',
            //      accessor: 'actions',
            //      Cell: ({ row }) => (
            //          <div className="flex gap-2">
            //              <Button
            //                  colorScheme="green"
            //                  onClick={() => acceptAdoptionRequest.mutate(row.original._id)}
            //              >
            //                  Accept
            //              </Button>
            //              <Button
            //                  colorScheme="red"
            //                  onClick={() => rejectAdoptionRequest.mutate(row.original._id)}
            //              >
            //                  Reject
            //              </Button>
            //          </div>
            //      ),
            //  },
         ],
         []
     );
 
     const handleSort = (field) => {
         setSortBy((prevSortBy) => ({
             field,
             direction: prevSortBy.field === field && prevSortBy.direction === 'asc' ? 'desc' : 'asc',
         }));
     };
 
     const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
         columns,
         data: adoptionRequests.map((request, index) => ({
             ...request,
             serialNumber: index + 1,
         })),
         initialState: { sortBy: [] },
     });
 
     return (
         <Box className="p-4 lg:px-10">
             <Text className="text-5xl text-slate-100 text-center font-bold bg-black" as="h1" fontSize="5xl" mb="4">
                 My Adoption Requests
             </Text>
             {isLoading && <div>Loading...</div>}
             {isError && <div>Error fetching data: {error.message}</div>}
             <Table variant="simple" {...getTableProps()} className="mb-4">
                 <Thead>
                     {headerGroups.map((headerGroup) => (
                         <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                             {headerGroup.headers.map((column) => (
                                 <Th className='p-4  border border-red-400 bg-slate-400 ' key={column.id} onClick={() => handleSort(column.id)} {...column.getHeaderProps()}>
                                     {column.render('Header')}
                                     <span>
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
                                     <Td key={cell.id} {...cell.getCellProps()}>
                                         {cell.render('Cell')}
                                     </Td>
                                 ))}
                             </Tr>
                         );
                     })}
                 </Tbody>
             </Table>
         </Box>
     );
 };
 
 export default AdoptRequest;
 
 

 

  
// import { useMemo, useState } from 'react';
// import {  useQuery } from '@tanstack/react-query';
// import { Table, Thead, Tbody, Tr, Th, Td, Box, Text,  } from '@chakra-ui/react';
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
// import useAuth from '../../../hooks/useAuth';
// import { useTable } from 'react-table';
// // import { FaEdit,  } from 'react-icons/fa';
// // import { Link } from 'react-router-dom';
// // import useAxiosSecure from './../../../hooks/useAxiosSecure';
// // import Swal from 'sweetalert2';
 


// const AdoptRequest = () => {
//     const { user } = useAuth();
//     const axiosPublic = useAxiosPublic(); 
//     const [sortBy, setSortBy] = useState({ field: 'serialNumber', direction: 'asc' });
//     // const axiosSecure = useAxiosSecure();


   
//     const fetchPets = async () => {
//         if (!user?.email) throw new Error('User email not available');
//         const { data } = await axiosPublic.get('/adoptRequests', {
//             params: {
//                 email: user.email,
//                 limit: 10,
                
//                 sortBy: sortBy.field,
//                 sortDirection: sortBy.direction
//             },
//         });
//         return data;
//     };

//     const { data: donate = [], isLoading, isError, error } = useQuery({
//         queryKey: ['donate', user?.email, sortBy],
//         queryFn: fetchPets,
//         keepPreviousData: true,
//     });

//     const columns = useMemo(
//         () => [
//             { Header: 'Serial Number', accessor: 'serialNumber' },
//             { Header: 'Name', accessor: 'userName' },
//             { Header: 'Email', accessor: 'userEmail' },
           
           
            
            
//             {
//                 Header: 'Donation Status',
//                 accessor: 'ids',
//                 Cell: () => (
//                     <div className='px-6 gap-6 '>
                      
//                             <button className="btn pl-5 ml-0 border border-red-400 p-3 bg-green-400 rounded-full">
//                                 Pause Button
//                             </button>
                       
                      
//                     </div>
//                 ),
//             },
//             {
//                 Header: 'Donars',
//                 accessor: 'id',
//                 Cell: () => (
//                     <div className='px-6 gap-6 '>
                        
//                             <button className="btn pl-5 ml-0 border border-red-400 p-3 bg-blue-400 rounded-full">
//                                View Donators
//                             </button>
                        
                      
//                     </div>
//                 ),
//             },
//         ],
//         []
//     );

    
    

//     const handleSort = (field) => {
//         setSortBy((prevSortBy) => ({
//             field,
//             direction: prevSortBy.field === field && prevSortBy.direction === 'asc' ? 'desc' : 'asc'
//         }));
//     };

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         prepareRow,
//         rows,
//     } = useTable(
//         {
//             columns,
//             data: donate.map((pet, index) => ({ ...pet, serialNumber: index + 1 })),
//             initialState: { sortBy: [] },
//         }
//     );

//     return (
//         <Box className="p-4 lg:px-10">
//             <Text className='text-5xl text-slate-100 text-center font-bold bg-black  ' as="h1" fontSize="5xl" mb="4">My Adoption Request</Text>
//             {isLoading && <div>Loading...</div>}
//             {isError && <div>Error fetching data: {error.message}</div>}
//             <Table variant="simple" {...getTableProps()} className="mb-4">
//                 <Thead className=''>
//                     {headerGroups.map((headerGroup) => (
//                         <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
//                             {headerGroup.headers.map((column) => (
//                                 <Th className='p-4  border border-red-400 bg-slate-400 ' key={column.id} onClick={() => handleSort(column.id)} {...column.getHeaderProps()}>
//                                     {column.render('Header')}
//                                     <span className='text-red-900  '>
//                                         {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
//                                     </span>
//                                 </Th>
//                             ))}
//                         </Tr>
//                     ))}
//                 </Thead>
//                 <Tbody {...getTableBodyProps()}>
//                     {rows.map((row) => {
//                         prepareRow(row);
//                         return (
//                             <Tr key={row.id} {...row.getRowProps()}>
//                                 {row.cells.map((cell) => (
//                                     <Td className='bg-gray-50 border text-center' key={cell.id} {...cell.getCellProps()}>{cell.render('Cell')}</Td>
//                                 ))}
//                             </Tr>
//                         );
//                     })}
//                 </Tbody>
//             </Table>
           

            
//         </Box>
//     );
// };

// export default AdoptRequest;
 

 

