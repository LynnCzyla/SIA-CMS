import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTag, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../components/components-css/ComponentNews.css";

const ComponentCareer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [job, setJob] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(true);

  // Fetch job info
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://26.41.72.16:5000/api/jobs/${id}`);
        const data = await res.json();
        if (data.success) {
          setJob(data.job);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  // Fetch all posted jobs for sidebar
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await fetch("http://26.41.72.16:5000/api/jobs");
        const data = await res.json();
        if (data.success) {
          setAllJobs(data.jobs);
        } else {
          setAllJobs([]);
        }
      } catch (error) {
        console.error("Error loading job list:", error);
      } finally {
        setSidebarLoading(false);
      }
    };
    fetchAllJobs();
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Loading UI
  if (loading) {
    return (
      <div className="container py-5">
        <Skeleton height={40} width={300} className="mb-3" />
        <Skeleton height={20} width={200} className="mb-4" />
        <Skeleton height={400} />
      </div>
    );
  }

  // Job not found UI
  if (!job) {
    return (
      <div className="container py-5 text-center">
        <h3>Job not found 😢</h3>
        <Link to="/careers" className="btn btn-primary mt-3">
          Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <div className="news-container">
      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate("/careers")}>
        <FaArrowLeft className="back-icon" /> Back
      </button>

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <Link to="/careers">Latest Careers</Link>
        <span>/</span>
        <span className="active">{job.short_title || job.job_title}</span>
      </div>

      <h2 className="news-section-title">CAREER OPPORTUNITY</h2>

      <div className="news-layout">
        {/* MAIN CONTENT */}
        <div className="news-main">
          <h4 className="news-short-title">{job.short_title}</h4>
          <h3 className="news-title">{job.full_title || job.job_title}</h3>

          {/* Tags */}
          <div className="news-tags">
            {job.department && (
              <span className="tag">
                <FaBuilding className="tag-icon" /> {job.department}
              </span>
            )}

            {job.location && (
              <span className="tag">
                <FaMapMarkerAlt className="tag-icon" /> {job.location}
              </span>
            )}

            {job.job_type && (
              <span className="tag">
                <FaTag className="tag-icon" /> {job.job_type}
              </span>
            )}
          </div>

          <p className="news-date">
            Application Deadline:{" "}
            {job.application_deadline
              ? new Date(job.application_deadline).toLocaleDateString()
              : "N/A"}
          </p>

          <hr />

          {/* IMAGE */}
          {job.image && (
            <div className="news-image">
              <img
                src={`http://26.41.72.16:5000/uploads/jobs/${job.image}`}
                alt={job.full_title}
                className="news-img"
              />
            </div>
          )}

          <p className="photo-credit">
            Author: {job.author || "TMC HR Department"}
          </p>

          {/* MAIN BODY */}
          <div
            className="news-body"
            dangerouslySetInnerHTML={{ __html: job.description }}
          ></div>
        </div>

        {/* SIDEBAR */}
        <aside className="news-sidebar">
          <div className="sidebar-box">
            <h4 className="sidebar-title">More Careers</h4>

            <div className="sidebar-scroll">
              {sidebarLoading ? (
                <Skeleton count={5} height={60} className="mb-2" />
              ) : (
                <ul className="sidebar-list">
                  {allJobs
                    .filter((j) => j.id !== job.id)
                    .slice(0, 6)
                    .map((j) => (
                      <li key={j.id} className="sidebar-item">
                        <Link to={`/careers/${j.id}`} className="sidebar-link">
                          <div className="sidebar-content">
                            <h5 className="sidebar-title-text">
                              {j.short_title || j.job_title}
                            </h5>
                            <p className="sidebar-date">
                              {new Date(
                                j.application_deadline
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {/* AD BOX */}
          <div className="ad-box">
            <h4 className="ad-title">Sponsored</h4>
            <div className="ad-placeholder">Ad Space</div>
          </div>
        </aside>
      </div>
      <button className="open-btn" onClick={() => setOpen(true)}>
        APPLY NOW!
      </button>

      {open && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button className="close-btn" onClick={() => setOpen(false)}>
              ×
            </button>

            <iframe
              src="http://147.185.221.27:34249/Group-4-SIA-EMS/application-form/applicationForm.html?fbclid=IwY2xjawOfph5leHRuA2FlbQIxMABicmlkETFBUm1Ydm9ZNEt5NjJ5MUtOc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHiEssZE2bO5ItjqAaut2xQMePXMPkvvhuJ05rv95yIBzqKto221rc72bCPX5_aem_xbBpsKV7F4qSOuzzHkTmPg"
              className="modal-iframe"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentCareer;
