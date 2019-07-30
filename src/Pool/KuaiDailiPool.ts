import PoolBase from "./PoolBase";
import IPData from "./IPData";

export default class KuaiDailiPool extends PoolBase {
	protected parseMaxPage($: CheerioStatic): number {
		if (this.maxPage != 0) {
			return this.maxPage;
		} else {
			let max = 0;
			let list = $("div#listnav li").get();
			max = parseInt($(list[list.length - 2]).text());
			if (max > 0) {
				this.maxPage = max;
			}
			return max;
		}
	}
	getAgreement(): PoolBase.AgreementType {
		return PoolBase.AgreementType.HTTPS;
	}

	getUrl(): string {
		return `www.kuaidaili.com/free/inha/${this.page}`;
	}

	getIPData(info: Array<string>): IPData {
		let ip = "";
		let port = "";
		let anonymous = false;
		let checkTime = "";
		let survive = "";
		let site = "";
		let type: IPData.AgreementType = IPData.AgreementType.HTTP;

		if (info[0]) {
			ip = info[0];
		}

		if (info[1]) {
			port = info[1];
		}

		if (info[2]) {
			anonymous = info[2] == "高匿名";
		}

		if (info[3]) {
			type = info[3] == "HTTPS" ? IPData.AgreementType.HTTPS : IPData.AgreementType.HTTP;
		}

		// if (info[4]) {
		// 	site = info[4];
		// }

		site = "中国";

		if (info[5]) {
			survive = info[5];
		}

		if (info[6]) {
			checkTime = info[6];
		}

		if (this.isIP(ip)) {
			return new IPData(ip, port, type, anonymous, site);
		} else {
			throw new Error("无效代理");
		}
	}
}
