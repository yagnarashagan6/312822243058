import { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function StatisticsPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortUrls") || "[]");
    setStats(stored);
  }, []);

  const total = stats.length;
  const mostClicked = stats.reduce(
    (prev, current) => (current.clicks > (prev.clicks || 0) ? current : prev),
    {}
  );
  const avgClicks = total
    ? (stats.reduce((sum, entry) => sum + entry.clicks, 0) / total).toFixed(2)
    : 0;

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h4" align="center">
          📊 URL Statistics
        </Typography>

        <Typography>
          Total URLs shortened: <strong>{total}</strong>
        </Typography>

        {mostClicked && mostClicked.shortUrl && (
          <Typography>
            Most clicked URL:{" "}
            <a href={mostClicked.originalUrl} target="_blank" rel="noreferrer">
              {mostClicked.shortUrl}
            </a>{" "}
            (<strong>{mostClicked.clicks}</strong> clicks)
          </Typography>
        )}

        <Typography>
          Average clicks per URL: <strong>{avgClicks}</strong>
        </Typography>

        <Button variant="outlined" onClick={() => navigate("/")}>
          🔙 Back to Shortener
        </Button>
      </Box>
    </Container>
  );
}

export default StatisticsPage;
