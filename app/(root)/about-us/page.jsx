import React from 'react'
import Service from './_components/service'
import Vendors from './_components/vendors'
import MyProjects from './_components/myProjects'
import MyClients from './_components/myClients'
import AboutMain from './_components/AboutMain';
import { getData } from '@/actions/get'
import JsonLd from '@/components/seo/JsonLd';
import { createBreadcrumbJsonLd, createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: "О компании и внедрении автоматизации в Узбекистане",
  description:
    "Bar Code Technologies с 2005 года помогает компаниям Retail, HoReCa, складов и производства в Узбекистане внедрять POS-оборудование, учет, маркировку и решения автоматизации.",
  path: "/about-us",
  keywords: [
    "Bar Code Technologies Узбекистан",
    "автоматизация предприятий Ташкент",
    "внедрение POS систем",
  ],
});

export default async function AboutUs() {
  let partners = await getData({
    endpoint: `/api/partners`,
    tag: ["partners"],
    revalidate: 3600
  })
  let vendors = await getData({
    endpoint: `/api/licenses?page=1&limit=12`,
    tag: ["licenses"],
    revalidate: 3600
  })
  let projects = await getData({
    endpoint: `/api/sertificates`,
    tag: ["sertificates"],
    revalidate: 3600
  })
  let vendorsAbout = await getData({
    endpoint: `/api/vendors-about`,
    tag: ["vendors-about"],
    revalidate: 3600
  })
    let companyStats = await getData({
      endpoint: `/api/company-stats`,
      tag: ["company-stats"],
      revalidate: 3600
    })
    let experiments = await getData({
      endpoint: `/api/experiments`,
      tag: ["experiments"],
      revalidate: 3600
    })
  return (
    <main className='pt-8 space-y-4'>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Главная", path: "/" },
          { name: "О компании", path: "/about-us" },
        ])}
      />
      <h1 className="sr-only">
        О компании Bar Code Technologies и автоматизации бизнеса в Узбекистане
      </h1>
      <AboutMain />
      <Service experiments={experiments?.data} companyStats={companyStats?.data} />
      <Vendors vendors={vendorsAbout?.data} />
      <MyProjects projects={projects?.data} />
      <MyClients partners={partners?.data} />
    </main>
  )
}
