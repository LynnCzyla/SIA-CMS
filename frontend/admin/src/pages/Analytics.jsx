// frontend/src/pages/Analytics.jsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FaGlobe,
  FaHome,
  FaSmile,
  FaUserMd,
  FaBullhorn,
  FaNewspaper,
  FaHeartbeat,
  FaBriefcase,
  FaInfoCircle,
  FaPhone,
} from "react-icons/fa";
import ApexCharts from "apexcharts";
import "../css/Analytics.css";

const Analytics = () => {
  const [chartType, setChartType] = useState("line");
  const [period, setPeriod] = useState("weekly"); // default to weekly
  const [weeklyData, setWeeklyData] = useState({ categories: [], series: [] });
  const [monthlyData, setMonthlyData] = useState({ categories: [], series: [] });
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPage, setSelectedPage] = useState("all");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const [websiteVisits] = useState();
  const [homePageClicks] = useState();
  

  const [visitLogs, setVisitLogs] = useState([]);

  useEffect(() => {
    const fetchWeekly = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/track/weekly");
  
        const categoriesSet = new Set();
        const pageMap = {};
  
        res.data.forEach(item => {
          const date = item.date;
          const page = item.page_name;
          const total = Number(item.total);
  
          categoriesSet.add(date);
          if (!pageMap[page]) pageMap[page] = {};
          pageMap[page][date] = total;
        });
  
        const categories = Array.from(categoriesSet).sort();
        const series = Object.entries(pageMap).map(([page, data]) => ({
          name: page,
          data: categories.map(date => data[date] || 0)
        }));
  
        setWeeklyData({ categories, series });
      } catch (err) {
        console.error("Error fetching weekly data:", err);
        setWeeklyData({ categories: [], series: [] });
      }
    };
  
    fetchWeekly();
  }, []);

  useEffect(() => {
    const fetchMonthly = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/track/monthly");
  
        const categoriesSet = new Set();
        const pageMap = {};
  
        res.data.forEach(item => {
          const date = item.date;
          const page = item.page_name;
          const total = Number(item.total);
  
          categoriesSet.add(date);
          if (!pageMap[page]) pageMap[page] = {};
          pageMap[page][date] = total;
        });
  
        const categories = Array.from(categoriesSet).sort();
        const series = Object.entries(pageMap).map(([page, data]) => ({
          name: page,
          data: categories.map(date => data[date] || 0)
        }));
  
        setMonthlyData({ categories, series });
      } catch (err) {
        console.error("Error fetching monthly data:", err);
        setMonthlyData({ categories: [], series: [] });
      }
    };
  
    fetchMonthly();
  }, []);
  

  useEffect(() => {
    const fetchPageViews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/track"); // match backend
        const logsFromDB = res.data.map((row, index) => ({
          id: index + 1,
          page: row.page_name,
          clicks: Number(row.visit_count), // ensure numeric
          datetime: row.view_date,
        }));        
        setVisitLogs(logsFromDB);
      } catch (err) {
        console.error("Error fetching page views:", err);
        setVisitLogs([]);
      }
    };
    fetchPageViews();
  }, []);
  
  

  // ===========================
  // FIXED: Page counts for stat cards
  // ===========================
  const pageCounts = visitLogs.reduce((acc, log) => {
    acc[log.page] = (acc[log.page] || 0) + log.clicks;
    return acc;
  }, {});

  // ===========================
  // FIXED: statsCards (dynamic from pageCounts)
  // ===========================
  const statsCards = [
    { Icon: FaGlobe, count: visitLogs.reduce((t, l) => t + l.clicks, 0), label: "Total Website Clicks" },
    { Icon: FaHome, count: pageCounts["/"] || 0, label: "Home Page Clicks" },
    { Icon: FaSmile, count: pageCounts["/services"] || 0, label: "Services Page Clicks" },
    { Icon: FaUserMd, count: pageCounts["/doctors"] || 0, label: "Doctors Page Clicks" },
    { Icon: FaBullhorn, count: pageCounts["/announcements"] || 0, label: "Announcement Page Clicks" },
    { Icon: FaNewspaper, count: pageCounts["/news"] || 0, label: "News Page Clicks" },
    { Icon: FaHeartbeat, count: pageCounts["/health"] || 0, label: "Health Tips Page Clicks" },
    { Icon: FaBriefcase, count: pageCounts["/careers"] || 0, label: "Careers Page Clicks" },
    { Icon: FaInfoCircle, count: pageCounts["/about"] || 0, label: "About Page Clicks" },
    { Icon: FaPhone, count: pageCounts["/contact"] || 0, label: "Contact Page Clicks" },
  ];


  const getMainChartData = () => {
    if (period === "weekly") {
      // Aggregate by weekday
      const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      const weeklyCounts = Array(7).fill(0);
  
      visitLogs.forEach(log => {
        const d = new Date(log.datetime);
        const dayIndex = d.getDay(); // 0=Sun ... 6=Sat
        weeklyCounts[dayIndex] += log.clicks;
      });
  
      return {
        categories: weekdays,
        series: [{ name: "Website Visits", data: weeklyCounts }],
      };
    } else {
      // Aggregate by month
      const months = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];
      const monthlyCounts = Array(12).fill(0);
  
      visitLogs.forEach(log => {
        const d = new Date(log.datetime);
        const monthIndex = d.getMonth(); // 0=Jan ... 11=Dec
        monthlyCounts[monthIndex] += log.clicks;
      });
  
      return {
        categories: months,
        series: [{ name: "Website Visits", data: monthlyCounts }],
      };
    }
  };
  
  
  
  

  // ===========================
  // MAIN CHART RENDER
  // ===========================
  useEffect(() => {
    if (chartInstanceRef.current) {
      try { chartInstanceRef.current.destroy(); } catch {}
      chartInstanceRef.current = null;
    }
  
    const mainData = getMainChartData();
  
    let options = {};
  
    if (chartType === "pie") {
      options = {
        chart: { type: "pie", height: 420, background: "transparent" },
        series: mainData.series[0].data,
        labels: mainData.categories,
        colors: ["#4f9cf9", "#60a5fa", "#7dd3fc", "#93c5fd", "#bae6fd", "#bfdbfe"],
        tooltip: { theme: "light" },
        legend: { position: "bottom" },
        responsive: [
          { breakpoint: 480, options: { chart: { height: 300 }, legend: { position: "bottom" } } }
        ]
      };
    } else {
      options = {
        chart: { type: chartType, height: 420, background: "transparent" },
        series: mainData.series,
        xaxis: { categories: mainData.categories, title: { text: period === "weekly" ? "Day of week" : "Month" } },
        stroke: { curve: "smooth", width: chartType === "bar" ? 0 : 3 },
        fill: { opacity: chartType === "area" ? 0.25 : 0.6 },
        plotOptions: { bar: { borderRadius: 6 } },
        colors: ["#4f9cf9", "#60a5fa", "#7dd3fc", "#93c5fd", "#bae6fd", "#bfdbfe"],
        markers: { size: 4 },
        tooltip: { theme: "light" },
        grid: { borderColor: "#eef2ff", strokeDashArray: 4 }
      };
    }
  
    const el = document.querySelector("#main-analytics-chart");
    chartInstanceRef.current = new ApexCharts(el, options);
    chartInstanceRef.current.render();
  
    return () => {
      if (chartInstanceRef.current) {
        try { chartInstanceRef.current.destroy(); } catch {}
        chartInstanceRef.current = null;
      }
    };
  }, [chartType, period, visitLogs]);  
  
  

  // ===========================
  // Mini sparklines
  // ===========================
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.forEach((c) => {
        try { c.destroy(); } catch {}
      });
    }
    chartRef.current = [];

    const statCharts = document.querySelectorAll(".stat-sparkline");
    statCharts.forEach((el) => {
      const data = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 20);
      const mini = new ApexCharts(el, {
        chart: { type: "area", sparkline: { enabled: true }, height: 50, width: 120 },
        series: [{ data }],
        stroke: { curve: "smooth", width: 2 },
        fill: { opacity: 0.12 },
        colors: ["#4f9cf9"],
      });
      mini.render();
      chartRef.current.push(mini);
    });
  }, [visitLogs]);

  // ===========================
  // Tables & Filters
  // ===========================
  const filteredLogs = visitLogs
    .filter((log) => (selectedPage === "all" ? true : log.page === selectedPage))
    .filter((log) => {
      if (!dateStart && !dateEnd) return true;
      if (dateStart && !dateEnd) return log.datetime >= dateStart;
      if (!dateStart && dateEnd) return log.datetime <= dateEnd;
      return log.datetime >= dateStart && log.datetime <= dateEnd;
    })
    .sort((a, b) => (sortOrder === "asc" ? a.clicks - b.clicks : b.clicks - a.clicks));

  const prettifyNumber = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n;
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1 className="title">Analytics & Reports</h1>
          <div className="breadcrumbs">
            <span>Analytics</span>
            <span className="divider">/</span>
            <span>Admin Dashboard</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="period-toggle">
            <button className={`period-btn ${period === "weekly" ? "active" : ""}`} onClick={() => setPeriod("weekly")}>Weekly</button>
            <button className={`period-btn ${period === "monthly" ? "active" : ""}`} onClick={() => setPeriod("monthly")}>Monthly</button>
          </div>

          <select className="chart-dropdown header-select" value={chartType} onChange={(e) => setChartType(e.target.value)}>
            <option value="line">Line</option>
            <option value="area">Area</option>
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
          </select>
        </div>
      </div>

      <div className="info-data">
        {statsCards.map((card, i) => {
          const Icon = card.Icon;
          return (
            <div className="card1 stat-card" key={i}>
              <div className="card-top">
                <div className="icon-circle small"><Icon /></div>
                <div className="card-val">
                  <h3>{prettifyNumber(card.count)}</h3>
                  <p>{card.label}</p>
                </div>
              </div>

              <div className="sparkline-row">
                <div className="stat-sparkline" />
                {card.link && <a className="view-link" href={card.link} target="_blank">View</a>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="chart-card">
        <div className="chart-title">
          <div>
            <h3 className="chart-name">Website Visits</h3>
            <p className="chart-sub">Overview for: <strong>{period === "weekly" ? "This Week" : "This Year (Monthly)"}</strong></p>
          </div>

          <div className="chart-controls">
            <div className="chart-stats-inline">
              <div className="mini-stat">
                <span className="mini-value">{prettifyNumber(websiteVisits)}</span>
                <small>visits</small>
              </div>
              <div className="mini-stat">
                <span className="mini-value">{prettifyNumber(homePageClicks)}</span>
                <small>home clicks</small>
              </div>
            </div>
          </div>
        </div>

        <div id="main-analytics-chart" />

        <div className="visit-logs">
          <h4>Recent Visit Logs</h4>

          <div className="logs-toolbar">
            <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
              <option value="all">All Pages</option>
              <option value="/">Home</option>
              <option value="/services">Services</option>
              <option value="/doctors">Doctors</option>
              <option value="/announcements">Announcements</option>
              <option value="/news">News</option>
              <option value="/health">Health Tips</option>
              <option value="/careers">Careers</option>
              <option value="/about">About</option>
              <option value="/contact">Contact</option>
            </select>

            <input type="date" value={dateStart} onChange={(e) => setDateStart(e.target.value)} />
            <input type="date" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />

            <div className="toolbar-right">
              <button onClick={() => setSortOrder("desc")} className={sortOrder === "desc" ? "active" : ""}>Sort ↓</button>
              <button onClick={() => setSortOrder("asc")} className={sortOrder === "asc" ? "active" : ""}>Sort ↑</button>
            </div>
          </div>

          <table className="logs-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Page Visited</th>
                <th>Clicks</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length ? (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.page}</td>
                    <td>{log.clicks}</td>
                    <td>{log.datetime}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>No logs found for selected filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
