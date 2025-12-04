const FETCH_TIMEOUT_MS = 5000; // 5 seconds for GET requests

// --- Helper: Fetch with timeout ---
const fetchWithTimeout = async (url) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
};

// --- GET Requests ---
export const fetchMedia = async () => {
  const data = await fetchWithTimeout("http://26.41.72.16:5000/api/media/files");
  return data.files || [];
};

export const fetchAnnouncements = async () => {
  const data = await fetchWithTimeout("http://26.41.72.16:5000/api/announcements");
  return (data || []).filter(item => item.status === "published");
};

export const fetchNews = async () => {
  const data = await fetchWithTimeout("http://26.41.72.16:5000/api/news");
  return data || [];
};

// --- POST Upload Media ---
export const uploadMedia = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://26.41.72.16:5000/api/media/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    return await res.json();
  } catch (err) {
    console.error("Error uploading media:", err);
    throw err;
  }
};
