"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ContentItem {
  title: string | null;
  url: string;
  img: string;
}

const Slider = () => {
  const [slides, setSlides] = useState<ContentItem[]>([]);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const url = `${process.env.NEXT_PUBLIC_API_BASE}/data/v3/GetHomePageData?unixtime=${now}&device=all&milisecond=false`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.data?.[0]?.content) {
          setSlides(data.data[0].content);
        } else {
          setSlides([]);
        }
      })
      .catch((err) => {
        console.error("Fetch hatası:", err);
      });
  }, []);

  return (
    <Carousel className="w-full relative cursor-pointer">
      <CarouselContent className="!ml-0 ">
        {slides.map((item, i) => {
          const isVideo = item.img?.toLowerCase().endsWith(".mp4");

          return (
            <CarouselItem key={i} className="w-full !pl-0">
             
                <Card className="w-full shadow-none border-none rounded-none">
                  <CardContent className="relative w-full p-0">
                    {isVideo ? (
                      <video
                        className="w-full h-auto object-cover object-center"
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source src={item.img} type="video/mp4" />
                        Tarayıcınız video etiketini desteklemiyor.
                      </video>
                    ) : (
                      <Image
                        src={item.img.trim()}
                        alt={item.title || `Slider Image ${i + 1}`}
                        width={1920}
                        height={600}
                        className="w-full h-auto object-cover object-center"
                        unoptimized
                      />
                    )}
                  </CardContent>
                </Card>
             
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-xs bg-gray-200 hover:bg-gray-300 transition [&>svg]:w-6 [&>svg]:h-6 cursor-pointer" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-xs bg-gray-200 hover:bg-gray-300 transition [&>svg]:w-6 [&>svg]:h-6 cursor-pointer" />
    </Carousel>
  );
};

export default Slider;
