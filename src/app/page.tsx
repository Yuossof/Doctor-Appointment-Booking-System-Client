import UpdateMessage from "@/components/UpdateMessage/UpdateMessage";
import { cookies } from "next/headers";
import ShowMessage from '@/components/ShowMessage/ShowMessage';

import CareAndQuality from "@/components/home-page/care-and-quality/CareAndQuality";
import DentalAdvantages from "@/components/home-page/dental-advantages/DentalAdvantages";
import HappyClients from "@/components/home-page/happy-clients/HappyClients";
import Hero from "@/components/home-page/hero/Hero";
import SepecialistsSection from "@/components/home-page/specialists-section/SepecialistsSection";
import WelcomePlaylist from "@/components/home-page/welcome-with-playlist/WelcomePlaylist";
import { GetUser } from "@/lib/services/auth/GetUser";

export default async function Home() {
  const message = (await cookies()).get('message')?.value;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = await GetUser();
  
  return (
    <div>
      <UpdateMessage message={message}/>
      <ShowMessage/>
      <div className="container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]">
        <Hero />
        <div className="my-32 w-full"></div>
        <DentalAdvantages />
        <div className="my-32 w-full"></div>
        <CareAndQuality />
        <div className="my-32 w-full"></div>
        <WelcomePlaylist />
      </div>

      <div className="my-32 w-full"></div>

      <SepecialistsSection />
      <div className="my-32 w-full"></div>

      <div className="container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]">
        <HappyClients />
      </div>
    </div>
  );
}
