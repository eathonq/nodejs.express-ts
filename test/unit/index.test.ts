import assert from 'assert';
import request from 'supertest';
import { app } from '../../src/app';

describe("src/test/index.test.ts", () => {
    it("test-info", async () => {
        const res = await request(app).get('/info/123');
        assert.ok(res.body.code === 0);
    })
});