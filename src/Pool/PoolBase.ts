import cheerio = require("cheerio");
import RequestStatic from "../RequestStatic";
import IPData from "./IPData";

abstract class PoolBase {
	protected page = 1;
	private data: Array<Array<IPData>> = new Array<Array<IPData>>();

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
	 * 获取当前页数据
	 *
	 * @returns
	 * @memberof PoolBase
	 */
	async getPageData() {
		try {
			let list: Array<IPData>;
			if (!this.data[this.page]) {
				let html = await RequestStatic.get(
					this.getAgreement() + this.getUrl(),
					this.getCharset()
				);
				list = this.getIPData(cheerio.load(html));
			} else {
				list = this.data[this.page];
			}

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
	 * 获取协议
	 *
	 * @abstract
	 * @returns {PoolBase.AgreementType}
	 * @memberof PoolBase
	 */
	abstract getAgreement(): PoolBase.AgreementType;

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
	protected abstract getIPData($: CheerioStatic): Array<IPData>;

	protected abstract getCharset(): PoolBase.CharsetType;
}

namespace PoolBase {
	export enum AgreementType {
		HTTP = "http://",
		HTTPS = "https://",
	}
	export enum CharsetType {
		UFT8 = "utf8",
		GB2312 = "gb2312",
	}
}

export default PoolBase;
