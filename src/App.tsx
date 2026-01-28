import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Contributions, DownloadAppPage, RegisterPage, Services } from "@/components";
import MainLayout from "@/layouts/MainLayout";
import { HeroSection, Newsroom, Features } from "./components/sections";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
