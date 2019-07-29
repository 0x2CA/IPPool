import RequestStatic from "../Web/RequestStatic";

class IPData {
	ip: string = "";
	port: string = "";
	private agreement: IPData.AgreementType = IPData.AgreementType.HTTP;
	anonymous: boolean = false;
	site: string = "";
	checkTime: Date = new Date();
	isSurvive = false;
	private readonly testUrl = "www.baidu.com";
	private assess = 100;

	constructor(
		ip: string,
		port: string,
		agreement: IPData.AgreementType,
		anonymous: boolean,
		site: string,
		assess = 100
	) {
		this.ip = ip;
		this.port = port;
		this.agreement = agreement;
		this.anonymous = anonymous;
		this.site = site;
		this.assess = assess;
	}

	/**
	 * 判断是否相等
	 *
	 * @param {IPData} ipData
	 * @returns
	 * @memberof IPData
	 */
	isEqual(ipData: IPData) {
		if (ipData.getUrl() == this.getUrl() && ipData.getAgreement() == this.getAgreement()) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 *获取评分
	 *
	 * @returns
	 * @memberof IPData
	 */
	getAssess() {
		return this.assess;
	}

	addAssess(score = 1) {
		if (score > 0) {
			this.assess += Math.floor(score);
		}
		if (this.assess > 100) {
			this.assess = 100;
		}
	}

	subAssess(score = 1) {
		if (score > 0) {
			this.assess -= Math.floor(score);
		}
		if (this.assess < 0) {
			this.assess = 0;
		}
	}

	getAgreement() {
		return this.agreement;
	}

	getUrl() {
		return this.ip + ":" + this.port;
	}

	async check() {
		try {
			let proxy = IPData.AgreementType.HTTP + this.getUrl();
			let agreement = this.getAgreement();
			await RequestStatic.get(agreement + this.testUrl, "utf8", proxy, 3000);
			this.isSurvive = true;
			this.checkTime = new Date();
			this.addAssess();
			return true;
		} catch (error) {
			this.subAssess();
			// console.error(error);
		}
		return false;
	}
}

namespace IPData {
	export enum AgreementType {
		HTTP = "http://",
		HTTPS = "https://",
	}
}

export default IPData;
