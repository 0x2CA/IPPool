import cheerio = require("cheerio");
import RequestStatic from "../RequestStatic";
import IPData from "./IPData";

export default abstract class PoolBase {
	protected page = 1;
	setPage(page: number) {
		this.page = page;
	}
	getPage() {
		return this.page;
	}
	nextPage() {
		this.page++;
	}
	prePage() {
		this.page--;
	}
	/**
	 * 获取数据
	 *
	 * @returns
	 * @memberof PoolBase
	 */
	async getData() {
		try {
			let html = await RequestStatic.get(this.getUrl());
			let list = this.getPoolData(cheerio.load(html));
			let promiseList = new Array<Promise<void>>();
			for (let index = 0; index < list.length; index++) {
				promiseList.push(list[index].check());
			}

			await Promise.all(promiseList);

			let result = list.filter((value) => {
				return value.isSurvive;
			});

			console.log("可用率", result.length / list.length);
			return result;
		} catch (error) {
			console.error(error);
			console.log("可用率", 0);
			return [];
		}
	}
	/**
	 * 获取URL
	 *
	 * @abstract
	 * @returns {string}
	 * @memberof PoolBase
	 */
	abstract getUrl(): string;

	/**
	 * 获取当前URL的Ip池数据
	 *
	 * @abstract
	 * @param {CheerioStatic} $
	 * @returns {Array<PoolData>}
	 * @memberof PoolBase
	 */
	protected abstract getPoolData($: CheerioStatic): Array<IPData>;
}
