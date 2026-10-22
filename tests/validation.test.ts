import { describe, expect, it } from "vitest";
import { contributionSchema } from "../src/lib/validation";

describe("contribution validation", () => {
  it("accepts a pending contribution shape", () => {
    expect(contributionSchema.safeParse({ kind: "topic", name: "A member", message: "Please explore QA work.", consent: true }).success).toBe(true);
  });
  it("rejects short content and missing consent", () => {
    expect(contributionSchema.safeParse({ kind: "topic", name: "A", message: "short", consent: false }).success).toBe(false);
  });
});
