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
import DonateeCampaigns from "../Pages/DonateeCampaigns/DonateeCampaigns";
import DonateDetails from "../Pages/DonateDetails/DonateDetails";
// import PrivateRoutes from "../Provider/PrivateRoutes";
import Dashboard from "../Layout/Dashboard";
import PrivateRoutes from "../Provider/PrivateRoutes";
import AddPetForm from "../components/Form/AddPetForm";
import MyAddedPets from "../Pages/Dashobard/MyAddedPets/MyAddedPets";
import UpdatePetAddedPage from "../Pages/Dashobard/UpdatePetAddedPage/UpdatePetAddedPage";
// import AddPetForm from "../components/Form/AddPetForm";

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
        {
          path:'donations',
          element: <DonateeCampaigns></DonateeCampaigns>
        },
        {
          path:'donateDetails/:id',
          element:<DonateDetails></DonateDetails>
        },

      ]
    },

    {
      path:'dashboard',
      element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
      children:[

        //user dashboard
        {
          path:'petadd',
          element:<PrivateRoutes><AddPetForm></AddPetForm></PrivateRoutes>,
        },
        {
          path:'my-added-pets',
          element:<PrivateRoutes><MyAddedPets></MyAddedPets></PrivateRoutes>,
        },
        {
          path: 'updatePetList/:id',
          element: <PrivateRoutes><UpdatePetAddedPage /></PrivateRoutes>,
          loader: ({ params }) => fetch(`http://localhost:5000/petList/${params.id}`)
      },

      ]
    },
  ]);