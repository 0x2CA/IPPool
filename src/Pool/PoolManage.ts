import PoolBase from "./PoolBase";

export default class PoolManage {
	constructor() {}

	static getPool(pool: new () => PoolBase): PoolBase {
		return new pool();
	}
}
