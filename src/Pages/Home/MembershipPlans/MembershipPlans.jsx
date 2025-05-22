import { useState } from 'react';
import clsx from 'clsx';

const plans = [
    {
        name: 'Basic',
        monthlyPrice: '$19',
        yearlyPrice: '$190',
        features: ['Profile creation', 'Basic matching', 'Limited messages'],
        popular: false,
    },
    {
        name: 'Premium',
        monthlyPrice: '$39',
        yearlyPrice: '$390',
        features: ['Everything in Basic', 'Advanced matching', 'Unlimited messages', 'Priority support'],
        popular: true,
    },
    {
        name: 'Elite',
        monthlyPrice: '$79',
        yearlyPrice: '$790',
        features: ['Everything in Premium', '1-on-1 concierge service', 'Private events access'],
        popular: false,
    },
];

const MembershipPlans = () => {
    const [billingCycle, setBillingCycle] = useState('monthly');

    return (
        <section className="w-full px-4 py-12 bg-bg-soft text-text-main dark:bg-gray-900 dark:text-white font-body">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4 font-heading">Membership Plans</h2>
                <p className="mb-8 text-text-secondary dark:text-gray-400">Detail the different subscription options available</p>

                {/* Toggle for billing cycle */}
                <div className="mb-10 flex justify-center gap-4 items-center">
                    <span className={clsx('cursor-pointer', billingCycle === 'monthly' && 'font-semibold text-primary')} onClick={() => setBillingCycle('monthly')}>Monthly</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" onChange={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                    <span className={clsx('cursor-pointer', billingCycle === 'yearly' && 'font-semibold text-primary')} onClick={() => setBillingCycle('yearly')}>Yearly</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={clsx(
                                'p-6 rounded-2xl shadow-lg border transition-transform hover:scale-105 bg-white dark:bg-gray-800 dark:border-gray-700',
                                plan.popular && 'border-primary scale-105 relative'
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    Best Value
                                </div>
                            )}
                            <h3 className="text-xl font-bold mb-2 font-heading">{plan.name}</h3>
                            <p className="text-3xl font-extrabold text-primary mb-4">
                                {billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                                <span className="text-base text-text-secondary dark:text-gray-300 font-normal ml-1">/{billingCycle}</span>
                            </p>
                            <ul className="text-left mb-6 space-y-2">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="text-text-secondary dark:text-gray-300 flex items-start gap-2">
                                        <span className="text-primary font-bold">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-btn text-white font-semibold py-2 rounded-xl hover:bg-primary transition">
                                Choose Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default MembershipPlans;
