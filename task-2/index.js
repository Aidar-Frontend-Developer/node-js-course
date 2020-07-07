const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

class Json2csv {
	constructor() {
		this.comments = [];
	}

	transform(comments, options) {
		let title = "";
		let body = "";

		this.comments = JSON.parse(comments);

		const filterComments = this.comments.map((item) => {
			return options.reduce((obj, key) => {
				if (item && item.hasOwnProperty(key)) {
					obj[key] = item[key];
				}
				return obj;
			}, {});
		});

		filterComments.forEach((item) => {
			if (!title) {
				for (const key in item) {
					title += `${key};`;
				}
			}
			for (const key in item) {
				body += `${item[key]};`;
			}
			body = body.slice(0, -1);
			body += "\n";
		});
		const commentsToCsv = `${title.slice(0, -1)}\n${body}`;
		return commentsToCsv;
	}
}

const json2Csv = new Json2csv();
const readFile = promisify(fs.readFile);

const title = ["postId", "name", "body"];

readFile(path.join(__dirname, "../data/comments.json"), { encoding: "utf8" })
	.then((data) => {
		const commentsToCsv = json2Csv.transform(data, title);
		fs.writeFile(path.join(__dirname, "../data/comments.csv"), commentsToCsv, (error) => {
			if (error) {
				throw error;
			}
		});
	})
	.catch(({ message }) => {
		console.error(message);
	});
