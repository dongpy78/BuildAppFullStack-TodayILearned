import { useState } from "react";
import "./style.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <NewFactForm /> : ""}
      {/* <NewFactForm /> */}
      <main className="main">
        <CategoryFilter />
        <FastList />
      </main>
    </>
  );
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned";
  return (
    <header id="édfgdfg" className="header">
      <div className="logo">
        <img src="logo.png" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>

      <button
        onClick={() => setShowForm((show) => !show)}
        className="btn btn-large btn-open"
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

function NewFactForm() {
  return (
    <form class="fact-form">
      <input type="text" placeholder="Share a fact with the world..." />
      <span>200</span>
      <input type="text" placeholder="Trustworthy spurce..." />

      <select>
        <option value="">Choose category</option>
        <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="finacy">Finacy</option>
      </select>
      <button class="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        {/* <li class="category">
          <button class="btn btn-all-category">All</button>
        </li> */}
        {CATEGORIES.map((cat) => {
          return (
            <li key={cat.name} className="category">
              <button
                style={{ backgroundColor: cat.color }}
                className="btn btn-category"
              >
                {cat.name}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

function FastList() {
  // temporary
  const facts = initialFacts;
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact fact={fact} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li key={fact.id} className="fact">
      <p>
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
        className="tag"
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
