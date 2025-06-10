// script2.js — الريان الذكي الاحترافي - الجزء الأول

const assistantName = "الريان";

// 🟢 1. التحيات + الشكر
const greetings = {
  "السلام عليكم": "وعليكم السلام ورحمة الله وبركاته 🌟",
  "صباح الخير": "صباح النور والسرور ☀️",
  "مساء الخير": "مساء الفل والياسمين 🌙",
  "هاي": "هاي هاي! 👋",
  "أهلاً": "أهلاً وسهلاً! 😊",
  "مرحبا": "مرحبًا بيك! 👋"
};

const thanksReplies = [
  "العفو يا محترم 💙",
  "ده شرف ليا والله ✨",
  "أي وقت أنا معاك 🙏",
  "لا شكر على واجب يا غالي 😎"
];

// 🟢 2. قاعدة معرفة - جزء 1
const knowledgeBase = [
  {
    category: "تحليل الدرجات",
    keywords: ["تحليل", "درجات", "تقرير", "نتيجة", "طلاب", "الرسم"],
    response: "نظام تحليل الدرجات بيطلع لك تقارير كاملة برسوم بيانية وPDF."
  },
  {
    category: "الباركود",
    keywords: ["باركود", "qr", "رابط", "تحويل", "كود"],
    response: "أدخل الرابط وأنا هحوّله لك لباركود فوري 📲"
  },
  {
    category: "تحويل صورة",
    keywords: ["تحويل", "صورة", "pdf", "ملف"],
    response: "ارفع الصورة، وأنا أرجعها لك ملف PDF ممتاز للطباعة أو الإرسال."
  },
  {
    category: "امتحانات",
    keywords: ["امتحان", "اختبار", "أسئلة", "إلكتروني", "إنشاء"],
    response: "أنشئ امتحان إلكتروني بكل سهولة وحدد الإجابات النموذجية!"
  },
  {
    category: "المطور",
    keywords: ["يوسف", "محمد", "سليمان", "صانع", "مصمم"],
    response: "صممني يوسف محمد سليمان لمساعدتك في كل حاجة بالتعليم الرقمي 📚"
  },
 
  {
    category: "مميزات",
    keywords: ["مميزات", "الريان", "إيجابيات", "تفوق", "سريع"],
    response: "الريان سريع، سهل، ذكي، وبيشتغل من الموبايل كمان!"
  },
  {
    category: "العيوب",
    keywords: ["عيوب", "سلبيات", "مش عاجبني"],
    response: "لو في حاجة مش مناسبة، بلغني فورًا وأنا أبلّغ المطور ✉️"
  },
  {
    category: "الوصف العام",
    keywords: ["ايه هو الريان", "الريان", "موقع", "شرح"],
    response: "الريان هو مساعد ذكي للتعليم الرقمي: تحليل درجات، امتحانات، PDF، وباركود 📊"
  },
  {
    category: "الدعم الفني",
    keywords: ["مشكلة", "عطل", "لا يعمل", "مش شغال", "التقرير مش بيظهر"],
    response: "جرب تضغط على توليد التقرير مرتين قبل ما تعمل PDF، وهتظبط إن شاء الله 🔁"
  }
];

// 🟦 3. ردود ذكية على اللهجات والنية

const smartReplies = [
  { match: ["شكرا", "شكرًا", "مشكور"], response: () => random(thanksReplies) },
  { match: ["تمام", "كويس", "حلو", "جميل"], response: () => "الحمد لله 😊، محتاج أساعدك في حاجة تانية؟" },
  { match: ["هههه", "😂", "ضحك"], response: () => "ضحكتني 😄، يلا بينا نكمل!" },
  { match: ["مش فاهم", "مش واضح"], response: () => "ولا يهمك، وضّح لي أكتر وأنا أشرحها بطريقة تانية 💡" },
  { match: ["انت مين", "اسمك ايه", "تعرفني عليك"], response: () => `أنا ${assistantName}، مساعد ذكي لموقع الريان 🤖` },
  { match: ["فين التقرير", "مش بيظهر", "الدرجات مش طالعة"], response: () => "جرب تضغط على توليد التقرير مرتين قبل ما تعمل PDF، وهتظبط معاك بإذن الله 🔄" }
];

// 🟨 4. تحليل الجملة ومعرفة النية من الكلمات

function analyzeText(input) {
  const cleaned = input.toLowerCase().replace(/[؟!،.]/g, "");
  const words = cleaned.split(" ");
  let bestMatch = null;
  let bestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;
    for (const word of item.keywords) {
      if (words.includes(word)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch) return bestMatch.response;
  return null;
}

// 🟥 5. توليد الرد النهائي بناءً على الجملة

function generateResponse(input) {
  const normalized = input.toLowerCase().trim();

  for (const greet in greetings) {
    if (normalized.includes(greet)) return greetings[greet];
  }

  for (const smart of smartReplies) {
    if (smart.match.some(word => normalized.includes(word))) {
      return smart.response();
    }
  }

  const kbReply = analyzeText(normalized);
  if (kbReply) return kbReply;

  return `أنا ${assistantName}، مساعد ذكي. حاول تكتبلي بشكل أوضح وإن شاء الله أساعدك 💬`;
}

// 🟧 6. دالة عشوائية بسيطة للردود

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 🟨 7. سجل تفاعلي لتعلم أسلوب المستخدم

let userMemory = {
  knownWords: [],
  lastIntent: "",
  mood: "neutral"
};

function updateMemory(input) {
  const words = input.toLowerCase().split(" ");
  for (const word of words) {
    if (!userMemory.knownWords.includes(word)) {
      userMemory.knownWords.push(word);
    }
  }
  if (input.includes("😂") || input.includes("هههه")) {
    userMemory.mood = "happy";
  } else if (input.includes("مش فاهم") || input.includes("ليه")) {
    userMemory.mood = "confused";
  } else {
    userMemory.mood = "neutral";
  }
}

// 🟪 8. توصيات ذكية حسب المزاج

function moodRecommendation() {
  if (userMemory.mood === "happy") {
    return "شكلنا مبسوطين النهاردة 😄، نكمل؟";
  } else if (userMemory.mood === "confused") {
    return "ولا يهمك، وضحلي أكتر وأنا أوضح لك زي ما تحب 🔍";
  } else {
    return "لو محتاج أي مساعدة إضافية، قوللي 🙌";
  }
}

// 🟫 9. الرد التفاعلي بناءً على الذاكرة

function smartFinalReply(input) {
  updateMemory(input);

  const mainReply = generateResponse(input);
  const extraReply = moodRecommendation();

  return `${mainReply}\n\n${extraReply}`;
}
// 🟩 10. واجهة المستخدم والDOM

const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message");
  msg.classList.add(sender === "user" ? "user-message" : "bot-message");
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 🟥 11. التعامل مع إرسال الرسائل

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const input = userInput.value.trim();
  if (!input) return;

  addMessage(input, "user");

  const reply = smartFinalReply(input);

  setTimeout(() => {
    addMessage(reply, "bot");
  }, 600);

  userInput.value = "";
  userInput.focus();
});

// 🟦 12. بعض الاستثناءات اللغوية الذكية

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[؟.,!،]/g, "")
    .replace(/ +/g, " ")
    .trim();
}

// 🟧 13. توسيع قابلية الفهم

const aliases = {
  "ازيك": "كيف حالك",
  "عامل ايه": "كيف حالك",
  "ايه الاخبار": "كيف حالك",
  "تمام": "أنا بخير"
};

function handleAliases(input) {
  for (const key in aliases) {
    if (input.includes(key)) {
      return input.replace(key, aliases[key]);
    }
  }
  return input;
}