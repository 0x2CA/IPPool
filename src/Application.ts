import Ip3366Pool from "./Pool/Ip3366Pool";
import PoolManage from "./Pool/PoolManage";
import IPPoolDB from "./DB/IPPoolDB";
import IPData from "./Pool/IPData";

export default class Application {
	static async Main(...argv: Array<string>) {
		let ipPoolDB = new IPPoolDB();
		await ipPoolDB.connect();

		let pool = await PoolManage.getPool(Ip3366Pool);
		let list = await pool.getPageData();

		await ipPoolDB.insertIPData(...list);

		let info = await ipPoolDB.getIPData("http://119.180.130.170:8060");
		console.log(info);

		await ipPoolDB.close();
	}
}

Application.Main(...process.argv.slice(2));
