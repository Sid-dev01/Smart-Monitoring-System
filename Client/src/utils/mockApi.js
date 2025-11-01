// Mock API for simulating backend calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getDemoVideo = async () => {
  await delay(300);
  return { 
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Sample video URL
  };
};

export const getLiveMetrics = async () => {
  await delay(800);
  
  const activities = [
    "Reading",
    "Writing", 
    "Raising Hand",
    "Listening",
    "Discussion",
    "Note Taking",
    "Group Work",
    "Presenting"
  ];
  
  const randomActivities = activities
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 3) + 2);
  
  return {
    student_count: Math.floor(25 + Math.random() * 5),
    engagement: Math.floor(60 + Math.random() * 35),
    student_score: Math.floor(70 + Math.random() * 25),
    activities: randomActivities,
    timestamp: new Date().toISOString()
  };
};

export const getReports = async () => {
  await delay(600);
  
  const institutions = [
    "ABC Training Center",
    "Skill Edge Institute", 
    "Future Works Hub",
    "Tech Academy Pro",
    "Digital Skills Center",
    "Innovation Training Lab",
    "Modern Skills Institute",
    "Excellence Training Hub"
  ];
  
  return institutions.map((institution, index) => {
    const score = Math.floor(40 + Math.random() * 55);
    const engagement = Math.floor(35 + Math.random() * 60);
    
    let flag = "Green";
    if (score < 50) flag = "Red";
    else if (score < 75) flag = "Yellow";
    
    return {
      id: index + 1,
      institution,
      score,
      engagement,
      flag,
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      sessions: Math.floor(5 + Math.random() * 20),
      avgAttendance: Math.floor(80 + Math.random() * 15)
    };
  });
};

export const getReportDetails = async (reportId) => {
  await delay(500);
  
  // Generate trend data for the chart
  const trendData = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    engagement: Math.floor(50 + Math.random() * 40),
    score: Math.floor(60 + Math.random() * 30)
  }));
  
  return {
    id: reportId,
    summary: "The training session showed good overall engagement with students actively participating in discussions and activities. The teacher maintained consistent interaction with the class, and most students demonstrated understanding of the concepts taught.",
    trendData,
    insights: [
      { label: "Peak Engagement Time", value: "10:30 AM - 11:15 AM" },
      { label: "Most Active Students", value: "18 out of 28" },
      { label: "Average Response Time", value: "2.3 seconds" },
      { label: "Questions Asked", value: "12" }
    ]
  };
};

export const getStats = async () => {
  await delay(400);
  
  return {
    institutions: 500,
    sessions: 10000,
    accuracy: 95,
    satisfaction: 98
  };
};
