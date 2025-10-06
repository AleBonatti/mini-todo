import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StrictMode } from 'react';
import App from './App';

// Mock globale di fetch
beforeEach(() => {
  global.fetch = vi.fn(async (url, options: any = {}) => {
    const method = (options.method || 'GET').toUpperCase();

    // Mock della lista iniziale
    if (method === 'GET' && String(url).includes('/todos')) {
      return {
        ok: true,
        json: async () => [
          {
            id: '1',
            text: 'Buy milk',
            done: false,
            createdAt: Date.now(),
            priority: 'medium',
          },
        ],
      } as Response;
    }

    // Mock POST (creazione)
    if (method === 'POST') {
      const body = JSON.parse(options.body);
      return {
        ok: true,
        json: async () => ({
          id: '2',
          ...body,
        }),
      } as Response;
    }

    // Mock PUT (update)
    if (method === 'PUT') {
      const body = JSON.parse(options.body);
      return {
        ok: true,
        json: async () => body,
      } as Response;
    }

    // Mock DELETE
    if (method === 'DELETE') {
      return { ok: true } as Response;
    }

    // fallback
    return { ok: false, status: 404 } as Response;
  }) as any;
});

afterEach(() => {
  vi.resetAllMocks();
});

test('carica la lista iniziale e permette di aggiungere e completare un todo', async () => {
  const user = userEvent.setup();
  render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  // attende che venga mostrato il todo iniziale
  expect(await screen.findByText(/buy milk/i)).toBeInTheDocument();

  // aggiunge un nuovo todo
  const input = screen.getByLabelText(/new todo/i);
  await user.type(input, 'Read a book');
  await user.keyboard('{Enter}');

  // controlla che appaia nella lista
  expect(await screen.findByText(/read a book/i)).toBeInTheDocument();

  // simula toggle (done)
  const checkbox = screen.getAllByRole('checkbox')[0];
  await user.click(checkbox);

  // attende che la UI rifletta il cambiamento
  await waitFor(() => expect(checkbox).toBeChecked());
});
