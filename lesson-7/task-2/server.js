const net = require("net");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const { promisify } = require("util");
const { pipeline } = require("stream");

const { validateFilter, filterData, createCSV } = require("./validation");

const server = net.createServer();
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const filePath = path.resolve(__dirname, "../data/users.json");

server.on("connection", (socket) => {
	socket.on("data", async (object) => {
		try {
			const { filter, meta } = validateFilter(JSON.parse(object.toString()));

			const source = await readFile(filePath, { encoding: "utf8" });
			const data = filterData(JSON.parse(source), filter);

			const { format, archive } = meta;
			if (format === "json") {
				await writeFile("users.json", JSON.stringify(data));
			} else if (format === "csv") {
				await writeFile("users.csv", createCSV(data));
			}

			const readStream = fs.createReadStream(`users.${format}`);

			if (archive) {
				pipeline(readStream, zlib.createGzip(), socket, (error) => {
					if (error) {
						console.error("Pipeline failed", error);
					} else {
						console.log("Pipeline succeeded");
					}
				});
			} else {
				pipeline(readStream, socket, (error) => {
					if (error) {
						console.error("Pipeline failed", error);
					} else {
						console.log("Pipeline succeeded");
					}
				});
			}
		} catch (error) {
			throw error;
		}
	});
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
	console.log("TCP Server started!");
});
