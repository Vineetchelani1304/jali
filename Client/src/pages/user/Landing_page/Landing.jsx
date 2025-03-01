import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useEffect, useState } from "react";
import Contactus from "../../../components/Contact_us/Contactus";

const LandingPage = () => {
  const logo =  "/Images/Landing_page_img/logo.jpg";
  const preview =  "/Images/Landing_page_img/preview.jpg";
  const feature =  "/Images/Landing_page_img/feature.png";
  const swiperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsStatsVisible(true);
          } else {
            setIsStatsVisible(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    const swiperElement = swiperRef.current?.swiper?.el;

    if (swiperElement) {
      observer.observe(swiperElement);
    }

    return () => {
      if (swiperElement) {
        observer.unobserve(swiperElement);
      }
    };
  }, []);
  useEffect(() => {
    const totalSlides = 5;
    let slideChange;
    if (isVisible) {
      slideChange = setInterval(() => {
        if (swiperRef.current) {
          const currentIndex = swiperRef.current.swiper.activeIndex;

          if (currentIndex < totalSlides - 1) {
            swiperRef.current.swiper.slideTo(currentIndex + 1);
          }
        }
      }, 1000);
    }
    return () => {
      clearInterval(slideChange);
    };
  }, [isVisible]);
  return (
    <div>
      <header className="bg-gray-200 text-black py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gray-200">
          <img
            src={logo}
            alt="Logo"
            className="bg-gray-200 w-52 h-16"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
        <div className="flex">
          <div className="justify-center">
            <nav className="space-x-4">
              <Link to="/signin" className="text-black hover:text-gray-300">
                Login
              </Link>
              <Link to="/signup" className="text-black hover:text-gray-300">
                Signup
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section
        className="text-white py-16"
        style={{ backgroundColor: "#4b064b" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-left space-y-4 md:space-y-6 ml-20">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6 leading-snug"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Made for People. <br /> Built for Productivity.
              </h1>
              <p
                className="text-md sm:text-lg mb-6 md:mb-8 leading-relaxed"
                style={{ fontFamily: "'Roboto', sans-serif" }}
              >
                With Supervision, you get a seamless blend of features designed
                to enhance productivity and teamwork. Unlike generic placeholder
                text, our platform offers a structured approach to task
                management and collaboration, making it easy to see how our
                tools can streamline your workflow and boost efficiency.
              </p>
              <div className="flex justify-start space-x-4 mb-4">
                <Link
                  href="#"
                  className="bg-white font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300 flex items-center justify-center"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    color: "#541554",
                  }}
                  to="/signup"
                >
                  REGISTER WITH EMAIL
                </Link>
                <Link
                  href="#"
                  className="bg-white font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 flex items-center justify-center"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    backgroundColor: "#4285F4",
                  }}
                  to="/signup"
                >
                  <img
                    src="https://img.icons8.com/?size=48&id=V5cGWnc9R4xj&format=png"
                    alt="Google"
                    className="w-6 h-6 mr-2 bg-white"
                  />
                  SIGN UP WITH GOOGLE
                </Link>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="w-full max-w-sm mr-20">
                <img
                  src={preview}
                  alt="Taskhub Preview"
                  className="w-full h-auto object-contain rounded-2xl shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-8 pt-16">
        <div className="container mx-auto text-center px-4">
          <p className="text-gray-900 text-2xl">
            TRUSTED BY COMPANIES ALL OVER THE WORLD
          </p>
          <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8 mt-4">
            {/* <img src={companies} alt="" /> */}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Our Benefits</h2>
          <Swiper
            ref={swiperRef}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
          >
            <SwiperSlide
              className="bg-white p-6 rounded-lg shadow-md"
              style={{ height: "320px" }}
            >
              <h3 className="text-xl font-semibold mb-4">
                Collaborate Seamlessly
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                Enhance teamwork with real-time collaboration tools. Share
                updates, assign tasks, and track progress effortlessly.
                Integrated notifications and file sharing keep everyone aligned
                and productive, reducing miscommunication. With built-in
                communication channels, your team can work together no matter
                where they are, ensuring timely updates and seamless execution.
              </p>
            </SwiperSlide>
            <SwiperSlide
              className="bg-white p-6 rounded-lg shadow-md"
              style={{ height: "320px" }}
            >
              <h3 className="text-xl font-semibold mb-4">
                Easy Task Management
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                Organize, prioritize, and track tasks effortlessly with
                intuitive tools. Assign tasks, set deadlines, and monitor
                progress in real-time. Stay focused with visual task boards,
                reminders, and task categories, ensuring nothing falls through
                the cracks. Manage everything from a single dashboard, giving
                your team the clarity they need to execute projects efficiently.
              </p>
            </SwiperSlide>
            <SwiperSlide
              className="bg-white p-6 rounded-lg shadow-md"
              style={{ height: "320px" }}
            >
              <h3 className="text-xl font-semibold mb-4">Boost Productivity</h3>
              <p className="text-gray-700 leading-relaxed text-base">
                Maximize output by streamlining workflows and automating
                repetitive tasks. Improve communication and ensure tasks are
                completed on time with integrated scheduling and reminders.
                Built-in analytics help track performance and optimize
                processes, while time-saving tools let you focus on what matters
                most—delivering results with efficiency and speed.
              </p>
            </SwiperSlide>
            <SwiperSlide
              className="bg-white p-6 rounded-lg shadow-md"
              style={{ height: "320px" }}
            >
              <h3 className="text-xl font-semibold mb-4">
                Enhance Team Productivity
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                Boost your team's output by optimizing workflows and minimizing
                repetitive tasks. Ensure timely completion of tasks with
                integrated scheduling tools and reminders. Leverage analytics to
                track performance and enhance overall efficiency, enabling your
                team to focus on what matters most and deliver results
                effectively.
              </p>
            </SwiperSlide>
            <SwiperSlide
              className="bg-white p-6 rounded-lg shadow-md"
              style={{ height: "320px" }}
            >
              <h3 className="text-xl font-semibold mb-4">
                Enhance Team Productivity
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                Boost your team's output by optimizing workflows and minimizing
                repetitive tasks. Ensure timely completion of tasks with
                integrated scheduling tools and reminders. Leverage analytics to
                track performance and enhance overall efficiency, enabling your
                team to focus on what matters most and deliver results
                effectively.
              </p>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center md:justify-start">
            <img
              src={feature}
              alt="Taskhub Feature Preview"
              className="w-full h-auto object-contain bg-white"
            />
          </div>
          <div className="text-left">
            <p className="text-yellow-500 font-semibold mb-2">Business Tools</p>
            <h2 className="text-4xl font-bold text-black mb-2">
              Useful Features
            </h2>
            <h3 className="text-xl font-bold text-purple-600 mb-6">
              Team Management
            </h3>
            <p className="text-gray-600 mb-6">
              Our tools make team management effortless, allowing you to assign
              tasks, monitor progress, and keep everyone aligned in real-time.
              With features like role-based access and streamlined communication
              channels, your team can work efficiently and stay focused on their
              goals.
            </p>
            <ul className="list-none space-y-4">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> 99% Survey Report
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Trusted By Teams
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✔</span> Self-Services
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20 mr-7 ml-7">
        <div ref={statsRef} className="container mx-auto text-center px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div
              className={`transform transition-transform duration-700 delay-100 ${
                isStatsVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            >
              <h3 className="text-3xl font-bold" style={{ color: "#4b064b" }}>
                200+
              </h3>
              <p>Companies onboarded</p>
            </div>
            <div
              className={`transform transition-transform duration-700 delay-200 ${
                isStatsVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            >
              <h3 className="text-3xl font-bold" style={{ color: "#4b064b" }}>
                18K+
              </h3>
              <p>Active users</p>
            </div>
            <div
              className={`transform transition-transform duration-700 delay-300 ${
                isStatsVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
              }`}
            >
              <h3 className="text-3xl font-bold" style={{ color: "#4b064b" }}>
                23K+
              </h3>
              <p>Tasks completed daily</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="container mx-auto text-center px-4">
          <p className="text-yellow-500 font-semibold mb-2">Testimonials</p>
          <h2 className="text-4xl font-bold text-black mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.90o6OQ7-jGqViljHVhhfmQHaE8&pid=Api&P=0&h=180"
                  alt="John Scot"
                  className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-1">
                Rajesh Mehra
              </h3>
              <p className="text-yellow-500 font-medium mb-4">CEO</p>
              <p className="text-gray-700 leading-relaxed">
                "The tools provided have greatly enhanced our team's
                productivity. The ease of use and the seamless integration with
                our existing systems have made a noticeable difference in our
                workflow."
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
              <div className="flex justify-center mb-4">
                <img
                  src="https://imgs.search.brave.com/G8bI-pDYmvjORRRHa0F2xflh3jNk6FliO5qV7D1cMbA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTQ0/MTM4NDAwL3Bob3Rv/L2luZGlhbi15b3Vu/Zy1tYW4taW4tbG9u/ZG9uLWV4cHJlc3Np/bmctcG9zaXRpdmUt/ZW1vdGlvbi5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9cnZr/Z1poNHFzM1BBV1U2/STEwWmRiQURZOGtp/VjZGMnJlemp5NlJB/V2dBTT0"
                  alt="rakesh"
                  className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-1">
                Rahul Trivedi
              </h3>
              <p className="text-yellow-500 font-medium mb-4">
                Project Manager
              </p>
              <p className="text-gray-700 leading-relaxed">
                "I love how intuitive the task management system is. It has made
                tracking and organizing our projects a breeze, and the real-time
                collaboration features are a game-changer for our remote teams."
              </p>
            </div>
          </div>
        </div>
      </section>
      <Contactus />
      <footer
        className="text-white py-8 text-center"
        style={{ backgroundColor: "#4b064b" }}
      >
        <p>Discover what you can achieve with Supervision.</p>
        <a
          href="#"
          className="bg-white text-purple-600 font-bold py-3 px-8 mt-4 inline-block rounded-full hover:bg-gray-100"
        >
          Try for Free
        </a>
        <div className="mt-6">
          <p>&copy; 2024 Supervision. All Rights Reserved.</p>
          <nav className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-gray-300">
              About Supervision
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
