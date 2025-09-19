import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log("Fetching category:", category); // 👈 check category
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${
      import.meta.env.VITE_API_KEY
    }`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // 👈 check response
        setArticles(data.articles || []);
      })
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger">News</span>
      </h2>
      {articles.map((news, index) => (
        <NewsItem
          key={index}
          title={news.title}
          description={news.description}
          imageUrl={news.urlToImage}
          newsUrl={news.url}
        />
      ))}
    </div>
  );
};

export default NewsBoard;
