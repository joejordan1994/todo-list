// dom.js

import { createProject } from "./project";
import { createTodo } from "./todo";

const projectList = [];

function initializeApp() {
  // Create default project
  const defaultProject = createProject("Default");
  projectList.push(defaultProject);

  // Render the UI
  renderProjects();
  // Add event listeners
  // ...
}

function renderProjects() {
  // Code to render project list in the UI
}

function renderTodos(project) {
  // Code to render todos of a project in the UI
}

export { initializeApp };
