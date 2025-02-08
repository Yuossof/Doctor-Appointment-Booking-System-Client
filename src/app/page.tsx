'use server';
import UpdateMessage from "@/components/UpdateMessage/UpdateMessage";
import { cookies } from "next/headers";
import ShowMessage from '@/components/ShowMessage/ShowMessage';

<<<<<<< HEAD
import CareAndQuality from "@/components/home/care-and-quality/CareAndQuality";
import DentalAdvantages from "@/components/home/dental-advantages/DentalAdvantages";
import Hero from "@/components/home/hero/Hero";
// import SepecialistsSection from "@/components/home/specialists-section/SepecialistsSection";
import WelcomeSection from "@/components/home/welcome-section/WelcomeSection";
import WelcomePlaylist from "@/components/home/welcome-with-playlist/WelcomePlaylist";
=======
import AskQuestion from "@/components/home-page/ask-question/AskQuestion";
import CareAndQuality from "@/components/home-page/care-and-quality/CareAndQuality";
import DentalAdvantages from "@/components/home-page/dental-advantages/DentalAdvantages";
import HappyClients from "@/components/home-page/happy-clients/HappyClients";
import Hero from "@/components/home-page/hero/Hero";
import SepecialistsSection from "@/components/home-page/specialists-section/SepecialistsSection";
import WelcomeSection from "@/components/home-page/welcome-section/WelcomeSection";
import WelcomePlaylist from "@/components/home-page/welcome-with-playlist/WelcomePlaylist";

>>>>>>> 0ec8306bc817504dfdb540a4e4ed355dc07de486


export default async function Home() {
  const message = (await cookies()).get('message')?.value;
  return (
    <div>
      <UpdateMessage message={message}/>
      <ShowMessage/>
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
<<<<<<< HEAD
      {/* <SepecialistsSection /> */}
=======
      <SepecialistsSection />
      <div className="my-32 w-full"></div>

      <div className="container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]">
        <HappyClients />
      </div>
>>>>>>> 0ec8306bc817504dfdb540a4e4ed355dc07de486
    </div>
  );
}
