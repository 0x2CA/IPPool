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

	async insertIPData(...list: Array<IPData>) {
		let result = new Array<IPData>();
		await this.getDBManage().createUniqueIndex("IPTable", "id");
		for (let index = 0; index < list.length; index++) {
			try {
				let dbInfo = await this.getIPData(list[index].getID());
				if (!dbInfo) {
					await list[index].check();
					await this.getDBManage().insertOne("IPTable", list[index]);
					result.push(list[index]);
				} else {
					console.error("数据库已经存在:", list[index].getID());
				}
			} catch (error) {
				console.error(error);
			}
		}
		return result;
	}

	async getIPData(id: string) {
		let result: Array<Proxy> = await this.getDBManage().find("IPTable", { id });
		if (result.length > 0) {
			let info = result[0];
			return new IPData(
				info.ip,
				info.port,
				info.agreement,
				info.anonymous,
				info.site,
				info.assess,
				info.checkTime
			);
		}
		return null;
	}
}

interface Proxy {
	ip: string;
	port: string;
	agreement: IPData.AgreementType;
	anonymous: boolean;
	site: string;
	checkTime: Date;
	assess: number;
	id: string;
}
