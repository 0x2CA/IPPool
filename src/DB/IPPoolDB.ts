import MonogoManage from "./MonogoManage";
import IPData from "../Pool/IPData";

export default class IPPoolDB {
	private dbHost: string = "localhost";
	private dbPort: string = "27017";
	private dbName: string = "IPPool";
	private dbUser: string = "root";
	private dbPasswd: string = "root";
	private dbIPPoolTable: string = "IPPoolTable";
	private dbManage: MonogoManage;

	constructor() {
		this.dbManage = new MonogoManage(this.dbHost, this.dbPort, this.dbName);
	}

	async connect() {
		await this.dbManage.connect();
	}

	async close() {
		await this.dbManage.close();
	}

	getDBManage() {
		return this.dbManage;
	}

	async insertIPDataMany(list: Array<IPData>) {
		await this.getDBManage().createUniqueIndex("IPTable", "id");
		let promiseList = new Array<Promise<any>>();
		for (let index = 0; index < list.length; index++) {
			promiseList.push(this.insertIPDataOne(list[index]));
		}
		await Promise.all(promiseList);
	}

	async insertIPDataOne(ipData: IPData) {
		try {
			let dbInfo = await this.getIPData({
				id: ipData.getID(),
			});
			if (dbInfo.length == 0) {
				await ipData.check();
				await this.getDBManage().insertOne("IPTable", ipData);
				console.log("写入数据库:", ipData.getID());
				return ipData;
			} else {
				await this.updateIPData(ipData.getID());
				console.error("数据库已经存在:", ipData.getID());
			}
		} catch (error) {
			console.error(error);
		}
	}

	async updateIPData(id: string) {
		let list = await this.getIPData({ id });
		if (list.length == 1) {
			await list[0].check();
			if (list[0].getAssess() == 0) {
				await this.getDBManage().deleteOne("IPTable", {
					id,
				});
				console.warn("分数过低清除:", list[0].getID());
			} else {
				if (list[0].getSurvive()) {
					console.log(list[0].getID(), "存活");
				}
				await this.getDBManage().updateOne(
					"IPTable",
					{
						checkTime: list[0].getCheckTime(),
						isSurvive: list[0].getSurvive(),
						assess: list[0].getAssess(),
					},
					{ id }
				);
				return list[0];
			}
		}
	}

	async getIPData(when: any) {
		let result = new Array<IPData>();
		let list: Array<Proxy> = await this.getDBManage().find("IPTable", when);
		if (list.length > 0) {
			for (let index = 0; index < list.length; index++) {
				const info = list[index];
				result.push(
					new IPData(
						info.ip,
						info.port,
						info.agreement,
						info.anonymous,
						info.site,
						info.assess,
						info.checkTime,
						info.isSurvive
					)
				);
			}
		}
		return result;
	}

	async getIPDataByHttp() {
		return await this.getIPData({
			agreement: IPData.AgreementType.HTTP,
			isSurvive: true,
		});
	}

	async getIPDataByHttps() {
		return await this.getIPData({
			agreement: IPData.AgreementType.HTTPS,
			isSurvive: true,
		});
	}

	async getIPDataByIsSurvive(isSurvive: boolean) {
		return await this.getIPData({
			isSurvive,
		});
	}
}

interface Proxy {
	ip: string;
	port: string;
	agreement: IPData.AgreementType;
	anonymous: boolean;
	site: string;
	checkTime: number;
	assess: number;
	id: string;
	isSurvive: boolean;
}
