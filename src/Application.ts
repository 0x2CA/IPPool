import XiciDailiPool from "./Pool/XiciDailiPool";
import FreePool from "./Pool/FreePool";
import KuaiDailiPool from "./Pool/KuaiDailiPool";
import Ip3366Pool from "./Pool/Ip3366Pool";


export default class Application {
	static async Main(...argv: Array<string>) {
		let pool = await FreePool.getPool(XiciDailiPool);
		pool.setPage(1);
		let list = await pool.getPageData();
		for (let index = 0; index < list.length; index++) {
			let ipData = list[index];
			console.log(ipData.agreement, ipData.ip, ipData.port);
		}
	}
}

Application.Main(...process.argv.slice(2));
