let questions = [];

function addQuestion(optional = false) {
  const q = {
    text: "",
    type: "text",
    options: [],
    correctIndex: null,
    image: null,
    grade: 1,
    optional: optional
  };
  questions.push(q);
  renderQuestions();
}

function addOptionalQuestion() {
  addQuestion(true);
}

function handleFileUpload(index, file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    questions[index].image = e.target.result;
  };
  reader.readAsDataURL(file);
}

function renderQuestions() {
  const container = document.getElementById("questions");
  container.innerHTML = "";
  questions.forEach((q, i) => {
    let html = `
      <div class="question-block">
        <input type="text" placeholder="نص السؤال" value="${q.text}" onchange="questions[${i}].text = this.value" />
        <select onchange="questions[${i}].type = this.value; renderQuestions()">
          <option value="text" ${q.type === "text" ? "selected" : ""}>مقالي</option>
          <option value="choice" ${q.type === "choice" ? "selected" : ""}>اختياري</option>
        </select>
        <input type="number" placeholder="درجة السؤال" value="${q.grade}" onchange="questions[${i}].grade = parseInt(this.value)" />
        <input type="file" accept="image/*" onchange="handleFileUpload(${i}, this.files[0])" />
    `;

    if (q.type === "choice") {
      q.options = q.options || [];
      html += `<div class="option-container">`;
      q.options.forEach((opt, j) => {
        html += `
          <input type="text" placeholder="اختيار ${j + 1}" value="${opt}" onchange="questions[${i}].options[${j}] = this.value" />
          <label><input type="radio" name="correct${i}" ${q.correctIndex === j ? "checked" : ""} onchange="questions[${i}].correctIndex = ${j}"> صح</label><br>
        `;
      });
      html += `</div><button onclick="questions[${i}].options.push(''); renderQuestions()">إضافة اختيار</button>`;
    }

    html += `</div>`;
    container.innerHTML += html;
  });
}

function generateExam() {
  const title = document.getElementById("examTitle").value || "امتحان بدون عنوان";
  const examData = {
    title,
    questions,
    createdAt: Date.now()
  };
  localStorage.setItem("examData", JSON.stringify(examData));
  const link = `${location.origin}/student5.html`;
  document.getElementById("examLink").value = link;
}