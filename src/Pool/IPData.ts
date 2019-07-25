class IPData {
	ip: string;
	port: string;
	type: IPData.Type;
	anonymous: boolean;
	site: string;
	survive: string;
	checkTime: string;
	constructor(
		ip: string,
		port: string,
		type: IPData.Type,
		anonymous: boolean,
		site: string,
		survive: string,
		checkTime: string
	) {
		this.ip = ip;
		this.port = port;
		this.type = type;
		this.anonymous = anonymous;
		this.site = site;
		this.survive = survive;
		this.checkTime = checkTime;
	}
}

namespace IPData {
	export enum Type {
		HTTP,
		HTTPS,
	}
}

export default IPData;
