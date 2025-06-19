import React, { useState, useEffect } from 'react';
import 'animate.css';
import heroImg1 from "../Azure/assets/HeroBgAz4.avif";
import heroImg2 from "../Azure/assets/HeroBgAz.avif";
import heroImg3 from "../Azure/assets/HeroBg2.avif";
import heroImg4 from "../Azure/assets/HeroBgAz3.avif";
 
const heroImages = [heroImg1, heroImg2, heroImg3, heroImg4];
 
const HeroAzure = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 2000);
 
    return () => clearInterval(interval);
  }, []);
 
  return (
    <section
      className="relative min-h-[500px] flex items-center bg-no-repeat bg-cover bg-center transition-all duration-2000"
      style={{
        backgroundImage: `url(${heroImages[currentImageIndex]})`,
      }}
    >
      <div className="absolute inset-0 bg-white/20" />
 
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex justify-start">
        <div className="w-full md:w-1/2 text-left animate__animated animate__fadeInLeft space-y-6">
        <h1 className="text-5xl md:text-5xl font-bold mb-6 text-left bg-gradient-to-r from-[#7209b7] via-[#b5179e] to-[#3a0ca3] bg-clip-text text-transparent font-sans tracking-wide animate__animated animate__fadeInDown animate__delay-1s">
          Welcome To
          CloudThat Courses
        </h1>
 
        <p className="text-lg md:text-xl mb-8 text-left font-normal text-gray-700 animate__animated animate__fadeInUp animate__delay-2s font-sans">
          Learn at your own pace with courses built for every skill level. Develop skills through interactive modules and paths or learn from an instructor.
        </p>
        </div>
      </div>
    </section>
  );
};
 
export default HeroAzure;