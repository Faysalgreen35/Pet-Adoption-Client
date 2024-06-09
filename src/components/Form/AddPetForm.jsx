
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const petCategories = [
    { value: 'dog', label: 'Dog' },
    { value: 'cat', label: 'Cat' },
    { value: 'bird', label: 'Bird' },
    { value: 'fish', label: 'Fish' }, 
    { value: 'rabbit', label: 'Rabbit' },
    { value: 'other', label: 'Other' }
];

const AddPetForm = () => {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
  const {user}= useAuth() || {};


    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
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
            const petData = {
                name: data.name,
                age: data.age,
                category: data.category.value,
                location: data.location,
                shortDescription: data.shortDescription,
                longDescription: editor.getHTML(),
                createdDate: new Date().toISOString().split('T')[0],
                adopted: false,
                image: imageUrl,
                createdBy:user.email
            };
    
            // Save to database
            const dbRes = await axiosPublic.post('/petList', petData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (dbRes.data.insertedId) {
                console.log('Pet added to the database');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Pet added Successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                console.error('Error adding pet to the database');
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
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     <div>
        //         <label htmlFor="image">Pet Image</label>
        //         <input type="file" id="image" {...register('image', { required: 'Image is required' })} />
        //         {errors.image && <p>{errors.image.message}</p>}
        //     </div>

        //     <div>
        //         <label htmlFor="name">Pet Name</label>
        //         <input id="name" {...register('name', { required: 'Name is required' })} />
        //         {errors.name && <p>{errors.name.message}</p>}
        //     </div>

        //     <div>
        //         <label htmlFor="age">Pet Age</label>
        //         <input type="number" id="age" {...register('age', { required: 'Age is required' })} />
        //         {errors.age && <p>{errors.age.message}</p>}
        //     </div>

        //     <div>
        //         <label htmlFor="category">Pet Category</label>
        //         <Controller
        //             name="category"
        //             control={control}
        //             rules={{ required: 'Category is required' }}
        //             render={({ field }) => (
        //                 <Select
        //                     {...field}
        //                     options={petCategories}
        //                     placeholder="Select a category"
        //                 />
        //             )}
        //         />
        //         {errors.category && <p>{errors.category.message}</p>}
        //     </div>

        //     <div>
        //         <label htmlFor="location">Pet Location</label>
        //         <input id="location" {...register('location', { required: 'Location is required' })} />
        //         {errors.location && <p>{errors.location.message}</p>}
        //     </div>

        //     <div>
        //         <label htmlFor="shortDescription">Short Description</label>
        //         <input id="shortDescription" {...register('shortDescription', { required: 'Short description is required' })} />
        //         {errors.shortDescription && <p>{errors.shortDescription.message}</p>}
        //     </div>

        //     <div>
        //         <label htmlFor="longDescription">Long Description</label>
        //         <EditorContent editor={editor} />
        //     </div>

        //     <button type="submit">Submit</button>
        // </form>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="flex flex-col">
                <label htmlFor="image" className="font-medium text-gray-700">Pet Image</label>
                <input type="file" name="image" {...register('image', { required: 'Image is required' })} className="mt-1" />
                {errors.image && <p className="text-red-600">{errors.image.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="name" className="font-medium text-gray-700">Pet Name</label>
                <input name="name" {...register('name', { required: 'Name is required' })} className="mt-1 p-2 border border-gray-300 rounded" />
                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="age" className="font-medium text-gray-700">Pet Age</label>
                <input type="number" name="age" {...register('age', { required: 'Age is required' })} className="mt-1 p-2 border border-gray-300 rounded" />
                {errors.age && <p className="text-red-600">{errors.age.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="category" className="font-medium text-gray-700">Pet Category</label>
                <Controller
                    name="category"
                    control={control}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={petCategories}
                            placeholder="Select a category"
                            className="mt-1"
                        />
                    )}
                />
                {errors.category && <p className="text-red-600">{errors.category.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="location" className="font-medium text-gray-700">Pet Location</label>
                <input name="location" {...register('location', { required: 'Location is required' })} className="mt-1 p-2 border border-gray-300 rounded" />
                {errors.location && <p className="text-red-600">{errors.location.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="shortDescription" className="font-medium text-gray-700">Short Description</label>
                <input name="shortDescription" {...register('shortDescription', { required: 'Short description is required' })} className="mt-1 p-2 border border-gray-300 rounded" />
                {errors.shortDescription && <p className="text-red-600">{errors.shortDescription.message}</p>}
            </div>

            <div className="flex flex-col">
                <label htmlFor="longDescription" className="font-medium text-gray-700">Long Description</label>
                <EditorContent editor={editor} className="mt-1 border border-gray-300 rounded p-2" />
            </div>
             
            <div className="form-control mt-6">
                            <input className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" type="submit" value='Submit' />
                        </div>
            {/* <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">Submit</button> */}
        </form>
    );
};

export default AddPetForm;
