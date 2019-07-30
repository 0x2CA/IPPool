export default class PromiseHelper {
	static awaitWhen(fun: Function, timeOut = 3 * 60 * 1000) {
		return new Promise((resolve, reject) => {
			let time = -1000 / 60;
			let whereCheck = () => {
				time += 1000 / 60;
				if (time >= timeOut) {
					reject("等待超时");
				}
				if (fun()) {
					resolve();
				} else {
					setTimeout(whereCheck, 1000 / 60);
				}
			};
			whereCheck();
		});
	}
	static awaitTime(time: number) {
		return new Promise((resolve, reject) => {
			console.log(`等待${time}毫秒!`);
			setTimeout(() => {
				console.log(`等待结束!`);
				resolve();
			}, time);
		});
	}
}
