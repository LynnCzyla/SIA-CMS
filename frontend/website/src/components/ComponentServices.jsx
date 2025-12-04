import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTag } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../components/components-css/ComponentNews.css";

const ComponentServices = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`http://26.41.72.16:5000/api/services/${slug}`);
        const data = await res.json();
        setService(data);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const res = await fetch(`http://26.41.72.16:5000/api/services`);
        const data = await res.json();
        setAllServices(data);
      } catch (error) {
        console.error("Error fetching services list:", error);
      } finally {
        setSidebarLoading(false);
      }
    };
    fetchAllServices();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-5">
        <Skeleton height={40} width={300} className="mb-3" />
        <Skeleton height={20} width={200} className="mb-4" />
        <Skeleton height={400} />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container py-5 text-center">
        <h3>Service not found 😢</h3>
        <Link to="/services" className="btn btn-primary mt-3">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="news-container">
      <button className="back-btn" onClick={() => navigate("/services")}>
        <FaArrowLeft className="back-icon" /> Back
      </button>

      <div className="breadcrumb">
        <Link to="/services">Our Services</Link>
        <span>/</span>
        <span className="active">{service.short_title || service.full_title}</span>
      </div>

      <h2 className="news-section-title">SERVICES</h2>

      <div className="news-layout">
        <div className="news-main">
          <h4 className="news-short-title">{service.short_title}</h4>
          <h3 className="news-title">{service.full_title}</h3>

          {service.topic_tags && (
            <div className="news-tags">
              {service.topic_tags.split(",").map((tag, index) => (
                <span key={index} className="tag">
                  <FaTag className="tag-icon" /> {tag.trim()}
                </span>
              ))}
            </div>
          )}

          <p className="news-date">Published: {new Date(service.created_at).toLocaleDateString()}</p>
          <hr />

          {service.image_url && (
            <div className="news-image">
              <img src={service.image_url} alt={service.full_title} />
            </div>
          )}

          <div className="news-body" dangerouslySetInnerHTML={{ __html: service.description }}></div>
        </div>

        <aside className="news-sidebar">
          <div className="sidebar-box">
            <h4 className="sidebar-title">More Services</h4>
            <div className="sidebar-scroll">
              {sidebarLoading ? (
                <Skeleton count={5} height={60} className="mb-3" />
              ) : (
                <ul className="sidebar-list">
                  {allServices.filter(s => s.slug !== service.slug).slice(0, 6).map(s => (
                    <li key={s.id} className="sidebar-item">
                      <Link to={`/services/${s.slug}`} className="sidebar-link">
                        <div className="sidebar-content">
                          <h5 className="sidebar-title-text">{s.full_title}</h5>
                          <p className="sidebar-date">{new Date(s.created_at).toLocaleDateString()}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="ad-box">
            <h4 className="ad-title">Need Help?</h4>
            <div className="ad-placeholder">Contact us for more information about our services</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ComponentServices;