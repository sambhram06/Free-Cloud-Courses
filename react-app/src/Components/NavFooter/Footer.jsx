import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white text-center py-5 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 pl-100">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2 ">CloudThat Technologies Pvt Ltd.</h2>
          <p className="text-sm ">
            102, 4th B Cross, 5th Block, Koramangala, Industrial Area, Bengaluru, Karnataka - 560095
          </p>
        </div>
<br></br>
        {/* Contact Info */}
        <div className="text-sm">
          <p><span className="font-semibold">Sales:</span> +91 8880002200</p>
          <p><span className="font-semibold">Office:</span> +91 8041435641</p>
          <p><span className="font-semibold">Email:</span> <a href="mailto: sales@cloudthat.com" className="text-yellow-500 hover:underline">sales@cloudthat.com</a></p>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />
      {/* Bottom Text */}
      <div className="w-full text-center text-sm font-bold text-gray-300  mt-4">
        © 2012 - 2025 CloudThat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

