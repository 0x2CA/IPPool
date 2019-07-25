import PoolBase from "./PoolBase";
import IPData from "./IPData";

export default class XiciDailiPool extends PoolBase {
	getUrl(): string {
		return `https://www.xicidaili.com/nn/${this.page}`;
	}

	getPoolData($: CheerioStatic): Array<IPData> {
		let result = new Array<IPData>();
		$("table#ip_list tbody tr").each((index, element) => {
			let info = $(element)
				.text()
				.replace(/(  |\n| |\n      )*/, ",")
				.split(",")
				.filter((value) => {
					return value != "";
				});
			// let type = info.search(/HTTPS/) >= 0 ? IPData.Type.HTTPS : IPData.Type.HTTP;
			console.log(JSON.stringify(info));
			// try {
			// 	let ip = new RegExp(/[^	]([0-9]{1,4}|.){7}/).exec(info)[0];
			// } catch (error) {}
		});
		return [];
	}
}
