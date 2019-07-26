import superagent = require("superagent");
require("superagent-proxy")(superagent);

export default class RequestStatic {
	static get(url: string, proxy?: string, timeout?: number): Promise<string> {
		return new Promise((resolve, reject) => {
			let request = superagent.get(url);

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
