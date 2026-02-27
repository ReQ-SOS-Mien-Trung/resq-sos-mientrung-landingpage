import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Contributions, DownloadAppPage, RegisterPage, Services, PrivacyPolicyPage, TermsOfServicePage, AuthRegisterPage, AuthLoginPage, AbilityQuestionsPage, PersonalInfoPage, DetailedAbilitiesPage, ProfilePage, ResendVerificationPage, EmailVerificationPendingPage, EmailVerificationSuccessPage } from "@/components";
import MainLayout from "@/layouts/MainLayout";
import { HeroSection, Newsroom, Features, AboutPage, NewsPage, ServicesPage, ContactPage, DonatePage, HelpCenterPage } from "./components/sections";
import ScrollToTop from "./components/ScrollToTop";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
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
          <Route path="/auth/register" element={<AuthRegisterPage />} />
          <Route path="/auth/login" element={<AuthLoginPage />} />
          <Route path="/auth/resend-verification" element={<ResendVerificationPage />} />
          <Route path="/auth/email-verification-pending" element={<EmailVerificationPendingPage />} />
          <Route path="/verify-email/success" element={<EmailVerificationSuccessPage />} />
          <Route path="/auth/personal-info" element={<PersonalInfoPage />} />
          <Route path="/auth/ability-check" element={<AbilityQuestionsPage />} />
          <Route path="/auth/detailed-abilities" element={<DetailedAbilitiesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
