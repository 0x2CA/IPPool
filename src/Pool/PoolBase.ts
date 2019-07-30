import cheerio = require("cheerio");
import RequestStatic from "../Web/RequestStatic";
import IPData from "./IPData";

abstract class PoolBase {
	protected page = 1;
	protected maxPage = 0;

	setPage(page: number) {
		this.page = page;
	}

	getPage() {
		return this.page;
	}

	async getMaxPage($?: CheerioStatic) {
		let maxPage = 0;
		if ($) {
			maxPage = this.parseMaxPage($);
		} else {
			let html = await RequestStatic.get(
				this.getAgreement() + this.getUrl(),
				this.getCharset()
			);
			maxPage = this.parseMaxPage(cheerio.load(html));
		}
		return maxPage;
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
		if (proxy) {
			console.log("使用代理:", proxy, "获取:", this.getAgreement() + this.getUrl());
		} else {
			console.log("获取:", this.getAgreement() + this.getUrl());
		}

		// try {
		let list: Array<IPData> = new Array<IPData>();
		let html = await RequestStatic.get(
			this.getAgreement() + this.getUrl(),
			this.getCharset(),
			proxy
		);
		if (this.maxPage == 0) {
			await this.getMaxPage(cheerio.load(html));
		}
		let infoList = this.parseHtml(cheerio.load(html));
		for (let index = 0; index < infoList.length; index++) {
			const info = infoList[index];
			try {
				let item = this.getIPData(info);
				list.push(item);
			} catch (error) {
				console.error(error);
			}
		}
		return list;
		// } catch (error) {
		// 	console.error(error);
		// 	return [];
		// }
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

	protected abstract parseMaxPage($: CheerioStatic): number;

	/**
	 * 获取协议
	 *
	 * @abstract
	 * @returns {PoolBase.AgreementType}
	 * @memberof PoolBase
	 */
	abstract getAgreement(): PoolBase.AgreementType;

	protected isIP(ip: string) {
		return RegExp(
			/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/
		).test(ip);
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
