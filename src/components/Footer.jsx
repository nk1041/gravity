const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          
          <div className="lg:col-span-2">
            <a href="#" className="text-2xl font-heading font-bold text-white mb-4 block">
              SimplyAbled
            </a>
            <p className="text-gray-400 mb-6 max-w-sm">
              Empowering special education professionals with intelligent tools to reduce paperwork and improve student outcomes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold font-heading mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary-300 transition-colors">IEP Generator</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">ITP Generator</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">Lesson Plans</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold font-heading mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary-300 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold font-heading mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">FERPA Compliance</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-colors">HIPAA Compliance</a></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SimplyAbled, Inc. All rights reserved.
          </p>
          <div className="flex items-center">
            <form className="flex w-full max-w-sm">
              <input 
                type="email" 
                placeholder="Subscribe to our newsletter" 
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg border border-gray-700 focus:outline-none focus:border-primary w-full text-sm"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-r-lg font-medium text-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
