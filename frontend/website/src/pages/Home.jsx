// frontend/website/src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLayout } from "../context/LayoutContext";
import "../css/HomeLayout1.css";
import "../css/HomeLayout2.css";
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

const POLL_INTERVAL = 5000;

function Home() {
  const layout = useLayout();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselSlides, setCarouselSlides] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [currentCarousel, setCurrentCarousel] = useState(0);
  const [currentHero, setCurrentHero] = useState(0);
  const [loading, setLoading] = useState(true);

  const [announcements, setAnnouncements] = useState([]);
  const [news, setNews] = useState([]);
  const [newsSectionLoading, setNewsSectionLoading] = useState(true);
  const [newsLoading, setNewsLoading] = useState(true);

  // Carousel state for 3-slide view
  const [currentAnnouncementSlide, setCurrentAnnouncementSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  const announcementsCarouselRef = useRef(null);
  const newsCarouselRef = useRef(null);

  // Calculate items per slide based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setItemsPerSlide(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch data
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

    fetchAll();
    const interval = setInterval(fetchAll, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate main carousel
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

  // Announcement carousel navigation
  const totalAnnouncementSlides = Math.ceil(announcements.length / itemsPerSlide);

  const handlePrevAnnouncement = () => {
    setCurrentAnnouncementSlide((prev) => 
      prev === 0 ? totalAnnouncementSlides - 1 : prev - 1
    );
  };

  const handleNextAnnouncement = () => {
    setCurrentAnnouncementSlide((prev) => 
      prev === totalAnnouncementSlides - 1 ? 0 : prev + 1
    );
  };

  const getCurrentAnnouncements = () => {
    const start = currentAnnouncementSlide * itemsPerSlide;
    return announcements.slice(start, start + itemsPerSlide);
  };

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
      <section className="home-section">
        <div className="home-container">
          <div className="home-content">
            <div className="home-left">
              {loading ? (
                <>
                  <Skeleton height={50} width={250} />
                  <Skeleton count={3} />
                  <Skeleton width={150} height={40} />
                </>
              ) : (
                <>
                  <h1>
                    <em>Your Health, Our Priority.</em>
                  </h1>
                  <p>
                    We unite innovation and empathy to redefine healthcare —
                    blending modern medical expertise with heartfelt human
                    connection to help you heal, recover, and thrive.
                  </p>
                 <div className="hero-buttons">
  <button 
    className="home-btn"
    onClick={() => setIsModalOpen(true)}
  >
    Book Appointment <MdOutlineBookmarkBorder />
  </button>
  <button className="doc-btn" onClick={() => navigate("/doctors")}>
    Find a Doctor <FaUserDoctor />
  </button>
</div>

                </>
              )}
            </div>

            <div className="home-right">
              {loading || carouselSlides.length === 0 ? (
                <Skeleton height={350} borderRadius={20} />
              ) : (
                <>
                  <div className="carousel-slide">
                    <img
                      src={carouselSlides[currentCarousel].url}
                      alt={carouselSlides[currentCarousel].name}
                      className="carousel-image"
                    />
                    <div className="carousel-overlay">
                      <h3>{carouselSlides[currentCarousel].name}</h3>
                    </div>
                  </div>
                  <div className="carousel-dots">
                    {carouselSlides.map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${index === currentCarousel ? "active" : ""}`}
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

      <div className="layout-content">
        {/* --- Welcome & Announcements Section --- */}
        <div className="welcome-block">
          <div className="top"></div>
          <div className="bottom">
            <div className="hero-section">
              <img src="logo1.svg" alt="Logo" className="bottom-logo" />
              <p className="welcome-text">Welcome to MEDISYNC</p>
              <h1 className="hero-title">
                A Great Place to Receive Care
              </h1>
              <p className="hero-desc">
            At MediSync, we believe exceptional healthcare begins with trust, compassion, and seamless access to the services you need. Our mission is simple: to bring patients, providers, and advanced medical technology together—creating a connected experience that puts your wellbeing first.
              </p>
              <button className="hero-btn" onClick={() => navigate("/about")}>
                
                Learn About Us <MdOutlineArrowForward />
              </button>
            </div>

            {/* Announcements Carousel */}
            <div className="announcements-block">
              <div className="announcements-container">
                <h2 className="news-title1">
                  Latest Updates and Announcements
                </h2>
              </div>

              <div className="carousel-wrapper">
                {/* Navigation Buttons */}
                {!newsLoading && announcements.length > itemsPerSlide && (
                  <>
                    <button
                      className="carousel-nav-btn carousel-nav-prev"
                      onClick={handlePrevAnnouncement}
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      className="carousel-nav-btn carousel-nav-next"
                      onClick={handleNextAnnouncement}
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}

                {/* Carousel Content */}
                <div className="announcements-carousel-container">
                  <div className="announcements-carousel">
                    {newsLoading ? (
                      <div className="announcements-grid">
                        {Array(3).fill().map((_, i) => (
                          <div key={i} className="announcement-card-wrapper">
                            <Skeleton height={280} borderRadius={20} />
                          </div>
                        ))}
                      </div>
                    ) : announcements.length > 0 ? (
                      <div className="announcements-grid">
                        {getCurrentAnnouncements().map((item) => (
                          <div key={item.id} className="announcement-card-wrapper">
                            <div
                              className="news-card"
                              onClick={() => navigate(`/announcements/${item.id}`)}
                            >
                              <div className="news-image">
                                {item.image ? (
                                  <img src={item.image} alt={item.short_title} />
                                ) : (
                                  <span className="no-image">No Image</span>
                                )}
                              </div>
                              <div className="news-content">
                                <h5 className="news-heading">{item.short_title}</h5>
                                <p className="news-date">
                                  {new Date(item.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="no-announcements">No announcements yet.</p>
                    )}
                  </div>
                </div>

                {/* Dots Indicator */}
                {!newsLoading && announcements.length > itemsPerSlide && (
                  <div className="carousel-dots carousel-dots-announcements">
                    {Array.from({ length: totalAnnouncementSlides }).map((_, index) => (
                      <span
                        key={index}
                        className={`dot ${index === currentAnnouncementSlide ? "active" : ""}`}
                        onClick={() => setCurrentAnnouncementSlide(index)}
                      ></span>
                    ))}
                  </div>
                )}
              </div>

              {/* View All Button */}
              {!newsLoading && announcements.length > 0 && (
                <div className="view-all-container">
                  <button
                    className="news-btn"
                    onClick={() => navigate("/announcements")}
                  >
                    View All Updates and Announcements<MdOutlineArrowForward />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Services Section --- */}
        <div className="services-block">
          <section className="modern services-section">
            <div className="services-container">
              <div className="services-header">
                <h2>
                  Provide our <span className="text-primary2">Best Services</span>
                </h2>
                <p className="services-desc">
                  Comprehensive medical care with state-of-the-art facilities
                  and expert healthcare professionals dedicated to your well-being.
                </p>
              </div>
              <div className="services-grid">
                {loading
                  ? Array(4).fill().map((_, i) => (
                      <div className="service-card-wrapper" key={i}>
                        <Skeleton height={250} borderRadius={20} />
                      </div>
                    ))
                  : services.map((service, i) => (
                      <div className="service-card-wrapper" key={i}>
                        <div className="service-card">
                          {service.icon}
                          <h3 className="service-title">{service.title}</h3>
                          <p className="service-text">{service.text}</p>
                          <strong className="service-stat">{service.stat}</strong>
                        </div>
                      </div>
                    ))}
              </div>
              <div className="view-all-container">
                <button
                  className="services-btn"
                  onClick={() => navigate("/services")}
                >
                  View All Services <MdOutlineArrowForward />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* --- Contact Section --- */}
        <div className="contact-block">
          <section className="contact-section">
            <div className="contact-container">
              <div className="contact-content">
                <div className="contact-info">
                  {loading ? (
                    <Skeleton count={6} height={20} />
                  ) : (
                    <>
                       <div className="title-center">
                <h2>
                  Contact <span className="text-primary2">Information</span>
                </h2>
                      </div>
                      <div className="info-item">
                        <h5>Address:</h5>
                        <p>Kapasigan, Pasig City, Metro Manila</p>
                      </div>
                      <div className="info-item">
                        <h5>Phone:</h5>
                        <p>+63 912 345 6789</p>
                      </div>
                      <div className="info-item">
                        <h5>Email:</h5>
                        <p>info@example.com</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="map-wrapper">
                  {loading ? (
                    <Skeleton height={350} borderRadius={20} />
                  ) : (
                    <div className="map-container">
                      <iframe
                        title="Pasig Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.843023830412!2d121.0747!3d14.5670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b833ad9e7f43%3A0x4a6a9436f8b7a5b5!2sPasig%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1690000000000!5m2!1sen!2sph"
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

      <Chatbot />
      <AppointmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default Home;