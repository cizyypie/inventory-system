import request from 'supertest';
import httpStatus from 'http-status';
import app from '../../src/app.js';
import { userOne, admin, insertUsers } from '../fixtures/user.fixture.js';
import { userOneAccessToken, adminAccessToken } from '../fixtures/token.fixture.js';

describe('Users access', () => {
  describe('GET /users', () => {
    test('should return 200 and allow admin to get all users', async () => {
      await insertUsers([userOne, admin]);

      const res = await request(app).get('/users').set('Authorization', `Bearer ${adminAccessToken}`).expect(httpStatus.OK);
      expect(res.body).toEqual(
        expect.objectContaining({
          status: 200,
          data: expect.any(Array),
        }),
      );

      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    test('should return 401 if token is missing', async () => {
      await insertUsers([userOne, admin]);
      await request(app).get('/users').expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 401 if token is invalid', async () => {
      await insertUsers([userOne, admin]);
      await request(app).get('/users').set('Authorization', `Bearer invalidAccessToken`).expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 403 if normal user tries to get all users', async () => {
      await insertUsers([userOne, admin]);
      await request(app).get('/users').set('Authorization', `Bearer ${userOneAccessToken}`).expect(httpStatus.FORBIDDEN);
    });

    test('should return paginated users successfully', async () => {
      await insertUsers([userOne, admin]);

      const res = await request(app)
        .get('/users?page=1&limit=10')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .expect(httpStatus.OK);

      expect(res.body).toEqual(
        expect.objectContaining({
          status: 200,
          message: 'Get All Users Success',
          data: expect.any(Array),
        }),
      );
    });
  });
});
