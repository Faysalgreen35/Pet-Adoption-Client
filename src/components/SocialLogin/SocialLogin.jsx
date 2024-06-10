import { FaGithub, FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const SocialLogin = () => {
    const { googleSignIn, signInwithGithub } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: 'user',
                    photoURL:result.user?.photoURL,
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        toast.success("Logged in successfully!");
                        navigate('/');

                    })
            })
    }


    const handleGithubSignIn = () => {
        signInwithGithub()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: 'user',
                    photoURL:result.user?.photoURL,
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    console.log(res.data);
                    toast.success("Logged in successfully!");
                    navigate('/');

                })
                toast.success("Logged in successfully!");
            })
            .catch(error => {
                console.error('error: ', error);
                toast.error("Failed to login. Please try again.");
            });
    }
    return (
        

        <div>

            <div onClick={handleGoogleSignIn} className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <div className="px-4 py-2"></div>
                <span className="w-5/6 px-4 py-3 font-bold text-center flex items-center justify-center"> <FaGoogle className="mr-4 "></FaGoogle>Sign in with Google</span>
            </div>
            <div onClick={handleGithubSignIn} className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <div className="px-4 py-2"></div>
                <span className="w-5/6 px-4 py-3 font-bold text-center flex items-center justify-center"> <FaGithub className="mr-4 "></FaGithub>Sign in with Github</span>
            </div>
        </div>
    );
};

export default SocialLogin;