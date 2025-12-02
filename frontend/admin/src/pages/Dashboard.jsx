// frontend/admin/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import ApexCharts from "apexcharts";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaGlobe, FaPenFancy, FaFileAlt } from "react-icons/fa";
import { MdFullscreen } from "react-icons/md";

const generateColors = (num) => {
  const colors = [];
  for (let i = 0; i < num; i++) {
    const hue = Math.floor((360 / num) * i);
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const [chartCategories, setChartCategories] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const [chartColors, setChartColors] = useState([]);
  const [homeVisits, setHomeVisits] = useState(0);

  const [publishedCount, setPublishedCount] = useState(0);
  const [draftCount, setDraftCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then(res => res.json())
      .then(data => {
       const normalize = (s) => (s || "").toLowerCase().trim();

       setPublishedCount(data.filter(p =>["published", "posted"].includes(normalize(p.status))).length);

        setDraftCount(data.filter(p => normalize(p.status) === "draft").length);});}, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const normalizeDate = (d) => d.split("T")[0];

    fetch("http://localhost:5000/api/track")
      .then(res => res.json())
      .then(data => {
        const pages = [...new Set(data.map(d => d.page_name))];
        const dates = [...new Set(data.map(d => normalizeDate(d.view_date)))];

        const series = pages.map(page => ({
          name: page,
          data: dates.map(date => {
            const r = data.find(
              d => d.page_name === page && normalizeDate(d.view_date) === date
            );
            return r ? r.visit_count : 0;
          }),
        }));

        setChartCategories(dates);
        setChartSeries(series);
        setChartColors(generateColors(pages.length));

        const home = data
          .filter(i => i.page_name === "/")
          .reduce((a, b) => a + Number(b.visit_count), 0);


        setHomeVisits(home);
      });
  }, []);

  useEffect(() => {
    if (!chartSeries.length) return;

    const chart = new ApexCharts(
      document.querySelector("#dashboard-chart"),
      {
        chart: { type: "line", height: 600 },
        xaxis: { categories: chartCategories },
        series: chartSeries,
        colors: chartColors,
        stroke: { curve: "smooth", width: 3 },
        legend: { show: false }
      }
    );

    chart.render();
    return () => chart.destroy();
  }, [chartSeries]);

  return (
    <div className="adminDashboard-page">

      <div className="adminDashboard-header">
        <h1 className="adminDashboard-title">Dashboard</h1>

        <div className="adminBreadcrumbs">
          <span>Dashboard</span>
          <span className="divider">/</span>
          <span>Admin Dashboard</span>
        </div>
      </div>

      <div className="adminStats">
        <div className="stats-card1">
          <div className="stats-iconCircle"><FaGlobe /></div>
          <h2>{homeVisits}</h2>
          <p>Website Visits (Home)</p>
        </div>

        <div className="stats-card1">
          <div className="stats-iconCircle"><FaPenFancy /></div>
          <h2>{publishedCount}</h2>
          <p>Published Content</p>
        </div>

        <div className="stats-card1">
          <div className="stats-iconCircle"><FaFileAlt /></div>
          <h2>{draftCount}</h2>
          <p>Draft Content</p>
        </div>
      </div>

      <div className="adminMain">
        
        <div className="adminChartCard">
          <div className="adminChart-header">
            <h3 className="adminChart-title">Website Visits</h3>
            <MdFullscreen className="adminChart-fullscreen"/>
          </div>

          <div id="dashboard-chart"></div>
        </div>

        <div className="adminSidePanel">
          <div className="adminCalendar">
            <h3>{time.toLocaleTimeString()}</h3>
            <p>{time.toLocaleDateString()}</p>
            <Calendar value={date} onChange={setDate} />
          </div>

          <div className="adminHotline">
            <h3>Emergency Hotlines</h3>
            <table className="adminHotline-table">
              <thead>
                <tr>
                  <th>Hotline</th>
                  <th>Number</th>
                </tr>
              </thead>

              <tbody>
                <tr><td>Emergency</td><td>911</td></tr>
                <tr><td>Fire Dept</td><td>0000-0000</td></tr>
                <tr><td>Hospital</td><td>0000-0000</td></tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
