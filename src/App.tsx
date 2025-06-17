import React, { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import type { Todo } from "./types/todo";
import { loadTodos, saveTodos } from "./utils/storage";
import TodoList from "./components/ToDoList";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    if (task.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), title: task.trim(), completed: false },
      ]);
      setTask("");
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editAndSaveToDo = (id: number, description: string) => {
    setTodos((prevTodos) => {
      const newTodos: Todo[] = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, description: description } : todo
      );

      return newTodos;
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <main
      role="region"
      aria-labelledby="todo-heading"
      className="w-full mt-5 p-4 max-w-md mx-auto align-middle border-2 border-gray-50 rounded-xl justify-between flex flex-col"
    >
      <h1
        id="todo-heading"
        className="mb-4 text-xl font-bold text-center text-blue-400"
      >
        Accessible To-Do List
      </h1>

      <form onSubmit={addTodo} aria-label="Add new task">
        <label htmlFor="task" className="block mb-2 font-medium">
          Task Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="task"
          type="text"
          value={task}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-required="true"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          Add Task
        </button>
      </form>

      <div className="flex gap-2 mt-4" role="group" aria-label="Filter tasks">
        {["all", "active", "completed"].map((filter) => (
          <button
            key={filter}
            onClick={() => setFilter(filter as "all" | "active" | "completed")}
            className={`px-3 py-1 rounded ${
              filter === filter ? "bg-blue-600 text-white" : "bg-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-blue-600`}
            aria-pressed={filter === filter}
          >
            {filter[0].toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        onSave={editAndSaveToDo}
        onDelete={deleteTodo}
      />
    </main>
  );
}
