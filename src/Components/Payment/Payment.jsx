import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import CheckoutPage from "./CheckOutPage";

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
        }
    });

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutPage singleBioData={bioData} />
            </Elements>
        </div>
    );
};

export default Payment;