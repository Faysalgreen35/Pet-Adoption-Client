import { useEffect, useState } from 'react';
import { IoMenu } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/logo/logo3.jpeg';
import useAuth from '../../../hooks/useAuth';
import { MdOutlineWbSunny } from 'react-icons/md';
import { FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [darkMode, setDarkMode] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

//   const handleThemeToggle = () => {
//     setDarkMode(prevMode => !prevMode);
//     document.body.classList.toggle('dark', !darkMode);
// };

useEffect(() => {
  // Apply dark mode class to the body on component mount
  document.body.classList.toggle('dark', darkMode);
}, [darkMode]);


const handleThemeToggle = () => {
  setDarkMode(prevMode => !prevMode);
};

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      // Handle successful logout if needed
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          aria-current="page"
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          to="/pets"
        >
          Pet Listing
        </NavLink>
      </li>
      <li>
        <NavLink
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
          to="/donations"
        >
          Donation Campaigns
        </NavLink>
      </li>
      {!user && (
        <li>
          <NavLink
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            to="/login"
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 z-50 relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              <img src={logo} className="w-32 h-auto" alt="" />
            </span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">

          <div className="mr-2 ml-2 lg:mr-10" onClick={handleThemeToggle}>
              {darkMode ? <MdOutlineWbSunny className='text-3xl text-white' /> : <FaMoon className='text-black text-3xl' />}
            </div>
            {user ? (
              <>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 lg:w-12 lg:h-12 rounded-full" src={user.photoURL || "/path/to/default/profile-picture.jpg"} alt="user photo" />
                </button>
                {/* Dropdown menu */}
                <div
                  className={`absolute top-10 right-10 z-50 ${isDropdownOpen ? 'block' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">{user.displayName || 'User Name'}</span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <NavLink to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <button
                data-collapse-toggle="navbar-user"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user"
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                <IoMenu />
              </button>
            )}
          </div>
          
          <div className={`items-center justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navOptions}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

 