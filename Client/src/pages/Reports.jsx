import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Calendar, TrendingUp, Users, AlertCircle, Image, Activity, CheckCircle, XCircle } from "lucide-react";

// Mock data for 5 genuine training institutes with photo-based analysis
const instituteReports = [
  {
    id: 1,
    name: "National Skill Development Center, Delhi",
    location: "Okhla, New Delhi",
    photo: "/images/labs/lab1.jpg", // Add this photo in public/images/labs/
    date: "2025-10-28",
    engagement: 87,
    score: 89,
    studentCount: 32,
    teacherActive: true,
    activities: ["Practical Training", "Group Discussion", "Hands-on Learning"],
    flag: "Green",
    analysis: {
      summary: "Excellent engagement observed. Students actively participating in hands-on training. Teacher demonstrating proper technique with good classroom management.",
      highlights: [
        "High student attention level",
        "Effective practical demonstration",
        "Good classroom arrangement",
        "Active participation visible"
      ],
      concerns: []
    },
    trendData: [
      { time: "10:00", engagement: 82 },
      { time: "10:30", engagement: 85 },
      { time: "11:00", engagement: 87 },
      { time: "11:30", engagement: 89 },
      { time: "12:00", engagement: 87 }
    ]
  },
  {
    id: 2,
    name: "ITI Technical Training Institute, Mumbai",
    location: "Andheri West, Mumbai",
    photo: "/images/labs/lab2.jpg",
    date: "2025-10-27",
    engagement: 92,
    score: 94,
    studentCount: 28,
    teacherActive: true,
    activities: ["Machine Operation", "Safety Training", "Skill Assessment"],
    flag: "Green",
    analysis: {
      summary: "Outstanding performance. Well-structured practical session with excellent student engagement. Clear demonstration of industrial training standards.",
      highlights: [
        "Exceptional student focus",
        "Professional training setup",
        "Safe working practices",
        "Clear instructor guidance"
      ],
      concerns: []
    },
    trendData: [
      { time: "09:00", engagement: 88 },
      { time: "09:30", engagement: 90 },
      { time: "10:00", engagement: 92 },
      { time: "10:30", engagement: 94 },
      { time: "11:00", engagement: 92 }
    ]
  },
  {
    id: 3,
    name: "Pradhan Mantri Kaushal Kendra, Bangalore",
    location: "Electronics City, Bangalore",
    photo: "/images/labs/lab3.jpg",
    date: "2025-10-26",
    engagement: 68,
    score: 71,
    studentCount: 35,
    teacherActive: true,
    activities: ["Computer Training", "Digital Literacy", "Theory Session"],
    flag: "Yellow",
    analysis: {
      summary: "Moderate engagement. Some students showing distraction during theory session. Room appears crowded which may be affecting attention levels.",
      highlights: [
        "Good digital infrastructure",
        "Instructor present and teaching",
        "Structured curriculum"
      ],
      concerns: [
        "Some students not focused on screen",
        "Classroom slightly overcrowded",
        "Mixed attention levels"
      ]
    },
    trendData: [
      { time: "14:00", engagement: 70 },
      { time: "14:30", engagement: 68 },
      { time: "15:00", engagement: 65 },
      { time: "15:30", engagement: 68 },
      { time: "16:00", engagement: 71 }
    ]
  },
  {
    id: 4,
    name: "Central Tool Room, Chennai",
    location: "Guindy, Chennai",
    photo: "/images/labs/lab4.jpg",
    date: "2025-10-25",
    engagement: 45,
    score: 48,
    studentCount: 20,
    teacherActive: false,
    activities: ["Self Study", "Machine Practice", "Unstructured Time"],
    flag: "Red",
    analysis: {
      summary: "Low engagement detected. No active instructor visible. Students appear unsupervised with scattered attention. Immediate intervention recommended.",
      highlights: [
        "Good lab equipment available"
      ],
      concerns: [
        "No visible instructor guidance",
        "Students distracted or idle",
        "Lack of structured activity",
        "Low participation levels",
        "Possible supervision gap"
      ]
    },
    trendData: [
      { time: "11:00", engagement: 55 },
      { time: "11:30", engagement: 48 },
      { time: "12:00", engagement: 45 },
      { time: "12:30", engagement: 42 },
      { time: "13:00", engagement: 48 }
    ]
  },
  {
    id: 5,
    name: "Skill India Center, Hyderabad",
    location: "Hitech City, Hyderabad",
    photo: "/images/labs/lab5.jpg",
    date: "2025-10-24",
    engagement: 82,
    score: 85,
    studentCount: 30,
    teacherActive: true,
    activities: ["Workshop Training", "Practical Skills", "Equipment Operation"],
    flag: "Green",
    analysis: {
      summary: "Strong engagement throughout the session. Effective hands-on training with proper supervision. Students actively learning equipment operation with safety protocols.",
      highlights: [
        "Active student participation",
        "Proper safety measures observed",
        "Good student-teacher ratio",
        "Structured practical learning"
      ],
      concerns: [
        "Minor: Some students need closer monitoring"
      ]
    },
    trendData: [
      { time: "10:00", engagement: 78 },
      { time: "10:30", engagement: 80 },
      { time: "11:00", engagement: 82 },
      { time: "11:30", engagement: 85 },
      { time: "12:00", engagement: 82 }
    ]
  }
];

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Simulate loading reports
    setReports(instituteReports);
  }, []);

  const getFlagColor = (flag) => {
    switch (flag) {
      case "Green":
        return "bg-green-500";
      case "Yellow":
        return "bg-yellow-500";
      case "Red":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getFlagIcon = (flag) => {
    switch (flag) {
      case "Green":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "Yellow":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "Red":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <br />
          <br />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Training Quality Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            AI-powered analysis of classroom sessions across skill training centers
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Centers</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">5</p>
              </div>
              <Users className="w-10 h-10 text-purple-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Engagement</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {Math.round(reports.reduce((acc, r) => acc + r.engagement, 0) / reports.length)}%
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">High Performers</p>
                <p className="text-3xl font-bold text-green-600">
                  {reports.filter(r => r.flag === "Green").length}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Need Attention</p>
                <p className="text-3xl font-bold text-red-600">
                  {reports.filter(r => r.flag === "Red").length}
                </p>
              </div>
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
          </motion.div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => setSelectedReport(report)}
            >
              {/* Institute Photo */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-blue-600 overflow-hidden">
                <img
                  src={report.photo}
                  alt={report.name}
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center">
                        <svg class="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    `;
                  }}
                />
                <div className="absolute top-4 right-4">
                  <div className={`${getFlagColor(report.flag)} w-4 h-4 rounded-full animate-pulse`} />
                </div>
              </div>

              {/* Institute Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {report.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(report.date).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  {getFlagIcon(report.flag)}
                </div>

                <div className="space-y-3">
                  {/* Engagement Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Engagement</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{report.engagement}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          report.engagement >= 75
                            ? "bg-green-500"
                            : report.engagement >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${report.engagement}%` }}
                      />
                    </div>
                  </div>

                  {/* Score */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Quality Score</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{report.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${report.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{report.studentCount} students</span>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      report.teacherActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {report.teacherActive ? 'Active' : 'Inactive'}
                    </div>
                  </div>

                  <button className="w-full mt-3 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                    View Detailed Analysis
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Report Modal */}
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedReport(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Photo */}
              <div className="relative h-64 bg-gradient-to-br from-purple-500 to-blue-600">
                <img
                  src={selectedReport.photo}
                  alt={selectedReport.name}
                  className="w-full h-full object-cover opacity-90"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelectedReport(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition"
                >
                  <XCircle className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedReport.name}</h2>
                  <p className="text-white/80">{selectedReport.location}</p>
                </div>
              </div>

              <div className="p-8">
                {/* Status Banner */}
                <div className={`mb-6 p-4 rounded-lg ${
                  selectedReport.flag === 'Green' 
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : selectedReport.flag === 'Yellow'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                }`}>
                  <div className="flex items-center gap-3">
                    {getFlagIcon(selectedReport.flag)}
                    <div>
                      <h3 className={`font-bold ${
                        selectedReport.flag === 'Green' ? 'text-green-800 dark:text-green-200' :
                        selectedReport.flag === 'Yellow' ? 'text-yellow-800 dark:text-yellow-200' :
                        'text-red-800 dark:text-red-200'
                      }`}>
                        {selectedReport.flag} Status - {selectedReport.flag === 'Green' ? 'Excellent Performance' : 
                         selectedReport.flag === 'Yellow' ? 'Needs Improvement' : 'Immediate Attention Required'}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {selectedReport.analysis.summary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Engagement</p>
                    <p className="text-2xl font-bold text-purple-600">{selectedReport.engagement}%</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedReport.score}</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Students</p>
                    <p className="text-2xl font-bold text-green-600">{selectedReport.studentCount}</p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Date</p>
                    <p className="text-sm font-bold text-orange-600">
                      {new Date(selectedReport.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                </div>

                {/* Highlights & Concerns */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Highlights
                    </h3>
                    <ul className="space-y-2">
                      {selectedReport.analysis.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-green-500 mt-0.5">✓</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {selectedReport.analysis.concerns.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        Areas of Concern
                      </h3>
                      <ul className="space-y-2">
                        {selectedReport.analysis.concerns.map((concern, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-orange-500 mt-0.5">⚠</span>
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Activities */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-600" />
                    Observed Activities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedReport.activities.map((activity, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engagement Trend Chart */}
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-6">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                    Session Engagement Trend
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={selectedReport.trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "none",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="engagement"
                        stroke="#8B5CF6"
                        strokeWidth={3}
                        dot={{ fill: "#8B5CF6", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Reports;