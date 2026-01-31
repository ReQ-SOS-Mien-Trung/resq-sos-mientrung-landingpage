import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Contributions, DownloadAppPage, RegisterPage, Services, PrivacyPolicyPage, TermsOfServicePage } from "@/components";
import MainLayout from "@/layouts/MainLayout";
import { HeroSection, Newsroom, Features, AboutPage, NewsPage, ServicesPage, ContactPage, DonatePage, HelpCenterPage } from "./components/sections";
import ScrollToTop from "./components/ScrollToTop";

function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <Services />
      <Contributions />
      <Newsroom />
    </MainLayout>
  );
}

function FeaturesPage() {
  return (
    <MainLayout>
      <Features />
    </MainLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/download-app"
          element={
            <MainLayout>
              <DownloadAppPage />
            </MainLayout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <MainLayout>
              <PrivacyPolicyPage />
            </MainLayout>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <MainLayout>
              <TermsOfServicePage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />
        <Route
          path="/news"
          element={
            <MainLayout>
              <NewsPage />
            </MainLayout>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout>
              <ServicesPage />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <ContactPage />
            </MainLayout>
          }
        />
        <Route
          path="/donate"
          element={
            <MainLayout>
              <DonatePage />
            </MainLayout>
          }
        />
        <Route
          path="/help-center"
          element={
            <MainLayout>
              <HelpCenterPage />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
