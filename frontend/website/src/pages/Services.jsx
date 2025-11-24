// frontend/website/src/pages/Services.jsx
import { useEffect, useState } from "react";

export default function Services() {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then(res => res.json())
      .then(data => setServicesData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="py-5" style={{ backgroundColor: "var(--white)" }}>
      <div className="container" style={{ maxWidth: "1320px" }}>
        <h2 className="title-center mb-5">
          Our <span className="title-primary">Services</span>
        </h2>

        <div className="row g-5">
          {servicesData.map((service, index) => (
            <div key={index} className="col-12 col-lg-6">
              <div className="service-card-modern d-flex align-items-center bg-white rounded-4 overflow-hidden shadow-sm">
                {/* Left: Image Container */}
                <div className="service-image flex-shrink-0">
                  {service.image_url ? (
                    <img
                      src={service.image_url}
                      alt={service.short_title}
                      className="img-fluid"
                    />
                  ) : (
                    // Default fallback brain SVG (you can replace with your actual SVG)
                    <svg
                      width="180"
                      height="180"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                        stroke="#4f9cf9"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M8 14s1.5 2 4 2 4-2 4-2"
                        stroke="#4f9cf9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="9" cy="10" r="1" fill="#4f9cf9" />
                      <circle cx="15" cy="10" r="1" fill="#4f9cf9" />
                    </svg>
                  )}
                </div>

                {/* Right: Content */}
                <div className="p-4 p-md-5 flex-grow-1">
                  <h3 className="h4 fw-bold text-primary mb-3">
                    {service.short_title || "Psychiatry / Behavioral Health"}
                  </h3>
                  <p
                    className="text-gray mb-4"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                  <a href="#" className="btn btn-outline-primary rounded-pill px-4">
                    Read More →
                  </a>
                  {service.created_at && (
                    <p className="text-muted small mt-3 mb-0">
                      Added on {new Date(service.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}