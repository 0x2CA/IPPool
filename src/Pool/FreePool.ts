import PoolType from "./PoolType";
import XiciDailiPool from "./XiciDailiPool";
import PoolBase from "./PoolBase";

export default class FreePool {
	static getPool(type: new () => PoolBase): PoolBase {
		return new type();
	}
}
