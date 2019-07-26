import RequestStatic from "../RequestStatic";

class IPData {
	ip: string = "";
	port: string = "";
	type: IPData.Type = IPData.Type.HTTP;
	anonymous: boolean = false;
	site: string = "";
	checkTime: Date = new Date();
	isSurvive = false;
	private testUrl = "www.baidu.com";

	constructor(ip: string, port: string, type: IPData.Type, anonymous: boolean, site: string) {
		this.ip = ip;
		this.port = port;
		this.type = type;
		this.anonymous = anonymous;
		this.site = site;
	}

	getAgreement() {
		if (this.type == IPData.Type.HTTP) {
			return "http://";
		} else {
			return "https://";
		}
	}

	async check() {
		try {
			let result = "";
			let proxy = this.ip + ":" + this.port;
			let agreement = this.getAgreement();
			await RequestStatic.get(agreement + this.testUrl, agreement + proxy, 3000);
			this.isSurvive = true;
			this.checkTime = new Date();
		} catch (error) {
			// console.error(error);
		}
	}
}

namespace IPData {
	export enum Type {
		HTTP,
		HTTPS,
	}
}

export default IPData;
