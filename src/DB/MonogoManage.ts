import MongoDB = require("mongodb");
import PromiseHelper from "../PromiseHelper";
const MongoClient = MongoDB.MongoClient;

class MonogoManage {
	private db: MongoDB.MongoClient | null = null;
	private dbSrc: string;
	private dbType: MonogoManage.DBType = MonogoManage.DBType.CLOSE;

	constructor(
		private dbHost: string,
		private dbPort: string,
		private dbName: string,
		private dbUser?: String,
		private dbPasswd?: String
	) {
		// this.dbHost = dbHost;
		// this.dbPort = dbPort;
		// this.dbName = dbName;
		if (dbUser && dbPasswd) {
			// this.dbUser = dbUser;
			// this.dbPasswd = dbPasswd;
			this.dbSrc = `mongodb://${this.dbUser}:${this.dbPasswd}@${this.dbHost}:${this.dbPort}/${
				this.dbName
			}`;
		} else {
			this.dbSrc = `mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`;
		}
		// console.log(this.dbSrc);
	}

	getDB() {
		return this.db;
	}

	connect() {
		if (this.dbType == MonogoManage.DBType.OPEN) {
			return Promise.resolve();
		} else if (this.dbType == MonogoManage.DBType.CLOSE) {
			return new Promise<MongoDB.MongoClient>((resolve, reject) => {
				console.log("连接数据库!");
				this.dbType = MonogoManage.DBType.OPENING;
				MongoClient.connect(this.dbSrc, { useNewUrlParser: true }, (err, db) => {
					if (err) {
						reject(err);
					} else {
						this.db = db;
						this.dbType = MonogoManage.DBType.OPEN;
						console.log("连接成功!");
						resolve();
					}
				});
			});
		} else if (this.dbType == MonogoManage.DBType.OPENING) {
			return new Promise<MongoDB.MongoClient>(async (resolve, reject) => {
				await PromiseHelper.awaitWhen(() => {
					this.dbType == MonogoManage.DBType.OPEN ||
						this.dbType == MonogoManage.DBType.ERROR;
				});
				if (this.dbType == MonogoManage.DBType.OPEN) {
					resolve();
				}
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
		if (this.dbType != MonogoManage.DBType.OPEN) {
			throw new Error("请连接服务器!");
		} else if (this.db) {
			return await this.db
				.db(this.dbName)
				.collection(table)
				.insertOne(data);
		}
	}

	async insertMany(table: string, dataList: Array<any>) {
		if (this.dbType != MonogoManage.DBType.OPEN) {
			throw new Error("请连接服务器!");
		} else if (this.db) {
			return await this.db
				.db(this.dbName)
				.collection(table)
				.insertMany(dataList);
		}
	}

	async find(table: string, where: { [key: string]: any }) {
		if (this.dbType != MonogoManage.DBType.OPEN) {
			throw new Error("请连接服务器!");
		} else if (this.db) {
			return await this.db
				.db(this.dbName)
				.collection(table)
				.find(where)
				.toArray();
		}
	}

	async updateOne(table: string, data: any, where: { [key: string]: any }) {
		if (this.dbType != MonogoManage.DBType.OPEN) {
			throw new Error("请连接服务器!");
		} else if (this.db) {
			return await this.db
				.db(this.dbName)
				.collection(table)
				.updateOne(where, { $set: data });
		}
	}

	async updateMany(table: string, data: any, where: { [key: string]: any }) {
		if (this.dbType != MonogoManage.DBType.OPEN) {
			throw new Error("请连接服务器!");
		} else if (this.db) {
			return await this.db
				.db(this.dbName)
				.collection(table)
				.updateMany(where, { $set: data });
		}
	}

	async deleteOne(table: string, where: { [key: string]: any }) {
		if (this.dbType != MonogoManage.DBType.OPEN) {
			throw new Error("请连接服务器!");
		} else if (this.db) {
			return await this.db
				.db(this.dbName)
				.collection(table)
				.deleteOne(where);
		}
	}

	async deleteMany(table: string, where: { [key: string]: any }) {
		if (this.dbType != MonogoManage.DBType.OPEN) {
			throw new Error("请连接服务器!");
		} else if (this.db) {
			return await this.db
				.db(this.dbName)
				.collection(table)
				.deleteMany(where);
		}
	}
}

namespace MonogoManage {
	export enum SortType {
		ASC = 1,
		DESC = -1,
	}
	export enum DBType {
		OPEN,
		OPENING,
		CLOSE,
		CLOSEING,
		ERROR,
	}
}

export default MonogoManage;
