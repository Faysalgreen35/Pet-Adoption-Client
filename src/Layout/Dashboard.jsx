import logo from'../../src/assets/images/logo/logo3.jpeg';
 
import { Link, NavLink, Outlet } from 'react-router-dom'; 

const Dashboard = () => {
    return (
       <div className='flex'>
         <div className="flex">
            
            <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <Link to="/">
                    <img className="w-auto h-7 lg:w-16 lg:h-16 lg:ml-4" src={logo} alt=""/>
                </Link>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav className="-mx-3 space-y-6">
                        <ul className="space-y-3">
                            <li>
                                <NavLink
                                    to="/dashboard/petadd"
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                                            isActive
                                                ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`
                                    }
                                >
                                    <span className="mx-2 text-sm font-medium">Add a pet</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/my-added-pets"
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                                            isActive
                                                ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`
                                    }
                                >
                                    <span className="mx-2 text-sm font-medium">My added pets</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="#"
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                                            isActive
                                                ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`
                                    }
                                >
                                    <span className="mx-2 text-sm font-medium">Adoption Request</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="#"
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                                            isActive
                                                ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`
                                    }
                                >
                                    <span className="mx-2 text-sm font-medium">Create Donation Campaign</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="#"
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                                            isActive
                                                ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`
                                    }
                                >
                                    <span className="mx-2 text-sm font-medium">My Donation Campaigns</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="#"
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                                            isActive
                                                ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`
                                    }
                                >
                                    <span className="mx-2 text-sm font-medium">My Donations</span>
                                </NavLink>
                            </li>
                        </ul>

                        <ul className="space-y-3">
                            <li>
                                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Content</label>
                            </li>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                                            isActive
                                                ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`
                                    }
                                >
                                    <span className="mx-2 text-sm font-medium">Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="#"
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                                            isActive
                                                ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`
                                    }
                                >
                                    <span className="mx-2 text-sm font-medium">Hotspots</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="#"
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                                            isActive
                                                ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`
                                    }
                                >
                                    <span className="mx-2 text-sm font-medium">Checklists</span>
                                </NavLink>
                            </li>
                        </ul>

                        <ul className="space-y-3">
                            <li>
                                <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Customization</label>
                            </li>
                            <li>
                                <NavLink
                                    to="#"
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                                            isActive
                                                ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`
                                    }
                                >
                                    <span className="mx-2 text-sm font-medium">Themes</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="#"
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg ${
                                            isActive
                                                ? "text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
                                                : "text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
                                        }`
                                    }
                                >
                                    <span className="mx-2 text-sm font-medium">Settings</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
         <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
       </div>
    );
};

export default Dashboard;



// import logo from'../../src/assets/images/logo/logo3.jpeg';
 
// const Dashboard = () => {
//     return (
//         <div  className="">
//             <aside className="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
//     <a href="#">
//         <img className="w-auto h-7 lg:w-16 lg:h-16 lg:ml-4 " src={logo} alt=""/>
//     </a>

//     <div className="flex flex-col justify-between flex-1 mt-6">
//         <nav className="-mx-3 space-y-6 ">
//             <div className="space-y-3 ">
                

//                 <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/dashboard/petadd">
                     

//                     <span className="mx-2 text-sm font-medium">Add a pet</span>
//                 </a>

//                 <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    

//                     <span className="mx-2 text-sm font-medium">My added pets </span>
//                 </a>
//                 <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                     

//                     <span className="mx-2 text-sm font-medium">Adoption Request</span>
//                 </a>

//                 <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    

//                     <span className="mx-2 text-sm font-medium">Create Donation Campaign  </span>
//                 </a>
//                 <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                     

//                     <span className="mx-2 text-sm font-medium">My Donation Campaigns</span>
//                 </a>

//                 <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    

//                     <span className="mx-2 text-sm font-medium">My Donations                  </span>
//                 </a>
//             </div>

//             <div className="space-y-3 ">
//                 <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">content</label>

//                 <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="/">
                   

//                     <span className="mx-2 text-sm font-medium">Home</span>
//                 </a>

//                 <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                   
//                     <span className="mx-2 text-sm font-medium">Hotspots</span>
//                 </a>

//                 <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                     

//                     <span className="mx-2 text-sm font-medium">Checklists</span>
//                 </a>
//             </div>

//             <div className="space-y-3 ">
//                 <label className="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Customization</label>

//                 <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    

//                     <span className="mx-2 text-sm font-medium">Themes</span>
//                 </a>

//                 <a className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                     

//                     <span className="mx-2 text-sm font-medium">Setting</span>
//                 </a>
//             </div>
//         </nav>
//     </div>
// </aside>
//         </div>
//     );
// };

// export default Dashboard;