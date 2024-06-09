
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, Thead, Tbody, Tr, Th, Td, Image, Box, Text } from '@chakra-ui/react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { useTable } from 'react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FcAcceptDatabase } from "react-icons/fc";
import { Link } from 'react-router-dom';
const MyAddedPets = () => {
    
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [pageIndex, setPageIndex] = useState(0);
    // const [sortBy, setSortBy] = useState({ field: 'name', direction: 'asc' }); // Initial sorting state
    const [sortBy, setSortBy] = useState({ field: 'serialNumber', direction: 'asc' });
    const fetchPets = async () => {
        if (!user?.email) throw new Error('User email not available');
        const { data } = await axiosPublic.get('/petListEmail', {
            params: {
                email: user.email,
                limit: 10,
                offset: pageIndex * 10,
                sortBy: sortBy.field, // Pass sortBy field
                sortDirection: sortBy.direction // Pass sortDirection
            },
        });
        return data;
    };


    const { data: petList = [], isLoading, isError, error } = useQuery({
        queryKey: ['petList', user?.email, pageIndex, sortBy], // Include sortBy in the query key
        queryFn: fetchPets,
        keepPreviousData: true,
    });
    console.log('petList array:', petList);

    const columns = useMemo(
        () => [
            { Header: 'Serial Number', accessor: 'serialNumber' },
            { Header: 'Pet Name', accessor: 'name' },
            { Header: 'Pet Category', accessor: 'category' },
            {
                Header: 'Pet Image',
                accessor: 'image',
                Cell: ({ value }) => <Image className='' src={value} alt="Pet" boxSize="50px" />
            },
            {
                Header: 'Adoption Status',
                accessor: 'adopted',
                Cell: ({ value }) => value ? 'Adopted' : 'Not Adopted' // Modify rendering logic here
            },
            {
                Header: 'Actions',
                accessor: '_id',
                Cell: ({ value }) => (
                    <>
                        <div className='px-6 gap-6 '>
                           <Link to={`/dashboard/updatePetList/${value}`}> <button className="btn pl-5 ml-0 border border-red-400 p-3 "><FaEdit className='text-2xl' /></button></Link>
                            <button onClick={() => handleDelete(value)} className="btn pl-5 ml-0 border border-red-400 p-3 "><FaTrash className='text-2xl'  ></FaTrash></button>
                            <button onClick={() => handleAdopt(value)} className="btn pl-5 ml-0 border border-red-400 p-3 "><FcAcceptDatabase className='text-2xl' /></button>
                        </div>
                    </>
                ),
            },
        ],
        []
    );

     
    const handleDelete = (id) => console.log(`Delete pet with id: ${id}`);
    const handleAdopt = (id) => console.log(`Adopt pet with id: ${id}`);
  

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
            <Text as="h2" fontSize="2xl" mb="4">My Added Pets</Text>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error fetching data: {error.message}</div>}
            <Table variant="simple" {...getTableProps()} className="mb-4"> {/* Apply table props */}
                <Thead className=''>
                    {headerGroups.map((headerGroup) => (
                        <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}> {/* Apply header group props */}
                            {headerGroup.headers.map((column) => (
                                <Th className='p-4  border border-red-400 bg-slate-400 ' key={column.id} onClick={() => handleSort(column.id)} {...column.getHeaderProps()}>
                                  {column.render('Header')}
                                  <span className='text-red-900  '>
                                    {column.isSorted
                                      ? column.isSortedDesc
                                        ? ' 🔽'
                                        : ' 🔼'
                                      : ''}
                                  </span>
                                </Th>
                                 
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}> {/* Apply table body props */}
                    {rows.map((row) => {
                        prepareRow(row); // Prepare row for rendering
                        return (
                            <Tr  key={row.id} {...row.getRowProps()}> {/* Apply row props */}
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

export default MyAddedPets;

 