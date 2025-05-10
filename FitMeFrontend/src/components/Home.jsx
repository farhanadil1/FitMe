import React, { useEffect, useState } from 'react';
import WorkoutTracker from './WorkoutTracker';
import MealLogger from './MealLogger';
import ProgressAnalytics from './ProgressAnalytics';
import Footer from './Footer';
import Review from './Review';
import Coache from './Coach';
import HeroSection from './HeroSection';
import PageLoader from './PageLoader';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration
      once: true, // animate only once
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 2 seconds fake loading

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />; 
  }

  return (
    <div className="space-y-10 p-6">
      <section  data-aos="fade-up">
        <HeroSection />
      </section>

      <section  data-aos="fade-right">
        <WorkoutTracker />
      </section>

      <section  data-aos="fade-left">
        <MealLogger />
      </section>

      <section  data-aos="zoom-in-up">
        <ProgressAnalytics />
      </section>

      <div data-aos="fade-up">
        <Review />
      </div>

      <div data-aos="fade-up">
        <Coache />
      </div>

      <div data-aos="fade">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
