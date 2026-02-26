import assert from "node:assert";
import { describe, it } from "node:test";
import {

} from "./api/news.api.ts";

describe("html", () => {
  describe("generateIndexHtml", () => {
    it("should return a string containing html", () => {
      const result = generateIndexHtml();
      assert.equal(typeof result, "string");
      assert.ok(result.includes("<html"));
    });
  });

  describe("generateQuestionHtml", () => {
    it("should return a string containing the input question and an answer", () => {
      //Arrange
      const input = {
        question: "q",
        answer: "a",
      };

      // Act
      const output = generateQuestionHtml(input);

      // Assert
      assert.ok(output.includes(input.question));
      assert.ok(output.includes(input.answer));
    });
  });

  describe("generateQuestionCategoryHtml", () => {
    it("should return a string containing the input title and question strings", () => {
      //Arrange
      const title = "t";
      const question = "q";

      // Act
      const output = generateQuestionCategoryHtml(title, question);

      // Assert
      assert.ok(output.includes(title));
      assert.ok(output.includes(question));
    });
  });
});
