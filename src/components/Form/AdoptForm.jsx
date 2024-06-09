 

const AdoptForm = ({ petList, user, onClose, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const adoptionData = {
      petId: petList._id,
      petName: petList.name,
      petImage: petList.image,
      userName: user.displayName,
      userEmail: user.email,
      phoneNumber: e.target.phoneNumber.value,
      address: e.target.address.value,
    };
    onSubmit(adoptionData);
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg lg:w-1/2 lg:mt-20">
      <h2 className="text-2xl font-bold mb-4">Adopt {petList.name}</h2>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="petId" value={petList.id} />
        <input type="hidden" name="petName" value={petList.name} />
        <input type="hidden" name="petImage" value={petList.image} />
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input type="text" name="userName" value={user.displayName} disabled className="w-full mt-2 p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" name="userEmail" value={user.email} disabled className="w-full mt-2 p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input type="tel" name="phoneNumber" placeholder="Phone Number" required className="w-full mt-2 p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input type="text" name="address" placeholder="Address" required className="w-full mt-2 p-2 border rounded" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Submit</button>
          <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AdoptForm;

 

// const AdoptForm = ({ petList, user, onClose, onSubmit }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const adoptionData = {
//       petId: petList.id,
//       petName: petList.name,
//       petImage: petList.image,
//       userName: user.displayName,
//       userEmail: user.email,
//       phoneNumber: e.target.phoneNumber.value,
//       address: e.target.address.value,
//     };
//     onSubmit(adoptionData);
//   };

//   return (
//     <div className="bg-white p-6 rounded shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Adopt {petList.name}</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="hidden" name="petId" value={petList.id} />
//         <input type="hidden" name="petName" value={petList.name} />
//         <input type="hidden" name="petImage" value={petList.image} />
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input type="text" name="userName" value={user.displayName} disabled className="w-full mt-2 p-2 border rounded" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input type="email" name="userEmail" value={user.email} disabled className="w-full mt-2 p-2 border rounded" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Phone Number</label>
//           <input type="tel" name="phoneNumber" placeholder="Phone Number" required className="w-full mt-2 p-2 border rounded" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Address</label>
//           <input type="text" name="address" placeholder="Address" required className="w-full mt-2 p-2 border rounded" />
//         </div>
//         <div className="flex justify-end">
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">Submit</button>
//           <button type="button" onClick={onClose} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AdoptForm;