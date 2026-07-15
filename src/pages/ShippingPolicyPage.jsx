import FadeIn from '../components/FadeIn';

const ShippingPolicyPage = () => {
  return (
    <section className="py-24 bg-altBackground relative overflow-hidden min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-textColor tracking-tight">
              Shipping & <span className="text-primary">Delivery</span> Policy
            </h1>
            <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-premium border border-gray-100/80 dark:border-white/10 space-y-8 text-gray-700 dark:text-gray-300">
            
            <div className="flex justify-center mb-8">
              <div className="inline-block bg-orange-50 dark:bg-orange-500/10 px-4 py-2 rounded-full border border-orange-100 dark:border-orange-500/20">
                <span className="text-sm font-bold text-primary">SimplyAbled is a 100% Digital Service</span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Digital Delivery Only</h2>
              <p className="leading-relaxed mb-4">
                SimplyAbled is a web-based Software-as-a-Service (SaaS) platform designed for special education professionals. <strong>We do not sell, manufacture, or ship any physical products.</strong>
              </p>
              <p className="leading-relaxed">
                Therefore, no physical shipping or delivery is involved in any transaction made on this website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Immediate Access</h2>
              <p className="leading-relaxed mb-4">
                Upon successfully creating an account or upgrading to a paid subscription, your account will be activated or upgraded <strong>instantly</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
                <li>You can access the platform immediately via your web browser.</li>
                <li>Digital documents (such as IEPs or lesson plans) generated on the platform are immediately available to view, download (as PDF/Word), or print directly from your dashboard.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Technical Issues</h2>
              <p className="leading-relaxed">
                If you purchase a subscription but do not see your account upgraded immediately, or if you are unable to download your generated documents, this is a technical error rather than a delivery issue. Please contact our support team immediately at <strong>[support@simplyabled.com]</strong> so we can resolve the issue.
              </p>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default ShippingPolicyPage;
