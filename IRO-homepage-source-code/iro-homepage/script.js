const STORAGE_KEY = "iro_demo_reports_v1";

function loadReports() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveReports(reports) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}
function makeReference() {
  return "IRO-" + Math.floor(100000 + Math.random() * 900000);
}

const reportForm = document.getElementById("reportForm");
const formMessage = document.getElementById("formMessage");
reportForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(reportForm);
  const report = {
    id: makeReference(),
    title: String(formData.get("title")).trim(),
    category: String(formData.get("category")),
    location: String(formData.get("location")).trim(),
    description: String(formData.get("description")).trim(),
    status: "Submitted",
    createdAt: new Date().toISOString()
  };
  if (!report.title || !report.category || !report.location || !report.description) {
    formMessage.textContent = "Please complete all required fields.";
    return;
  }
  const reports = loadReports();
  reports.unshift(report);
  saveReports(reports);
  formMessage.textContent = `Report submitted in this browser. Your reference number is ${report.id}. Save it to track this report.`;
  reportForm.reset();
});

const trackForm = document.getElementById("trackForm");
const trackResult = document.getElementById("trackResult");
trackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const ref = document.getElementById("reportId").value.trim().toUpperCase();
  const report = loadReports().find(item => item.id.toUpperCase() === ref);
  if (!report) {
    trackResult.textContent = "No report found in this browser for that reference number. This demo does not connect to a shared server.";
    return;
  }
  trackResult.textContent = `${report.id} — ${report.title} · ${report.category} · ${report.location} · Status: ${report.status}`;
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
