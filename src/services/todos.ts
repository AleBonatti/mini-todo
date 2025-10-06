import type { Todo } from '../types';

const API = import.meta.env.VITE_API_URL;

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API}/todos?sortBy=createdAt&order=desc`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

export async function createTodo(
  partial: Omit<Todo, 'id' | 'createdAt'>,
): Promise<Todo> {
  const payload: Todo = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    ...partial,
  } as Todo;
  const res = await fetch(`${API}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
}

export async function patchTodo(
  id: string,
  patch: Partial<Todo>,
): Promise<Todo> {
  const res = await fetch(`${API}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete todo');
}
