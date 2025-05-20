const generateBtn = document.getElementById("generateBtn");
const regenerateBtn = document.getElementById("regenerateBtn");
const copyBtn = document.getElementById("copyBtn");
const input = document.getElementById("userInput");
const tone = document.getElementById("toneSelector");
const resultArea = document.getElementById("resultArea");
const themeToggle = document.getElementById("themeToggle");
const historyList = document.getElementById("historyList");

let lastPrompt = "";
const switchToggle = document.querySelector('#switch-toggle');
let isDarkmode = false

const darkIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>`

const lightIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>`

function toggleTheme (){
  isDarkmode = !isDarkmode
  localStorage.setItem('isDarkmode', isDarkmode)
  switchTheme()
}

function switchTheme (){
  if (isDarkmode) {
    switchToggle.classList.add('bg-yellow-500','-translate-x-1')
    switchToggle.classList.remove('bg-gray-700','translate-x-full')
    
    setTimeout(() => {
      switchToggle.innerHTML = lightIcon
    }, 250);
  } else {
    
    switchToggle.classList.remove('bg-yellow-500','-translate-x-1')
    switchToggle.classList.add('bg-gray-700','translate-x-full')
    setTimeout(() => {
      switchToggle.innerHTML = darkIcon
    }, 250);
  }
}

switchTheme()

// Theme toggle logic
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
});

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
  renderHistory();
});

// Generate button
generateBtn.addEventListener("click", () => {
  const message = input.value.trim();
  const selectedTone = tone.value;

  if (!message) {
    resultArea.innerText = "Please enter a message.";
    return;
  }

  lastPrompt = `Rewrite this message in a ${selectedTone} tone making it sound clearer, more engaging, and appropriate for the context: "${message}"
  (without giving options or explanations)`;
  getAIResponse(lastPrompt);
});

// Regenerate button
regenerateBtn.addEventListener("click", () => {
  if (lastPrompt) getAIResponse(lastPrompt);
});

// Copy button
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(resultArea.innerText);
  alert("Copied to clipboard!");
});

// Call Gemini API
async function getAIResponse(prompt) {
  resultArea.innerText = "Thinking... 🤖";
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDwZW8QXHxL1c5nHoNGV1CJ2-Fe6cQ7YZ0`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      }
    );

    const data = await res.json();
    console.log("Raw API response:", data);

    // ✅ Check for error
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      resultArea.innerText = `❌ Error: ${data.error.message}`;
      return;
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply) {
      resultArea.innerText = reply;
      saveToHistory(input.value, reply, tone.value);
    } else {
      resultArea.innerText = "No response from Gemini.";
    }
  } catch (err) {
    console.error(err);
    resultArea.innerText = "Error contacting AI. Check API key or network.";
  }
}

// Save history in localStorage
function saveToHistory(inputText, aiReply, tone) {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  history.unshift({
    input: inputText,
    output: aiReply,
    tone,
    date: new Date().toLocaleString(),
  });

  if (history.length > 5) history = history.slice(0, 5);

  localStorage.setItem("history", JSON.stringify(history));
  renderHistory();
}

// Show recent messages
function renderHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  historyList.innerHTML = "";

  history.forEach((item) => {
    const li = document.createElement("li");
    li.className = "p-2 rounded bg-gray-200 dark:bg-gray-700";
    li.innerText = `[${item.tone}] ${item.input} → ${item.output}`;
    historyList.appendChild(li);
  });
}

// Modal functionality
const historyModal = document.getElementById("historyModal");
const viewHistoryBtn = document.getElementById("viewHistoryBtn");
const closeHistory = document.getElementById("closeHistory");

viewHistoryBtn.addEventListener("click", () => {
  renderHistory(); // Refresh history list
  historyModal.classList.remove("hidden");
});

closeHistory.addEventListener("click", () => {
  historyModal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === historyModal) {
    historyModal.classList.add("hidden");
  }
});
