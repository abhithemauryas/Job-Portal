import React from 'react'
import HeroSection from './HeroSection'
import LatestJobs from './LatestJobs'
import CategoryCarousel from './CategoryCarousel'
import Footer from './shared/Footer'
import useGetAllJobs from './hooks/useGetAllJobs'

const Home = () => {
  useGetAllJobs()
  return (
    <div>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home