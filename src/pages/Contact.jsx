import Cover from "../components/Cover";
import bannerImg from "../assets/contact/banner.jpg";
import SectionTitle from "../components/SectionTitle";
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import bgImage from '../assets/others/authentication.png';
import { IoIosSend } from "react-icons/io";
import Swal from "sweetalert2";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {

  const form = useRef();

//   const [verified, setVerified] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!verified) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Please verify captcha first",
    //   });
    //   return;
    // }
   
    emailjs
      .sendForm(
        "service_fmd4508",
        "template_pqsgy5m",
        form.current,
        "IZUBbzJMz4jBLLPHr"
      )
      .then(
        () => {
          Swal.fire({
            icon: "success",
            title: "Message Sent Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          form.current.reset();
        },
        (error) => {
          console.log(error.text);

          Swal.fire({
            icon: "error",
            title: "Failed to send message",
          });
        }
      );
  };

  return (
    <div>
      <Cover
        img={bannerImg}
        title={"Contact Us"}
        para={"Would you like to try a dish?"}
      ></Cover>


    <div className="max-w-5xl mx-auto py-8 px-4">

        <SectionTitle
        subHeading={"Visit Us"}
        heading={"Our Location"}
        ></SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Phone */}
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg
         transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="bg-[#D1A054] text-white flex justify-center py-4 transition-all duration-300 hover:bg-[#b27418]">
            <FaPhoneAlt className="text-xl" />
          </div>

          <div className="bg-[#F3F3F3] text-center py-10 px-4 m-4">
            <h2 className="text-xl font-semibold mb-2">PHONE</h2>
            <p>+880 1234-567890</p>
          </div>
        </div>

        {/* Address */}
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg
         transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="bg-[#D1A054] text-white flex justify-center py-4 transition-all duration-300 hover:bg-[#b27418]">
            <FaMapMarkerAlt className="text-xl" />
          </div>

          <div className="bg-[#F3F3F3] text-center py-10 px-4 m-4">
            <h2 className="text-xl font-semibold mb-2">ADDRESS</h2>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg
         transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer">
          <div className="bg-[#D1A054] text-white flex justify-center py-4 transition-all duration-300 hover:bg-[#b27418]">
            <FaClock className="text-xl" />
          </div>

          <div className="bg-[#F3F3F3] text-center py-10 px-4 m-4">
            <h2 className="text-xl font-semibold mb-2">WORKING HOURS</h2>
            <p>Mon - Fri: 10:00 AM - 10:00 PM</p>
            <p>Sat - Sun: 10:00 AM - 11:00 PM</p>
          </div>
        </div>

      </div>
    </div>

      <div className="max-w-5xl mx-auto pb-16 md:pb-24 px-4">
      
      <SectionTitle
        subHeading={"Send Us A Message"}
        heading={"Contact Form"}
      ></SectionTitle>

        {/* form container */}
        <div className=" p-6 md:p-12 rounded-md shadow-2xl "
        style={{
                backgroundImage: `url(${bgImage})`
        }}>

          <form ref={form} onSubmit={handleSubmit} className="space-y-6">
            {/* first row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* name */}
              <div>
                <label className="font-semibold block mb-2">Name*</label>

                <input
                  type="text"
                  name="user_name"
                  placeholder="Enter your name"
                  className="w-full input input-bordered bg-white"
                  required
                />
              </div>

              {/* email */}
              <div>
                <label className="font-semibold block mb-2">Email*</label>

                <input
                  type="email"
                  name="user_email"
                  placeholder="Enter your email"
                  className="w-full input input-bordered bg-white"
                  required
                />
              </div>
            </div>

            {/* phone */}
            <div>
              <label className="font-semibold block mb-2">Phone*</label>

              <input
                type="number"
                name="user_phone"
                placeholder="Enter your phone number"
                className="w-full input input-bordered bg-white"
                maxLength={14}
                pattern="[0-9]{14}"
                required
              />
            </div>

            {/* message */}
            <div>
              <label className="font-semibold block mb-2">Message*</label>

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message here"
                className="w-full textarea textarea-bordered bg-white"
                required
              ></textarea>
            </div>

            {/* recaptcha placeholder */}
            {/* <div className="bg-white border-0 rounded-md w-fit px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="checkbox checkbox-sm" />
                <p className="text-sm">I'm not a robot</p>
              </div>
            </div> */}

            {/* <div>
                <ReCAPTCHA
                    sitekey="6LduQegsAAAAADkVcNm79TR1HY268Ld2GAQs2O9X"
                    onChange={(value) => setVerified(!!value)}
                />
            </div> */}

            {/* submit button */}
            <div className="flex justify-center">
                <button
                type="submit"
                className="btn bg-[#D1A054] hover:bg-[#b8873f] text-white border-0 px-4 md:px-8 py-1 items-center"
                >
                Send Message <IoIosSend />
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
