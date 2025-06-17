import type { Todo } from "../types/todo";
export const loadTodos = (): Todo[] => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
