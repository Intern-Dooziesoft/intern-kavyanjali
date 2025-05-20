import React, { useState ,useEffect} from "react";
import axios from "axios";
import {   LineChart,Line,PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const COLORS = { Positive: "#4CAF50", Negative: "#FF3D00", Neutral: "#FFC107" };

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Dynamically inject chatbot script
    const script = document.createElement("script");
    script.src = "https://udify.app/embed.min.js";
    script.id = "IKBusJs87zOZrCNH";
    script.defer = true;
    document.body.appendChild(script);

    window.difyChatbotConfig = {
      token: "IKBusJs87zOZrCNH",
    };
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please upload a CSV file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData(response.data);
    } catch (error) {
      alert("Error uploading file!");
    }
  };

  const chartData = data
    ? Object.keys(data.stats).map((key) => ({
        name: key,
        value: data.stats[key],
        color: COLORS[key],
      }))
    : [];

  const filteredFeedback =
    data && filter !== "All" ? data.feedback.filter((f) => f.Sentiment === filter) : data?.feedback;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white">
      <motion.h1
        className="text-5xl font-extrabold mb-6 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📊 Sentiment Analysis Dashboard
      </motion.h1>

      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl text-center backdrop-blur-md bg-opacity-30"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <input type="file" onChange={handleFileChange} className="mb-4 p-2 border rounded w-full text-black" />
        <motion.button
          onClick={handleUpload}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition transform hover:scale-105"
        >
          🚀 Upload & Analyze
        </motion.button>
      </motion.div>

      {data && (
        <motion.div className="mt-8 w-full max-w-4xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="bg-white shadow-lg rounded-lg p-6 backdrop-blur-md bg-opacity-30">
              <h2 className="text-lg font-semibold text-center text-black mb-4">Sentiment Distribution</h2>
              <PieChart width={350} height={350}>
                <Pie data={chartData} cx={175} cy={175} outerRadius={120} dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </motion.div>
            {/* Sentiment-Based Avatar Reaction */}
<motion.div 
  className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center backdrop-blur-md bg-opacity-30"
  initial={{ opacity: 0, scale: 0.8 }} 
  animate={{ opacity: 1, scale: 1 }} 
  transition={{ duration: 0.6 }}
>
  
  <h2 className="text-lg font-semibold text-black mb-2">Overall Mood</h2>

  {/* Determine Dominant Sentiment */}
  {(() => {
    const { Positive = 0, Negative = 0, Neutral = 0 } = data.stats;
    const maxSentiment = Math.max(Positive, Negative, Neutral);
    const dominantSentiments = Object.keys(data.stats).filter(key => data.stats[key] === maxSentiment);

    let emoji = "😐";
    let message = "Mixed Reactions from Students";

    if (dominantSentiments.length === 1) {
      switch (dominantSentiments[0]) {
        case "Positive":
          emoji = "😊";
          message = "Students are Happy!";
          break;
        case "Negative":
          emoji = "😠";
          message = "Students are Frustrated!";
          break;
        case "Neutral":
          emoji = "🤔";
          message = "Neutral Sentiment.";
          break;
        default:
          break;
      }
    }

    return (
      <>
        <div className="text-6xl">{emoji}</div>
        <p className="text-lg font-medium text-gray-700 mt-2">{message}</p>
      </>
    );
  })()}
</motion.div>

          </div>

         




          <div className="flex justify-center space-x-3 mt-6">
            {["All", "Positive", "Negative", "Neutral"].map((type) => (
              <motion.button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2 rounded-lg font-medium transition transform hover:scale-105 text-white ${
                  filter === type ? "bg-blue-700" : "bg-gray-300 text-black hover:bg-gray-400"
                }`}
              >
                {type === "Positive" ? "😊" : type === "Negative" ? "😡" : type === "Neutral" ? "😐" : "🌍"} {type}
              </motion.button>
            ))}
          </div>

          <div className="bg-white shadow-md rounded-lg mt-6 backdrop-blur-md bg-opacity-30">
            <h2 className="text-lg font-semibold bg-blue-600 text-white p-4 text-center">Feedback List</h2>
            <div className="overflow-auto max-h-60">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-black">
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Comment</th>
                    <th className="p-3 text-center">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedback.map((item, index) => (
                    <tr key={index} className="border-t even:bg-gray-100 text-black">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{item.comments}</td>
                      <td className={`p-3 text-center font-semibold text-${COLORS[item.Sentiment]}`}>{item.Sentiment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mt-6 backdrop-blur-md bg-opacity-30">
            <h2 className="text-lg font-semibold text-black text-center mb-4">Sentiment Analysis Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <XAxis dataKey="name" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <motion.div
      className="bg-white shadow-lg rounded-lg p-6 backdrop-blur-md bg-opacity-30"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-semibold text-black text-center mb-4">
        📈 Sentiment Trend
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <XAxis dataKey="name" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
    
          </div>
        </motion.div>
        
        
      )}
       <style>
        {`
          #dify-chatbot-bubble-button {
            background-color: #1C64F2 !important;
          }
          #dify-chatbot-bubble-window {
            width: 24rem !important;
            height: 40rem !important;
          }
        `}
      </style>
    </div>
  );
}

export default App;