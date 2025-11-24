import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTag } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../components/components-css/ComponentNews.css";

const ComponentAnnouncement = () => {
  // Changed from 'id' to 'slug' to match the URL parameter
  const { slug } = useParams();
  const navigate = useNavigate();

  const [announcement, setAnnouncement] = useState(null);
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);

  // Fetch single announcement by slug
  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        // Now using slug instead of id
        const res = await fetch(`http://localhost:5000/api/announcements/${slug}`);
        const data = await res.json();
        setAnnouncement(data);
      } catch (error) {
        console.error("Error fetching announcement:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Only fetch if slug exists
    if (slug) {
      fetchAnnouncement();
    }
  }, [slug]); // Changed dependency from 'id' to 'slug'

  // Fetch all announcements for sidebar
  useEffect(() => {
    const fetchAllAnnouncements = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/announcements");
        const data = await res.json();
        setAllAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements list:", error);
      } finally {
        setSidebarLoading(false);
      }
    };
    fetchAllAnnouncements();
  }, []);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]); // Changed dependency from 'id' to 'slug'

  if (loading) {
    return (
      <div className="container py-5">
        <Skeleton height={40} width={300} className="mb-3" />
        <Skeleton height={20} width={200} className="mb-4" />
        <Skeleton height={400} />
      </div>
    );
  }

  if (!announcement) {
    return (
      <div className="container py-5 text-center">
        <h3>Announcement not found 😢</h3>
        <Link to="/announcements" className="btn btn-primary mt-3">
          Back to Announcements
        </Link>
      </div>
    );
  }

  return (
    <div className="news-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/announcements")}>
        <FaArrowLeft className="back-icon" /> Back
      </button>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/announcements">Latest Announcements</Link>
        <span>/</span>
        <span className="active">
          {announcement.short_title || announcement.full_title}
        </span>
      </div>

      <h2 className="news-section-title">ANNOUNCEMENT</h2>

      <div className="news-layout">
        {/* MAIN CONTENT */}
        <div className="news-main">
          <h4 className="news-short-title">{announcement.short_title}</h4>
          <h3 className="news-title">{announcement.full_title}</h3>

          {/* Tags */}
          {announcement.topic_tags && (
            <div className="news-tags">
              {announcement.topic_tags.split(",").map((tag, index) => (
                <span key={index} className="tag">
                  <FaTag className="tag-icon" /> {tag.trim()}
                </span>
              ))}
            </div>
          )}

          <p className="news-date">
            Published:{" "}
            {announcement.created_at
              ? new Date(announcement.created_at).toLocaleDateString()
              : "N/A"}
          </p>
          <hr />

          {/* Image */}
          {announcement.image && (
            <div className="news-image">
              <img
                src={announcement.image}
                alt={announcement.full_title}
                className="news-img"
              />
            </div>
          )}

          <p className="photo-credit">
            Author: {announcement.author || "TMC News Desk"}
          </p>

          {/* Main Body */}
          <div
            className="news-body"
            dangerouslySetInnerHTML={{ __html: announcement.description }}
          ></div>
        </div>

        {/* SIDEBAR */}
        <aside className="news-sidebar">
          <div className="sidebar-box">
            <h4 className="sidebar-title">More Announcements</h4>
            <div className="sidebar-scroll">
              {sidebarLoading ? (
                <Skeleton count={5} height={60} className="mb-2" />
              ) : (
                <ul className="sidebar-list">
                  {allAnnouncements
                    .filter((a) => a.slug !== announcement.slug) // Filter by slug instead of id
                    .slice(0, 6)
                    .map((a) => (
                      <li key={a.id} className="sidebar-item">
                        {/* Using slug for the route */}
                        <Link
                          to={`/announcements/${a.slug}`}  
                          className="sidebar-link"
                        >
                          <div className="sidebar-content">
                            <h5 className="sidebar-title-text">
                              {a.short_title || a.full_title}
                            </h5>
                            <p className="sidebar-date">
                              {new Date(a.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {/* Ad Box */}
          <div className="ad-box">
            <h4 className="ad-title">Sponsored</h4>
            <div className="ad-placeholder">Ad Space</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ComponentAnnouncement;