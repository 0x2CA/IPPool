import PoolBase from "./PoolBase";
import IPData from "./IPData";

export default class Ip3366Pool extends PoolBase {
	protected parseMaxPage($?: CheerioStatic): number {
		if (this.maxPage != 0) {
			return this.maxPage;
		} else {
			let max = 0;
			if ($) {
				max = parseInt($("#listnav ul b font").text());
				if (max > 0) {
					this.maxPage = max;
				}
			}
			return max;
		}
	}

	protected getCharset(): PoolBase.CharsetType {
		return PoolBase.CharsetType.GB2312;
	}

	getAgreement(): PoolBase.AgreementType {
		return PoolBase.AgreementType.HTTP;
	}

	getUrl(): string {
		return `www.ip3366.net/free/?stype=1&page=${this.page}`;
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
			anonymous = info[2] == "高匿代理IP";
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

		return new IPData(ip, port, type, anonymous, site);
	}
}
