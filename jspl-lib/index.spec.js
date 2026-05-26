import { describe, expect, test } from "vitest";
import { List, toString, isA, isArray } from ".";

test("toString", () => {
  expect(toString(1)).toBe("1");
});

test("isArray", () => {
  expect(isArray([])).toBe(true);
  expect(isArray([1])).toBe(true);
  expect(isArray({ a: 1 })).toBe(false);
  expect(isArray("a")).toBe(false);
});

describe("List", () => {
  test("construction", () => {
    const list = List(1, 2, 3);
    expect(list.items).toStrictEqual([1, 2, 3]);
    expect(isA(list, List)).toBe(true);
  });
  describe("of", () => {
    test("primitive", () => {
      const list = List.of(7);
      expect(list.items).toStrictEqual([7]);
    });
    test("array", () => {
      const list = List.of([1, 2, 3]);
      expect(list.items).toStrictEqual([1, 2, 3]);
    });
    test("List", () => {
      const list = List.of(List(1, 2, 3));
      expect(list.items).toStrictEqual([1, 2, 3]);
    });
  });
  test("iterable", () => {
    const list = List(1, 2, 3);
    expect([...list]).toStrictEqual([1, 2, 3]);
    let i = 0;
    for (const item of list) {
      expect(item).toBe(++i);
    }
  });
  test("length", () => {
    const list = List(1, 2, 3);
    expect(list.length()).toBe(3);
  });
  test("at", () => {
    const list = List(1, 2, 3);
    expect(list.at(0)).toBe(1);
    expect(list.at(1)).toBe(2);
    expect(list.at(-1)).toBe(3);
    expect(list.at(-2)).toBe(2);
  });
});
