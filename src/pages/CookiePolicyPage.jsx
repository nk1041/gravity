import FadeIn from '../components/FadeIn';

const CookiePolicyPage = () => {
  return (
    <section className="py-24 bg-altBackground relative overflow-hidden min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn direction="up">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold font-heading mb-6 text-textColor tracking-tight">
              Cookie <span className="text-primary">Policy</span>
            </h1>
            <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-premium border border-gray-100/80 dark:border-white/10 space-y-8 text-gray-700 dark:text-gray-300">
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. What Are Cookies?</h2>
              <p className="leading-relaxed">
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help the website remember your actions and preferences over time, so you don't have to keep re-entering them whenever you come back to the site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. How We Use Cookies</h2>
              <p className="leading-relaxed mb-4">At SimplyAbled, we use cookies for the following purposes:</p>
              <div className="bg-gray-50 dark:bg-slate-900/50 p-6 rounded-xl border border-gray-100 dark:border-slate-700">
                <ul className="list-disc pl-5 space-y-3 text-sm leading-relaxed">
                  <li><strong>Essential Cookies:</strong> These are required for the platform to function properly. They enable you to log in, maintain your session, and access secure areas of the dashboard.</li>
                  <li><strong>Performance & Analytics Cookies:</strong> We use tools like Microsoft Clarity and Google Analytics to understand how users interact with our platform. This helps us improve the user experience. These cookies collect data anonymously.</li>
                  <li><strong>Functional Cookies:</strong> These allow the platform to remember choices you make (like dark mode preferences or language).</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Managing Your Cookies</h2>
              <p className="leading-relaxed mb-4">
                You have the right to decide whether to accept or reject non-essential cookies. You can set or amend your web browser controls to accept or refuse cookies.
              </p>
              <p className="leading-relaxed text-sm">
                Please note: If you choose to reject essential cookies, you may not be able to log in to the SimplyAbled platform, as session tokens require cookies to function.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Third-Party Cookies</h2>
              <p className="leading-relaxed">
                In some special cases, we also use cookies provided by trusted third parties, such as analytics providers. These third-party cookies are subject to the respective privacy policies of those providers.
              </p>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default CookiePolicyPage;
