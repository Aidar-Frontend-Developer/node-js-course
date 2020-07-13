const net = require("net");

const client = new net.Socket();

client.connect(8080, function () {
	this.write(
		JSON.stringify({
			name: {
				first: "John",
				last: "d",
			},
			phone: "56",
			address: {
				zip: "1234",
				city: "Kyiv",
				country: "ukr",
				street: "so",
			},
			email: "@gmail.com",
		})
	);
});

client.on("data", (data) => {
	console.log(data.toString());
});

client.on("close", () => {
	console.log("Connection closed");
});
