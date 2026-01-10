import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white">

      {/* TOP SECTION */}
      <div>

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* CONTACT (Left – Different Color) */}
          <div className="bg-[#1F2937] py-16 px-6 md:px-20 space-y-2 text-center md:text-right">
            <h3 className="text-lg font-semibold tracking-wide">CONTACT US</h3>

            <p>123 ABS Street, Uni 21, Bangladesh</p>
            <p>+88 123456789</p>
            <p>Mon - Fri: 08:00 - 22:00</p>
            <p>Sat - Sun: 10:00 - 23:00</p>
          </div>

          {/* FOLLOW (Right – Different Color) */}
          <div className="bg-[#111827] py-16 px-6 md:px-20 text-center md:text-left space-y-3">
            <h3 className="text-lg font-semibold tracking-wide uppercase">Follow US</h3>

            <p>Join us on social media</p>

            <div className="flex justify-center md:justify-start gap-6 text-2xl pt-2">
              <FaFacebookF className="cursor-pointer hover:text-gray-300" />
              <FaInstagram className="cursor-pointer hover:text-gray-300" />
              <FaTwitter className="cursor-pointer hover:text-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="bg-[#0A0A0A] py-4 text-center text-sm">
        Copyright © {new Date().getFullYear()} CulinaryCloud. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
