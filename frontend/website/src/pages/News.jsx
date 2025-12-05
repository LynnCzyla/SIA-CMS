// frontend/website/src/pages/News.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/components-css/ComponentNews.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const News = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://26.41.72.16:5000/api/news");
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Extract first sentence for preview
  const getFirstSentence = (htmlContent) => {
    const text = htmlContent.replace(/<[^>]*>/g, "");
    const match = text.match(/^[^.!?]*[.!?]/);
    return match ? match[0].trim() : text.substring(0, 100) + "...";
  };

  return (
    <div className="page-transition">
      <div className="news-section1 container py-5">
        {loading ? (
          <div className="text-center mb-5">
            <Skeleton height={40} width={300} className="mx-auto mb-3" />
            <Skeleton height={20} width={500} className="mx-auto" />
          </div>
        ) : (
          <>
            <h2 className="title-center mb-4">
              Latest <span className="title-primary">News</span>
            </h2>
            <div class="center-block">
              <p class="text-justify mb-5">
                Stay updated with all the latest Hospital Medisync news,
                including important announcements, upcoming events, health
                programs, and essential updates, so you never miss key
                information or opportunities to stay connected with the hospital
                community.
              </p>
            </div>
          </>
        )}

        <div className="row g-4">
          {loading
            ? Array(3)
                .fill()
                .map((_, i) => (
                  <div key={i} className="col-12 col-md-6 col-lg-4">
                    <div className="news-card card h-100 shadow-sm">
                      <Skeleton height={200} borderRadius={8} />
                      <div className="card-body text-center">
                        <Skeleton
                          height={25}
                          width={250}
                          className="mx-auto mb-2"
                        />
                        <Skeleton
                          height={15}
                          width={100}
                          className="mx-auto mb-2"
                        />
                        <Skeleton
                          count={3}
                          height={10}
                          width={`80%`}
                          className="mx-auto"
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
            : articles.map((article) => (
                <div key={article.id} className="col-12 col-md-6 col-lg-4">
                  <div className="news-card card h-100 shadow-sm">
                    <div
                      className="news-img rounded-top"
                      style={{
                        backgroundImage: `url(${
                          article.image_url ||
                          "https://via.placeholder.com/600x300?text=News"
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "200px",
                      }}
                    ></div>
                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                        <p className="text-muted small mb-1">
                          {article.short_title || "No short title"}
                        </p>
                        <h5 className="card-title fw-bold text-primary">
                          {article.full_title}
                        </h5>
                        <p className="text-muted small mb-2">
                          {new Date(article.created_at).toLocaleDateString()}
                        </p>
                        <p className="card-text text-secondary small">
                          {getFirstSentence(article.description)}
                        </p>
                      </div>
                      <Link
                        to={`/news/${article.slug}`} // ✅ use slug
                        className="btn btn-primary mt-3 align-self-center"
                      >
                        See More →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default News;
