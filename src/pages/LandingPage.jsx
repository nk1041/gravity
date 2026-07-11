import Hero from '../components/Hero';
import BuiltFor from '../components/BuiltFor';
import Documentation from '../components/Documentation';
import ToolGrid from '../components/ToolGrid';
import HowItWorks from '../components/HowItWorks';
import DocumentPreview from '../components/DocumentPreview';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';

function LandingPage() {
  return (
    <>
      <Hero />
      <BuiltFor />
      <Documentation />
      <ToolGrid />
      <HowItWorks />
      <DocumentPreview />
      <FAQ />
      <FinalCTA />
    </>
  );
}

export default LandingPage;
