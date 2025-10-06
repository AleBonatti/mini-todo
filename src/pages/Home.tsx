import { useEffect, useMemo, useState } from 'react';
import AddTodoForm from '../components/AddTodoForm';
import TodoItem from '../components/TodoItem';
import type { Todo, Priority } from '../types';
import {
  fetchTodos,
  createTodo,
  patchTodo,
  deleteTodo,
} from '../services/todos';

// Helper type-safe per ricavare un messaggio da errori sconosciuti
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [show, setShow] = useState<'all' | 'open' | 'done'>('all');
  const [prio, setPrio] = useState<'all' | Priority>('all');

  // Load iniziale
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTodos();
        setTodos(data);
        setError(null);
      } catch (e: unknown) {
        setError(getErrorMessage(e));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return todos.filter((t) => {
      if (show === 'open' && t.done) return false;
      if (show === 'done' && !t.done) return false;
      if (prio !== 'all' && t.priority !== prio) return false;
      if (q && !t.text.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [todos, query, show, prio]);

  const add = async (data: {
    text: string;
    priority: Priority;
    dueDate?: string;
  }) => {
    try {
      const created = await createTodo({ ...data, done: false });
      setTodos((prev) => [created, ...prev]);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  const toggle = async (id: string) => {
    const current = todos.find((t) => t.id === id);
    if (!current) return;

    const patch: Partial<Todo> = {
      done: !current.done,
      completedAt: !current.done ? Date.now() : undefined,
    };

    try {
      const updated = await patchTodo(id, patch); // usa PUT su MockAPI
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updated } : t)),
      );
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  return (
    <div className="container">
      <h1>Mini To-Do</h1>

      <AddTodoForm onAdd={add} />

      <div className="toolbar">
        <input
          placeholder="Search…"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        <select
          value={show}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setShow(e.target.value as 'all' | 'open' | 'done')
          }
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="done">Done</option>
        </select>
        <select
          aria-label="Priority filter"
          value={prio}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPrio(e.target.value as 'all' | Priority)
          }
        >
          <option value="all">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {loading && <p>Loading…</p>}
      {error && !loading && <p role="alert">{error}</p>}

      <ul className="todo-list">
        {filtered.map((t) => (
          <TodoItem key={t.id} item={t} onToggle={toggle} onRemove={remove} />
        ))}
      </ul>

      {!loading && (
        <p className="summary">
          {filtered.length} / {todos.length} shown
        </p>
      )}
    </div>
  );
}
