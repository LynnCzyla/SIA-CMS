import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/components-css/ComponentNews.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Chatbot from "../components/Chatbot";

const Announcements = () => {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/announcements");
        let data = await response.json();
        data = data.filter((item) => item.status === "published");
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Helper function to extract plain text from HTML and limit to one sentence
  const getFirstSentence = (htmlContent) => {
    // Remove HTML tags
    const text = htmlContent.replace(/<[^>]*>/g, '');
    // Find first sentence (ends with . ! or ?)
    const match = text.match(/^[^.!?]*[.!?]/);
    return match ? match[0].trim() : text.substring(0, 100) + '...';
  };

  return (
    <div className="announcements-section container py-5">
      {loading ? (
        <div className="text-center mb-5">
          <Skeleton height={40} width={300} className="mx-auto mb-3" />
          <Skeleton height={20} width={500} className="mx-auto" />
        </div>
      ) : (
        <>
          <h2 className="title-center mb-4">
            Latest <span className="title-primary">Updates & Announcements</span>
          </h2>
          <p className="intro-text text-center mb-5">
            Stay updated with the latest company announcements, events, and reminders.
          </p>
        </>
      )}

      <div className="row g-4">
        {loading
          ? Array(3).fill().map((_, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="announcement-card card h-100 shadow-sm">
                  <Skeleton height={200} borderRadius={8} />
                  <div className="card-body text-center">
                    <Skeleton height={20} width={150} className="mx-auto mb-2" />
                    <Skeleton height={25} width={250} className="mx-auto mb-2" />
                    <Skeleton height={15} width={100} className="mx-auto mb-2" />
                    <Skeleton count={2} height={10} width={`80%`} className="mx-auto" />
                    <Skeleton height={35} width={120} className="mt-3 mx-auto rounded-pill" />
                  </div>
                </div>
              </div>
            ))
          : announcements.map((announcement) => (
              <div key={announcement.id} className="col-12 col-md-6 col-lg-4">
                <div className="announcement-card card h-100 shadow-sm">
                  <div
                    className="announcement-img rounded-top"
                    style={{
                      backgroundImage: announcement.image
                        ? `url(${announcement.image})`
                        : `url(https://via.placeholder.com/600x300?text=Announcement)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "200px",
                    }}
                  ></div>
                  <div className="card-body text-center d-flex flex-column justify-content-between">
                    <div>
                      <p className="text-muted small mb-1 fw-semibold text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                        {announcement.short_title}
                      </p>
                    
                      <h5 className="card-title fw-bold text-primary mb-2">
                        {announcement.full_title}
                      </h5>
                      
                      <p className="text-muted small mb-3" style={{ fontSize: '0.8rem' }}>
                        {new Date(announcement.created_at).toLocaleDateString()}
                      </p>
                      
                      <p className="card-text text-secondary small">
                        {getFirstSentence(announcement.description)}
                      </p>
                    </div>
                    <Link
                      to={`/announcements/${announcement.slug}`}
                      className="btn btn-primary mt-3 align-self-center"
                    >
                      See More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <Chatbot />
    </div>
  );
};

export default Announcements;