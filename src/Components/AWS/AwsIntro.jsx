import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import aws from "../../assets/AWS-Header.png";
import CourseTimeline from "./CourseTimeline";
import CloudCareerPathSection from "./CareerPathSection";
import { ArrowRight } from "lucide-react";
import Footer from "../Nav/Footer";
import Navbar from "../Nav/Navbar";

const certifications = [
    { imageUrl: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Cloud-Practitioner_badge.634f8a21af2e0e956ed8905a72366146ba22b74c.png", pageUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/?ch=sec&sec=rmg&d=1" },
    { imageUrl: "https://d1.awsstatic.com/certification/badges/AWS-Certified-AI-Practitioner_badge_300x300.85cea45137696692de99a72934f6ddb81f82fc12.png", pageUrl: "https://aws.amazon.com/certification/certified-ai-practitioner/?ch=sec&sec=rmg&d=1" },
    { imageUrl: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Solutions-Architect-Professional_badge.69d82ff1b2861e1089539ebba906c70b011b928a.png", pageUrl: "https://aws.amazon.com/certification/certified-solutions-architect-professional/?ch=sec&sec=rmg&d=1" },
    { imageUrl: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-DevOps-Engineer-Professional_badge.7492bf660b5351e51f3f8015e4818924294a7e8c.png", pageUrl: "https://aws.amazon.com/certification/certified-devops-engineer-professional/?ch=sec&sec=rmg&d=1" },
    { imageUrl: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-SysOps-Administrator-Associate_badge.c3586b02748654fb588633314dd66a1d6841893b.png", pageUrl: "https://aws.amazon.com/certification/certified-sysops-admin-associate/?ch=sec&sec=rmg&d=1" },
    { imageUrl: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Developer-Associate_badge.5c083fa855fe82c1cf2d0c8b883c265ec72a17c0.png", pageUrl: "https://aws.amazon.com/certification/certified-developer-associate/?ch=sec&sec=rmg&d=1" },
    { imageUrl: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Solutions-Architect-Associate_badge.3419559c682629072f1eb968d59dea0741772c0f.png", pageUrl: "https://aws.amazon.com/certification/certified-solutions-architect-associate/?ch=sec&sec=rmg&d=1" },
    { imageUrl: "https://d1.awsstatic.com/certification/badges/AWS-Certified-Data-Engineer-Associate_badge_300x300.a231ff0ff32a28adf061d3f7fa36564964b4a4b5.png", pageUrl: "https://aws.amazon.com/certification/certified-data-engineer-associate/?ch=sec&sec=rmg&d=1" },
    { imageUrl: "https://d1.awsstatic.com/certification/badges/AWS-Certified-Machine-Learning-Engineer-Associate_badge_300x300.765d89ecbf75f371b057aefba731fb5e724cd092.png", pageUrl: "https://aws.amazon.com/certification/certified-machine-learning-engineer-associate/?ch=sec&sec=rmg&d=1" },
    { imageUrl: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Advanced-Networking-Specialty_badge.e09a4e04210dd4dd57ace21344af66986d4b4dc7.png", pageUrl: "https://aws.amazon.com/certification/certified-advanced-networking-specialty/?ch=sec&sec=rmg&d=1" },
    { imageUrl: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Machine-Learning-Specialty_badge.e5d66b56552bbf046f905bacaecef6dad0ae7180.png", pageUrl: "https://aws.amazon.com/certification/certified-machine-learning-specialty/" },
    { imageUrl: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Security-Specialty_badge.75ad1e505c0241bdb321f4c4d9abc51c0109c54f.png", pageUrl: "https://aws.amazon.com/certification/certified-security-specialty/" },
  ];

export default function AwsIntro() {
  const [showSwiper, setShowSwiper] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const timer = setTimeout(() => setShowSwiper(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-white text-gray-900 font-sans overflow-hidden">
        <header
          className="bg-cover bg-center py-32"
          style={{ backgroundImage: `url(${aws})` }}
        >
          {!showSwiper ? (
            <div
              className="text-left text-white px-6 md:px-12 max-w-6xl"
              data-aos="fade-right"
            >
              <h1 className="text-6xl font-bold leading-tight">
                Build your future in the AWS Cloud
              </h1>
              <p className="mt-4 text-2xl text-gray-100 max-w-2xl">
                Explore foundational learning paths with expert-led courses
              </p>
            </div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              spaceBetween={30}
              slidesPerView={1}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                marginLeft: "50px",
              }}
            >
              <SwiperSlide>
                <div className="text-left text-white">
                  <h1 className="text-6xl font-bold leading-tight">
                    Build your future in the AWS Cloud
                  </h1>
                  <p className="mt-4 text-2xl text-gray-100 max-w-2xl">
                    Explore foundational learning paths with expert-led courses
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="text-left text-white">
                  <h1 className="text-6xl font-bold leading-tight">
                    Courses Curated by AWS Experts
                  </h1>
                  <p className="mt-4 text-2xl text-gray-100 max-w-2xl">
                    Learn from the architects behind AWS Cloud.
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          )}
        </header>

        <div className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#20629b] mb-6 border-l-4 border-yellow-400 pl-4">
            Cloud Career Path
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            Begin with the Fundamentals, grow through Intermediate, master the
            Advanced by starting your cloud journey today!
          </p>
           
          {/* Course Timeline Component */}
          <div className="px-6 max-w-7xl mx-auto">
            <CourseTimeline />
          </div>
          
          {/* Sectioned career journey */}
          <CloudCareerPathSection />
          
          {/* Call to Action Button */}
          <div className="text-center mt-5">
            <Link
              to="/explore-courses"
              className="inline-flex items-center gap-2 bg-[#20629b] text-white py-3 px-6 rounded-3xl text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore All Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* AWS Certifications Carousel */}
        <div className="py-3 mb-8 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#20629b] mb-6 border-l-4 border-yellow-400 pl-4">
            AWS Certifications
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            Choose the certification badge below to learn more.
          </p>
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 6 },
            }}
          >
            {certifications.map((cert, index) => (
              <SwiperSlide key={index}>
                <a
                  href={cert.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-2 border-[#FF9900] rounded-2xl shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-101 bg-white p-4"
                >
                  <img
                    src={cert.imageUrl}
                    alt={`AWS Certification ${index + 1}`}
                    className="w-full h-auto object-contain"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Footer />
    </div>
  );
}