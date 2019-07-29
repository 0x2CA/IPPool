import superagent = require("superagent");
require("superagent-proxy")(superagent);
require("superagent-charset")(superagent);

export default class RequestStatic {
	static get(url: string, charset = "utf8", proxy?: string, timeout = 3000): Promise<string> {
		return new Promise((resolve, reject) => {
			let request = superagent.get(url);

			request.buffer(true);

			(<any>request).charset(charset);

			if (proxy) {
				(<any>request).proxy(proxy);
			}

			if (timeout) {
				request.timeout(timeout);
			}

			request.end(function(err, res) {
				if (!err) {
					resolve(res.text);
				} else {
					reject(err);
				}
			});
		});
	}
}
