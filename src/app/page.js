import HeroSection from "@/components/homepage/Banner";
import CTABanner from "@/components/homepage/CtaSection";
import Image from "next/image";
import PricingPage from "./pricing/page";

export default function Home() {
  return (
   <>
   <HeroSection/>
   <PricingPage/>
   <CTABanner/>
   </>
  );
}
