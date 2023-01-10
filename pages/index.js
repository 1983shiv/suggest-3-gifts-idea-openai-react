import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { Bars } from "react-loader-spinner";
import { hobbies } from "../constants/data";
import { festivals } from "../constants/data";

const resultStyle = {
  backgroundColor: "#10a37f",
  color: "#e4e4e4",
  padding: "20px",
  width: "600px",
  marginTop: "20px",
  marginBottom: "20px",
  boxShadow: "5px 5px 2px 2px #ccc",
};

const formLable = {
  marginTop: "8px",
  marginBottom: "8px",
  color: "#10a37f",
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "10px",
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [minCost, setMinCost] = useState(40);
  const [maxCost, setMaxCost] = useState(100);
  const [gender, setGender] = useState("male");
  const [requestAgain, setRequestAgain] = useState(true);
  const [occussion, setOccussion] = useState("Christmas");
  const [category, setCategory] = useState([]);

  const [result, setResult] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("/api/generate-gift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ minCost, maxCost, gender, category, occussion }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      const arr1 = data.result.split("\n\n");
      setResult(arr1);
      setLoading(false);
      setRequestAgain(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  const handleClickButton = (e) => {
    e.preventDefault();
    setRequestAgain(true);
  };

  const handleMultiSelect = (e) => {
    setCategory(Array.from(e.target.selectedOptions, (item) => item.value));
  };

  return (
    <div>
      <Head>
        <title>Get 3 Suggestion for Gift using OpenAI </title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Get me 3 Suggestion for Gift using OpenAI</h3>
        {!requestAgain && (
          <button className={styles.requestBtn} onClick={handleClickButton}>
            Request Again
          </button>
        )}
        {!requestAgain && result[1] && (
          <div
            style={resultStyle}
            dangerouslySetInnerHTML={{ __html: result[1] }}
          />
        )}
        {!requestAgain && result[2] && (
          <div
            style={resultStyle}
            dangerouslySetInnerHTML={{ __html: result[2] }}
          />
        )}
        {!requestAgain && result[3] && (
          <div
            style={resultStyle}
            dangerouslySetInnerHTML={{ __html: result[3] }}
          />
        )}

        {!loading && requestAgain && (
          <form onSubmit={onSubmit}>
            <label style={formLable}>Min Price($)</label>
            <input
              type="number"
              name="minCost"
              placeholder="Enter an animal"
              value={minCost}
              onChange={(e) => setMinCost(e.target.value)}
              style={{ display: "flex", margin: "4px" }}
            />
            <label style={formLable}>Max Price($)</label>
            <input
              type="number"
              name="gender"
              placeholder="Enter an animal"
              value={maxCost}
              onChange={(e) => setMaxCost(e.target.value)}
              style={{ display: "flex", margin: "4px" }}
            />
            <label style={formLable}>To whom is this for?</label>
            <label>
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
              Female
            </label>
            <label style={formLable}>Select the Occussion</label>
            <select
              value={occussion}
              onChange={(e) => setOccussion(e.target.value)}
            >
              {festivals.map((festival, index) => (
                <option key={index} value={festival}>
                  {festival}
                </option>
              ))}
            </select>
            <label style={formLable}>Select the Hobbies</label>
            <p style={{ marginTop: "-10px", fontSize: "10px" }}>
              Use Shift key to select multiple hobbies
            </p>
            <select
              multiple={true}
              value={category}
              onChange={(e) => {
                handleMultiSelect(e);
              }}
            >
              {hobbies &&
                hobbies.map((hobby, index) => (
                  <option key={index} value={hobby}>
                    {hobby}
                  </option>
                ))}
            </select>
            {/* <div style={{ display: "flex", flexWrap: "wrap" }}>
              {hobbies.map((hobby, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={hobby}
                    checked={category.includes(hobby)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategory([...category, e.target.value]);
                      } else {
                        setCategory(
                          category.filter((o) => o !== e.target.value)
                        );
                      }
                    }}
                  />
                  {hobby}
                </label>
              ))}
            </div> */}
            <input
              type="submit"
              value="Suggest Me!"
              style={{ marginTop: "10px" }}
            />
          </form>
        )}

        {loading && (
          <Bars
            height="80"
            width="80"
            color="#10a37f"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
      </main>
    </div>
  );
}
