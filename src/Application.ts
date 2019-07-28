import Ip3366Pool from "./Pool/Ip3366Pool";
import PoolManage from "./Pool/PoolManage";
import IPPoolDB from "./DB/IPPoolDB";
import IPData from "./Pool/IPData";

export default class Application {
	static async Main(...argv: Array<string>) {
		let ipPoolDB = new IPPoolDB();
		await ipPoolDB.connect();

		// let pool = await PoolManage.getPool(Ip3366Pool);
		// let list = await pool.getPageData();
		// for (let index = 0; index < list.length; index++) {
		// 	console.log(JSON.stringify(list[index]));
		// }

		// await ipPoolDB.getDB().insertMany("IPTable", list);

		console.log(
			JSON.stringify(await ipPoolDB.getDBManage().find("IPTable", { ip: "114.246.148.106" }))
		);
		console.log(
			JSON.stringify(
				await ipPoolDB
					.getDBManage()
					.updateOne("IPTable", { ip: "updateOne" }, { ip: "114.246.148.106" })
			)
		);
		console.log(
			JSON.stringify(
				await ipPoolDB.getDBManage().find("IPTable", { ip: "updateOne" })
			)
		);

		await ipPoolDB.close();
	}
}

Application.Main(...process.argv.slice(2));
