import { Link } from 'react-router-dom';

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
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold font-heading mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">IEP Generator</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">ITP Generator</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Lesson Plans</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold font-heading mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold font-heading mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Refund & Cancellation</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Shipping & Delivery</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Cookie Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-primary-300 transition-all duration-300 ease-linear-curve hover:translate-x-1 inline-block">Disclaimer</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SimplyAbled, Inc. All rights reserved.
          </p>
          <div className="flex items-center w-full md:w-auto">
            <form className="flex w-full max-w-sm relative group">
              <input 
                type="email" 
                placeholder="Subscribe to our newsletter" 
                className="bg-gray-800/50 text-white px-5 py-2.5 rounded-l-xl border border-gray-700/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full text-sm transition-all duration-300 ease-linear-curve min-w-0 flex-1"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary-600 text-white px-6 py-2.5 rounded-r-xl font-medium text-sm transition-all duration-300 ease-linear-curve shadow-[0_2px_10px_-2px_rgba(107,70,193,0.3)] hover:shadow-[0_4px_15px_-3px_rgba(107,70,193,0.4)] active:scale-95 shrink-0"
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
