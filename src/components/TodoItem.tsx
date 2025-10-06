import { clsx } from "clsx";
import type { Todo } from "../types";

interface Props {
  item: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function TodoItem({ item, onToggle, onRemove }: Props) {
  return (
    <li className="todo-item">
      <label className={clsx("todo-label", item.done && "done")}>
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => onToggle(item.id)}
        />
        <span>{item.text}</span>
        <small style={{ opacity: 0.7, marginLeft: 8 }}>[{item.priority}]</small>
        {item.dueDate && <small style={{ opacity: 0.7, marginLeft: 8 }}>⏰ {item.dueDate}</small>}
      </label>
      <button className="remove" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.text}`}>
        ×
      </button>
    </li>
  );
}
