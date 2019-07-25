import XiciDailiPool from "./Pool/XiciDailiPool";
import FreePool from "./Pool/FreePool";

//https://www.kuaidaili.com/free/inha/页数
//http://www.ip3366.net/free/?stype=1&page=页数
//https://www.xicidaili.com/nn/页数

export default class Application {
	static async Main(...argv: Array<string>) {
		console.log(await FreePool.getPool(XiciDailiPool).getData());
	}
}

Application.Main(...process.argv.slice(2));
