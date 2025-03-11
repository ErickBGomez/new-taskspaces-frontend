import BenefitsSection from './BenefitsSection/BenefitsSection';
import CTASection from './CTASection/CTASection';
import FeaturesSection from './FeaturesSection/FeaturesSection';
import FieldsSection from './FieldsSection/FieldsSection';
import HeroSection from './HeroSection/HeroSection';
import Testimonial from './TestimonialsSection/Testimonial/Testimonial';

export default function LandingPage() {
  return (
    <div className="landing">
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <FieldsSection />
      <Testimonial />
      <CTASection />
    </div>
  );
}
