import { describe, it } from 'node:test';
import assert from 'node:assert';
import app from "../src/app";

describe("GET", () => {

  describe("GET /news", () => {
    it("returns 200 OK", async () => {
      const res = await app.request("/news");
      assert.strictEqual(res, '200')
    });
  });


  describe("GET /news", () => {
    it("returns 200 OK", async () => {
      const res = await app.request("/authors");
      assert.strictEqual(res, '200')
    });
  });
})
