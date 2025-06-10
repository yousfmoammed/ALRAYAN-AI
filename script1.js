function generateReport() {
  const school = document.getElementById("school").value;
  const teacher = document.getElementById("teacher").value;
  const subject = document.getElementById("subject").value;
  const semester = document.getElementById("semester").value;
  const year = document.getElementById("year").value;
  const measurement = document.getElementById("measurement").value;
  const grade = document.getElementById("grade").value;
  const finalScore = parseFloat(document.getElementById("final").value);
  const rawScores = document.getElementById("scores").value;

  if (!rawScores || isNaN(finalScore)) {
    alert("يرجى إدخال الدرجات والدرجة النهائية بشكل صحيح");
    return;
  }

  const scores = rawScores
    .split("\n")
    .map(s => parseFloat(s.trim()))
    .filter(n => !isNaN(n));

  const total = scores.length;

  const categories = {
    "ممتاز": scores.filter(s => s >= finalScore * 0.9).length,
    "جيد جدًا": scores.filter(s => s >= finalScore * 0.8 && s < finalScore * 0.9).length,
    "جيد": scores.filter(s => s >= finalScore * 0.65 && s < finalScore * 0.8).length,
    "مقبول": scores.filter(s => s >= finalScore * 0.5 && s < finalScore * 0.65).length,
    "ضعيف": scores.filter(s => s < finalScore * 0.5).length
  };

  document.getElementById("out_school").innerText = school;
  document.getElementById("out_teacher").innerText = teacher;
  document.getElementById("out_subject").innerText = subject;
  document.getElementById("out_semester").innerText = semester;
  document.getElementById("out_year").innerText = year;
  document.getElementById("out_measurement").innerText = measurement;
  document.getElementById("out_grade").innerText = grade;
  document.getElementById("out_final").innerText = finalScore;
  document.getElementById("out_max").innerText = Math.max(...scores);
  document.getElementById("out_min").innerText = Math.min(...scores);
  document.getElementById("out_avg").innerText = (scores.reduce((a, b) => a + b, 0) / total).toFixed(2);

  const catBox = document.getElementById("categories-boxes");
  catBox.innerHTML = "";
  for (let [label, count] of Object.entries(categories)) {
    const div = document.createElement("div");
    div.classList.add("box");
    div.innerHTML = `<strong>${label}:</strong> ${count}`;
    catBox.appendChild(div);
  }

  const analysisBox = document.getElementById("detailed-analysis");
  analysisBox.innerHTML = "";
  for (let [label, count] of Object.entries(categories)) {
    const percent = ((count / total) * 100).toFixed(1);
    const row = document.createElement("div");
    row.classList.add("row");
    row.innerHTML = `<strong>${label}</strong><span>${count} طالب - ${percent}%</span>`;
    analysisBox.appendChild(row);
  }

  const ctx = document.getElementById("chart").getContext("2d");
  if (window.chartInstance) window.chartInstance.destroy();
  window.chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(categories),
      datasets: [{
        label: "عدد الطلاب",
        data: Object.values(categories),
        backgroundColor: ["#28a745", "#007bff", "#ffc107", "#fd7e14", "#dc3545"]
      }]
    },
    options: {
      animation: {
        onComplete: () => {
          document.getElementById("result").classList.remove("hidden");
        }
      },
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });

  setTimeout(() => {
    document.getElementById("result").classList.remove("hidden");
  }, 700);
}

function downloadPDF() {
  const resultSection = document.getElementById("result");
  if (resultSection.classList.contains("hidden")) {
    alert("يرجى توليد النتائج أولًا قبل تحميل PDF.");
    return;
  }

  resultSection.scrollIntoView();

  setTimeout(() => {
    html2canvas(resultSection, {
      scale: 2,
      useCORS: true,
      windowWidth: document.body.scrollWidth,
      windowHeight: resultSection.scrollHeight
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const { jsPDF } = window.jspdf;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4"
      });

      const pageWidth = 595.28;
      const margin = 20;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
      pdf.save("تقرير_الدرجات.pdf");
    });
  }, 1500);
}