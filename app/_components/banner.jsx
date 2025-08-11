"use client";

import { Carousel, CarouselContent, CarouselItem } from "../../components/ui/carousel";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import CustomImage from "../../components/shared/customImage";
import Link from "next/link";
import { imageUrl } from "@/lib/utils";

const Banner = ({ banners }) => {
  if (banners?.length > 0) {
    return (
      <main className={"mx-auto w-full pb-3"}>
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
                        href={`/${item?.category_id}/${item?.product_id}`}
                      >
                        <div className="relative mx-auto aspect-[12/5] sm:aspect-[15/5] md:aspect-[16/4] rounded-[10px] overflow-hidden">
                          <CustomImage
                            src={`${imageUrl}${item?.image}`}
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
  }
};

export default Banner;
