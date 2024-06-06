import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <section className="bg-white dark:bg-gray-900 ">
            <div className="container flex items-center justify-center min-h-screen px-6 py-12 mx-auto">
                <div className="w-full ">
                    <div className="flex flex-col items-center max-w-lg mx-auto text-center">
                        <p className="text-sm font-medium text-blue-500 dark:text-blue-400">404 error</p>
                        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">We lost this page</h1>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">We searched high and low, but couldn’t find what you’re looking for.Let’s find a better place for you to go.</p>

                        <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                           <Link to='/'>
                           <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg dark:text-gray-200 gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-700">
                                 


                                 <span>Go back</span>
                             </button>
                           </Link>
                           <Link to='/'>
                            <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                                Take me home
                            </button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid w-full max-w-6xl grid-cols-1 gap-8 mx-auto mt-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="p-6 rounded-lg bg-blue-50 dark:bg-gray-800">
                            <span className="text-gray-500 dark:text-gray-400">
                                
                            </span>

                            <h3 className="mt-6 font-medium text-gray-700 dark:text-gray-200 ">Documentation</h3>

                            <p className="mt-2 text-gray-500 dark:text-gray-400 ">Dive in to learn all about our product.</p>

                            <a href="#" className="inline-flex items-center mt-4 text-sm text-blue-500 gap-x-2 dark:text-blue-400 hover:underline">
                                <span>Start learning</span>
 
                            </a>
                        </div>

                        <div className="p-6 rounded-lg bg-blue-50 dark:bg-gray-800">
                            <span className="text-gray-500 dark:text-gray-400">
                                
                            </span>

                            <h3 className="mt-6 font-medium text-gray-700 dark:text-gray-200 ">Our blog</h3>

                            <p className="mt-2 text-gray-500 dark:text-gray-400 ">Read the latest posts on our blog.</p>

                            <a href="#" className="inline-flex items-center mt-4 text-sm text-blue-500 gap-x-2 dark:text-blue-400 hover:underline">
                                <span>View lastest posts</span>

                               
                            </a>
                        </div>

                        <div className="p-6 rounded-lg bg-blue-50 dark:bg-gray-800">
                            <span className="text-gray-500 dark:text-gray-400">
                                
                            </span>

                            <h3 className="mt-6 font-medium text-gray-700 dark:text-gray-200 ">Chat to us</h3>

                            <p className="mt-2 text-gray-500 dark:text-gray-400 ">Can’t find what you’re looking for?</p>

                            <a href="#" className="inline-flex items-center mt-4 text-sm text-blue-500 gap-x-2 dark:text-blue-400 hover:underline">
                                <span>Chat to our team</span>

                               
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ErrorPage;