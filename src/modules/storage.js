// storage.js

function saveData(projectList) {
  localStorage.setItem("projectList", JSON.stringify(projectList));
}

function loadData() {
  const data = localStorage.getItem("projectList");
  return data ? JSON.parse(data) : []; // Return an empty array instead of null
}

export { saveData, loadData };
