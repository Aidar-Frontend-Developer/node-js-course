const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const { pipeline } = require("stream");

class Archiver {
	zip(inputFile, outputFile) {
		const r = fs.createReadStream(path.join(__dirname, inputFile));
		const w = fs.createWriteStream(path.join(__dirname, outputFile));

		pipeline(r, zlib.createGzip(), w, (error) => {
			if (error) {
				console.error("Pipeline failed", error);
			} else {
				console.log("Pipeline succeeded");
			}
		});
	}

	unzip(inputFile, outputFile) {
		const r = fs.createReadStream(path.join(__dirname, inputFile));
		const w = fs.createWriteStream(path.join(__dirname, outputFile));

		pipeline(r, zlib.createGunzip(), w, (error) => {
			if (error) {
				console.error("Pipeline failed", error);
			} else {
				console.log("Pipeline succeeded");
			}
		});
	}
}

const archive = new Archiver();
// archive.zip("../data/comments.csv", "../data/comments.gz");
// archive.unzip("../data/comments.gz", "../data/comments.csv");
