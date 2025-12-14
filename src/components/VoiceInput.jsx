import { useState } from "react";

function VoiceInput({ addExpense }) {
  const [listening, setListening] = useState(false);
  const [error, setError] = useState("");

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("❌ Voice input not supported on this browser");
      return;
    }

    setError("");
    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN"; // better for Indian accent
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      parseVoice(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
      setError("⚠️ Voice recognition failed");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const parseVoice = (text) => {
    // Example: "Food 200", "Travel 150 auto"
    const words = text.toLowerCase().split(" ");
    const amount = words.find(w => !isNaN(w));
    const category = words.find(w =>
      ["food", "travel", "medical", "shopping"].includes(w)
    );

    if (!amount) {
      setError("⚠️ Could not detect amount");
      return;
    }

    addExpense({
      title: text,
      amount: Number(amount),
      category: category || "other",
      date: new Date().toISOString()
    });
  };

  return (
    <div>
      <button
        onClick={startVoice}
        className="voice-btn"
        disabled={listening}
      >
        🎤 {listening ? "Listening..." : "Voice Input"}
      </button>

      {listening && (
        <p style={{ color: "#1b5e20", marginTop: "6px" }}>
          🎙️ Voice input ON — speak now
        </p>
      )}

      {error && (
        <p style={{ color: "red", marginTop: "6px" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default VoiceInput;
