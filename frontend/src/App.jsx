import { useState } from 'react'
import './App.css'

function App() {
  const [apiUrl, setApiUrl] = useState("http://127.0.0.1:8000/");
  const [inputString, setInputString] = useState("example");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function testApi() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ data: inputString }),
      });

      //Parse JSON (fastAPI returns JSON)
      const data = await response.json();

      if(!response.ok) {
        throw new Error(data?.error || "API request failed");
      }
      
      setResult(data);
    } catch (err) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>

      <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "system-ui" }}>
        <h1>Developer Task Tester</h1>

        <label style={{ display: "block", marginTop: 20}}>
          FastAPI URL:
          <input
          style={{ display: "block", width: "100%", padding: 10, marginTop: 6 }}
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
        />
          
        </label>

        <label style={{ display: "block", marginTop: 16 }}>
        Input string:
        <input
        value= {inputString}
        onChange = {(e) => setInputString(e.target.value)}
          style={{ display: "block", width: "100%", padding: 10, marginTop: 6 }}
        />
      </label>
      <button style={{ marginTop: 20, padding: "10px 20px" }}
      onClick = {testApi}
      disabled={loading}>
          {loading ? "Testing..." : " Test API"}

      </button>

       {/* Error UI */}
      {error && (
        <div style={{ marginTop: 16, padding: 12, border: "1px solid #f2b8b5", borderRadius: 10 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Result UI */}
     {result && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            border: "1px solid #b7e4c7",
            borderRadius: 10,
          }}
        >
          <strong>API Response</strong>

          <p>
            <b>Sorted array: </b>
              <code style={{ fontSize: 18 }}>
            [{result.word.join(", ")}]
          </code>
          </p>
        

          <p>
            <b>Joined Word: </b>
            <code style={{ fontSize: 18 }}>{result.word.join("")}</code>
          </p>
          
        </div>
      )}
      </div>
    </>
  )
}

export default App
