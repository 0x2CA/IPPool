import MongoDB = require("mongodb");
const MongoClient = MongoDB.MongoClient;

abstract class DBManage {
	protected dbType = DBManage.DBType.NONE;
	protected dbHost: string = "";
	protected dbPort: string = "";
	protected dbName: string = "";
	protected dbUser: String = "";
	protected dbPasswd: String = "";
	protected dbSrc: string = "";

	abstract connect(): Promise<any>;

	abstract close(): Promise<any>;
}

namespace DBManage {
	export enum DBType {
		NONE,
		CLOSE,
		OPEN,
		ERROR,
	}
}

export default DBManage;
