 

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const DonateForm = ({ pet, user, onClose }) => {
 

  return (
    <div className="bg-white p-6 rounded shadow-lg w-2/3">
      <h2 className="text-2xl font-bold mb-4">Donate to {pet.name}</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm pet={pet} user={user} onClose={onClose} />
      </Elements>
    </div>
  );
};

export default DonateForm;


// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import { loadStripe } from "@stripe/stripe-js";


// const DonateForm = ({ pet, user, onClose, onSubmit }) => {
 
//     const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
//   return (
//     <div className="bg-white p-6 rounded shadow-lg w-2/3">
//       <h2 className="text-2xl font-bold mb-4">Adopt {pet.name}</h2>
  

//       <Elements stripe={stripePromise}>
//         <CheckoutForm onSubmit={onSubmit} onClose={onClose} user={user}  ></CheckoutForm>
//       </Elements>
//     </div>
//   );
// };

// export default DonateForm;