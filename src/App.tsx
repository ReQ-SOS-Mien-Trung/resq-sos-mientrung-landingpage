import Hero from "./components/Hero";
import Services from "./components/Services";
import Contributions from "./components/Contributions";
import Newsroom from "./components/Newsroom";
import MainLayout from "./layouts/MainLayout";

function App() {
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

export default App;
