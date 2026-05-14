import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FactsMarquee } from "@/components/FactsMarquee";
import { ProblemSolution } from "@/components/ProblemSolution";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { DayInLife } from "@/components/DayInLife";
import { Calculator } from "@/components/Calculator";
import { Process } from "@/components/Process";
import { Cases } from "@/components/Cases";
import { ServiceArea } from "@/components/ServiceArea";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Header />
      <Hero />
      <FactsMarquee />
      <ProblemSolution />
      <Services />
      <HowItWorks />
      <DayInLife />
      <Calculator />
      <Process />
      <Cases />
      <ServiceArea />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <MobileCTA />
    </main>
  );
}
