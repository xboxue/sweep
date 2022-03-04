import omitDeep from "./omitDeep";

describe("omitDeep", () => {
  it("should omit multiple keys", () => {
    const input = {
      a: "",
      b: "",
      c: "",
    };

    const result = {
      c: "",
    };
    expect(omitDeep(input, "a", "b")).toEqual(result);
  });

  it("should work with arrays, undefined, and null", () => {
    const input = {
      a: [undefined, null],
      b: null,
      c: undefined,
      d: "",
    };

    const result = {
      a: [undefined, null],
      c: undefined,
      d: "",
    };

    expect(omitDeep(input, "b")).toEqual(result);
  });

  it("should work with nested objects", () => {
    const input = {
      a: { a: [""], b: "", c: "" },
      b: null,
      c: { a: null, b: undefined, c: { a: [null], b: null } },
      d: "",
    };

    const result = {
      a: { a: [""], c: "" },
      c: { a: null, c: { a: [null] } },
      d: "",
    };

    expect(omitDeep(input, "b")).toEqual(result);
  });

  it("should work with nested objects with the same key", () => {
    const input = {
      a: { a: [""], b: "", c: "" },
      b: null,
      c: { a: null, b: undefined, c: { a: [null], b: null } },
      d: "",
    };

    const result = {
      b: null,
      c: { b: undefined, c: { b: null } },
      d: "",
    };

    expect(omitDeep(input, "a")).toEqual(result);
  });
});
