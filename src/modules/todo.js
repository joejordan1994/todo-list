// todo.js

function createTodo(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
    isComplete: false,
  };
}

export { createTodo };
