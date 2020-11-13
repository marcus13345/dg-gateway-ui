import xGraphAdapter from 'xgraph-adapter';

const load = new Promise(async (res) => {
	const a = new xGraphAdapter('dev.xgraphdev.com', 27001);
	a.send('GetState', {}, (err, cmd) => {
		res(cmd.state.current);
	});
})

const solar = new Promise(async (res) => {
	const a = new xGraphAdapter('dev.xgraphdev.com', 27002);
	a.send('GetState', {}, (err, cmd) => {
		res(cmd.state.current);
	});
});

const generator = new Promise(async (res) => {
	const a = new xGraphAdapter('dev.xgraphdev.com', 27004);
	a.send('GetState', {}, (err, cmd) => {
		res(cmd.state.current);
	});
});

async function getLoad() {
	return await load;
}

async function getSolar() {
	return await solar;
}

async function getGenerator() {
	return await generator;
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