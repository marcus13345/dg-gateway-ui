import xGraphAdapter from './xgraph-adapter';

const load = new xGraphAdapter('dev.xgraphdev.com', 27001);
const solar = new xGraphAdapter('dev.xgraphdev.com', 27002);
const generator = new xGraphAdapter('dev.xgraphdev.com', 27004);

async function getLoad() {
	return await new Promise(res => {
		load.send('GetState', {}, (err, cmd) => {
			res(cmd.state.current);
		});
	});
}

async function getSolar() {
	return await new Promise(res => {
		solar.send('GetState', {}, (err, cmd) => {
			res(cmd.state.current);
		});
	});
}

async function getGenerator() {
	return await new Promise(res => {
		generator.send('GetState', {}, (err, cmd) => {
			res(cmd.state.current);
		});
	});
}

async function getCharging() {
	return -(await getLoad() + await getSolar() + await getGenerator());
}

async function getSolarChargingBattery() {
	return (await getLoad() + await getSolar()) < 0;
}

async function getGeneratorChargingBattery() {
	return (await getLoad() + await getGenerator()) < 0;
}

// async function getSolarPoweringLoad() {
// 	return (await getLoad() + await getSolar()) <= 0;
// }


export {
	getLoad,
	getSolar,
	getGenerator,
	getCharging,
	getSolarChargingBattery,
	getGeneratorChargingBattery
}