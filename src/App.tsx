import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contributions from "./components/Contributions";
import Newsroom from "./components/Newsroom";
import RegisterPage from "./components/RegisterPage";
import MainLayout from "./layouts/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <Services />
      <Contributions />
      <Newsroom />
      {/* <HowItWorks />
      <Features />
      <RescuerForm /> */}
    </MainLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
