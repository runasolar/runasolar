import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { BrandMarquee } from "@/components/BrandMarquee";
import { Services } from "@/components/Services";
import { Cases } from "@/components/Cases";
import { CalculatorQuiz } from "@/components/CalculatorQuiz";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Header />
      <HeroSlider />
      <BrandMarquee />
      <Services />
      <Cases />
      <CalculatorQuiz />
      <Contact />
      <Footer />
      <MobileCTA />
    </main>
  );
}
