"use client";

import { linkCustomer } from "@/lib/config";
import NavBar from "./_components_landingpage6/common/NavBar";
import BookNextTripSection from "./_components_landingpage6/sections/BookNextTripSection";
import CategorySection from "./_components_landingpage6/sections/CategorySection";
import FooterSection from "./_components_landingpage6/sections/FooterSection";
import HeroSection from "./_components_landingpage6/sections/HeroSection";
import LogoGroupSection from "./_components_landingpage6/sections/LogoGroupSection";
import NewsLetterSection from "./_components_landingpage6/sections/NewsLetterSection";
import TestimonialSection from "./_components_landingpage6/sections/TestimonialSection";
import TopSellingSection from "./_components_landingpage6/sections/TopSellingSection";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.data?.user.userID !== undefined) {
      console.log("User ID is not available.");
      // Optionally navigate to a login page
      router.push(`/product`);
    }
  }, []);
  const imageUrl =
    linkCustomer.golang_Base + linkCustomer.landingpagenavbarlogo;

  console.log(
    "nextjs/app/(landingpage)/page.tsx linkCustomer.golang_Base",
    linkCustomer.golang_Base
  );
  return (
    <main className="relative poppins  md:px-[9rem]">
      <NavBar />
      <div className="px-4 flex flex-col gap-[7.69rem]">
        <HeroSection />

        {/* <div className="absolute top-0 right-0 -z-10">
          <Image
            src={$(linkCustomer.golang_Base + linkCustomer.landingpagenavbarlogo)}
            alt="blob background shape"
            width={200}
            height={500}
          />
        </div> */}
        <div className="absolute top-0 left-0 -z-10">
          <Image
            src="/images_landingpage6/top-left-gradient.png"
            alt="blob background shape"
            width={200}
            height={500}
          />
        </div>
        <div className="relative">
          <CategorySection />
          <div className="absolute top-0 right-0">
            <Image
              src="/images_landingpage6/plus-group.png"
              alt="blob background shape"
              width={200}
              height={500}
            />
          </div>
        </div>

        <TopSellingSection />
        <BookNextTripSection />
        <TestimonialSection />
        <LogoGroupSection />
        <NewsLetterSection />
        <FooterSection />
      </div>
    </main>
  );
}
