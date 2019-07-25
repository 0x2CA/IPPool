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
		let html = (await RequestStatic.get(this.getUrl())).text;
		return this.getPoolData(cheerio.load(html));
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
