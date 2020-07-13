const net = require("net");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const { validateFilter, filterData } = require("./validation");

const server = net.createServer();
const readFile = promisify(fs.readFile);
const filePath = path.resolve(__dirname, "../data/users.json");

server.on("connection", (socket) => {
	socket.on("data", async (object) => {
		try {
			const filter = validateFilter(JSON.parse(object.toString()));
			const source = await readFile(filePath, { encoding: "utf8" });
			const data = filterData(JSON.parse(source), filter);

			socket.write(JSON.stringify(data));
		} catch (error) {
			throw error;
		}
	});
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
	console.log("TCP Server started!");
});
