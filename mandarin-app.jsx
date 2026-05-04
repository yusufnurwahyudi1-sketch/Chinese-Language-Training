
import { useState, useEffect, useCallback } from "react";

/* ─────────────────────────── DATA ─────────────────────────── */
const VOCABULARY = [
  { zh: "你好", pinyin: "nǐ hǎo", id: "Halo / Hai", en: "Hello", level: 1 },
  { zh: "谢谢", pinyin: "xiè xiè", id: "Terima kasih", en: "Thank you", level: 1 },
  { zh: "对不起", pinyin: "duì bu qǐ", id: "Maaf", en: "Sorry", level: 1 },
  { zh: "再见", pinyin: "zài jiàn", id: "Sampai jumpa", en: "Goodbye", level: 1 },
  { zh: "是", pinyin: "shì", id: "Ya / Benar", en: "Yes / Is", level: 1 },
  { zh: "不", pinyin: "bù", id: "Tidak", en: "No / Not", level: 1 },
  { zh: "我", pinyin: "wǒ", id: "Saya", en: "I / Me", level: 1 },
  { zh: "你", pinyin: "nǐ", id: "Kamu", en: "You", level: 1 },
  { zh: "他", pinyin: "tā", id: "Dia (laki-laki)", en: "He / Him", level: 1 },
  { zh: "她", pinyin: "tā", id: "Dia (perempuan)", en: "She / Her", level: 1 },
  { zh: "我们", pinyin: "wǒ men", id: "Kita / Kami", en: "We / Us", level: 1 },
  { zh: "好", pinyin: "hǎo", id: "Baik / Bagus", en: "Good", level: 1 },
  { zh: "大", pinyin: "dà", id: "Besar", en: "Big", level: 1 },
  { zh: "小", pinyin: "xiǎo", id: "Kecil", en: "Small", level: 1 },
  { zh: "人", pinyin: "rén", id: "Orang / Manusia", en: "Person", level: 1 },
  { zh: "水", pinyin: "shuǐ", id: "Air", en: "Water", level: 1 },
  { zh: "吃", pinyin: "chī", id: "Makan", en: "Eat", level: 1 },
  { zh: "喝", pinyin: "hē", id: "Minum", en: "Drink", level: 1 },
  { zh: "爱", pinyin: "ài", id: "Cinta", en: "Love", level: 1 },
  { zh: "朋友", pinyin: "péng yǒu", id: "Teman", en: "Friend", level: 1 },
  { zh: "家", pinyin: "jiā", id: "Rumah / Keluarga", en: "Home / Family", level: 1 },
  { zh: "学校", pinyin: "xué xiào", id: "Sekolah", en: "School", level: 1 },
  { zh: "中国", pinyin: "zhōng guó", id: "China", en: "China", level: 1 },
  { zh: "日本", pinyin: "rì běn", id: "Jepang", en: "Japan", level: 1 },
  { zh: "英语", pinyin: "yīng yǔ", id: "Bahasa Inggris", en: "English", level: 1 },
  { zh: "中文", pinyin: "zhōng wén", id: "Bahasa China", en: "Chinese", level: 1 },
  { zh: "一", pinyin: "yī", id: "Satu", en: "One", level: 1 },
  { zh: "二", pinyin: "èr", id: "Dua", en: "Two", level: 1 },
  { zh: "三", pinyin: "sān", id: "Tiga", en: "Three", level: 1 },
  { zh: "四", pinyin: "sì", id: "Empat", en: "Four", level: 1 },
  { zh: "五", pinyin: "wǔ", id: "Lima", en: "Five", level: 1 },
  { zh: "六", pinyin: "liù", id: "Enam", en: "Six", level: 1 },
  { zh: "七", pinyin: "qī", id: "Tujuh", en: "Seven", level: 1 },
  { zh: "八", pinyin: "bā", id: "Delapan", en: "Eight", level: 1 },
  { zh: "九", pinyin: "jiǔ", id: "Sembilan", en: "Nine", level: 1 },
  { zh: "十", pinyin: "shí", id: "Sepuluh", en: "Ten", level: 1 },
  { zh: "今天", pinyin: "jīn tiān", id: "Hari ini", en: "Today", level: 2 },
  { zh: "明天", pinyin: "míng tiān", id: "Besok", en: "Tomorrow", level: 2 },
  { zh: "昨天", pinyin: "zuó tiān", id: "Kemarin", en: "Yesterday", level: 2 },
  { zh: "时间", pinyin: "shí jiān", id: "Waktu", en: "Time", level: 2 },
  { zh: "工作", pinyin: "gōng zuò", id: "Bekerja / Pekerjaan", en: "Work", level: 2 },
  { zh: "学习", pinyin: "xué xí", id: "Belajar", en: "Study", level: 2 },
  { zh: "说话", pinyin: "shuō huà", id: "Berbicara", en: "Speak", level: 2 },
  { zh: "听", pinyin: "tīng", id: "Mendengar", en: "Listen", level: 2 },
  { zh: "看", pinyin: "kàn", id: "Melihat / Menonton", en: "Look / Watch", level: 2 },
  { zh: "买", pinyin: "mǎi", id: "Membeli", en: "Buy", level: 2 },
  { zh: "钱", pinyin: "qián", id: "Uang", en: "Money", level: 2 },
  { zh: "餐厅", pinyin: "cān tīng", id: "Restoran", en: "Restaurant", level: 2 },
  { zh: "医院", pinyin: "yī yuàn", id: "Rumah sakit", en: "Hospital", level: 2 },
  { zh: "漂亮", pinyin: "piào liang", id: "Cantik / Indah", en: "Beautiful", level: 2 },
];

const PHRASES = [
  { zh: "你好吗？", pinyin: "Nǐ hǎo ma?", id: "Apa kabar?", category: "Sapaan" },
  { zh: "我很好，谢谢！", pinyin: "Wǒ hěn hǎo, xiè xiè!", id: "Saya baik-baik saja, terima kasih!", category: "Sapaan" },
  { zh: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", id: "Siapa namamu?", category: "Sapaan" },
  { zh: "我叫...", pinyin: "Wǒ jiào...", id: "Nama saya...", category: "Sapaan" },
  { zh: "很高兴认识你！", pinyin: "Hěn gāoxìng rènshi nǐ!", id: "Senang bertemu denganmu!", category: "Sapaan" },
  { zh: "请问，厕所在哪里？", pinyin: "Qǐngwèn, cèsuǒ zài nǎlǐ?", id: "Permisi, di mana kamar mandi?", category: "Navigasi" },
  { zh: "我不懂。", pinyin: "Wǒ bù dǒng.", id: "Saya tidak mengerti.", category: "Komunikasi" },
  { zh: "请再说一遍。", pinyin: "Qǐng zài shuō yībiàn.", id: "Tolong ulangi sekali lagi.", category: "Komunikasi" },
  { zh: "你会说英语吗？", pinyin: "Nǐ huì shuō Yīngyǔ ma?", id: "Apakah kamu bisa berbahasa Inggris?", category: "Komunikasi" },
  { zh: "多少钱？", pinyin: "Duōshao qián?", id: "Berapa harganya?", category: "Belanja" },
  { zh: "太贵了！", pinyin: "Tài guì le!", id: "Terlalu mahal!", category: "Belanja" },
  { zh: "我要这个。", pinyin: "Wǒ yào zhège.", id: "Saya mau yang ini.", category: "Belanja" },
  { zh: "好吃！", pinyin: "Hǎo chī!", id: "Enak sekali!", category: "Makanan" },
  { zh: "我饿了。", pinyin: "Wǒ è le.", id: "Saya lapar.", category: "Makanan" },
  { zh: "我喜欢中国菜。", pinyin: "Wǒ xǐhuān Zhōngguó cài.", id: "Saya suka masakan China.", category: "Makanan" },
];

const TONES = [
  {
    num: 1, mark: "ā", name: "Nada Pertama", color: "#e53935",
    desc: "Datar dan tinggi. Seperti menyanyi satu nada yang panjang.",
    example: "妈 (mā) = Ibu", symbol: "—",
    tip: "Bayangkan Anda menekan tombol dan suaranya tetap rata."
  },
  {
    num: 2, mark: "á", name: "Nada Kedua", color: "#e65100",
    desc: "Naik dari tengah ke atas. Seperti bertanya 'Hah?'",
    example: "麻 (má) = Rami / Mati rasa", symbol: "↗",
    tip: "Seperti ketika Anda bertanya dengan nada keheranan."
  },
  {
    num: 3, mark: "ǎ", name: "Nada Ketiga", color: "#2e7d32",
    desc: "Turun lalu naik. Seperti mengatakan 'well...' dengan ragu-ragu.",
    example: "马 (mǎ) = Kuda", symbol: "↘↗",
    tip: "Turun ke bawah dulu, lalu naik kembali."
  },
  {
    num: 4, mark: "à", name: "Nada Keempat", color: "#1565c0",
    desc: "Turun tajam dari tinggi ke rendah. Seperti memberi perintah.",
    example: "骂 (mà) = Memarahi", symbol: "↘",
    tip: "Seperti ketika Anda dengan tegas berkata 'Tidak!'."
  },
  {
    num: 0, mark: "a", name: "Nada Netral", color: "#6d4c41",
    desc: "Pendek, ringan, dan tanpa tekanan. Diucapkan cepat.",
    example: "吗 (ma) = Partikel tanya", symbol: "·",
    tip: "Ucapkan dengan sangat cepat dan ringan."
  },
];

/* ─────────────────────────── UTILS ─────────────────────────── */
function speak(text, lang = "zh-CN") {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.8;
  window.speechSynthesis.speak(u);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─────────────────────────── COMPONENTS ─────────────────────── */

function SpeakButton({ text, size = 16 }) {
  const [active, setActive] = useState(false);
  return (
    <button
      onClick={() => { speak(text); setActive(true); setTimeout(() => setActive(false), 600); }}
      style={{
        background: active ? "#c9292910" : "transparent",
        border: `1.5px solid ${active ? "#c92929" : "#d4af37"}`,
        borderRadius: "50%", width: size + 18, height: size + 18,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all .2s", flexShrink: 0,
        color: active ? "#c92929" : "#d4af37",
      }}
      title="Dengarkan pengucapan"
    >
      🔊
    </button>
  );
}

/* ── FLASHCARD ── */
function Flashcards() {
  const [level, setLevel] = useState(1);
  const words = VOCABULARY.filter(w => w.level === level);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [review, setReview] = useState(new Set());

  const word = words[index];
  const progress = (known.size / words.length) * 100;

  const next = () => { setFlipped(false); setTimeout(() => setIndex(i => (i + 1) % words.length), 150); };
  const prev = () => { setFlipped(false); setTimeout(() => setIndex(i => (i - 1 + words.length) % words.length), 150); };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
        {[1, 2].map(l => (
          <button key={l} onClick={() => { setLevel(l); setIndex(0); setFlipped(false); }} style={{
            padding: "8px 20px", borderRadius: 20,
            background: level === l ? "#c92929" : "transparent",
            border: `1.5px solid ${level === l ? "#c92929" : "#d4af3780"}`,
            color: level === l ? "#fff" : "#d4af37", cursor: "pointer",
            fontFamily: "inherit", fontSize: 13, fontWeight: 600,
          }}>
            HSK {l}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 6 }}>
          <span>Kartu {index + 1} / {words.length}</span>
          <span>{known.size} dikuasai ✓</span>
        </div>
        <div style={{ background: "#2a2a2a", borderRadius: 4, height: 4 }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "#c92929", borderRadius: 4, transition: "width .4s" }} />
        </div>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(f => !f)}
        style={{
          background: flipped
            ? "linear-gradient(135deg, #1a0a0a 0%, #2d1010 100%)"
            : "linear-gradient(135deg, #0f0f0f 0%, #1e1e1e 100%)",
          border: "1.5px solid #d4af3730",
          borderRadius: 20, padding: "48px 32px", textAlign: "center",
          cursor: "pointer", minHeight: 240,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 16, transition: "background .3s", userSelect: "none",
          boxShadow: "0 8px 40px #00000060",
        }}
      >
        {!flipped ? (
          <>
            <div style={{ fontSize: 80, lineHeight: 1, fontFamily: "'Noto Serif SC', serif", color: "#fff" }}>{word.zh}</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 8 }}>Klik untuk melihat arti</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 60, lineHeight: 1, fontFamily: "'Noto Serif SC', serif", color: "#d4af37" }}>{word.zh}</div>
            <div style={{ fontSize: 22, color: "#c92929", fontWeight: 600 }}>{word.pinyin}</div>
            <div style={{ fontSize: 28, color: "#fff", fontWeight: 700 }}>{word.id}</div>
            <div style={{ fontSize: 14, color: "#888" }}>{word.en}</div>
          </>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 12, marginTop: 20, alignItems: "center", justifyContent: "center" }}>
        <button onClick={prev} style={btnStyle("#2a2a2a", "#888")}>← Sebelumnya</button>
        <SpeakButton text={word.zh} size={18} />
        <button onClick={() => { setKnown(s => new Set([...s, index])); next(); }}
          style={btnStyle("#1a3a1a", "#4caf50")}>✓ Tahu</button>
        <button onClick={() => { setReview(s => new Set([...s, index])); next(); }}
          style={btnStyle("#3a1a1a", "#f44336")}>✗ Ulangi</button>
        <button onClick={next} style={btnStyle("#2a2a2a", "#888")}>Berikutnya →</button>
      </div>
    </div>
  );
}

/* ── TONES ── */
function Tones() {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <p style={{ color: "#aaa", marginBottom: 28, lineHeight: 1.7, fontSize: 15 }}>
        Mandarin memiliki <strong style={{ color: "#d4af37" }}>4 nada + 1 nada netral</strong>. 
        Nada yang berbeda = arti yang berbeda! Contoh: <em style={{ color: "#c92929" }}>mā, má, mǎ, mà</em> semuanya berbeda artinya.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {TONES.map(t => (
          <div key={t.num} style={{
            background: "#111", border: `1.5px solid ${t.color}30`,
            borderLeft: `4px solid ${t.color}`,
            borderRadius: 16, padding: "20px 24px",
            display: "flex", gap: 20, alignItems: "flex-start",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: `${t.color}20`, border: `2px solid ${t.color}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, fontWeight: 800, color: t.color, flexShrink: 0,
              fontFamily: "'Noto Serif SC', serif",
            }}>{t.symbol}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>{t.name}</span>
                <span style={{ fontSize: 20, color: t.color, fontFamily: "'Noto Serif SC', serif" }}>{t.mark}</span>
                <SpeakButton text={t.example.split("(")[1]?.split(")")[0] || "a"} size={14} />
              </div>
              <p style={{ color: "#bbb", fontSize: 14, margin: "0 0 6px" }}>{t.desc}</p>
              <p style={{ color: t.color, fontSize: 13, margin: "0 0 4px", fontWeight: 600 }}>
                Contoh: {t.example}
              </p>
              <p style={{ color: "#777", fontSize: 12, margin: 0 }}>💡 {t.tip}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── PHRASES ── */
function Phrases() {
  const cats = [...new Set(PHRASES.map(p => p.category))];
  const [cat, setCat] = useState(cats[0]);
  const filtered = PHRASES.filter(p => p.category === cat);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: "6px 16px", borderRadius: 20,
            background: cat === c ? "#c92929" : "transparent",
            border: `1.5px solid ${cat === c ? "#c92929" : "#d4af3750"}`,
            color: cat === c ? "#fff" : "#d4af37", cursor: "pointer",
            fontFamily: "inherit", fontSize: 13, fontWeight: 600,
          }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((p, i) => (
          <div key={i} style={{
            background: "#111", border: "1.5px solid #2a2a2a",
            borderRadius: 16, padding: "18px 20px",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <SpeakButton text={p.zh} size={14} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontFamily: "'Noto Serif SC', serif", color: "#fff", marginBottom: 4 }}>{p.zh}</div>
              <div style={{ fontSize: 14, color: "#c92929", fontWeight: 600, marginBottom: 2 }}>{p.pinyin}</div>
              <div style={{ fontSize: 15, color: "#bbb" }}>{p.id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── QUIZ ── */
function Quiz() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [mode, setMode] = useState("zh-id"); // zh→id or id→zh

  const startQuiz = () => {
    const pool = shuffle(VOCABULARY).slice(0, 10);
    const qs = pool.map(word => {
      const wrongs = shuffle(VOCABULARY.filter(w => w.zh !== word.zh)).slice(0, 3);
      const options = shuffle([word, ...wrongs]);
      return { word, options };
    });
    setQuestions(qs);
    setIdx(0); setSelected(null); setScore(0); setFinished(false);
    setStarted(true);
  };

  const answer = (opt) => {
    if (selected) return;
    setSelected(opt);
    if (opt.zh === questions[idx].word.zh) setScore(s => s + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) setFinished(true);
      else { setIdx(i => i + 1); setSelected(null); }
    }, 1200);
  };

  if (!started) return (
    <div style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>🎯</div>
      <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Kuis Kosakata</h2>
      <p style={{ color: "#aaa", lineHeight: 1.7, marginBottom: 32 }}>
        10 soal acak dari kosakata HSK. Pilih terjemahan yang benar dalam bahasa Indonesia.
      </p>
      <button onClick={startQuiz} style={{
        ...btnStyle("#c92929", "#fff"), padding: "14px 40px", fontSize: 16, fontWeight: 700,
        background: "#c92929", borderRadius: 30,
      }}>Mulai Kuis →</button>
    </div>
  );

  if (finished) return (
    <div style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>{score >= 8 ? "🏆" : score >= 5 ? "👍" : "📚"}</div>
      <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 800 }}>{score}/10</h2>
      <p style={{ color: "#d4af37", fontSize: 18, marginBottom: 8, fontWeight: 600 }}>
        {score === 10 ? "Sempurna! 完美！" : score >= 8 ? "Luar biasa! 很棒！" : score >= 5 ? "Bagus! 不错！" : "Terus belajar! 加油！"}
      </p>
      <p style={{ color: "#777", marginBottom: 32 }}>Nilai Anda: {score * 10}%</p>
      <button onClick={startQuiz} style={{
        ...btnStyle("#c92929", "#fff"), padding: "12px 32px", fontSize: 15, fontWeight: 700,
        background: "#c92929", borderRadius: 30,
      }}>Coba Lagi</button>
    </div>
  );

  const q = questions[idx];
  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#777", fontSize: 13, marginBottom: 20 }}>
        <span>Soal {idx + 1} / 10</span>
        <span style={{ color: "#d4af37" }}>Skor: {score}</span>
      </div>
      <div style={{ background: "#111", border: "1.5px solid #2a2a2a", borderRadius: 20, padding: "40px 32px", textAlign: "center", marginBottom: 24 }}>
        <p style={{ color: "#888", fontSize: 13, marginBottom: 12 }}>Apa artinya karakter ini?</p>
        <div style={{ fontSize: 80, fontFamily: "'Noto Serif SC', serif", color: "#fff", marginBottom: 8 }}>{q.word.zh}</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
          <span style={{ color: "#c92929", fontSize: 16 }}>{q.word.pinyin}</span>
          <SpeakButton text={q.word.zh} size={14} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {q.options.map((opt, i) => {
          const isCorrect = opt.zh === q.word.zh;
          const isSelected = selected?.zh === opt.zh;
          let bg = "#111", border = "#2a2a2a", col = "#ddd";
          if (selected) {
            if (isCorrect) { bg = "#0a2a0a"; border = "#4caf50"; col = "#4caf50"; }
            else if (isSelected) { bg = "#2a0a0a"; border = "#f44336"; col = "#f44336"; }
          }
          return (
            <button key={i} onClick={() => answer(opt)} style={{
              background: bg, border: `1.5px solid ${border}`, borderRadius: 12,
              padding: "16px 12px", cursor: selected ? "default" : "pointer",
              color: col, fontSize: 16, fontWeight: 600, textAlign: "center",
              transition: "all .2s", fontFamily: "inherit",
            }}>{opt.id}</button>
          );
        })}
      </div>
    </div>
  );
}

/* ── VOCAB LIST ── */
function VocabList() {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState(0);
  const filtered = VOCABULARY.filter(w =>
    (level === 0 || w.level === level) &&
    (w.zh.includes(search) || w.pinyin.toLowerCase().includes(search.toLowerCase()) ||
      w.id.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Cari kosakata..."
          style={{
            flex: 1, minWidth: 200, background: "#111", border: "1.5px solid #333",
            borderRadius: 10, padding: "10px 16px", color: "#fff",
            fontFamily: "inherit", fontSize: 14, outline: "none",
          }}
        />
        {[0, 1, 2].map(l => (
          <button key={l} onClick={() => setLevel(l)} style={{
            padding: "8px 16px", borderRadius: 20,
            background: level === l ? "#c92929" : "transparent",
            border: `1.5px solid ${level === l ? "#c92929" : "#d4af3750"}`,
            color: level === l ? "#fff" : "#d4af37", cursor: "pointer",
            fontFamily: "inherit", fontSize: 13, fontWeight: 600,
          }}>{l === 0 ? "Semua" : `HSK ${l}`}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
        {filtered.map((w, i) => (
          <div key={i} style={{
            background: "#111", border: "1.5px solid #2a2a2a", borderRadius: 14,
            padding: "14px 16px", display: "flex", flexDirection: "column", gap: 4,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 28, fontFamily: "'Noto Serif SC', serif", color: "#fff" }}>{w.zh}</span>
              <SpeakButton text={w.zh} size={12} />
            </div>
            <span style={{ fontSize: 13, color: "#c92929", fontWeight: 600 }}>{w.pinyin}</span>
            <span style={{ fontSize: 14, color: "#bbb" }}>{w.id}</span>
            <span style={{ fontSize: 11, color: "#555", marginTop: 2 }}>HSK {w.level}</span>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p style={{ color: "#555", textAlign: "center" }}>Tidak ditemukan.</p>}
    </div>
  );
}

/* ─────────────────────────── MAIN APP ─────────────────────────── */
const TABS = [
  { id: "flashcard", label: "Flashcard", icon: "🃏" },
  { id: "tones", label: "Nada", icon: "🎵" },
  { id: "phrases", label: "Frasa", icon: "💬" },
  { id: "vocab", label: "Kosakata", icon: "📖" },
  { id: "quiz", label: "Kuis", icon: "🎯" },
];

function btnStyle(bg, col) {
  return {
    background: bg, border: `1.5px solid ${col}40`, borderRadius: 10,
    padding: "9px 16px", color: col, cursor: "pointer",
    fontFamily: "inherit", fontSize: 13, fontWeight: 600, transition: "all .2s",
  };
}

export default function MandarinApp() {
  const [tab, setTab] = useState("flashcard");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&family=Playfair+Display:wght@700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#fff",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Decorative bg */}
      <div style={{
        position: "fixed", top: 0, right: 0, width: 400, height: 400,
        background: "radial-gradient(circle, #c9292910 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: 0, left: 0, width: 300, height: 300,
        background: "radial-gradient(circle, #d4af3708 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", padding: "24px 16px 100px" }}>
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 13, letterSpacing: 4, color: "#d4af37", textTransform: "uppercase", marginBottom: 8 }}>
            学中文 · Belajar Mandarin
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 8vw, 52px)", fontWeight: 800,
            background: "linear-gradient(135deg, #fff 0%, #d4af37 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: 0, lineHeight: 1.1,
          }}>
            中文学习
          </h1>
          <p style={{ color: "#666", fontSize: 14, marginTop: 10 }}>
            Flashcard • Nada • Frasa • Kosakata • Kuis
          </p>
        </header>

        {/* Tab content */}
        <div style={{ background: "#0e0e0e", border: "1.5px solid #1f1f1f", borderRadius: 24, padding: "28px 20px" }}>
          {/* Tab header */}
          <div style={{
            display: "flex", gap: 6, marginBottom: 28, overflowX: "auto",
            paddingBottom: 4, scrollbarWidth: "none",
          }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding: "9px 16px", borderRadius: 12, flexShrink: 0,
                background: tab === t.id ? "#c92929" : "#161616",
                border: `1.5px solid ${tab === t.id ? "#c92929" : "#2a2a2a"}`,
                color: tab === t.id ? "#fff" : "#888",
                cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6, transition: "all .2s",
              }}>
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>

          {/* Pages */}
          {tab === "flashcard" && <Flashcards />}
          {tab === "tones" && <Tones />}
          {tab === "phrases" && <Phrases />}
          {tab === "vocab" && <VocabList />}
          {tab === "quiz" && <Quiz />}
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", color: "#333", fontSize: 12, marginTop: 24 }}>
          加油！ Semangat belajar! · Klik 🔊 untuk mendengar pengucapan
        </p>
      </div>
    </div>
  );
}
