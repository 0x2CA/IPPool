export default class PromiseHelper {
	static awaitWhere(fun: Function, timeOut = 3 * 60 * 1000) {
		return new Promise((resolve, reject) => {
			let time = -200;
			let whereCheck = () => {
				time += 200;
				if (time >= timeOut) {
					reject("等待超时");
				}
				if (fun()) {
					resolve();
				} else {
					setTimeout(whereCheck, 200);
				}
			};
			whereCheck();
		});
	}
}
