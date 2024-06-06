import {
    createBrowserRouter,
     
  } from "react-router-dom";
import Main from "../Layout/Main"; 
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PetList from "../Pages/PetList/PetList";
import PetDetails from "../Pages/PetDetails/PetDetails";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage />,
      children:[
        {
            path:'/',
            element:<Home></Home>

        },
        {
          path:'login',
          element:<Login></Login>
        },
        {
          path:'signup',
          element:<SignUp></SignUp>
        },
        {
          path:'pets',
          element:<PetList></PetList>
        },
        {
          path:'petList/:id',
          element:<PetDetails></PetDetails>
        },
      ]
    },
  ]);