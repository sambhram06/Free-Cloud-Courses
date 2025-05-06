import React from 'react';
import logo from '../../assets/logo_aws.png'

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center  py-8 px-5 md:px-12">
      <div className="max-w-14xl mx-auto flex flex-col lg:flex-row gap-10 ">
       
        <div className='flex-shrink-0 w-full lg:w-auto text-left ml-[5px]'>
        <a href='https://www.cloudthat.com/'>
        <img src={logo} alt="Logo" className="h-15 w-auto mr-2 pb-5" />
        </a>
        <p className='text-left'>World’s best Cloud Training & Cloud <br /> consulting services company offers <br /> services in Cloud, DevOps, AI & ML, IoT, <br /> Data analytics and Cloud Security to <br /> midsize and enterprise clients worldwide.</p>
        </div>
        <div className='text-left pl-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:w-2/3 ' >
          <div>
            <h3 className='text-lg py-0 font-semibold mb-2'>Quick links</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <a href="https://www.cloudthat.com/training/" className="hover:underline"><li>Cloud Computing Courses</li></a>
              <a href="https://www.cloudthat.com/corporate-training" className="hover:underline"><li>Corporate Training</li></a>
              <a href="https://www.cloudthat.com/consulting/" className="hover:underline"><li>Cloud Consulting</li></a>
              <a href="https://www.cloudthat.com/training/cloud-and-devops-expert-program/" className="hover:underline"><li>Job Assistance Program</li></a>
              <a href="https://www.cloudthat.com/training/calendar/" className="hover:underline"><li>Training Calendar</li></a>
              <a href="https://www.cloudthat.com/training/aws-mastery-pass" className="hover:underline"><li>AWS Mastery Pass</li></a>
              <a href="https://www.cloudthat.com/training/azure-mastery-pass/" className="hover:underline"><li>Azure Mastery Pass</li></a>
              <a href="https://www.cloudthat.com/training/devops-mastery-pass" className="hover:underline"><li>DevOps Mastery Pass</li></a>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Categories</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <a href="https://www.cloudthat.com/training/aiandml/" className="hover:underline"><li>AI & ML Courses</li></a>
              <a href="https://www.cloudthat.com/training/aws/" className="hover:underline"><li>AWS Certification and Training</li></a>
              <a href="https://www.cloudthat.com/training/azure/" className="hover:underline"><li>Microsoft Azure Certifications</li></a>
              <a href="https://www.cloudthat.com/training/devops/" className="hover:underline"><li>DevOps Certifications</li></a>
              <a href="https://www.cloudthat.com/training/microsoft-security/" className="hover:underline"><li>Microsoft Security Certifications</li></a>
              <a href="https://www.cloudthat.com/training/microsoftdynamics/exam-pl-300-microsoft-power-bi-data-analyst" className="hover:underline"><li>Power BI Course</li></a>
              <a href="https://www.cloudthat.com/training/power-platform" className="hover:underline"><li>Power Platform Certification</li></a>
              <a href="https://www.cloudthat.com/training/vmware" className="hover:underline"><li>VMware Certification</li></a>
            </ul>
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-2'>Resources</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <a href="https://www.cloudthat.com/resources/blogs" className="hover:underline"><li>Blogs</li></a>
              <a href="https://www.cloudthat.com/resources/news-events" className="hover:underline"><li>News and Events</li></a>
              <a href="https://www.cloudthat.com/resources/" className="hover:underline"><li>Case Study</li></a>
              <a href="https://www.cloudthat.com/resources/" className="hover:underline"><li>E-Book</li></a>
              <a href="https://www.cloudthat.com/resources/" className="hover:underline"><li>Webinar</li></a>
            </ul>
          </div>
       
        <div className="">
        <h3 className='text-lg font-semibold mb-2'>Contact</h3>
        <p>
            102, 4th B Cross, 5th Block, Koramangala,<br /> Industrial Area, Bengaluru, Karnataka - 560095
          </p>
          <p><span className="font-semibold">Sales:</span> +91 8880002200</p>
          <p><span className="font-semibold ">Office:</span> +91 8041435641</p>
          <p><span className="font-semibold ">Email:</span> <a href="mailto: sales@cloudthat.com" className="text-yellow-500 hover:underline">sales@cloudthat.com</a></p>
        </div>
        </div>
      </div>


      <hr className="my-4 border-gray-300" />
     
      <div className='px-4 space-x-4'>
        <a href="https://www.facebook.com/cloudthat"><i className='fa-brands fa-facebook'></i></a>
        <a href="https://www.instagram.com/cloudthat"><i className='fa-brands fa-instagram'></i></a>
        <a href="https://www.linkedin.com/company/cloudthat"><i className='fa-brands fa-linkedin'></i></a>
        <a href="https://www.twitter.com/cloudthat"><i className='fa-brands fa-twitter'></i></a>
        <a href="https://www.youtube.com/user/cloudthat"><i className='fa-brands fa-youtube'></i></a>
      </div>
      <div className="w-full text-center text-sm font-bold text-gray-300  mt-4">
        © 2012 - 2025 CloudThat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

