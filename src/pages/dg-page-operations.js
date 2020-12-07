import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import solarIcon from './../res/Dynamic Grid icons-grid.svg';
import batteryIcon from './../res/battery-casing-redux.svg';
import generatorIcon from './../res/new-generator.svg';
import towerIcon from './../res/tower.svg';
import miniSolarSvg from './../res/minisolar.svg';
import miniGeneratorSvg from './../res/minigenerator.svg';
import miniChargingSvg from './../res/charging.svg';

const miniCharging = html`<span class="mini">
	${unsafeHTML(miniChargingSvg)}
</span>`
const miniSolar = html`<span class="mini">
	${unsafeHTML(miniSolarSvg)}
</span>`
const miniGenerator = html`<span class="mini">
	${unsafeHTML(miniGeneratorSvg)}
</span>`

import {
	getLoad,
	getSolar,
	getGenerator,
	getCharging,
	getSolarChargingBattery,
	getGeneratorChargingBattery
} from './../lib/db';

class DgPageOperations extends LitElement {
	static get styles() {
		return css`

			.mini svg {
				width: 16px;
				height: 16px;
			}

			b {
				font-size: 1.2em;
			}

			.colorText {
				color: #1C7C54;
			}

			.smol {
				font-size: .7em;
			}

			.center {
				display: grid;
				place-items: center center;
				width: 100%;
			}
			
			.icon {
				width: 116px;
			}

			.header {
				text-align: center;
				width: 200px;
			}

			.icon.invert svg,
			.icon.invert svg path {
				fill: white !important;
			}

			.icon svg,
			.icon svg path {
				fill: #1C7C54 !important;
			}

			.icon.invert .backdrop {
				background: #1C7C54;
			}

			.icon .backdrop {
				background: white;
				width: 100%;
				padding-bottom: 100%;
				border-radius: 50%;
				height: 0px;
				overflow: hidden;
			}

			.root {
				width: 800px;
				height: 600px;
				position: relative;
				background: white;
				margin: 24px;
				border-radius: 15px;
				padding: 32px;
				box-shadow: 0px 5px 7px rgba(0, 0, 0, .2);
			}

			.canvas {
				position: absolute;
			}

			/* ICONS */
			.icon.solar svg {
				transform: scale(1.4);
				transform-origin: 50% 55%;
			}

			.icon.battery svg {
				transform: scale(0.45);
				transform-origin: 50% 20%;
			}

			.icon.generator svg {
				transform: scale(0.8);
				transform-origin: 50% 30%;
			}

			.icon.load svg {
				transform: scale(1.5);
				transform-origin: 50% 20%;
			}



			/* PLACEMENTS */
			.icon.solar {
				position: absolute;
				top: 120px;
				left: 42px;
			}

			.header.solar {
				position: absolute;
				top: 20px;
				left: 0px;
			}

			.icon.battery {
				position: absolute;
				top: 120px;
				left: 342px;
			}

			.header.battery {
				position: absolute;
				top: 20px;
				left: 300px;
			}

			.icon.generator {
				position: absolute;
				top: 120px;
				left: 642px;
			}

			.header.generator {
				position: absolute;
				top: 20px;
				left: 600px;
			}

			.icon.load {
				position: absolute;
				top: 380px;
				left: 342px;
			}

			.header.load {
				position: absolute;
				top: 520px;
				left: 300px;
			}

			.arrow {
				border-top: 5px dashed #1C7C54;
				animation: border-dance 4s infinite linear;
				width: 100px;
				height: 5px;
				position: absolute;
			}
		`;
	}

	firstUpdated() {
		this.updateNumbers();
		setInterval(_ => {
			this.updateNumbers();
		}, 2000);
	}

	static get properties() {
		return {
			load: Number,
			solar: Number,
			generator: Number,
			charging: Number,
			solarChargingBattery: Boolean,
			generatorChargingBattery: Boolean
		}
	}

	load = 0;
	solar = 0;
	generator = 0;
	charging = 0;
	chargeLevel = 0;
	solarChargingBattery = false;
	generatorChargingBattery = false;;

	async updateNumbers() {
		this.load = await getLoad();
		this.solar = await getSolar();
		this.generator = await getGenerator();
		this.charging = await getCharging();
		this.chargeLevel = Math.abs(Math.floor(await getCharging() / 200));
		this.solarChargingBattery = await getSolarChargingBattery();
		this.generatorChargingBattery = await getGeneratorChargingBattery();
	}

	render() {
		return html`
		<div class="center">
			<div class="root">
				<div class="canvas">

					<div class="arrow" ?hidden=${(() => {
						return !(this.solar < 0 && this.charging > 0);
					})()} style="top: 170px; left: 190px; width: 150px;"></div>

					<div class="arrow" ?hidden=${(() => {
						return !(this.generator < 0 && this.battery > 0);
					})()} style="top: 170px; left: 460px; width: 150px;"></div>
					
					<div class="arrow" ?hidden=${(() => {
						return !(this.solar < 0);
					})()} style="top: 300px; left: 150px; width: 200px; transform: rotate(42deg);"></div>
					
					<div class="arrow" ?hidden=${(() => {
						return !(this.generator < 0);
					})()} style="top: 300px; left: 450px; width: 200px; transform: rotate(-42deg);"></div>
					
					<div class="arrow" ?hidden=${(() => {
						return !(this.charging < 0);
					})()} style="top: 300px; left: 347px; width: 100px; transform: rotate(90deg);"></div>

					<div class="header solar">
						<b>SOLAR</b><br>
						${
							this.solar < 0 ?
								'SUPPLYING POWER' + (this.solarChargingBattery ? ' & CHARGING BATTERY' : '') :
								'NOT IN USE'
						}<br>
						<span class="colorText">${(this.solar/1000).toFixed(2)}</span> <span class="">kW generated today</span>
					</div>
					<div class="icon solar">
						<div class="backdrop">
							${unsafeHTML(solarIcon)}
						</div>
					</div>

					<div class="header battery">
						<b>BATTERY</b><br>
						${
							this.charging > 0 ?
								html`${miniCharging} CHARGING` :
								this.charging < 0 ?
								'DISCHARGING' : 
								'NEUTRAL'
						}<br>
						Charge Level: <span class="colorText">${this.chargeLevel}</span><span class="">%</span>
					</div>
					<div class="icon battery">
						<div class="backdrop">
							${unsafeHTML(batteryIcon)}
						</div>
					</div>

					<div class="header generator">
						<b>GENERATOR</b><br>
						${
							this.generator < 0 ?
								'SUPPLYING POWER' + (this.generatorChargingBattery ? ' & CHARGING BATTERY' : '') :
								'NOT IN USE'
						}<br>
						<span class="colorText">${(this.generator / 1000).toFixed(2)}</span> <span class="">kW generated today</span>
					</div>
					<div class="icon generator">
						<div class="backdrop">
							${unsafeHTML(generatorIcon)}
						</div>
					</div>

					<div class="header load">
						<b>LOAD</b><br>
						POWERED BY ${(() => {
							const battery = this.charging < 0;
							const solar = this.solar < 0;
							const gen = this.generator < 0;
							
							let stuff = [];
							if(battery) stuff.push('BATTERY');
							if(solar) stuff.push('SOLAR');
							if(gen) stuff.push('GENERATOR');

							if(stuff.length === 0) return 'NOTHING';

							// this bullshit takes a list of things and comma separates them with an 'and'
							// (so long as the things dont have a '-' (dash))
							let text = stuff.join(', ').split(' ').reverse().join(' ').replace(',', '-AND').split(' ').reverse().join(' ').replace('-', ' ');
							
							if(!battery && !solar && !gen) return text;
							else {
								text = html`${text}<br>`;
								if(battery) text = html`${text}${miniCharging}`;
								if(solar) text = html`${text}${miniSolar}`;
								if(gen) text = html`${text}${miniGenerator}`;
								return text;
							}

						})()}<br>
						Today's Power Consumption: <span class="colorText">${(this.load / 1000).toFixed(2)}</span> <span class="">kW</span>
					</div>
					<div class="icon invert load">
						<div class="backdrop">
							${unsafeHTML(towerIcon)}
						</div>
					</div>
				</div>

			</div>
		</div>
		`;
	}
}

customElements.define('dg-page-operations', DgPageOperations);