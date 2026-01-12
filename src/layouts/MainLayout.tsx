import type { PropsWithChildren } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
