import XiciDailiPool from "./Pool/XiciDailiPool";
import KuaiDailiPool from "./Pool/KuaiDailiPool";
import Ip3366Pool from "./Pool/Ip3366Pool";
import IPData from "./Pool/IPData";
import PoolManage from "./Pool/PoolManage";
import IPPoolDB from "./DB/IPPoolDB";

export default class Application {
	static async Main(...argv: Array<string>) {
		// let pool = await PoolManage.getPool(Ip3366Pool);
		// let list = await pool.getPageData();
		// for (let index = 0; index < list.length; index++) {
		// 	console.log(JSON.stringify(list[index]));
		// }

		let db = new IPPoolDB();
		await db.connect();
		await db.close();
	}
}

Application.Main(...process.argv.slice(2));
