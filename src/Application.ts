import XiciDailiPool from "./Pool/XiciDailiPool";
import FreePool from "./Pool/FreePool";
import IPData from "./Pool/IPData";
import Ip3366Pool from "./Pool/Ip3366Pool";

//https://www.kuaidaili.com/free/inha/页数

export default class Application {
	static async Main(...argv: Array<string>) {
		let pool = await FreePool.getPool(Ip3366Pool);
		pool.setPage(1);
		let list = await pool.getPageData();
		for (let index = 0; index < list.length; index++) {
			let ip = list[index];
			console.log(ip.agreement, ip.ip, ip.port);
		}
	}
}

Application.Main(...process.argv.slice(2));
