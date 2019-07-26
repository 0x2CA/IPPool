import PoolBase from "./PoolBase";
import IPData from "./IPData";

export default class Ip3366Pool extends PoolBase {
	protected getCharset(): PoolBase.CharsetType {
		return PoolBase.CharsetType.GB2312;
	}

	getAgreement(): PoolBase.AgreementType {
		return PoolBase.AgreementType.HTTP;
	}

	getUrl(): string {
		return `www.ip3366.net/free/?stype=1&page=${this.page}`;
	}

	getIPData($: CheerioStatic): Array<IPData> {
		let result = new Array<IPData>();

		let list = this.parseHtml($);
		for (let index = 0; index < list.length; index++) {
            const info = list[index];
            
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

			if (info[4]) {
				site = info[4];
			}

			if (info[5]) {
				survive = info[5];
			}

			if (info[6]) {
				checkTime = info[6];
			}

			if (info.length == 7) {
				let ipdData = new IPData(ip, port, type, anonymous, site);
				result.push(ipdData);
			}
		}
		return result;
	}
}
