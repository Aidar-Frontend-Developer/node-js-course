const net = require("net");

const client = new net.Socket();

client.connect(8080, function () {
	this.write(
		JSON.stringify({
			filter: {
				name: {
					first: "John",
				},
				address: {
					zip: "1234",
				},
			},
			meta: {
				format: "csv",
				archive: true,
			},
		})
	);
});

client.on("data", (data) => {
	console.log(data.toString());
});

client.on("close", () => {
	console.log("Connection closed!");
});
