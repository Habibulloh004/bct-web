"use client";

import { Carousel, CarouselContent, CarouselItem } from "../../components/ui/carousel";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import CustomImage from "../../components/shared/customImage";
import Link from "next/link";

const Banner = ({ banners }) => {
  return (
    <main className={"mx-auto w-full py-3 md:py-5"}>
      <section className="flex items-center w-full justify-center h-full">
        {/* Mobile View */}
        <div className="bg-transparent rounded-xl w-full">
          <Carousel
            paginate={"false"}
            plugins={[
              emblaCarouselAutoplay({
                delay: 10000,
              }),
            ]}
            opts={{
              loop: true, // Loopni qo'shish
              align: "center",
            }}
            className="w-full text-secondary"
          >
            <CarouselContent className="my-0 py-0 px-2 md:px-4 lg:px-8 lg:gap-8">
              {banners.map((item, i) => {
                return (
                  <CarouselItem key={i} className="">
                    <Link
                      className="mt-1 relative"
                      href="/banners"
                    >
                      <div className="z-[100] absolute top-[17%] left-[13%] space-y-2">
                        <h1 className=" text-white font-bold text-4xl">
                          Новинки
                        </h1>
                        <p className="font-[300] ml-6 text-white text-3xl">
                          Продано за все время
                        </p>
                      </div>
                      <div className="relative mx-auto aspect-[16/4] rounded-[10px] overflow-hidden">
                        <CustomImage
                          src={'/images/background1.jpg'}
                          alt={`banner-img`}
                          fill
                          loading="eager"
                          className="w-full mx-auto aspect-video mb-5 object-cover"
                          property={"true"}
                        />
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </main>
  );
};

export default Banner;
