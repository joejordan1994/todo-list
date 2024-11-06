// storage.js

function saveData(projectList) {
  // Convert project objects to plain objects with necessary properties
  const dataToSave = projectList.map((project) => ({
    name: project.name,
    todos: project.getTodos().map((todo) => ({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      priority: todo.priority,
      isComplete: todo.isComplete,
    })),
  }));
  localStorage.setItem("projectList", JSON.stringify(dataToSave));
}

function loadData() {
  const data = localStorage.getItem("projectList");
  try {
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error parsing data from localStorage:", error);
    return [];
  }
}

export { saveData, loadData };
