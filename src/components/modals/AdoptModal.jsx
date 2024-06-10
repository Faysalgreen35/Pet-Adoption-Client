import { Dialog } from '@headlessui/react';
import  { useRef } from 'react';

const AdoptModal = ({ isOpen, closeModal, handleAdopt, selectedPetId }) => {
    const dialogRef = useRef(null);

    return (
        <Dialog open={isOpen} onClose={closeModal}>
            <div ref={dialogRef} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={(e) => e.target === dialogRef.current && closeModal()}>
                <div className="bg-white p-6 rounded" onClick={(e) => e.stopPropagation()}>
                    <Dialog.Title>Adopt Pet</Dialog.Title>
                    <Dialog.Description>
                        Are you sure you want to adopt this pet?
                    </Dialog.Description>
                    <div className="mt-4">
                        <button onClick={() => { handleAdopt(selectedPetId); closeModal(); }} className="btn bg-blue-500 p-3 text-white">Yes, Adopt</button>
                        <button onClick={closeModal} className="btn bg-gray-500 p-3 text-white ml-2">Cancel</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default AdoptModal;
