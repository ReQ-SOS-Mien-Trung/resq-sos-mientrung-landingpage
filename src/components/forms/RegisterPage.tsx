import MainLayout from "@/layouts/MainLayout";
import { RegisterHero } from ".";
import { FAQs, WaysToBePartner, WhyUseUs } from "..";

const RegisterPage = () => {


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
    </MainLayout>
  );
};

export default RegisterPage;
