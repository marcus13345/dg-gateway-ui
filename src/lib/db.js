import xGraphAdapter from 'xgraph-adapter';

class Thing extends xGraphAdapter {
	constructor() {
		super('52.90.34.213', 27001);
		console.log('ayayayyayayayaya');
		this.send('GetState', {}, (err, cmd) => {
			console.log(err, cmd);
		});
	}
}

console.log(new Thing())