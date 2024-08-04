import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchUser, fetchDocuments, fetchCareerGoal } from '../api';

const mock = new MockAdapter(axios);

describe('API Functions', () => {
  afterEach(() => {
    mock.reset();
  });

  test('fetchUser returns user data correctly', async () => {
    const mockUserData = { name: 'John Doe', email: 'john.doe@example.com' };
    mock.onGet('https://api.jsonbin.io/v3/b/66a878a5e41b4d34e4190c12').reply(200, {
      record: { data: mockUserData }
    });

    const data = await fetchUser();
    expect(data).toEqual(mockUserData);
  });

  test('fetchDocuments returns documents data correctly', async () => {
    const mockDocumentsData = [{ id: 1, name: 'Document1' }, { id: 2, name: 'Document2' }];
    mock.onGet('https://api.jsonbin.io/v3/b/66a87a90ad19ca34f88ecd65').reply(200, {
      record: { data: mockDocumentsData }
    });

    const data = await fetchDocuments();
    expect(data).toEqual(mockDocumentsData);
  });

  test('fetchCareerGoal returns career goal data correctly', async () => {
    const mockCareerGoalData = { name: 'Software Engineer', progress: 75 };
    mock.onGet('https://api.jsonbin.io/v3/b/66a87a3ae41b4d34e4190ccc').reply(200, {
      record: { data: [mockCareerGoalData] }
    });

    const data = await fetchCareerGoal();
    expect(data).toEqual(mockCareerGoalData);
  });

  test('fetchUser handles error response', async () => {
    mock.onGet('https://api.jsonbin.io/v3/b/66a878a5e41b4d34e4190c12').reply(500);

    await expect(fetchUser()).rejects.toThrow();
  });

  test('fetchDocuments handles error response', async () => {
    mock.onGet('https://api.jsonbin.io/v3/b/66a87a90ad19ca34f88ecd65').reply(500);

    await expect(fetchDocuments()).rejects.toThrow();
  });

  test('fetchCareerGoal handles error response', async () => {
    mock.onGet('https://api.jsonbin.io/v3/b/66a87a3ae41b4d34e4190ccc').reply(500);

    await expect(fetchCareerGoal()).rejects.toThrow();
  });
});