import React, { useState } from "react";
import type { Todo } from "../types/todo";
import EditTodoModal from "./EditTodoModal";
import Modal from "react-modal";

type Props = {
  todo: Todo;
  toggleComplete: (id: number) => void;
  onSave: (id: number, description: string) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({
  todo,
  toggleComplete,
  onSave,
  onDelete,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleSave(description: string) {
    onSave(todo.id, description);
    setIsModalOpen(false);
  }

  function handleEdit() {
    setIsModalOpen(true);
  }

  return (
    <li className="flex items-center justify-between bg-white p-2 rounded shadow-sm">
      <button
        onClick={() => toggleComplete(todo.id)}
        className={`text-left flex-1 ${
          todo.completed ? "line-through text-gray-500" : ""
        } focus:outline-none focus:ring-2 focus:ring-blue-600`}
        aria-pressed={todo.completed}
        aria-label={`Mark task '${todo.title}' as ${
          todo.completed ? "incomplete" : "complete"
        }`}
      >
        {todo.title}
      </button>
      <button
        onClick={handleEdit}
        className="ml-2  hover:underline focus:outline-none"
        aria-label={`Edit task ${todo.title}`}
      >
        <img src="/edit_task_icon.png" width={30} />
      </button>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-2 hover:underline focus:outline-none"
        aria-label={`Delete task ${todo.title}`}
      >
        <img src="/delete_task_icon.png" width={30} />
      </button>

      {/* Edit Todo Modal */}

      <EditTodoModal
        isOpen={isModalOpen}
        title={todo.title}
        description={todo.description}
        onSave={handleSave}
        onCancel={() => setIsModalOpen(false)}
      />
    </li>
  );
}
