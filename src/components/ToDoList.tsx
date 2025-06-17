import type { Todo } from "../types/todo";
import TodoItem from "./ToDoItem";

type Props = {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  onSave: (id: number, description: string) => void;
  onDelete: (id: number) => void;
};

const TodoList = ({ todos, toggleComplete, onSave, onDelete }: Props) => (
  <ul className="mt-6 space-y-2" role="list" aria-label="List of tasks">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        toggleComplete={toggleComplete}
        onSave={onSave}
        onDelete={onDelete}
      />
    ))}
  </ul>
);

export default TodoList;
