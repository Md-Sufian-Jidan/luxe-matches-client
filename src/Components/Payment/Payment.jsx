import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import CheckoutPage from "./CheckOutPage";
import { motion } from "framer-motion";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: bioData = {} } = useQuery({
    queryKey: ['single-bioData'],
    enabled: !!user?.email || !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/single-bioData/${id}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-bg-soft flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8"
      >
        <h2 className="text-3xl font-heading text-primary mb-6 text-center">
          Complete Your Payment
        </h2>

        <p className="text-text-secondary text-sm font-body text-center mb-8">
          Please review the information and proceed to make your payment securely.
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutPage singleBioData={bioData} />
        </Elements>
      </motion.div>
    </div>
  );
};

export default Payment;