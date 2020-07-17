const { Bank } = require("./index");

const bank = new Bank();

describe("Testing validateFields function:", () => {
	test("Bank register return user id in number type", () => {
		const personId = bank.register({
			name: "John",
			balance: 123,
		});

		expect(typeof personId).toBe("number");
	});
	test("Bank register throw error on same user name", () => {
		expect(() =>
			bank.register({
				name: "John",
				balance: 123,
			})
		).toThrowError(`duplicated customer for name: 'John'`);
	});
	test("Bank on add throw error on amount <= 0", () => {
		const personId = bank.register({
			name: "Jack",
			balance: 123,
		});

		expect(() => bank.emit("add", personId, 0)).toThrowError("amount should be grater than 0");
	});
	test("Bank on add throw error unknown user id", () => {
		expect(() => bank.emit("add", "test", 10)).toThrowError("customer with id 'test' not found");
	});
});
