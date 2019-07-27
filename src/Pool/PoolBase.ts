import cheerio = require("cheerio");
import RequestStatic from "../Web/RequestStatic";
import IPData from "./IPData";

abstract class PoolBase {
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
	 * 获取当前页数据
	 *
	 * @returns
	 * @memberof PoolBase
	 */
	async getPageData(proxy?: string) {
		try {
			let list: Array<IPData> = new Array<IPData>();
			let html = await RequestStatic.get(
				this.getAgreement() + this.getUrl(),
				this.getCharset(),
				proxy
			);
			let infoList = this.parseHtml(cheerio.load(html));
			for (let index = 0; index < infoList.length; index++) {
				const info = infoList[index];
				list.push(this.getIPData(info));
			}
			return list;
		} catch (error) {
			console.error(error);
			return [];
		}
	}

	/**
	 * 默认方式解析html
	 *
	 * @protected
	 * @param {CheerioStatic} $
	 * @returns
	 * @memberof PoolBase
	 */
	protected parseHtml($: CheerioStatic) {
		let result = new Array<Array<string>>();
		$("table tbody tr").each((index, element) => {
			let info = $(element)
				.text()
				.split(" ")
				.filter((value) => {
					return value != "";
				})
				.join("")
				.split("\n")
				.filter((value) => {
					return value != "";
				});

			result.push(info);
		});
		return result;
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
	 *转换为Ip对象
	 *
	 * @protected
	 * @abstract
	 * @param {Array<string>} info
	 * @returns {IPData}
	 * @memberof PoolBase
	 */
	protected abstract getIPData(info: Array<string>): IPData;

	protected getCharset(): PoolBase.CharsetType {
		return PoolBase.CharsetType.UFT8;
	}
}

namespace PoolBase {
	export enum AgreementType {
		HTTP = "http://",
		HTTPS = "https://",
	}
	export enum CharsetType {
		UFT8 = "utf-8",
		GB2312 = "gb2312",
	}
}

export default PoolBase;
