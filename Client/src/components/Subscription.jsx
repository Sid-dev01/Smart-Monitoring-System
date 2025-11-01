


// const defaultPlans = [
//     {
//         id: 'silver',
//         name: 'Silver Plan',
//         price: 40,
//         period: 'month',
//         features: [
//             'Basic support',
//             'Limited access to resources',
//             'Contact support',
//             'Monthly updates',
//             'Up to 5 devices',
//         ],
//         cta: 'Sign Up',
//         featured: false,
//     },
//     {
//         id: 'gold',
//         name: 'Gold Plan',
//         price: 70,
//         period: 'month',
//         features: [
//             'Priority support',
//             'Unlimited access to resources',
//             'Contact support',
//             'Monthly updates',
//             'Up to 10 devices',
//         ],
//         cta: 'Sign Up',
//         featured: true,

//     },
//     {
//         id: 'premium',
//         name: 'Premium Plan',
//         price: 120,
//         period: 'month',
//         features: [
//             'Basic support',
//             'Limited access to resources',
//             'Contact support',
//             'Monthly updates',
//             'Up to 5 devices',
//         ],
//         cta: 'Sign Up',
//         featured: false,
//     },
// ];

// const PlanCard = ({ plan, onSubscribe }) => {
//     return (
//         <div
//             className={`rounded-xl p-6 shadow-lg border transition-transform hover:scale-105 bg-white/5 border-white/10 flex flex-col justify-between h-full ${plan.featured ? 'ring-2 ring-yellow-300/40' : ''}`}>
//             <div>
//                 <h3 className="text-xl font-semibold mb-2 text-black">{plan.name}</h3>
//                 <div className="flex items-baseline space-x-2 mb-4">
//                     <span className="text-3xl font-bold text-black">
//                         {isNaN(plan.price) ? plan.price : `$${plan.price}`}
//                     </span>
//                     <span className="text-sm text-black/80">
//                         {plan.period && `/${plan.period}`}
//                     </span>
//                 </div>
//                 <ul className="mb-6 space-y-2 text-black/80 text-sm">
//                     {(plan.features || []).map((feature, index) => (
//                         <li key={index} className="flex items-start gap-2">
//                             <span className="w-2 h-2 rounded-full bg-accent-400 mt-2" />
//                             <span>{feature}</span>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <div>
//                 <button
//                     onClick={() => onSubscribe && onSubscribe(plan)}
//                     className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.featured
//                             ? 'bg-yellow-400 text-accent-900 hover:bg-yellow-300'
//                             : 'bg-white/10 text-white hover:bg-white/20'
//                         }`}
//                 >
//                     {plan.cta}
//                 </button>
//             </div>
//         </div>
//     );
// };

// const Subscription = ({ plans, onSubscribe }) => {
//     const activePlans = Array.isArray(plans) && plans.length ? plans : defaultPlans;

//     return (
//         <section className="py-16 bg-white">
//             <div className="max-w-6xl mx-auto px-4">
//                 <div className="mb-10 text-center">
//                     <h2 style={{marginTop:"50px"}} className="text-3xl sm:text-4xl font-bold text-black">
//                         Subscription Plans
//                     </h2>
//                     <h4 className="text-black/80 mt-3 max-w-[800px] mx-auto text-xl">
//                         Choose a plan that fits your classroom monitoring needs. Upgrade anytime.
//                     </h4>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                     {activePlans.map((plan) => (
//                         <PlanCard
//                             key={plan.id}
//                             plan={plan}
//                             onSubscribe={onSubscribe}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Subscription;


import { useState } from 'react';

const defaultPlans = [
    {
        id: 'silver',
        name: 'Silver Plan',
        price: 40,
        period: 'month',
        features: [
            'Basic support',
            'Limited access to resources',
            'Contact support',
            'Monthly updates',
            'Up to 5 devices',
        ],
        cta: 'Sign Up',
        featured: true,
    },
    {
        id: 'gold',
        name: 'Gold Plan',
        price: 70,
        period: 'month',
        features: [
            'Priority support',
            'Unlimited access to resources',
            'Contact support',
            'Monthly updates',
            'Up to 10 devices',
        ],
        cta: 'Sign Up',
        featured: false,

    },
    {
        id: 'premium',
        name: 'Premium Plan',
        price: 120,
        period: 'month',
        features: [
            'Basic support',
            'Limited access to resources',
            'Contact support',
            'Monthly updates',
            'Up to 5 devices',
        ],
        cta: 'Sign Up',
        featured: false,
    },
];

const PlanCard = ({ plan, onSubscribe, isFeatured, onSelect }) => {
    return (
        <div
            
            onClick={onSelect}
            
            className={`rounded-xl p-6 shadow-lg border transition-transform hover:scale-105 flex flex-col justify-between h-full cursor-pointer
                ${isFeatured
                    ? 'ring-2 ring-yellow-300/40 bg-gray' 
                    : 'bg-white border-gray-200 hover:ring-2 hover:ring-purple-600/50'         
                }`}
        >
            <div>
                <h3 className="text-xl font-semibold mb-2 text-black">{plan.name}</h3>
                <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-3xl font-bold text-black">
                        {isNaN(plan.price) ? plan.price : `$${plan.price}`}
                    </span>
                    <span className="text-sm text-black/80">
                        {plan.period && `/${plan.period}`}
                    </span>
                </div>
                <ul className="mb-6 space-y-2 text-black/80 text-sm">
                    {(plan.features || []).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent-400 mt-2" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); 
                        onSubscribe && onSubscribe(plan);
                    }}
                    
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        isFeatured
                            ? 'bg-yellow-400 text-accent-900 hover:bg-yellow-300'
                            : 'bg-gray-100 text-gray-800 hover:bg-purple-600 hover:text-white'
                    }`}
                >
                    {plan.cta}
                </button>
            </div>
        </div>
    );
};

const Subscription = ({ plans, onSubscribe }) => {

    const [selectedPlanId, setSelectedPlanId] = useState('silver');

    const activePlans = Array.isArray(plans) && plans.length ? plans : defaultPlans;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="mb-10 text-center">
                    <h2 style={{marginTop:"50px"}} className="text-3xl sm:text-4xl font-bold text-black">
                        Subscription Plans
                    </h2>
                    <h4 className="text-black/80 mt-3 max-w-[800px] mx-auto text-xl">
                        Choose a plan that fits your classroom monitoring needs. Upgrade anytime.
                    </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {activePlans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            plan={plan}
                            onSubscribe={onSubscribe}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Subscription;