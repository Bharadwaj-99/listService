import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/app';

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://rishabhbharadwaj99:afNB8apAgyQ9zbL8@cluster0.sgubhpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('MyList API', () => {
  let userId: string;
  let contentId: string;

  beforeAll(async () => {
    userId = 'user1';
    contentId = 'movie1';
  });

  it('should add an item to the list', async () => {
    const response = await request(app)
      .post('/mylist')
      .send({ userId, contentId, contentType: 'Movie' });
    expect(response.status).toBe(201);
    expect(response.body.userId).toBe(userId);
  });

  it('should list items', async () => {
    const response = await request(app)
      .get(`/mylist?userId=${userId}&page=1&limit=10`);
    expect(response.status).toBe(200);
    expect(response.body.items).toHaveLength(1);
  });

  it('should remove an item from the list', async () => {
    const response = await request(app)
      .delete('/mylist')
      .send({ userId, contentId, contentType: 'Movie' });
    expect(response.status).toBe(200);
    expect(response.body.items).toHaveLength(0);
  });
});
