// project.js

function createProject(name) {
  const todos = [];

  function addTodo(todo) {
    todos.push(todo);
  }

  function removeTodo(todoTitle) {
    const index = todos.findIndex((todo) => todo.title === todoTitle);
    if (index !== -1) todos.splice(index, 1);
  }

  function getTodos() {
    return todos;
  }

  return {
    name,
    addTodo,
    removeTodo,
    getTodos,
  };
}

export { createProject };
