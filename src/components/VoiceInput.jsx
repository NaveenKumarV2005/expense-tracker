function VoiceInput({ addExpense }) {
  const startVoice = () => {
    const rec = new window.webkitSpeechRecognition();
    rec.lang = "en-US";
    rec.start();

    rec.onresult = (e) => {
      const [title, amount, category] = e.results[0][0].transcript.split(" ");
      if (title && amount) {
        addExpense({
          title,
          amount: Number(amount),
          category: category || "other",
          date: new Date().toISOString(),
        });
      }
    };
  };

  return <button onClick={startVoice}>🎤 Voice Input</button>;
}

export default VoiceInput;
