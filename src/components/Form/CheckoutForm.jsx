import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ pet, user, onClose }) => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const axiosPublic = useAxiosPublic();

  const [transactionId, setTransactionId] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const stripe = useStripe();
  const elements = useElements();
//   const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
console.log('stripe', stripe);
  const handleAmountChange = (event) => {
    setDonationAmount(event.target.value);
  };

  useEffect(() => {
    if (donationAmount) {
      axiosPublic.post('/create-payment-intent', { price: donationAmount })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosPublic, donationAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      setError(error.message);
    } else {
        console.log('payment method', paymentMethod);
      setError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    });

    if (confirmError) {
      setError(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        price: donationAmount,
        transactionId: paymentIntent.id,
        date: new Date(),
        DonateId: pet._id,
        status: 'pending'
      };

      const res = await axiosPublic.post('/payments', payment);
      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Thank you for your donation`,
          showConfirmButton: false,
          timer: 1500
        });
        onClose(); // Close the modal after successful payment
        navigate('/');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Donation Amount</label>
        <input
          type="text"
          name="donationAmount"
          value={donationAmount}
          onChange={handleAmountChange}
          className="w-full mt-2 p-2 border rounded"
          placeholder="Enter donation amount"
        />
      </div>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe && !clientSecret} className="btn btn-primary btn-sm my-4">Donate</button>
      <p className="text-red-500">{error}</p>
      {transactionId && <p className="text-green-400">Your Transaction ID: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;


// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const CheckoutForm = ({ pet, user,onClose }) => {
//   const [error, setError] = useState('');
//   const [clientSecret, setClientSecret] = useState('');
//   const [transactionId, setTransactionId] = useState('');
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (pet.donatedAmount) {
//       axiosSecure.post('/create-payment-intent', { price: pet.donatedAmount })
//         .then(res => {
//           setClientSecret(res.data.clientSecret);
//         });
//     }
//   }, [axiosSecure, pet.donatedAmount]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     if (card === null) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card
//     });

//     if (error) {
//       setError(error.message);
//     } else{
//             console.log('payment method', paymentMethod)
//             setError('')

//         }

//     const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: card,
//         billing_details: {
//           email: user?.email || 'anonymous',
//           name: user?.displayName || 'anonymous'
//         }
//       }
//     });

//     if (confirmError) {
//       setError(confirmError.message);
//     } else if (paymentIntent.status === "succeeded") {
//       setTransactionId(paymentIntent.id);

//       const payment = {
//         email: user.email,
//         price: pet.donatedAmount,
//         transactionId: paymentIntent.id,
//         date: new Date(),
//         petId: pet._id,
//         status: 'pending'
//       };

//       const res = await axiosSecure.post('/payments', payment);
//       if (res.data?.paymentResult?.insertedId) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: `Thank you for your donation`,
//           showConfirmButton: false,
//           timer: 1500
//         });
//         onClose();
//         navigate('/dashboard');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-4">
//         <label className="block text-gray-700">Donation Amount</label>
//         <input type="text" name="CurrentDonation" value={pet.donatedAmount}  className="w-full mt-2 p-2 border rounded" />
//       </div>
//       <CardElement
//         options={{
//           style: {
//             base: {
//               fontSize: '16px',
//               color: '#424770',
//               '::placeholder': {
//                 color: '#aab7c4',
//               },
//             },
//             invalid: {
//               color: '#9e2146',
//             },
//           },
//         }}
//       />
//       <button type="submit" disabled={!stripe || !clientSecret} className="btn btn-primary btn-sm my-4">Donate</button>
//       <p className="text-red-500">{error}</p>
//       {transactionId && <p className="text-green-400 ">Your Transaction ID: {transactionId}</p>}
//     </form>
//   );
// };

// export default CheckoutForm;
 