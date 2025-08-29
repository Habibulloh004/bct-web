import React from 'react'
import Service from './_components/service'
import Vendors from './_components/vendors'
import MyProjects from './_components/myProjects'
import MyClients from './_components/myClients'
import AboutMain from './_components/AboutMain';
import { getData } from '@/actions/get'

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
  return (
    <main className='pt-8 space-y-4'>
      <AboutMain />
      <Service />
      <Vendors vendors={vendorsAbout?.data} />
      <MyProjects projects={projects?.data} />
      <MyClients partners={partners?.data} />
    </main>
  )
}