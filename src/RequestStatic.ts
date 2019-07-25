import superagent = require("superagent");

export default class RequestStatic {
	static get(url: string): Promise<superagent.Response> {
		return new Promise((resolve, reject) => {
			superagent.get(url).end(function(err, res) {
				if (!err) {
					resolve(res);
				} else {
					console.error(err);
					reject(err);
				}
			});
		});
	}
}
