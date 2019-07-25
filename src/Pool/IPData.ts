class IPData {
	constructor(type: IPData.Type) {}
}

namespace IPData {
	export enum Type {
		HTTP,
		HTTPS,
	}
}

export default IPData;
