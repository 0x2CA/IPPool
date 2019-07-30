import PoolBase from "./PoolBase";
import IPData from "./IPData";

export default class XiciDailiPool extends PoolBase {
	protected parseMaxPage($: CheerioStatic): number {
		if (this.maxPage != 0) {
			return this.maxPage;
		} else {
			let max = 0;
			let list = $("div.pagination [href]").get();
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
		return `www.xicidaili.com/nn/${this.page}`;
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

		// if (info[2]) {
		// 	site = info[2];
		// }

		site = "中国";

		if (info[3]) {
			anonymous = info[3] == "高匿";
		}

		if (info[4]) {
			type = info[4] == "HTTPS" ? IPData.AgreementType.HTTPS : IPData.AgreementType.HTTP;
		}

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
