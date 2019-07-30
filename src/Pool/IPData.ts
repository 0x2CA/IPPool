import RequestStatic from "../Web/RequestStatic";

class IPData {
	private ip: string = "";
	private port: string = "";
	private agreement: IPData.AgreementType = IPData.AgreementType.HTTP;
	private anonymous: boolean = false;
	private site: string = "";
	private checkTime: number = 0;
	private isSurvive = false;
	private assess = 100;
	private id = "";

	getSurvive() {
		return this.isSurvive;
	}

	getCheckTime() {
		return this.checkTime;
	}

	constructor(
		ip: string,
		port: string,
		agreement: IPData.AgreementType,
		anonymous: boolean,
		site: string,
		assess = 100,
		checkTime = 0,
		isSurvive = false
	) {
		this.ip = ip;
		this.port = port;
		this.agreement = agreement;
		this.anonymous = anonymous;
		this.site = site;
		this.assess = assess;
		this.id = this.agreement + this.ip + ":" + this.port;
		this.checkTime = checkTime;
		this.isSurvive = isSurvive;
	}

	getTestUrl() {
		return this.agreement + "www.baidu.com";
	}

	/**
	 * 获取ID
	 *
	 * @returns
	 * @memberof IPData
	 */
	getID() {
		return this.id;
	}

	/**
	 * 判断是否相等
	 *
	 * @param {IPData} ipData
	 * @returns
	 * @memberof IPData
	 */
	isEqual(ipData: IPData) {
		if (ipData.getID() == this.getID()) {
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
	/**
	 * 获取支持协议
	 *
	 * @returns
	 * @memberof IPData
	 */
	getAgreement() {
		return this.agreement;
	}

	/**
	 * 获取当前代理地址
	 *
	 * @returns
	 * @memberof IPData
	 */
	getProxy() {
		return IPData.AgreementType.HTTP + this.ip + ":" + this.port;
	}

	async check() {
		try {
			await RequestStatic.get(this.getTestUrl(), "utf8", this.getProxy());
			this.isSurvive = true;
			this.checkTime = new Date().getTime();
			this.addAssess();
			return true;
		} catch (error) {
			this.isSurvive = false;
			this.checkTime = new Date().getTime();
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
