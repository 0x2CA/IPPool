import PoolBase from "./PoolBase";
import IPPoolDB from "../DB/IPPoolDB";
import PromiseHelper from "../PromiseHelper";

export default class PoolManage {
	static getPool(pool: new () => PoolBase): PoolBase {
		return new pool();
	}

	static async updatePool(pool: PoolBase) {
		let ipPoolDB = new IPPoolDB();
		await ipPoolDB.connect();
		try {
			let proxyList = await ipPoolDB.getIPData({
				isSurvive: true,
				agreement: pool.getAgreement(),
			});
			let proxyIndex = 0;

			//首次请求真实IP测试
			try {
				pool.setPage(1);
				let list = await pool.getPageData();
				await ipPoolDB.insertIPDataMany(list);
			} catch (error) {
				console.error("真实主机请求失败!");
				return;
			}

			for (let index = 1; index <= (await pool.getMaxPage()); index++) {
				pool.setPage(index);

				if (proxyList[proxyIndex]) {
					//使用代理
					try {
						let list = await pool.getPageData(proxyList[proxyIndex].getProxy());
						await ipPoolDB.insertIPDataMany(list);
						//延迟3秒
						await PromiseHelper.awaitTime(3000);
					} catch (error) {
						//使用代理失败，推回和更新代理
						console.error(error);
						index--;
						try {
							await ipPoolDB.updateIPData(proxyList[proxyIndex].getID());
						} catch (error) {
							console.error(error);
						}
					}
					//使用过代理
					proxyIndex++;
				} else if (proxyList.length == 0) {
					//不使用代理
					try {
						let list = await pool.getPageData();
						await ipPoolDB.insertIPDataMany(list);
						//延迟3秒
						await PromiseHelper.awaitTime(3000);
					} catch (error) {
						//不使用代理失败，退回
						console.error(error);
						index--;
					}
					try {
						//获取最新代理
						proxyList = await ipPoolDB.getIPData({
							isSurvive: true,
							agreement: pool.getAgreement(),
						});
					} catch (error) {
						console.error(error);
					}
					proxyIndex = 0;
				} else {
					index--;
					try {
						//获取最新代理
						proxyList = await ipPoolDB.getIPData({
							isSurvive: true,
							agreement: pool.getAgreement(),
						});
					} catch (error) {
						console.error(error);
					}
					proxyIndex = 0;
				}
			}
		} catch (error) {
			console.error(error);
		}
		await ipPoolDB.close();
	}

	static async checkAll() {
		let ipPoolDB = new IPPoolDB();
		await ipPoolDB.connect();
		try {
			let proxyList = await ipPoolDB.getIPData({});
			console.log("重新检测数量", proxyList.length);
			// let promiseList = new Array<Promise<any>>();
			for (let index = 0; index < proxyList.length; index++) {
				// promiseList.push(
				// 	(async (proxy) => {
				// try {
				// 	console.log("重新检测:", proxy.getID());
				// 	await ipPoolDB.updateIPData(proxy.getID());
				// } catch (error) {
				// 	console.error(error);
				// }
				// 	})(proxyList[index])
				// );
				const proxy = proxyList[index];
				try {
					console.log("重新检测:", proxy.getID());
					await ipPoolDB.updateIPData(proxy.getID());
				} catch (error) {
					console.error(error);
				}
			}
			// await Promise.all(promiseList);
			console.log("重新检测结束");
		} catch (error) {
			console.error(error);
		}
		await ipPoolDB.close();
	}
}
