import PoolBase from "./PoolBase";
import IPData from "./IPData";

export default class KuaiDailiPool extends PoolBase {
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

		if (info[4]) {
			site = info[4];
		}

		if (info[5]) {
			survive = info[5];
		}

		if (info[6]) {
			checkTime = info[6];
		}

		return new IPData(ip, port, type, anonymous, site);
	}
}
