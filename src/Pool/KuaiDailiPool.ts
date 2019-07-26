import PoolBase from "./PoolBase";
import IPData from "./IPData";

export default class KuaiDailiPool extends PoolBase {
	protected getCharset(): PoolBase.CharsetType {
		return PoolBase.CharsetType.UFT8;
	}

	getAgreement(): PoolBase.AgreementType {
		return PoolBase.AgreementType.HTTPS;
	}

	getUrl(): string {
		return `www.kuaidaili.com/free/inha/${this.page}`;
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
				anonymous = info[2] == "高匿名";
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
