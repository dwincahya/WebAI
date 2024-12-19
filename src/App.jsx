import { useState } from "react";
import "./App.css";
import { requestToAI } from "./utils/api";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Loading() {
  return <div className="text-green-400 font-bold">Loading...</div>;
}

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const contentInput = document.getElementById("content");
    const ai = await requestToAI(contentInput.value);
    setData(ai);
    setLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      handleSubmit();
    }
  };

  return (
    <main className="flex flex-col min-h-screen justify-center items-center text-white font-sans">
      <h1 className="text-4xl font-bold text-green-400 mb-6">Cahaya AI</h1>
      <form className="flex flex-col gap-4 w-full max-w-lg px-4">
        <input
          placeholder="Ketik permintaan disini..."
          className="py-3 px-4 text-md rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          id="content"
          type="text"
          onKeyDown={handleKeyDown} 
        />
        <button
          onClick={handleSubmit}
          type="button"
          className="bg-green-500 py-2 px-4 font-bold text-white rounded-md hover:bg-green-600 transition-all flex justify-center items-center"
          disabled={loading}
        >
          {loading ? <Loading /> : "Kirim"}
        </button>
      </form>
      <div className="max-w-lg w-full px-4 mt-6">
        {data ? (
          <SyntaxHighlight
            language="swift"
            style={vs2015}
            wrapLongLines
            customStyle={{
              backgroundColor: "#1e1e1e",
              borderRadius: "8px",
              padding: "16px",
              whiteSpace: "pre-wrap",
              textAlign: "left",
            }}
          >
            {data}
          </SyntaxHighlight>
        ) : null}
      </div>
    </main>
  );
}

export default App;
