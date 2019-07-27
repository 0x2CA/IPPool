import Ip3366Pool from "./Pool/Ip3366Pool";
import PoolManage from "./Pool/PoolManage";
import IPPoolDB from "./DB/IPPoolDB";

export default class Application {
	static async Main(...argv: Array<string>) {
		let db = new IPPoolDB();
		await db.connect();

		let pool = await PoolManage.getPool(Ip3366Pool);
		let list = await pool.getPageData();
		for (let index = 0; index < list.length; index++) {
			console.log(JSON.stringify(list[index]));
		}

		await db.insertMany("IPTable", list);

		await db.close();
	}
}

Application.Main(...process.argv.slice(2));
