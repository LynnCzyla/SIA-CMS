// frontend/website/src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLayout } from "../context/LayoutContext"; // We'll create this
import "../css/HomeLayout1.css"; // Classic look
import "../css/HomeLayout2.css"; // Your new modern look
import AppointmentModal from './AppointmentModal';

import {
  MdLocalHospital,
  MdAddBox,
  MdOutlineArrowForward,
  MdOutlineBookmarkBorder,
} from "react-icons/md";
import {
  FaHeart,
  FaChild,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Chatbot from "../components/Chatbot";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchMedia, fetchAnnouncements, fetchNews } from "../api/api";
import { FaUserDoctor } from "react-icons/fa6";
import CookieConsent from "../components/CookieConsent";

const POLL_INTERVAL = 5000; // 5 seconds

function Home() {
  const layout = useLayout(); // ← This gets "classic" or "modern" from backend
  const navigate = useNavigate();

  console.log('🏠 Home component rendering with layout:', layout);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log('Current modal state:', isModalOpen);
  const [carouselSlides, setCarouselSlides] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [currentCarousel, setCurrentCarousel] = useState(0);
  const [currentHero, setCurrentHero] = useState(0);
  const [loading, setLoading] = useState(true);

  const [announcements, setAnnouncements] = useState([]);
  const [news, setNews] = useState([]);
  const [newsSectionLoading, setNewsSectionLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  const announcementsCarouselRef = useRef(null);
  const newsCarouselRef = useRef(null);

  // Scroll helper
  const scrollCarousel = (carouselRef, direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      const currentScroll = carouselRef.current.scrollLeft;
      const newScroll =
        direction === "next"
          ? currentScroll + scrollAmount
          : currentScroll - scrollAmount;
      carouselRef.current.scrollTo({ left: newScroll, behavior: "smooth" });
    }
  };

  // --- Polling to dynamically fetch all data ---
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const mediaFiles = await fetchMedia();
        setCarouselSlides(
          mediaFiles.filter((f) => f.section === "home-carousel")
        );
        setHeroSlides(mediaFiles.filter((f) => f.section === "hero-image"));

        const announcementsData = await fetchAnnouncements();
        setAnnouncements(announcementsData);

        const newsData = await fetchNews();
        setNews(newsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
        setNewsLoading(false);
        setNewsSectionLoading(false);
      }
    };

    fetchAll(); // initial fetch
    const interval = setInterval(fetchAll, POLL_INTERVAL); // repeat every 5s
    return () => clearInterval(interval);
  }, []);

  // --- Auto-rotate carousels ---
  useEffect(() => {
    if (carouselSlides.length > 0) {
      const timer = setInterval(() => {
        setCurrentCarousel((prev) => (prev + 1) % carouselSlides.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [carouselSlides]);

  useEffect(() => {
    if (heroSlides.length > 0) {
      const timer = setInterval(() => {
        setCurrentHero((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [heroSlides]);

  const services = [
    {
      icon: <MdLocalHospital className="service-icon" />,
      title: "Emergency Care",
      text: "24/7 emergency services with rapid response teams and advanced life support systems.",
      stat: "Available 24/7",
    },
    {
      icon: <FaHeart className="service-icon" />,
      title: "Cardiology",
      text: "Expert heart care including diagnostics, treatments, and cardiac rehabilitation programs.",
      stat: "1500+ Patients",
    },
    {
      icon: <FaChild className="service-icon" />,
      title: "Pediatrics",
      text: "Compassionate care for infants, children, and adolescents with specialized pediatric services.",
      stat: "500+ Newborns",
    },
    {
      icon: <MdAddBox className="service-icon" />,
      title: "Surgery",
      text: "Advanced surgical procedures with cutting-edge technology and minimally invasive techniques.",
      stat: "98% Success",
    },
  ];
  return (
    <div className={`home-wrapper ${layout}`}>
            <CookieConsent />

      {/* --- Section 1: Home Carousel --- */}
      <section className="home-section py-lg-5 py-1">
        <div className="container py-lg-4 py-3">
          <div className="row align-items-center justify-content-between bg-white g-lg-5 g-3">
            <div className="col-lg-6 col-md-12 home-left text-center text-lg-start px-lg-5 px-3">
              {loading ? (
                <>
                  <Skeleton height={50} width={250} />
                  <Skeleton count={3} />
                  <Skeleton width={150} height={40} />
                </>
              ) : (
                <>
                  <h1 className="display-4 fw-bold mb-4">
                    <em>Your Health, Our Priority.</em>
                  </h1>
                  <p className="fs-6 text-secondary mb-4 text ">
                    We unite innovation and empathy to redefine healthcare —
                    blending modern medical expertise with heartfelt human
                    connection to help you heal, recover, and thrive.
                  </p>
                  <button 
  className="home-btn m-1"
  onClick={() => {
    console.log('Book Appointment clicked!');
    setIsModalOpen(true);
    console.log('Modal state set to:', true);
  }}
>
  Book Appointment <MdOutlineBookmarkBorder />
</button>
                  <button className="doc-btn">
                    Find a Doctor <FaUserDoctor />
                  </button>
                </>
              )}
            </div>

            <div className="col-lg-6 col-md-12 home-right text-center px-lg-5 px-3">
              {loading || carouselSlides.length === 0 ? (
                <Skeleton height={350} borderRadius={20} />
              ) : (
                <>
                  <div className="carousel-slide mx-auto">
                    <img
                      src={carouselSlides[currentCarousel].url}
                      alt={carouselSlides[currentCarousel].name}
                      className="carousel-image"
                    />
                    <div className="carousel-overlay">
                      <h3>{carouselSlides[currentCarousel].name}</h3>
                    </div>
                  </div>
                  <div className="carousel-dots mt-3">
                    {carouselSlides.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${
                          index === currentCarousel ? "active" : ""
                        }`}
                        onClick={() => setCurrentCarousel(index)}
                      ></span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* This whole block will be reordered by CSS */}
      <div className="layout-content">
        {/* --- Section 3: Announcements --- */}
        <div className="welcome-block">
          <div className="top"></div>
          <div className="bottom">
            <div className="hero-section">
              <img src="logo1.svg" alt="Logo" className="bottom-logo" />
              <p className="welcome-text">Welcome to MEDISYNC</p>
              <h1 className="hero-title mb-3 justify-content-center d-flex text-center mt-3 ">
                A Great Place to Receive Care
              </h1>
              <p className="hero-desc mb-4 justify-content-center d-flex text-center text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                placerat scelerisque tortor ornare.
              </p>
              <button className="hero-btn d-flex align-items-center justify-content-center gap-2 mx-auto mb-4 bg-white fw-semibold text-center">
                Learn About Us <MdOutlineArrowForward />
              </button>
            </div>

            {/* Announcements */}
            <div className="announcements-block">
              <div className="container">
                <h2 className="news-title1 text-center mb-5 text-white">
                  <span className="highlight text-white">Latest</span> Updates
                  and Announcements
                </h2>
              </div>
              <div className="position-relative">
                {/* Prev Button */}
                {!newsLoading && announcements.length > 0 && (
                  <button
                    className="carousel-nav-btn position-absolute start-0 top-50 translate-middle-y d-none d-md-flex"
                    onClick={() =>
                      scrollCarousel(announcementsCarouselRef, "prev")
                    }
                  >
                    <FaChevronLeft />
                  </button>
                )}

                {/* Carousel */}
                <div className="container">
                  <div
                    ref={announcementsCarouselRef}
                    className="news-grid row flex-nowrap overflow-auto pb-3 px-2 px-lg-0"
                  >
                    {newsLoading ? (
                      Array(4)
                        .fill()
                        .map((_, i) => (
                          <div
                            key={i}
                            className="col-lg-3 col-md-4 col-sm-6 flex-shrink-0"
                            style={{ minWidth: 260 }}
                          >
                            <Skeleton height={220} borderRadius={20} />
                          </div>
                        ))
                    ) : announcements.length > 0 ? (
                      announcements.map((item) => (
                        <div
                          key={item.id}
                          className="col-lg-3 col-md-4 col-sm-6 flex-shrink-0"
                          style={{ minWidth: 260 }}
                        >
                          <div
                            className="news-card bg-white rounded-4 shadow-sm h-100 d-flex flex-column"
                            onClick={() =>
                              navigate(`/announcements/${item.id}`)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              className="news-image bg-light d-flex align-items-center justify-content-center rounded-top-4 overflow-hidden"
                              style={{ height: 180 }}
                            >
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.short_title}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              ) : (
                                <span className="text-secondary fw-semibold">
                                  No Image
                                </span>
                              )}
                            </div>
                            <div className="news-content p-3 flex-grow-1">
                              <h5 className="news-heading mb-2 text-primary">
                                {item.short_title}
                              </h5>
                              <p className="news-date text-muted small mb-0">
                                {new Date(item.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted">
                        No announcements yet.
                      </p>
                    )}
                  </div>
                </div>

                {/* Next Button */}
                {!newsLoading && announcements.length > 0 && (
                  <button
                    className="carousel-nav-btn position-absolute end-0 top-50 translate-middle-y d-none d-md-flex"
                    onClick={() =>
                      scrollCarousel(announcementsCarouselRef, "next")
                    }
                  >
                    <FaChevronRight />
                  </button>
                )}

                {/* View All */}
                {!newsLoading && announcements.length > 0 && (
                  <div className="text-center mt-4">
                    <button
                      className="news-btn"
                      onClick={() => navigate("/announcements")}
                    >
                      View All Announcements <MdOutlineArrowForward />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- Section 5: Services --- */}
        <div className="services-block">
          <section className="services-section py-5">
            <div className="container text-center">
              <div className="services-header mb-5">
                <h2 className="fw-bold">
                  Provide our{" "}
                  <span className="text-primary2">Best Services</span>
                </h2>
                <p className="text">
                  Comprehensive medical care with state-of-the-art facilities
                  and expert healthcare professionals dedicated to your
                  well-being.
                </p>
              </div>
              <div className="row g-4 justify-content-center">
                {loading
                  ? Array(4)
                      .fill()
                      .map((_, i) => (
                        <div className="col-lg-3 col-md-6 col-sm-10" key={i}>
                          <Skeleton height={250} borderRadius={20} />
                        </div>
                      ))
                  : services.map((service, i) => (
                      <div className="col-lg-3 col-md-6 col-sm-10" key={i}>
                        <div className="service-card bg-white rounded-4 shadow-sm p-4 h-100">
                          {service.icon}
                          <h3 className="service-title mt-3">
                            {service.title}
                          </h3>
                          <p className="service-text">{service.text}</p>
                          <strong className="service-stat">
                            {service.stat}
                          </strong>
                        </div>
                      </div>
                    ))}
              </div>
              <div className="text-center mt-4">
                <button
                  className="services-btn"
                  onClick={() => navigate("/announcements")}
                >
                  View All Services <MdOutlineArrowForward />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* --- Section 5: Contact --- */}
        <div className="contact-block">
          <section className="contact-section py-5 bg-light">
            <div className="container">
              <div className="row g-4 align-items-stretch">
                {/* Contact Info */}
                <div className="col-lg-5 col-md-6">
                  <div className="contact-info bg-white shadow-sm rounded-4 p-4 h-100">
                    {loading ? (
                      <Skeleton count={6} height={20} />
                    ) : (
                      <>
                        <h2 className="fw-bold mb-4">
                          <span className="text-primary2">Contact</span>{" "}
                          Information
                        </h2>
                        <div className="info-item mb-3">
                          <h5 className="fw-semibold">Address:</h5>
                          <p className="text-muted mb-0">
                            Kapasigan, Pasig City, Metro Manila
                          </p>
                        </div>
                        <div className="info-item mb-3">
                          <h5 className="fw-semibold">Phone:</h5>
                          <p className="text-muted mb-0">+63 912 345 6789</p>
                        </div>
                        <div className="info-item mb-3">
                          <h5 className="fw-semibold">Email:</h5>
                          <p className="text-muted mb-0">info@example.com</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Map */}
                <div className="col-lg-7 col-md-6">
                  {loading ? (
                    <Skeleton height={350} borderRadius={20} />
                  ) : (
                    <div className="map-container rounded-4 overflow-hidden shadow-sm h-100">
                      <iframe
                        title="Pasig Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.843023830412!2d121.0747!3d14.5670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b833ad9e7f43%3A0x4a6a9436f8b7a5b5!2sPasig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1690000000000!5m2!1sen!2sph"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div>Modal state: {isModalOpen ? 'OPEN' : 'CLOSED'}</div>
      {/* Chatbot */}
      <Chatbot />
      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      {/* <LayoutTester /> */}
    </div>
  );
}

export default Home;
