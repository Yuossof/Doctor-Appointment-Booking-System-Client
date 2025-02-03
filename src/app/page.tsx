
import CareAndQuality from "@/components/home/care-and-quality/CareAndQuality";
import DentalAdvantages from "@/components/home/dental-advantages/DentalAdvantages";
import Hero from "@/components/home/hero/Hero";
import SepecialistsSection from "@/components/home/specialists-section/SepecialistsSection";
import WelcomeSection from "@/components/home/welcome-section/WelcomeSection";
import WelcomePlaylist from "@/components/home/welcome-with-playlist/WelcomePlaylist";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]">
        <Hero />
        <div className="my-32 w-full"></div>
        <WelcomeSection />
        <div className="my-32 w-full"></div>
        <DentalAdvantages />
        <div className="my-32 w-full"></div>
        <CareAndQuality />
        <div className="my-32 w-full"></div>
        <WelcomePlaylist />
      </div>
      <div className="my-32 w-full"></div>
      <SepecialistsSection />
    </div>
  );
}
