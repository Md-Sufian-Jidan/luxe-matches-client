import { useNavigate, useParams } from 'react-router-dom';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const CheckoutPage = ({ singleBioData }) => {
    const stripe = useStripe();
    const { user } = useAuth();
    const elements = useElements();
    const { handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { amount: 5 })
            .then(res => {
                setClientSecret(res?.data?.client_secret);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);


    const onSubmit = async () => {
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment method error', error);
            Swal.fire('Payment Error', error.message, 'error');
        }
        else {
            toast.warn('Your payment is processing!');
            console.log('success', paymentMethod);
        };
        const address = {
            line1: "Bangladesh",
            postal_code: 98140,
            city: singleBioData.bioData.permanentDivision,
            state: singleBioData.bioData.permanentDivision,
            country: 'BD',
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,
                    address: address
                }
            }
        });

        if (confirmError) {
            console.log(confirmError);
        }
        else {
            console.log('payment intent ', paymentIntent);
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
                    .then(res => {
                        Swal.fire({
                            icon: "success",
                            title: `Your contact request is send to the admin`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard/requests')
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white shadow p-6 rounded mt-10">
            <h2 className="text-2xl font-bold mb-4 text-rose-600">Checkout – Request Contact Info</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium">Biodata ID</label>
                    <input
                        type="text"
                        value={singleBioData?.bioData?.bioDataId}
                        readOnly
                        className="w-full px-3 py-2 border rounded bg-gray-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Your Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="w-full px-3 py-2 border rounded bg-gray-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Card Info</label>
                    <div className="px-3 py-2 border rounded">
                        <CardElement options={{ hidePostalCode: true }} />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700"
                >
                    Pay $5 & Submit Request
                </button>
            </form>
        </div>
    );
}

export default CheckoutPage;