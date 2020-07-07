const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { pipeline } = require("stream");
const EventEmitter = require("events");
const { validate, validateFields } = require("./validation");

class Archiver extends EventEmitter {
	constructor(option) {
		super();

		this.option = option;
		this.init();
	}

	init() {
		this.on("error", ({ message }) => {
			console.error(message);
			process.exit(1);
		});
	}

	validateZip() {
		const data = {
			data: this.option,
			name: Archiver.name,
			instance: this,
		};

		validateFields(data);
		validate(data);
	}

	zip(inputFile, outputFile) {
		let compress;

		this.validateZip();

		const r = fs.createReadStream(path.join(__dirname, inputFile));
		const w = fs.createWriteStream(path.join(__dirname, outputFile));

		if (this.option.algorithm === "deflate") {
			compress = zlib.createDeflate();
		} else if (this.option.algorithm === "gzip") {
			compress = zlib.createGzip();
		}

		pipeline(r, compress, w, (error) => {
			if (error) {
				console.error("Pipeline failed", error);
			} else {
				console.log("Pipeline succeeded");
			}
		});
	}

	unzip(inputFile, outputFile) {
		let compress;

		this.validateZip();

		const r = fs.createReadStream(path.join(__dirname, inputFile));
		const w = fs.createWriteStream(path.join(__dirname, outputFile));

		if (this.option.algorithm === "deflate") {
			compress = zlib.createInflate();
		} else if (this.option.algorithm === "gzip") {
			compress = zlib.createGunzip();
		}

		pipeline(r, compress, w, (error) => {
			if (error) {
				console.error("Pipeline failed", error);
			} else {
				console.log("Pipeline succeeded");
			}
		});
	}
}

const archive = new Archiver({ algorithm: "deflate" });
// archive.zip("../data/comments.csv", "../data/comments.gz");
// archive.unzip("../data/comments.gz", "../data/comments.csv");
