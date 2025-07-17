import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function URLShortenerPage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const validateAndFormatUrl = (url) => {
    let formatted = url.trim();
    if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
      formatted = "https://" + formatted;
    }

    try {
      new URL(formatted);
      return formatted;
    } catch {
      return null;
    }
  };

  const handleShorten = () => {
    const validUrl = validateAndFormatUrl(originalUrl);
    if (!validUrl) {
      setError("Please enter a valid URL");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("shortUrls") || "[]");

    const existing = stored.find((entry) => entry.originalUrl === validUrl);
    if (existing) {
      setShortUrl(existing.shortUrl);
      setOpenSnackbar(true);
      setError("");
      return;
    }

    const shortId = Math.random().toString(36).substr(2, 5);
    const newShortUrl = `https://short.ly/${shortId}`;

    const newEntry = {
      originalUrl: validUrl,
      shortUrl: newShortUrl,
      clicks: 0,
    };

    const updated = [...stored, newEntry];
    localStorage.setItem("shortUrls", JSON.stringify(updated));

    setShortUrl(newShortUrl);
    setOpenSnackbar(true);
    setError("");
  };

  const handleClick = () => {
    const all = JSON.parse(localStorage.getItem("shortUrls") || "[]");
    const updated = all.map((entry) =>
      entry.shortUrl === shortUrl
        ? { ...entry, clicks: entry.clicks + 1 }
        : entry
    );
    localStorage.setItem("shortUrls", JSON.stringify(updated));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h4" align="center">
          🔗 URL Shortener
        </Typography>

        <TextField
          label="Enter your long URL"
          variant="outlined"
          fullWidth
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          error={!!error}
          helperText={error || "Include https:// or we'll add it for you"}
        />

        <Button variant="contained" onClick={handleShorten}>
          Shorten URL
        </Button>

        {shortUrl && (
          <Typography align="center" variant="h6" color="primary">
            ✅ Your short URL:
            <a
              href={originalUrl}
              onClick={handleClick}
              target="_blank"
              rel="noreferrer"
              style={{
                wordBreak: "break-all",
                display: "block",
                marginTop: 10,
              }}
            >
              {shortUrl}
            </a>
          </Typography>
        )}

        <Button onClick={() => navigate("/stats")}>View Stats</Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          URL shortened successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default URLShortenerPage;
