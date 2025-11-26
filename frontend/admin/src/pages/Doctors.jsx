// frontend/admin/src/pages/Doctors.jsx
import { useState, useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import Swal from "sweetalert2";
import defaultProfile from "../assets/default-doctors-profile.svg";
import "../css/doctors.css";

// Toggle Switch Component
const ToggleSwitch = ({ isOn, onToggle }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isOn} onChange={onToggle} />
      <span className="slider">
        <span className="slider-text">{isOn ? "ON" : "OFF"}</span>
      </span>
    </label>
  );
};

// Add this line right after your color array
const colorPalette = [
  "#DC2626",
  "#EA580C",
  "#FACC15",
  "#84CC16",
  "#22C55E",
  "#10B981",
  "#14B8A6",
  "#06B6D4",
  "#0EA5E9",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#A855F7",
  "#D946EF",
  "#EC4899",
  "#F43F5E",
  "#F97316",
  "#FB923C",
  "#FDBA74",
  "#FDE68A",
];

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchData() {
  try {
    const [empRes, deptRes] = await Promise.all([
      fetch(
        "http://147.185.221.27:34249/Group-4-SIA-EMS/api/api.php?module=employee&filter_doctors=1"
      ),
      fetch(
        "http://147.185.221.27:34249/Group-4-SIA-EMS/api/api.php?module=departments"
      )
    ]);

    if (!empRes.ok || !deptRes.ok) {
      throw new Error("API failure.");
    }

    const employees = await empRes.json();
    const departments = await deptRes.json();

    console.log("Fetched Employees:", employees);
    console.log("Fetched Departments:", departments);

    // Lookup table: departmentID → DepartmentName
    const deptMap = {};
    departments.forEach((d) => {
      deptMap[d.departmentID] = d.DepartmentName;
    });

    const formatted = employees.map((emp, index) => ({
      id: emp.employeeID || index,
      name: `${emp.firstName} ${emp.lastName}`,
      department: deptMap[emp.departmentID] || "Unknown Department",
      specialization: emp.position,
      contactNumber: emp.Number,
      email: emp.Email,
      schedule: "N/A",
      visualStatus: "Shown",
      isActive: true,
      image: emp.image || defaultProfile,
    }));

    setDoctors(formatted);
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "API Error",
      text: err.message,
    });
  }
}

fetchData();
  }, []);

  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // NEW: Store the colors for the current specializations
  const [specializationColors, setSpecializationColors] = useState({});

  // Generate consistent colors once per specialization
  useEffect(() => {
    const specCount = doctors.reduce((acc, doc) => {
      acc[doc.specialization] = (acc[doc.specialization] || 0) + 1;
      return acc;
    }, {});

    const colorsMap = {};
    let colorIndex = 0;
    Object.keys(specCount).forEach((spec) => {
      if (!specializationColors[spec]) {
        colorsMap[spec] = colorPalette[colorIndex % colorPalette.length];
        colorIndex++;
      } else {
        colorsMap[spec] = specializationColors[spec];
      }
    });

    setSpecializationColors((prev) => ({ ...prev, ...colorsMap }));
  }, [doctors]);

  // ApexCharts – use the SAME colors from state
  useEffect(() => {
    const specCount = doctors.reduce((acc, doc) => {
      acc[doc.specialization] = (acc[doc.specialization] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(specCount);
    const series = Object.values(specCount);
    const colors = labels.map(
      (spec) => specializationColors[spec] || "#A855F7"
    );

    const options = {
      chart: { type: "donut", height: 280 },
      series,
      labels,
      colors, // ← same colors as legend!
      legend: { show: false },
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total",
                fontSize: "16px",
                fontWeight: 600,
                color: "#043873",
                formatter: () => doctors.length,
              },
            },
          },
        },
      },
      tooltip: { y: { formatter: (val) => `${val} doctors` } },
    };

    if (chartInstance.current) chartInstance.current.destroy();
    chartInstance.current = new ApexCharts(chartRef.current, options);
    chartInstance.current.render();

    return () => chartInstance.current?.destroy();
  }, [doctors, specializationColors]);

  // Legend – use the SAME colors from state
  const legendData = Object.entries(
    doctors.reduce((acc, d) => {
      acc[d.specialization] = (acc[d.specialization] || 0) + 1;
      return acc;
    }, {})
  );

  // Filtering + Pagination
  useEffect(() => {
    let filtered = doctors;

    if (!showAll) {
      if (searchTerm)
        filtered = filtered.filter((d) =>
          d.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      if (statusFilter)
        filtered = filtered.filter((d) =>
          statusFilter === "Active"
            ? d.visualStatus === "Shown"
            : d.visualStatus === "Not Shown"
        );
      if (specializationFilter)
        filtered = filtered.filter(
          (d) => d.specialization === specializationFilter
        );
    }

    setFilteredDoctors(filtered);
    setCurrentPage(1); // Reset to first page on filter
  }, [searchTerm, statusFilter, specializationFilter, showAll, doctors]);

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const pageItems = filteredDoctors.slice(
    (currentPage - 1) * doctorsPerPage,
    currentPage * doctorsPerPage
  );

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setSpecializationFilter("");
    setShowAll(false);
    setCurrentPage(1);
  };

  const handleToggle = (id) => {
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              isActive: !doc.isActive,
              visualStatus: doc.isActive ? "Not Shown" : "Shown",
            }
          : doc
      )
    );
  };

  const totalDoctors = doctors.length;
  const visibleDoctors = doctors.filter(
    (d) => d.visualStatus === "Shown"
  ).length;

  return (
    <div className="doctors-page">
      {/* Header */}
      <div className="header">
        <h1 className="header-title">Doctors</h1>
        <p className="header-breadcrumb">Admin Dashboard / Doctors</p>
      </div>

      {/* Stats Card */}
      <div className="stats-card">
        <div className="stats-card-content">
          <div className="chart-section">
            <div ref={chartRef} className="apex-chart"></div>
            <div className="legend">
              <h3 className="legend-title">SPECIALIZATION</h3>
              <div className="legend-grid">
                {legendData.map(([spec], i) => (
                  <div key={i} className="legend-item">
                    <span
                      className="legend-color"
                      style={{
                        backgroundColor:
                          specializationColors[spec] || "#A855F7",
                      }}
                    />
                    <span className="legend-text">{spec}</span>
                  </div>
                ))}
                {legendData.length < 6 && (
                  <div className="legend-item">
                    <span className="legend-text more">More...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="stats-numbers">
            <div className="stat-item">
              <p className="stat-value stat-value-primary">{totalDoctors}</p>
              <p className="stat-label">DOCTORS</p>
            </div>
            <div className="stat-item">
              <p className="stat-value stat-value-secondary">
                {visibleDoctors}
              </p>
              <p className="stat-label">PUBLICLY VISIBLE</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Table */}
      <div className="filters-card">
        <div className="filter-row">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="dropdown-select"
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select className="dropdown-select">
            <option>Schedule</option>
          </select>

          <select
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
            className="dropdown-select"
          >
            <option value="">Specialization</option>
            {[...new Set(doctors.map((d) => d.specialization))].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Doctors Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <button className="btn btn-search">Search</button>
          <button className="btn btn-clearFilter" onClick={handleClearFilters}>
            Clear Filter
          </button>
        </div>

        <div className="secondary-filter-row">
          <button
            className={`btn ${showAll ? "btn-active" : "btn-show-all"}`}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Filtered View" : "Show All"}
          </button>
          <button className="btn btn-refresh">Refresh</button>
        </div>

        {/* Table */}
        <div className="table-container">
          <table className="doctors-table">
            <thead>
              <tr className="table-header-row">
                <th className="table-header-cell">No</th>
                <th className="table-header-cell">Image</th>
                <th className="table-header-cell">Name</th>
                <th className="table-header-cell">Department</th>
                <th className="table-header-cell">Specialization</th>
                <th className="table-header-cell">Contact</th>
                <th className="table-header-cell">Email</th>
                <th className="table-header-cell">Schedule</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((doctor, i) => (
                <tr key={doctor.id} className="table-row">
                  <td className="table-cell">
                    {(currentPage - 1) * doctorsPerPage + i + 1}
                  </td>
                  <td className="table-cell">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="doctor-photo"
                    />
                  </td>
                  <td className="table-cell">{doctor.name}</td>
                  <td className="table-cell">{doctor.department}</td>
                  <td className="table-cell">{doctor.specialization}</td>
                  <td className="table-cell">{doctor.contactNumber}</td>
                  <td className="table-cell">{doctor.email}</td>
                  <td className="table-cell">{doctor.schedule}</td>
                  <td className="table-cell">
                    <span
                      className={`status-badge ${
                        doctor.visualStatus === "Shown" ? "shown" : "hidden"
                      }`}
                    >
                      {doctor.visualStatus}
                    </span>
                  </td>
                  <td className="table-cell">
                    <ToggleSwitch
                      isOn={doctor.isActive}
                      onToggle={() => handleToggle(doctor.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bootstrap-style Pagination (Same as Posts page) */}
          <nav aria-label="Doctors pagination" className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
