'use server';
import Hero from "@/components/hero/Hero";
import UpdateMessage from "@/components/UpdateMessage/UpdateMessage";
import { cookies } from "next/headers";
import ShowMessage from '@/components/ShowMessage/ShowMessage';

export default async function Home() {
  const message = (await cookies()).get('message')?.value;
  return (
    <div>
      <UpdateMessage message={message}/>
      <ShowMessage/>
      <Hero/>
    </div>
  );
}
