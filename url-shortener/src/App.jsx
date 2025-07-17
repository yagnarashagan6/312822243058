import { Routes, Route } from "react-router-dom";
import StatisticsPage from "./components/StatisticsPage";
import URLShortenerPage from "./components/URLShortenerPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<URLShortenerPage />} />
      <Route path="/stats" element={<StatisticsPage />} />
    </Routes>
  );
}

export default App;
