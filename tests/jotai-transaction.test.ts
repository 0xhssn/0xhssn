import { mockJotaiStore, mockTransaction } from './mocks';

describe('jotai-transaction monitoring', () => {
  test('state change logging', () => {
    const store = mockJotaiStore();
    store.set('testAtom', 'newValue');
    expect(store.getChangeLog()).toContainEqual({
      atom: 'testAtom',
      oldValue: undefined,
      newValue: 'newValue',
      timestamp: expect.any(String),
    });
  });

  test('transaction performance metrics', async () => {
    const transaction = mockTransaction();
    const result = await transaction.execute();
    expect(result).toHaveProperty('duration');
    expect(result).toHaveProperty('status');
  });

  test('error handling in transactions', async () => {
    const transaction = mockTransaction(true); // simulate error
    await expect(transaction.execute()).rejects.toThrow('Transaction failed');
  });

  test('Jotai DevTools integration', () => {
    // Placeholder for Jotai DevTools integration test
    expect(true).toBe(true);
  });
});