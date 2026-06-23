import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home";
import SummonerList from "./SummonerList";

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/matches/:region/:name/:tag" element={<SummonerList />} />
      </Routes>
    </Router>
  );
}

export default App;
