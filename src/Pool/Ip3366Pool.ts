import PoolBase from "./PoolBase";
import IPData from "./IPData";

export default class Ip3366Pool extends PoolBase {
	getAgreement(): PoolBase.Type {
		return PoolBase.Type.HTTP;
	}

	getUrl(): string {
		return `www.ip3366.net/free/?stype=1&page=${this.page}`;
	}

	getPoolData($: CheerioStatic): Array<IPData> {
		let result = new Array<IPData>();
		$("table tbody tr").each((index, element) => {
			let info = $(element)
				.text()
				.split(" ")
				.filter((value) => {
					return value != "";
				})
				.join("")
				.split("\n")
				.filter((value) => {
					return value != "";
				});

			let ip = "";
			let port = "";
			let anonymous = false;
			let checkTime = "";
			let survive = "";
			let site = "";
			let type: IPData.Type = IPData.Type.HTTP;

			if (info[0]) {
				ip = info[0];
			}

			if (info[1]) {
				port = info[1];
			}

			if (info[2]) {
				site = info[2];
			}

			if (info[3]) {
				anonymous = info[3] == "高匿";
			}

			if (info[4]) {
				type = info[4] == "HTTPS" ? IPData.Type.HTTPS : IPData.Type.HTTP;
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
		});
		return result;
	}
}
