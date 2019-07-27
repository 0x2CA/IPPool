import MongoDB = require("mongodb");
import DBManage from "./DBManage";
const MongoClient = MongoDB.MongoClient;

export default class MonogoManage extends DBManage {
	private db: MongoDB.MongoClient | null = null;

	constructor(
		dbHost: string,
		dbPort: string,
		dbName: string,
		dbUser?: String,
		dbPasswd?: String
	) {
		super();
		this.dbHost = dbHost;
		this.dbPort = dbPort;
		this.dbName = dbName;
		if (dbUser && dbPasswd) {
			this.dbUser = dbUser;
			this.dbPasswd = dbPasswd;
			this.dbSrc = `mongodb://${this.dbUser}:${this.dbPasswd}@${this.dbHost}:${this.dbPort}/${
				this.dbName
			}`;
		} else {
			this.dbSrc = `mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`;
		}
		console.log(this.dbSrc);
	}

	connect() {
		if (this.dbType == MonogoManage.DBType.OPEN) {
			return Promise.resolve(this.db);
		} else {
			return new Promise<MongoDB.MongoClient>((resolve, reject) => {
				console.log("连接数据库!");
				MongoClient.connect(this.dbSrc, { useNewUrlParser: true }, (err, db) => {
					if (err) {
						reject(err);
					} else {
						this.db = db;
						this.dbType = MonogoManage.DBType.OPEN;
						console.log("连接成功!");
						resolve(db);
					}
				});
			});
		}
	}

	async close() {
		if (this.dbType == MonogoManage.DBType.OPEN && this.db) {
			console.log("断开数据库!");
			await this.db.close();
			this.dbType = MonogoManage.DBType.CLOSE;
			this.db = null;
			console.log("断开成功!");
		}
	}

	async insertOne(table: string, data: any) {
		if (this.dbType != DBManage.DBType.OPEN) {
			throw new Error("请连接服务器!");
		} else if (this.db) {
			return await this.db
				.db(this.dbName)
				.collection(table)
				.insertOne(data);
		}
	}

	async insertMany(table: string, data: Array<any>) {
		if (this.dbType != DBManage.DBType.OPEN) {
			throw new Error("请连接服务器!");
		} else if (this.db) {
			return await this.db
				.db(this.dbName)
				.collection(table)
				.insertMany(data);
		}
	}
}
