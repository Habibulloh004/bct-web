"use client";

import { Carousel, CarouselContent, CarouselDots, CarouselItem, CarouselLongDots, CarouselProgressBar } from "../../../components/ui/carousel";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import CustomImage from "../../../components/shared/customImage";
import Link from "next/link";
import { imageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import InfinityCard from "@/components/shared/infinityCard";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import { getTranslatedValue } from "@/lib/functions";

const Banner = ({ partners, banners, contact }) => {
  const { t, i18n } = useTranslation();
  // hozirgi yilni olish
  const currentYear = new Date().getFullYear();

  // kompaniya tashkil topgan yil (2006)
  const foundedYear = 2006;

  // necha yil bo‘lganini hisoblash
  const years = currentYear - foundedYear;

  // endi i18next ga yuboramiz
  const stats = t("aboutUs.stats.items", {
    returnObjects: true,
    year: years, // {{year}} shu qiymat bilan to'ldiriladi
  });


  return (
    <main className="w-full py-6">
      <div className="">
        <div className=" grid grid-cols-3 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left Column */}
          <div className="flex flex-col max-lg:col-span-2 gap-6 lg:gap-8 order-1 xl:order-1">

            {/* Company Section */}
            <section className="z-[100] space-y-1 md:space-y-4 lg:space-y-6">
              <h1 className=" font-bold md:-translate-y-[16px] text-[20px] md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-poppins-regular text-black leading-tight">
                {contact?.company_name ? contact?.company_name : "BarCodeTechnologies"}
              </h1>
              <p className="text-primary text-xs md:text-lg lg:text-xl max-w-full xl:max-w-[80%] leading-relaxed">
                {t('banner.company.description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-4 lg:gap-5 mt-6">
                <Link href="all-products">
                  <Button className="w-auto text-md md:text-lg lg:text-xl px-4 py-2 md:px-6 md:py-3 h-auto flex justify-center items-center gap-2 rounded-full">
                    <h1>{t('banner.buttons.catalog')}</h1>
                    <ArrowRight className="mt-1" />
                  </Button>
                </Link>
                <Link href="/about-us" className="font-medium underline text-md md:text-lg lg:text-xl">
                  {t('banner.buttons.aboutUs')}
                </Link>
              </div>
            </section>

            {/* Partners Section */}
            <section className="max-sm:hidden space-y-3 lg:space-y-4">
              <h1 className="font-bold text-xl">{t('banner.partners.title')}</h1>
              <div className="max-w-11/12 xl:max-w-full">
                <InfinityCard

                  type="online"
                  classNameImage={"h-14 md:h-18 rounded-md p-1"}
                  data={partners}
                />
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="flex flex-col col-span-1 gap-6 lg:gap-8 order-2 xl:order-2">

            {/* Stats and Decorative Section */}
            <section className="w-full flex flex-col lg:flex-row gap-4">
              <div className="w-full flex items-end justify-end lg:items-center">
                <div className="relative flex flex-col-reverse lg:flex-row justify-end items-end lg:items-center gap-4">
                  {/* Decorative Background */}
                  <div className="relative w-[150px] md:w-[200px] lg:w-[250px] h-[150px] md:h-[200px] lg:h-[250px] xl:w-[300px] xl:h-[300px] flex-shrink-0">
                    <div className="w-full h-full aspect-square bg-[#3B4154] rounded-tl-[100%] rounded-tr-[8px] rounded-bl-[8px]" />
                    <Image
                      className="w-[100px] md:w-[125px] lg:w-[160px] xl:w-[200px] absolute top-8 md:top-10 -right-4 md:-right-6"
                      src="/images/banner1.png"
                      alt="img"
                      width={100}
                      height={100}
                      loading="eager"
                      sizes="(max-width: 1280px) 160px, 300px"
                    />
                    <Image
                      className="w-[100px] md:w-[125px] lg:w-[160px] xl:w-[200px] absolute top-10 md:top-14 -left-6 md:-left-10"
                      src="/images/banner2.png"
                      alt="img"
                      width={100}
                      height={100}
                      loading="eager"
                      sizes="(max-width: 1280px) 160px, 200px"
                    />
                  </div>
                  {/* Stats Carousel */}
                  <div className="w-full max-w-[120px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[300px] flex-shrink-0">
                    <Carousel
                      paginate={"false"}
                      plugins={[
                        emblaCarouselAutoplay({
                          delay: 3000,
                        }),
                      ]}
                      opts={{
                        align: "center",
                        loop: true
                      }}
                      className="w-full text-secondary"
                    >
                      <CarouselContent className="w-full">
                        {stats?.map((item, i) => {
                          return (
                            <CarouselItem key={i} className="">
                              <div className="w-[120px] md:w-[200px] lg:w-[250px] xl:w-[300px] bg-[#F0F0F0] text-black p-2 sm:p-3 md:p-4 lg:p-5 rounded-xl shadow flex flex-col h-[120px] md:h-[200px] lg:h-[250px] xl:h-[300px] justify-center items-center">
                                <Image
                                  src={`/stats/${i + 1}.png`}
                                  alt={item?.label}
                                  width={75}
                                  height={75}
                                  loading="eager"
                                  className="w-7 h-7 md:w-10 md:h-10 lg:w-[75px] lg:h-[75px] mb-1 md:mb-4"
                                />
                                <div className="text-center">
                                  <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-7xl font-bold text-primary  md:mb-2">{item?.value}</h3>
                                  <p className="text-[10px] sm:text-xs md:text-sm">{item?.label}</p>
                                </div>
                              </div>
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>
                      <CarouselProgressBar
                        progressClassName="bg-primary bottom"
                      />
                    </Carousel>
                  </div>
                </div>
              </div>
            </section>

            {/* Banner Carousel Section */}
            <section className="hidden w-full lg:flex justify-end items-end ">
              <div className="w-[530px] xl:w-[640px]">
                <Carousel
                  paginate={"false"}
                  plugins={[
                    emblaCarouselAutoplay({
                      delay: 10000,
                    }),
                  ]}
                  opts={{
                    align: "center",
                    loop: true
                  }}
                  className="text-secondary"
                >
                  <CarouselContent className="w-full">
                    {banners?.map((item, i) => {
                      return (
                        <CarouselItem key={i} className={`basis-full rounded-md`}>
                          <Link
                            className="mt-1 relative flex flex-row p-4 gap-4 bg-primary rounded-md"
                            href={`/${item?.category_id}/${item?.product_id}`}
                          >
                            <div className="w-full lg:w-[300px] flex flex-col justify-center">
                              <div className="flex justify-start items-center gap-2 mb-4">
                                <div className="w-10 h-[1px] bg-white" />
                                <h1 className="font-medium text-sm lg:text-base">{getTranslatedValue(item?.title, i18n?.language)}</h1>
                              </div>
                              <p className="line-clamp-3 text-2xl xl:text-3xl font-bold leading-tight">
                                {getTranslatedValue(item?.description, i18n?.language)}
                              </p>
                            </div>
                            <div className="w-[250px] xl:w-[300px] h-[150px] rounded-2xl overflow-hidden flex-shrink-0">
                              <CustomImage
                                src={`${imageUrl}${item?.image}`}
                                alt={`banner-img`}
                                fill
                                loading="eager"
                                className="w-full mx-auto aspect-video object-contain"
                                property={"true"}
                              />
                            </div>
                          </Link>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselLongDots />
                </Carousel>
              </div>
            </section>
          </div>
        </div>
        <section className="sm:hidden space-y-3 lg:space-y-4">
          <h1 className="font-bold text-xl">{t('banner.partners.title')}</h1>
          <div className="">
            <InfinityCard
              type="online"
              classNameImage={""}
              data={partners}
            />
          </div>
        </section>
        {/* Banner Carousel Section */}
        <section className="lg:hidden mt-4">
          <Carousel
            paginate={"false"}
            plugins={[
              emblaCarouselAutoplay({
                delay: 10000,
              }),
            ]}
            opts={{
              align: "center",
              loop: true
            }}
            className="text-secondary"
          >
            <CarouselContent className="w-full">
              {banners?.map((item, i) => {
                return (
                  <CarouselItem key={i} className={`basis-full`}>
                    <Link
                      className="w-full mt-1 relative flex flex-row p-4 gap-4 bg-primary rounded-md"
                      href={`/${item?.category_id}/${item?.product_id}`}
                    >
                      <div className="w-full flex flex-col justify-center">
                        <div className="flex justify-start items-center gap-2 mb-4">
                          <div className="w-10 h-[1px] bg-white" />
                          <h1 className="font-medium text-sm lg:text-base line-clamp-1">{getTranslatedValue(item?.title, i18n?.language)}</h1>
                        </div>
                        <p className="line-clamp-3 text-2xl xl:text-3xl font-bold leading-tight">
                          {getTranslatedValue(item?.description, i18n?.language)}
                        </p>
                      </div>
                      <div className="w-[150px] sm:w-[250px] xl:w-[300px] h-[150px] rounded-2xl overflow-hidden flex-shrink-0">
                        <CustomImage
                          src={`${imageUrl}${item?.image}`}
                          alt={`banner-img`}
                          fill
                          loading="eager"
                          className="w-full mx-auto aspect-video object-contain"
                          property={"true"}
                        />
                      </div>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselLongDots />
          </Carousel>
        </section>
      </div>
    </main>
  );
};

export default Banner;