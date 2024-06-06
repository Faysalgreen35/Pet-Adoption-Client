import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import logo from '../../../src/assets/images/logo/logo3.jpeg'
import SocialLogin from "../../components/SocialLogin/SocialLogin";


const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await signIn(data.email, data.password);
            const user = result.user;
            console.log(user);

            Swal.fire({
                title: "User login successful",
                showClass: {
                    popup: "animate__animated animate__fadeInUp animate__faster"
                },
                hideClass: {
                    popup: "animate__animated animate__fadeOutDown animate__faster"
                }
            });

            navigate("/", { replace: true });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Pet Adoption | Login</title>
            </Helmet>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg   dark:bg-gray-800 lg:max-w-4xl shadow-2xl lg:pb-12">
                <div className="hidden  lg:bg-cover lg:block lg:w-1/2" style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/geometric-gradient-technology-background_23-2149110132.jpg')" }}>
                </div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <img className="lg:w-24 lg:h-24 sm:w-8 sm:h-8" src={logo} alt="" />
                    </div>

                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                        Welcome back!
                    </p>

                   {/* social login  */}
                   <SocialLogin></SocialLogin>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                        <a onClick={() => { }} className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login with email</a>
                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="email">Email Address</label>
                            <input id="email" {...register("email", { required: true })} name="email" placeholder="email" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
                            {errors.email && <span className="text-red-400">Email is required</span>}
                        </div>

                        <div className="form-control mt-4">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="password">Password</label>
                                <a onClick={() => { }} className="text-xs text-gray-500 dark:text-gray-300 hover:underline">Forget Password?</a>
                            </div>
                            <input id="password" {...register("password", { required: true })} className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
                            {errors.password && <span className="text-red-400">Password is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <input className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" type="submit" value='Login' />
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                        <Link to='/signup' className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
