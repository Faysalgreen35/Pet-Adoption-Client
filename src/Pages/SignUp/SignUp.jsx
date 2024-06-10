import { Link, useNavigate } from "react-router-dom"; 
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import logo from '../../../src/assets/images/logo/logo3.jpeg'
import SocialLogin from "../../components/SocialLogin/SocialLogin"; 
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

// import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    // const { createuser, updateUserProfile } = useAuth;
    
    const { createuser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);

        try {
            // Image upload
            const formData = new FormData();
            formData.append('image', data.photo[0]);

            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = res.data.data.url;
            console.log('Image uploaded:', imageUrl);

            // Create user
            const result = await createuser(data.email, data.password);
            const loggedUser = result.user;
            console.log(loggedUser);

            // Update user profile with the uploaded image URL
            await updateUserProfile(data.name, imageUrl);
            console.log('User profile updated');

            // Create user in database
            const userInfo = {
                name: data.name,
                email: data.email,
                role: 'user', // Ensure the role is properly defined
                photoURL: imageUrl, // Include the image URL
            };

            const dbRes = await axiosPublic.post('/users', userInfo);
            if (dbRes.data.insertedId) {
                console.log('User added to the database');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Pet Adoption | Sign Up</title>
            </Helmet>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/geometric-gradient-technology-background_23-2149110132.jpg')" }}>
                </div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <img className="lg:w-24 lg:h-24 sm:w-8 sm:h-8" src={logo} alt="" />
                    </div>

                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                        Welcome  To Sign Up
                    </p>
                  {/* // social  */}
                  <SocialLogin></SocialLogin>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                        <a onClick={() => { }} className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login with email</a>
                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="name">Name</label>
                            <input {...register("name", { required: true })} name="name" placeholder="name" id="name" className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="text" />
                            {errors.name && <span className="text-red-400">Name is required</span>}
                        </div>

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
                            <input id="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 30,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                            })}

                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300" type="password" />

                            {errors.password?.type === "required" && (
                                <p className="text-red-400">Password is required</p>)}
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-400"> password must be 6 chararecters</p>
                            )}
                            {errors.password?.type === "maxLength" && (
                                <p className="text-red-400"> password must be less then 30 chararecters</p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-400"> password must have one uppercase, one lowercase, one number, one special character needed</p>
                            )}
                        </div>

                        <div className="form-control mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="photo">Photo</label>
                            <input
                                {...register("photo", { required: true })}
                                name="photo"
                                placeholder="Upload Photo"
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                                type="file"
                                accept="image/*"
                            />
                            {errors.photo && <span className="text-red-400">Photo is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <input className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" type="submit" value='Sign Up' />
                        </div>
                    </form>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                        <Link to='/login' className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign In</Link>
                        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
