import Ip3366Pool from "./Pool/Ip3366Pool";
import PoolManage from "./Pool/PoolManage";
import IPPoolDB from "./DB/IPPoolDB";
import IPData from "./Pool/IPData";
import XiciDailiPool from "./Pool/XiciDailiPool";
import KuaiDailiPool from "./Pool/KuaiDailiPool";
import PromiseHelper from "./PromiseHelper";
import schedule = require("node-schedule");

export default class Application {
	static async Main(...argv: Array<string>) {
		schedule.scheduleJob("0 0 12 * * * * *", async () => {
			console.log("定时任务：", "定时检查所以ip");
			await PoolManage.checkAll();
		});
		schedule.scheduleJob("0 0 0 * * *", async () => {
			console.log("定时任务：", "定时检查所以ip");
			let pool = PoolManage.getPool(KuaiDailiPool);
			await PoolManage.updatePool(pool);
		});
		let pool = PoolManage.getPool(KuaiDailiPool);
		await PoolManage.updatePool(pool);
	}
}

Application.Main(...process.argv.slice(2));
