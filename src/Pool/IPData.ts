class IPData {
	ip: string = "";
	port: string = "";
	type: IPData.Type = IPData.Type.HTTP;
	anonymous: boolean = false;
	site: string = "";
	checkTime: Date = new Date();
	isSurvive = false;

	constructor(ip: string, port: string, type: IPData.Type, anonymous: boolean, site: string) {
		this.ip = ip;
		this.port = port;
		this.type = type;
		this.anonymous = anonymous;
		this.site = site;
		this.check();
	}

	check() {
        
		this.isSurvive = true;
		this.checkTime = new Date();
	}
}

namespace IPData {
	export enum Type {
		HTTP,
		HTTPS,
	}
}

export default IPData;
