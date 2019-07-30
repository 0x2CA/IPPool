import Ip3366Pool from "./Pool/Ip3366Pool";
import PoolManage from "./Pool/PoolManage";
import IPPoolDB from "./DB/IPPoolDB";
import IPData from "./Pool/IPData";
import XiciDailiPool from "./Pool/XiciDailiPool";
import KuaiDailiPool from "./Pool/KuaiDailiPool";

export default class Application {
	static async Main(...argv: Array<string>) {
		let ipPoolDB = new IPPoolDB();
		await ipPoolDB.connect();

		let pool = await PoolManage.getPool(KuaiDailiPool);

		let proxyList = await ipPoolDB.getIPData({
			isSurvive: true,
			agreement: pool.getAgreement(),
		});
		let proxyIndex = 0;

		for (let index = 1; index <= (await pool.getMaxPage()); index++) {
			pool.setPage(index);
			if (proxyList[proxyIndex]) {
				//使用代理
				try {
					let list = await pool.getPageData(proxyList[proxyIndex].getProxy());
					await ipPoolDB.insertIPDataMany(list);
				} catch (error) {
					//使用代理失败，推回和更新代理
					console.error(error);
					index--;
					ipPoolDB.updateIPData(proxyList[proxyIndex].getID());
				}
				//使用过代理
				proxyIndex++;
			} else {
				//不使用代理
				try {
					let list = await pool.getPageData();
					await ipPoolDB.insertIPDataMany(list);
				} catch (error) {
					//不使用代理失败，退回
					console.error(error);
					index--;
				}
				//获取最新代理
				proxyList = await ipPoolDB.getIPData({
					isSurvive: true,
					agreement: pool.getAgreement(),
				});
				proxyIndex = 0;
			}
		}

		await ipPoolDB.close();
	}
}

Application.Main(...process.argv.slice(2));
