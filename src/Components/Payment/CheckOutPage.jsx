import { useNavigate, useParams } from 'react-router-dom';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const CheckoutPage = ({ singleBioData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure
      .post('/create-payment-intent', { amount: 5 })
      .then(res => setClientSecret(res?.data?.client_secret))
      .catch(() => {});
  }, []);

  const onSubmit = async () => {
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      Swal.fire('Payment Error', error.message, 'error');
      return;
    } else {
      toast.warn('Your payment is processing...');
    }

    const address = {
      line1: "Bangladesh",
      postal_code: 98140,
      city: singleBioData.bioData.permanentDivision,
      state: singleBioData.bioData.permanentDivision,
      country: 'BD',
    };

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email,
          name: user?.displayName,
          address
        }
      }
    });

    if (confirmError) return;

    if (paymentIntent.status === 'succeeded') {
      const paymentDetails = {
        bioDataId: singleBioData?.bioData?.bioDataId,
        requesterEmail: user?.email,
        requesterName: user?.displayName,
        requestedName: singleBioData?.name,
        requestedEmail: singleBioData?.email,
        requestedMobile: singleBioData?.bioData?.mobile,
        approved: false,
        paymentId: paymentIntent?.id,
        paymentStatus: paymentIntent?.status,
        amountPaid: 5,
        currency: "usd",
        createdAt: new Date(),
        approvedAt: null,
      };

      await axiosSecure.post('/contact-payment', paymentDetails)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Your contact request has been sent to the admin.",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/requests');
        });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl px-8 py-10"
    >
      <h2 className="text-3xl font-heading text-primary text-center mb-4">
        Checkout – Request Contact Info
      </h2>
      <p className="text-text-secondary text-center text-sm mb-6 font-body">
        Securely complete your payment to access contact information.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-body">
        <div>
          <label className="block text-sm text-text-main mb-1">Biodata ID</label>
          <input
            type="text"
            value={singleBioData?.bioData?.bioDataId}
            readOnly
            className="w-full px-4 py-2 bg-bg-soft text-text-main border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm text-text-main mb-1">Your Email</label>
          <input
            type="email"
            value={user?.email}
            readOnly
            className="w-full px-4 py-2 bg-bg-soft text-text-main border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm text-text-main mb-1">Card Info</label>
          <div className="px-4 py-3 border border-gray-300 rounded-lg bg-white">
            <CardElement options={{ hidePostalCode: true }} />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full bg-accent text-white py-2 rounded-xl font-semibold shadow hover:bg-primary transition duration-300"
        >
          Pay $5 & Submit Request
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CheckoutPage;