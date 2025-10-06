import { FormEvent, useState } from "react";
import type { Priority } from "../types";

interface Props {
  onAdd: (data: { text: string; priority: Priority; dueDate?: string }) => void;
}

export default function AddTodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState<string>("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd({ text: trimmed, priority, dueDate: dueDate || undefined });
    setText("");
    setPriority("medium");
    setDueDate("");
  };

  return (
    <form onSubmit={submit} className="add-form" role="form" aria-label="Add todo form">
      <input
        aria-label="New todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task…"
      />
      <select aria-label="Priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        aria-label="Due date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit" disabled={!text.trim()}>Add</button>
    </form>
  );
}
