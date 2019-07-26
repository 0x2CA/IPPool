import superagent = require("superagent");
require("superagent-proxy")(superagent);
require("superagent-charset")(superagent);

export default class RequestStatic {
	static get(url: string, charset = "utf8", proxy?: string, timeout?: number): Promise<string> {
		return new Promise((resolve, reject) => {
			let request = superagent.get(url);

			request = (<any>request).charset(charset);

			if (proxy) {
				request = (<any>request).proxy(proxy);
			}

			if (timeout) {
				request = request.timeout(timeout);
			}

			request.end(function(err, res) {
				if (!err) {
					resolve(res.text);
				} else {
					console.error(url, proxy, timeout, err);
					reject(err);
				}
			});
		});
	}
}
