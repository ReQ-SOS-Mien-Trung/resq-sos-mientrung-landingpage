import { useState } from "react";
import RegisterHero from "./RegisterHero";
import WhyUseUs from "./WhyUseUs";
import WaysToBePartner from "./WaysToBePartner";
import FAQs from "./FAQs";
import CTABanner from "./CTABanner";
import RescuerForm from "./RescuerForm";
import MainLayout from "../layouts/MainLayout";

const RegisterPage = () => {
  const [showForm, setShowForm] = useState(false);

  const handleSignUpClick = () => {
    setShowForm(true);
    // Scroll to form after a short delay to ensure it's rendered
    setTimeout(() => {
      const formElement = document.getElementById("rescuer-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <RegisterHero />

      {/* Why Use Us & Testimonial Section */}
      <WhyUseUs />

      {/* Ways to be a Partner Section */}
      <WaysToBePartner />

      {/* FAQs Section */}
      <FAQs />

      {/* CTA Banner Section */}
      <CTABanner onSignUpClick={handleSignUpClick} />

      {/* Form Section - Hidden by default, shown when Sign Up is clicked */}
      {showForm && (
        <div id="rescuer-form">
          <RescuerForm />
        </div>
      )}
    </MainLayout>
  );
};

export default RegisterPage;
