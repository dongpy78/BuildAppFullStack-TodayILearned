import { useEffect, useState } from "react";
import supabase from "./supabase";
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
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  /*
  GHI CHÚ: Dữ liệu đến từ supabase chưa được tải về ứng dụng. Và trong lúc chờ đợi, chúng ta muốn cho người dùng thấy một cái gì đó mà 
  dữ liệu đang được tải. Vì vậy chúng ta cần tạo ra một số component mà chúng ta muốn trình bày trong thời gian chờ đợi 
  */

  // Mảng trống thứ 2 đảm bảo rằng chức năng chỉ chạy 1 lần đầu tiên khi tải ứng dụng
  useEffect(
    function () {
      async function getFacts() {
        // trước khi chờ đợi dữ liệu await thì đặt trạng thái là true
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all") {
          query = query.eq("category", currentCategory);
        }

        // await: là khoảng thời gian đợi để tải xong dữ liệu nên cần 1 hàm bất đồng bộ asysn ở trên
        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);
        // Lúc đầu dữ liệu trống và sau khi chờ dữ liệu tải xong ta sẽ lưu nó vào trạng thái
        if (!error) setFacts(facts);
        else alert("There was a problem getting data");
        // Sau khi dữ liệu đã đến rồi thì thì đặt lại trạng thái là false để dừng lại việc loading
        setIsLoading(false);
      }
      // sau khi có dữ liệu thì gọi lại hàm getFacts
      getFacts();
    },
    [currentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      {/* <NewFactForm /> */}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FastList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>
      {/* Đóng mở Form */}
      <button
        onClick={() => setShowForm((show) => !show)}
        className="btn btn-large btn-open"
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const number = 200;
  const textLength = text.length;
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e) {
    // 1. Prevent brower reload (ngăn chặn việc tải lại trình duyệt)
    e.preventDefault();
    // 2. (Kiểm tra xem dữ liệu có hợp lệ hay không, nêu hợp lệ thì tạo dữ liệu mới)
    if (text && isValidHttpUrl(source) && category && textLength <= number) {
      // 3. Tạo một đối tượng thực tế mới
      // const newFact = {
      //   id: Math.round(Math.random() * 10000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. Upload fact to Supabase and receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select("*");
      setIsUploading(false);

      // 4. Thêm thông tin mới tới giao diện người dùng
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
      // 5. Đặt lại các trường đầu vào thành trống
      setText("");
      setSource("");
      setCategory("");
      // 6. Đóng toàn bộ biểu mẫu
      setShowForm(false);
    }
  }

  return (
    <form class="fact-form" onSubmit={handleSubmit}>
      {/* Mỗi lần đầu vào thay đổi sẽ gọi chức năng onChange */}
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{number - textLength}</span>
      <input
        value={source}
        onChange={(e) => setSource(e.target.value)}
        type="text"
        placeholder="Trustworthy spurce..."
        disabled={isUploading}
      />

      <select
        disabled={isUploading}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Choose category</option>
        {CATEGORIES.map((cat) => {
          return (
            <option key={cat.name} value={cat.name}>
              {cat.name.toUpperCase()}
            </option>
          );
        })}
        {/* <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="finacy">Finacy</option> */}
      </select>
      <button class="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        {/* <li class="category">
          <button class="btn btn-all-category">All</button>
        </li> */}
        <li className="category">
          <button
            onClick={() => setCurrentCategory("all")}
            class="btn btn-all-category"
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => {
          return (
            <li
              onClick={() => {
                setCurrentCategory(cat.name);
              }}
              key={cat.name}
              className="category"
            >
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

function FastList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this category yet! Create the first one 😘
      </p>
    );
  }
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact fact={fact} setFacts={setFacts} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpDating] = useState(false);
  async function handleVote(columnName) {
    setIsUpDating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpDating(false);

    console.log(updatedFact);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

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
        <button
          disabled={isUpdating}
          onClick={() => handleVote("votesInteresting")}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          disabled={isUpdating}
          onClick={() => handleVote("voteMindblowing")}
        >
          🤯 {fact.voteMindblowing}
        </button>
        <button disabled={isUpdating} onClick={() => handleVote("votesFalse")}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
