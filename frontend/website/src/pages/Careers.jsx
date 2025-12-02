import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/components-css/ComponentNews.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Chatbot from "../components/Chatbot";

const Careers = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Search and filter states
  const [keyword, setKeyword] = useState("");
  const [jobField, setJobField] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Fetch jobs from backend API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const query = new URLSearchParams({
          keyword,
          department: jobField,
          location,
          sort: sortBy,
        }).toString();

        const res = await fetch(`http://localhost:5000/api/jobs?${query}`);
        const data = await res.json();

        if (Array.isArray(data.jobs)) {
          setJobs(data.jobs);
          setFilteredJobs(data.jobs);
        } else {
          console.error("Invalid API response:", data);
          setJobs([]);
          setFilteredJobs([]);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [keyword, jobField, location, sortBy]);

  return (
    <div className="page-transition">
    <div className="news-section1 container py-5">
      {/* Title Section */}
      {loading ? (
        <div className="text-center mb-5">
          <Skeleton height={40} width={350} className="mx-auto mb-3" />
          <Skeleton height={20} width={500} className="mx-auto" />
        </div>
      ) : (
        <>
          <h2 className="title-center mb-4 text-primary">
            Latest <span className="title-primary">Careers</span>
          </h2>
          <p className="intro-text text-center mb-5">
            Join our healthcare team and be part of an organization where you
            can make a meaningful impact on people's lives. As a valued member,
            you'll collaborate with dedicated professionals to provide
            compassionate, high-quality care.
          </p>
        </>
      )}

      {/* Filters */}
      {!loading && (
        <div className="mb-5">
          <h4 className="mb-3 text-primary">Search for Job Openings</h4>
          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={jobField}
                onChange={(e) => setJobField(e.target.value)}
              >
                <option value="">All Departments</option>
                {[...new Set(jobs.map((job) => job.department))].map(
                  (dept, idx) => (
                    <option key={idx} value={dept}>
                      {dept}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {[...new Set(jobs.map((job) => job.location))].map(
                  (loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="title">Job Title (A–Z)</option>
                <option value="date">Application Deadline (Newest)</option>
                <option value="department">Department (A–Z)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Job Grid */}
      <div className="career-scroll row g-4">
        {loading ? (
          Array(6)
            .fill()
            .map((_, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="news-card card h-100 shadow-sm">
                  <Skeleton height={200} borderRadius={8} />
                  <div className="card-body text-center">
                    <Skeleton
                      height={25}
                      width={200}
                      className="mx-auto mb-2"
                    />
                    <Skeleton
                      height={15}
                      width={150}
                      className="mx-auto mb-2"
                    />
                    <Skeleton
                      height={35}
                      width={120}
                      className="mt-3 mx-auto rounded-pill"
                    />
                  </div>
                </div>
              </div>
            ))
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="col-12 col-md-6 col-lg-4">
              <div className="news-card card h-100 shadow-sm">
                <div
                  className="news-img rounded-top"
                  style={{
                    backgroundImage: `url(${
                      job.image
                        ? `http://localhost:5000/uploads/jobs/${job.image}`
                        : "https://via.placeholder.com/600x300"
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "200px",
                  }}
                ></div>

                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-bold text-primary">
                      {job.job_title || "Untitled Job"}
                    </h5>

                    {job.short_title && (
                      <p className="text-secondary mb-3 fw-semibold">
                        {job.short_title}
                      </p>
                    )}
                    <p className="text-muted small mb-0">
                      Application Deadline:{" "}
                      {new Date(job.application_deadline).toLocaleDateString()}
                    </p>
                  </div>

                  <Link
                    to={`/careers/${job.id}`}
                    className="btn btn-primary mt-3 align-self-center"
                  >
                    See More →
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5 text-muted">
            <p>No jobs found. Try adjusting your filters or search keywords.</p>
          </div>
        )}
      </div>

    </div>
    </div>
  );
};

export default Careers;
