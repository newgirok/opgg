import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Home.css";

const SearchBar = () => {
  const [region, setRegion] = useState("KR");
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!name || !tag) return;
    navigate(`/matches/${region}/${name}/${tag}`);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-bar" onKeyDown={onKeyDown}>
      <div className="search-region">
        <span className="search-region-label">Region</span>
        <select
          className="region-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="KR">Korea</option>
          <option value="NA">NA</option>
          <option value="EUW">EUW</option>
          <option value="EUNE">EUNE</option>
          <option value="JP">Japan</option>
        </select>
      </div>
      <div className="search-divider" />
      <div className="search-input-wrap">
        <span className="search-input-label">Search</span>
        <div className="search-input-row">
          <input
            className="name-input"
            type="text"
            placeholder="Game name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="search-hash">+</span>
          <span className="search-hash search-hash--tag">#</span>
          <input
            className="tag-input"
            type="text"
            placeholder={region === "KR" ? "KR1" : "TAG"}
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
      </div>
      <button className="search-button" onClick={handleSearch}>
        .GG
      </button>
    </div>
  );
};

const Home = ({ className }) => {
  if (className === "home-top") {
    return (
      <div className="home-top">
        <Header />
      </div>
    );
  }

  return (
    <div className="home-center">
      <Header />
      <div className="home-body">
        <div className="home-logo">OP.GG</div>
        <SearchBar />
      </div>
    </div>
  );
};

export default Home;
