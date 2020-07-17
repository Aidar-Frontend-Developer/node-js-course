const { validate } = require("./index");

describe("Testing function validate():", () => {
	describe("Testing payload object:", () => {
		test("throw error if type of payload not object", () => {
			expect(() => validate({ data: { payload: "string" }, name: "name" })).toThrowError(
				"name: payload should be an object"
			);
		});
	});
	describe("Testing payload.name field:", () => {
		test("throw error if payload doesnt have field name", () => {
			expect(() => validate({ data: { payload: { test: "" } }, name: "name" })).toThrowError(
				"name: payload should have required field name"
			);
		});
		test("throw error if payload.name empty string", () => {
			expect(() => validate({ data: { payload: { name: "" } }, name: "name" })).toThrowError(
				"name: payload.name should not be empty"
			);
		});
		test("throw error if type of payload.name not string", () => {
			expect(() => validate({ data: { payload: { name: 123 } }, name: "name" })).toThrowError(
				"name: payload.name should should be a string"
			);
		});
	});
	describe("Testing payload.email field:", () => {
		test("throw error if payload doesnt have field email", () => {
			expect(() => validate({ data: { payload: { name: "John" } }, name: "name" })).toThrowError(
				"name: payload should have required field email"
			);
		});
		test("throw error if payload.email empty string", () => {
			expect(() =>
				validate({ data: { payload: { name: "John", email: "" } }, name: "name" })
			).toThrowError("name: payload.email should not be empty");
		});
		test("throw error if type of payload.email not string", () => {
			expect(() =>
				validate({ data: { payload: { name: "John", email: 123 } }, name: "name" })
			).toThrowError("name: payload.email should should be a string");
		});
	});
	describe("Testing payload.password field:", () => {
		test("throw error if payload doesnt have field password", () => {
			expect(() =>
				validate({ data: { payload: { name: "John", email: "test@gmail.com" } }, name: "name" })
			).toThrowError("name: payload should have required field password");
		});
		test("throw error if payload.password empty string", () => {
			expect(() =>
				validate({
					data: { payload: { name: "John", email: "test@gmail.com", password: "" } },
					name: "name",
				})
			).toThrowError("name: payload.password should not be empty");
		});
		test("throw error if type of payload.password not string", () => {
			expect(() =>
				validate({
					data: { payload: { name: "John", email: "test@gmail.com", password: 123 } },
					name: "name",
				})
			).toThrowError("name: payload.password should should be a string");
		});
	});
});
