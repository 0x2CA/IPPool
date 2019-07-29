import PoolBase from "./PoolBase";

export default class PoolManage {

	static getPool(pool: new () => PoolBase): PoolBase {
		return new pool();
    }

    
    
}
