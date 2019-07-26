import RequestStatic from "../RequestStatic";

class IPData {
	ip: string = "";
	port: string = "";
	agreement: IPData.AgreementType = IPData.AgreementType.HTTP;
	anonymous: boolean = false;
	site: string = "";
	checkTime: Date = new Date();
	isSurvive = false;
	readonly testUrl = "www.baidu.com";

	constructor(
		ip: string,
		port: string,
		agreement: IPData.AgreementType,
		anonymous: boolean,
		site: string
	) {
		this.ip = ip;
		this.port = port;
		this.agreement = agreement;
		this.anonymous = anonymous;
		this.site = site;
	}

	getAgreement() {
		return this.agreement;
	}

	async check() {
		try {
			let result = "";
			let proxy = IPData.AgreementType.HTTP + this.ip + ":" + this.port;
			let agreement = this.getAgreement();
			await RequestStatic.get(agreement + this.testUrl, proxy, 3000);
			this.isSurvive = true;
			this.checkTime = new Date();
		} catch (error) {
			// console.error(error);
		}
	}
}

namespace IPData {
	export enum AgreementType {
		HTTP = "http://",
		HTTPS = "https://",
	}
}

export default IPData;
