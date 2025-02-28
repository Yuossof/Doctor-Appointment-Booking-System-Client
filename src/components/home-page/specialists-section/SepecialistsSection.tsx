"use client"
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const SpecialistsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 768) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth < 1280) {
        setSlidesToShow(4);
      } else {
        setSlidesToShow(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = [
    {
      title: "Jim Carry",
      description: "Orthodontists",
      image: '/images/Mask group (1).png'
    },
    {
      title: "Wade Warren",
      description: "Endodontists",
      image: "/images/Mask group (2).png"
    },
    {
      title: "Jenny Welson",
      description: "Endodontists",
      image: "/images/Mask group (3).png"
    },
    {
      title: "Wade Warren",
      description: "Endodontists",
      image: "/images/Mask group.png"
    },
    {
      title: "Jecob Jhones",
      description: "Endodontists",
      image: "/images/Mask group (3).png"
    },
    {
      title: "Jecob Jhones",
      description: "Endodontists",
      image: "/images/Mask group (3).png"
    },
    {
      title: "Jecob Jhones",
      description: "Endodontists",
      image: "/images/Mask group (3).png"
    },
  ];

  const totalSlides = slides.length;
  const maxSlideIndex = totalSlides - slidesToShow;

  const goToSlide = (index: number) => {
    if (index < 0) {
      setCurrentSlide(0);
    } else if (index > maxSlideIndex) {
      setCurrentSlide(maxSlideIndex);
    } else {
      setCurrentSlide(index);
    }
  };

  const slideWidth = `${100 / slidesToShow}%`;

  return (
    <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 bg-slate-100 flex flex-col items-center">
      <div className="container mx-auto px-4 max-w-7xl flex items-center w-full gap-4">
        {/* Slider Container */}
        <button
          className="bg-white text-slate-800 border-[1px] border-gray-300 sm:px-4 py-1 rounded-lg hover:bg-slate-200 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm "
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
        >
          <ChevronRight size={20} className="rotate-180"/>
        </button>
        <div className="relative overflow-hidden w-full">

          <div
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{
              transform: `translateX(-${(currentSlide * (100 / slidesToShow))}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                style={{ width: slideWidth }}
                className="flex-shrink-0 px-2 sm:px-3 md:px-4"
              >
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden mx-auto
                              max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[250px]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 
                           (max-width: 768px) 50vw, 
                           (max-width: 1024px) 33vw, 
                           (max-width: 1280px) 25vw, 
                           20vw"
                  />
                  <div className="absolute bottom-0 left-0 w-[80%] rounded-tr-xl bg-teal-800 p-2 sm:p-3">
                    <h3 className="text-sm sm:text-md font-bold text-white">{slide.title}</h3>
                    <p className="text-xs sm:text-sm text-white">{slide.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        <button
          className="bg-white text-slate-800 border-[1px] px-3 sm:px-4 py-1 rounded-lg hover:bg-slate-200 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={currentSlide === maxSlideIndex}
        >
          <ChevronRight size={20} className="rotate-80" />
          
        </button>
        {/* Navigation Buttons */}
      </div>
      <Button asChild className=" py-5 bg-teal-700 px-9 md:mt-14 mt-9 hover:bg-teal-600 hover:px-11 transition-all">
        <Link href="doctors" >
          View All
          <ArrowRight />
        </Link>
      </Button>
    </section>
  );
};

export default SpecialistsSection;