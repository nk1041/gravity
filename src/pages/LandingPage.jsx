import Header from '../components/Header';
import Hero from '../components/Hero';
import Documentation from '../components/Documentation';
import HowItWorks from '../components/HowItWorks';
import DocumentPreview from '../components/DocumentPreview';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="font-body text-textColor bg-background min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Documentation />
        <HowItWorks />
        <DocumentPreview />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
