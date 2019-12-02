const { readFile, writeFile } = require("fs");
const https = require("https");
const { join } = require("path");
const { resolve } = require("url");

const SWAPI_URL = "https://swapi.co/api/";

function apiGet(path) {
	const resolvedUrl = resolve(SWAPI_URL, path);

	return new Promise((resolve, reject) => {
		https
			.get(
				resolvedUrl,
				{ headers: { Accept: "application/json" } },
				resp => {
					let data = "";

					resp.on("data", chunk => {
						data += chunk;
					});

					resp.on("end", () => {
						resolve({ err: null, data: data ? JSON.parse(data) : null });
					});
				}
			)
			.on("error", err => {
				reject({ err });
			});
	})
}

function getPerson(query) {
	return new Promise((resolve, reject) => {
		apiGet("people/?search=" + query)
			.then(result => {
				const [person] = result.data.results;
				resolve({ err: null, person });
			})
			.catch(err => reject(err));
	})
}

function readSearchTerms() {
	return new Promise((resolve, reject) => {
		readFile(join(__dirname, "search.txt"), { encoding: "utf8" }, (err, data) => {
			if (err) {
				reject({ err });
			}
			const nonEmptyLines = data.split("\n").filter(line => Boolean(line));
			resolve({ err: null, terms: nonEmptyLines });
		});
	})
}

function saveNames(people) {
	return new Promise((resolve, reject) => {
		console.log(`Saving ${people.length} results`);
		const data = people.map(p => (p ? p.name : "No results")).join("\n");
		writeFile(join(__dirname, "names.txt"), data, { encoding: "utf8" }, (err) => {
			if (err) {
				reject({ err });
			}
			resolve({ err: null });
		});
	})
}

async function main() {
	// 1. Read the search terms in
	// 2. Run the searches in parallel
	// 3. Save the results to a file
	// NOTE: retain console output order

	// 1. Read search terms
	console.log("Searching...");
	const { err, terms } = await readSearchTerms();

	if (err) {
		console.error(err);
		return;
	}

	const promise = terms.map(x => getPerson(x));

	// Run Promises in Parallel and wait for all to be fulfilled
	Promise.all(promise)
		.then(result => {
			let people = result.map(x => x.person)
			const { err } = saveNames(people);

			if (err) {
				console.error(err);
				return;
			}
			console.log("Done");
		})
		.catch(err => {
			console.error(err);
			return;
		})
}

main();
