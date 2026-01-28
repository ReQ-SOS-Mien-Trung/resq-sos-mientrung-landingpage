import { Footer, Header } from "@/components";
import type { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      {/* Main content with left margin for sidebar on desktop, top padding for header */}
      <main className="lg:ml-16 pt-14 sm:pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
