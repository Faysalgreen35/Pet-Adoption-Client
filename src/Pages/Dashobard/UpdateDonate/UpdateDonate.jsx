

import { useForm } from 'react-hook-form';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
// import useAuth from '../../../hooks/useAuth';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateDonate = () => {

    const { name, longDescription, donateAmount, lastDate, shortDescription, _id } = useLoaderData();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    //   const {user}= useAuth() || {};


    const editor = useEditor({
        extensions: [StarterKit],
        content: longDescription,
    });


    const onSubmit = async (data) => {
        try {
            // Upload image
            const imageFormData = new FormData();
            imageFormData.append('image', data.image[0]);

            const imageRes = await axiosPublic.post(image_hosting_api, imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = imageRes.data.data.url;
            console.log('Image uploaded:', imageUrl);

            // Prepare data for database
            const donateData = {
                name: data.name,
                donateAmount: data.donateAmount,
                lastDate: data.lastDate,
                shortDescription: data.shortDescription,
                longDescription: editor.getHTML(),
                image: imageUrl,

            };

            // Save to database

            const dbRes = await axiosPublic.patch(`/donate/${_id}`, donateData);
            // console.log(dbRes.data);
            if (dbRes.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the  menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            console.error('Error adding pet', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };


    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="flex flex-col">
                <label htmlFor="image" className="font-medium text-gray-700">Pet Image</label>
                <input type="file" name="image" {...register('image', { required: 'Image is required' })} className="mt-1" />
                {errors.image && <p className="text-red-600">{errors.image.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="name" className="font-medium text-gray-700">Pet Name</label>
                <input name="name" defaultValue={name} {...register('name', { required: 'Name is required' })} className="mt-1 p-2 border border-gray-300 rounded" />
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="donateAmount" className="font-medium text-gray-700">Donation Amount</label>
                <input
                    name="donateAmount"
                    defaultValue={donateAmount}
                    type="text"
                   
                    {...register('donateAmount', {
                        required: 'Donation amount is required',
                        min: {
                            value: 20,
                            message: 'Minimum donation amount must be at least $20'
                        },
                        validate: {
                            minAmount: value => parseFloat(value) >= 20 || "Minimum donation amount must be at least $20"
                        },
                        max: {
                            value: 1000,
                            message: 'Maximum donation amount cannot exceed $1000'
                        }
                    })}
                    className={`mt-1 p-2 border rounded ${errors.donateAmount ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.donateAmount && <p className="text-red-600">{errors.donateAmount.message}</p>}
            </div>


            <div className="flex flex-col">
                <label htmlFor="lastDate" className="font-medium text-gray-700">Last Date of Donation</label>
                <input name="lastDate" defaultValue={lastDate} type="date" {...register('lastDate', { required: 'Last date of donation is required' })} className="mt-1 p-2 border border-gray-300 rounded" />
                {errors.lastDate && <p className="text-red-600">{errors.lastDate.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="shortDescription" className="font-medium text-gray-700">Short Description</label>
                <input name="shortDescription" defaultValue={shortDescription} {...register('shortDescription', { required: 'Short description is required' })} className="mt-1 p-2 border border-gray-300 rounded" />
                {errors.shortDescription && <p className="text-red-600">{errors.shortDescription.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="longDescription" className="font-medium text-gray-700">Long Description</label>
                <EditorContent editor={editor} className="mt-1 border border-gray-300 rounded p-2" />

            </div>

            <div className="form-control mt-6">
                <input className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" type="submit" value='Upadate Donate Campaign' />
            </div>

        </form>
    );
};

export default UpdateDonate;
