// dom.js

import { createProject } from "./project";
import { createTodo } from "./todo";
import { saveData, loadData } from "./storage";

const projectList = []; // Array to hold all projects
let currentProject = null; // The project currently selected

function initializeApp() {
  // Load projects from localStorage
  const storedProjects = loadData();
  if (storedProjects.length > 0) {
    // Reconstruct project and todo objects
    storedProjects.forEach((projData) => {
      const project = createProject(projData.name);
      const todosArray = projData.todos || []; // Ensure todos is an array
      todosArray.forEach((todoData) => {
        const todo = createTodo(
          todoData.title,
          todoData.description,
          todoData.dueDate,
          todoData.priority
        );
        project.addTodo(todo);
      });
      projectList.push(project);
    });
    currentProject = projectList[0];
  } else {
    // Create default project if no data
    const defaultProject = createProject("Default");
    projectList.push(defaultProject);
    currentProject = defaultProject;
    saveData(projectList); // Save the default project to localStorage
  }

  // Render the UI
  renderProjects();
  renderTodos(currentProject);

  // Add event listeners
  addProjectListeners();
  addTodoListeners();
}

// Function to render the list of projects
function renderProjects() {
  const projectContainer = document.getElementById("project-list");
  projectContainer.innerHTML = ""; // Clear existing content

  projectList.forEach((project, index) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.textContent = project.name;
    projectItem.dataset.index = index;

    if (project === currentProject) {
      projectItem.classList.add("active-project");
    }

    projectContainer.appendChild(projectItem);
  });

  // Add event listeners to project items
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      currentProject = projectList[index];
      renderProjects();
      renderTodos(currentProject);
    });
  });
}

// Function to render the todos of the current project
function renderTodos(project) {
  const todoContainer = document.getElementById("todo-list");
  todoContainer.innerHTML = ""; // Clear existing content

  const todos = project.getTodos();

  todos.forEach((todo, index) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    // Create elements for todo properties
    const title = document.createElement("div");
    title.textContent = todo.title;
    title.classList.add("todo-title");

    const dueDate = document.createElement("div");
    dueDate.textContent = todo.dueDate;
    dueDate.classList.add("todo-due-date");

    // Set priority color
    todoItem.style.borderLeft = `4px solid ${getPriorityColor(todo.priority)}`;

    // Add event listener for expanding todo details
    todoItem.addEventListener("click", () => {
      // Function to expand and show todo details
      showTodoDetails(todo, index);
    });

    // Append elements to todo item
    todoItem.appendChild(title);
    todoItem.appendChild(dueDate);

    // Append todo item to container
    todoContainer.appendChild(todoItem);
  });
}

// Function to determine priority color
function getPriorityColor(priority) {
  switch (priority) {
    case "High":
      return "red";
    case "Medium":
      return "orange";
    case "Low":
      return "green";
    default:
      return "gray";
  }
}

// Function to add event listeners related to projects
function addProjectListeners() {
  const addProjectBtn = document.getElementById("add-project-btn");
  addProjectBtn.addEventListener("click", () => {
    const projectName = prompt("Enter project name:");
    if (projectName) {
      const newProject = createProject(projectName);
      projectList.push(newProject);
      renderProjects();
      saveData(projectList); // Save updated data
    }
  });
}

// Function to add event listeners related to todos
function addTodoListeners() {
  const addTodoBtn = document.getElementById("add-todo-btn");
  addTodoBtn.addEventListener("click", () => {
    const title = prompt("Enter todo title:");
    const description = prompt("Enter description:");
    const dueDate = prompt("Enter due date (YYYY-MM-DD):");
    const priority = prompt("Enter priority (High, Medium, Low):");

    if (title && dueDate && priority) {
      const newTodo = createTodo(title, description, dueDate, priority);
      currentProject.addTodo(newTodo);
      renderTodos(currentProject);
      saveData(projectList); // Save updated data
    } else {
      alert("Please provide at least a title, due date, and priority.");
    }
  });
}

// Function to show todo details and provide options to edit or delete
function showTodoDetails(todo, index) {
  // Create a modal or a detailed view
  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("todo-details");

  const title = document.createElement("h2");
  title.textContent = todo.title;

  const description = document.createElement("p");
  description.textContent = `Description: ${todo.description}`;

  const dueDate = document.createElement("p");
  dueDate.textContent = `Due Date: ${todo.dueDate}`;

  const priority = document.createElement("p");
  priority.textContent = `Priority: ${todo.priority}`;

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    editTodoDetails(todo, index);
    // Close details view
    document.body.removeChild(detailsContainer);
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    currentProject.removeTodo(todo.title);
    renderTodos(currentProject);
    saveData(projectList); // Save updated data
    // Close details view
    document.body.removeChild(detailsContainer);
  });

  // Append elements
  detailsContainer.appendChild(title);
  detailsContainer.appendChild(description);
  detailsContainer.appendChild(dueDate);
  detailsContainer.appendChild(priority);
  detailsContainer.appendChild(editBtn);
  detailsContainer.appendChild(deleteBtn);

  // Add details container to body or a specific container
  document.body.appendChild(detailsContainer);
}

// Function to edit todo details
function editTodoDetails(todo, index) {
  // Prompt the user for new details
  const newTitle = prompt("Edit title:", todo.title);
  const newDescription = prompt("Edit description:", todo.description);
  const newDueDate = prompt("Edit due date (YYYY-MM-DD):", todo.dueDate);
  const newPriority = prompt(
    "Edit priority (High, Medium, Low):",
    todo.priority
  );

  // Update the todo
  todo.title = newTitle || todo.title;
  todo.description = newDescription || todo.description;
  todo.dueDate = newDueDate || todo.dueDate;
  todo.priority = newPriority || todo.priority;

  // Re-render the todos and save data
  renderTodos(currentProject);
  saveData(projectList); // Save updated data
}

// Export the initializeApp function
export { initializeApp };
