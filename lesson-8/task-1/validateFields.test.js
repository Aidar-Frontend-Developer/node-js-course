const { validateFields } = require("./index");

describe("Testing function validateFields():", () => {
	test("throw error if payload contain not allowed field", () => {
		expect(() =>
			validateFields({
				data: {
					payload: {
						pass: "test",
					},
				},
				name: "name",
				instance: "instance",
			})
		).toThrowError("name: data contains not allowed field — pass");
	});
	test("throw error if payload contain not allowed field", () => {
		expect(() =>
			validateFields({
				data: {
					test: "test",
				},
				name: "name",
				instance: "instance",
			})
		).toThrowError("name: data contains not allowed field — test");
	});
	test("throw error if payload contain not allowed field", () => {
		expect(() =>
			validateFields({
				data: {
					payload: {
						name: {
							test: "test",
						},
					},
				},
				name: "name",
				instance: "instance",
			})
		).toThrowError("name: data contains not allowed field — test");
	});
});
