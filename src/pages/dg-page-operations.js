import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import solarIcon from './../res/Dynamic Grid icons-grid.svg';
import batteryIcon from './../res/battery-casing-redux.svg';
import generatorIcon from './../res/new-generator.svg';
import towerIcon from './../res/tower.svg';
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
	solarChargingBattery = false;
	generatorChargingBattery = false;;

	async updateNumbers() {
		this.load = await getLoad();
		this.solar = await getSolar();
		this.generator = await getGenerator();
		this.charging = await getCharging();
		this.solarChargingBattery = await getSolarChargingBattery();
		this.generatorChargingBattery = await getGeneratorChargingBattery();
	}

	render() {
		return html`
		<div class="center">
			<div class="root">
				<div class="canvas">

					<div class="header solar">
						<b>SOLAR</b><br>
						${
							this.solar < 0 ?
								'SUPPLYING POWER' + (this.solarChargingBattery ? ' & CHARGING BATTERY' : '') :
								'NOT IN USE'
						}<br>
						<span class="colorText">${this.solar}</span> <span class="smol">generated today</span>
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
								'CHARGING' :
								this.charging < 0 ?
								'DISCHARGING' : 
								'NEUTRAL'
						}<br>
						<span class="colorText">${this.charging}</span> <span class="smol">charging</span>
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
						<span class="colorText">${this.generator}</span> <span class="smol">generated today</span>
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

							// this bullshit takes a list of things and comma separates them, wit han and
							// so long as the things dont have a - (dash)
							return stuff.join(', ').split(' ').reverse().join(' ').replace(',', '-AND').split(' ').reverse().join(' ').replace('-', ' ');

						})()}<br>
						<span class="colorText">${this.load}</span> <span class="smol">used today</span>
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