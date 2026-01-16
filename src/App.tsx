import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Contributions,
  Hero,
  Newsroom,
  RegisterPage,
  Services,
} from "@/components";
import MainLayout from "@/layouts/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      <Hero />
      <Services />
      <Contributions />
      <Newsroom />
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
