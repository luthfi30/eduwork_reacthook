import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "1f9008ba7451410f912a783548978fbf";
const API_URL = "https://newsapi.org/v2/top-headlines";

const NewsPortal = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            country: "us",
            category: category,
            q: searchTerm, // Added to search by category
            apiKey: API_KEY,
          },
        });
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [category, searchTerm]); // Added searchTerm as dependency

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <nav className="navbar">
        <button className={category === "general" ? "active" : ""} onClick={() => handleCategoryChange("general")}>
          General
        </button>
        <button className={category === "business" ? "active" : ""} onClick={() => handleCategoryChange("business")}>
          Business
        </button>
      </nav>
      <div className="search-container">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
      </div>
      <div className="news-container">
        {news.map((article, index) => (
          <div key={index} className="card">
            <img src={article.urlToImage} className="card-img-top" alt={article.title} />
            <div className="card-body">
              <h5 className="card-title">{article.title}</h5>
              <p className="card-text">{article.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPortal;
