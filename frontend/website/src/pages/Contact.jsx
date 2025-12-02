import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../css/Contact.css"; 
import Chatbot from "../components/Chatbot";

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState(null);

  // Fetch contact data from API
  useEffect(() => {
    fetch("http://localhost:5000/api/contact")
      .then((res) => res.json())
      .then((data) => {
        setContactData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching contact data:", err);
        setLoading(false);
      });
  }, []);

  // Default mobile number labels
  const mobileLabels = {
    admitting: "Admitting Section",
    sales: "Sales and Marketing",
    emergency: "Emergency Department",
    outpatient: "Outpatient Department",
    radiology: "Radiology Department (calls only)"
  };

  return (
    <div className="page-transition">
    <div className="contact-section container py-5">
      {/* Title */}
      <div className="text-center mb-5">
        {loading ? (
          <>
            <Skeleton height={40} width={300} className="mx-auto mb-3" />
            <Skeleton height={20} width={200} className="mx-auto" />
          </>
        ) : (
          <h2 className="title-center mb-5">
            Contact <span className="title-primary">Us</span>
          </h2>
        )}
      </div>

      <div className="row g-5">
        {/* Left Column: Form */}
        <div className="col-12 col-lg-6">
          {loading ? (
            <div className="card shadow-sm p-5 contact-card">
              <Skeleton height={30} width="50%" className="mx-auto mb-4" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} height={45} className="mb-3" />
              ))}
              <Skeleton height={45} width="50%" className="mt-3 mx-auto rounded-pill" />
            </div>
          ) : (
            <div className="card shadow-sm p-5 contact-card">
              <h4 className="mb-4 text-center">Send Us a Message</h4>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Full Name" required />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Mobile Number" required />
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Subject" required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Email" required />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="5" placeholder="Your Message" required></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-5">Send Message</button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Contact Info - NOW DYNAMIC */}
        <div className="col-12 col-lg-6">
          {loading ? (
            <div className="contact-info p-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} height={25} className="mb-3" />
              ))}
            </div>
          ) : (
            <div className="contact-info p-4">
              <h4 className="mb-3">{contactData?.contact_us || "Get in Touch"}</h4>
              <p>{contactData?.contact_info || "We value your feedback and are happy to assist you with inquiries about our hospital services."}</p>

              <div className="mb-4">
                <h5><FaMapMarkerAlt className="me-2 text-primary"/>Hospital Address</h5>
                <p>{contactData?.hospital_address || "123 Health Avenue, Kapasigan, Pasig City, Philippines"}</p>
              </div>

              <div className="mb-4">
                <h5><FaPhoneAlt className="me-2 text-primary"/>Telephone</h5>
                <p>{contactData?.telephone || "Tel: (+632) 123-4567"}</p>
              </div>

              <div className="mb-4">
                <h5><FaPhoneAlt className="me-2 text-primary"/>Mobile Numbers</h5>
                <ul className="list-unstyled">
                  {contactData?.mobile_numbers && Object.keys(contactData.mobile_numbers).map((key) => (
                    contactData.mobile_numbers[key] && (
                      <li key={key}>
                        {mobileLabels[key] || key}: {contactData.mobile_numbers[key]}
                      </li>
                    )
                  ))}
                </ul>
              </div>

              <div>
                <h5><FaEnvelope className="me-2 text-primary"/>Email</h5>
                <p>{contactData?.email || "info@yourhospital.com"}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Chatbot />
    </div>
    </div>
  );
};

export default Contact;