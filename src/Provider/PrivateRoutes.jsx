import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-sm p-4">
                    <Skeleton height={40} count={5} />
                </div>
            </div>
        );
    }

    if(user){
        return children;
    }

    return <Navigate to='/login' state={{from:location}} replace />;
};

export default PrivateRoutes;

// import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

 

// const PrivateRoutes = ({children}) => {
 

//         const {user, loading}= useAuth();
//         const location = useLocation();


         
//         if(loading){
//             return <progress className="progress w-56"></progress>
//         }
//         if(user){
//             return children;
        
//          }
//          return <Navigate to='/login' state={{from:location}} replace></Navigate>
 
// };

// export default PrivateRoutes;