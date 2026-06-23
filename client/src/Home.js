import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = ({ className = "home-center" }) => {
  const [region, setRegion] = useState("KR");
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!name || !tag) {
      alert("이름과 태그를 입력하세요.");
      return;
    }
    navigate(`/matches/${region}/${name}/${tag}`);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <div className={className}>
      <div className="search-bar" onKeyDown={onKeyDown}>
        <select
          className="region-select"
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
          }}
        >
          <option value="KR">KR</option>
          <option value="NA">NA</option>
          <option value="EUW">EUW</option>
          <option value="EUNE">EUNE</option>
          <option value="JP">JP</option>
        </select>
        <input
          className="name-input"
          type="text"
          placeholder="소환사 이름"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <input
          className="tag-input"
          type="text"
          placeholder="태그 (예: kr1)"
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
          }}
        ></input>
        <button className="search-button" onClick={handleSearch}>
          검색
        </button>
      </div>
    </div>
  );
};

export default Home;
