import MonogoManage from "./MonogoManage";

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
}
