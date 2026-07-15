import FadeIn from '../components/FadeIn';

const RefundPolicyPage = () => {
  return (
    <section className="py-24 bg-altBackground relative overflow-hidden min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-textColor tracking-tight">
              Refund & <span className="text-primary">Cancellation</span> Policy
            </h1>
            <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-premium border border-gray-100/80 dark:border-white/10 space-y-8 text-gray-700 dark:text-gray-300">
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Subscription Cancellations</h2>
              <p className="leading-relaxed mb-4">
                You can cancel your SimplyAbled subscription at any time. When you cancel, your subscription will remain active until the end of your current billing cycle. After the cycle ends, your account will be downgraded to the free tier, and you will not be charged again.
              </p>
              <p className="leading-relaxed">
                To cancel, navigate to your Account Settings &gt; Billing &gt; Cancel Subscription.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Refund Eligibility</h2>
              <div className="bg-gray-50 dark:bg-slate-900/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
                  <li><strong>Monthly Subscriptions:</strong> Payments for monthly subscriptions are non-refundable. If you cancel, you will retain access until the month concludes.</li>
                  <li><strong>Annual Subscriptions:</strong> We offer a 7-day money-back guarantee for annual subscription plans. If you are unsatisfied, contact us within 7 days of your initial purchase for a full refund.</li>
                  <li><strong>Automatic Renewals:</strong> We do not offer refunds for automatic renewals if you forget to cancel before the billing date.</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Processing Refunds</h2>
              <p className="leading-relaxed">
                If your refund request is approved under our 7-day guarantee, the refund will be processed within 5-7 business days. The amount will be credited back to your original method of payment in accordance with your bank's processing times.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Contacting Us for Refunds</h2>
              <p className="leading-relaxed">
                To request a refund for an eligible annual plan, please email us directly at <strong>[support@simplyabled.com]</strong> with your account email address and receipt number.
              </p>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default RefundPolicyPage;
