import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import lang from './../i18n';
import towerIcon from './../res/tower.svg';
import solarIcon from './../res/Dynamic Grid icons-grid.svg';
import generatorIcon from './../res/Dynamic Grid icons-genset.svg';
import batteryIcon from './../res/battery-casing-redux.svg';

class DgPageDashboard extends LitElement {

	towerPower = 7;
	towerPowerMax = 7.07;
	get towerPowerPercent () {
		return this.towerPower / this.towerPowerMax * 100;
	}

	batteryCharge = 36;
	batteryMax = 80;
	get batteryPercent () {
		return this.batteryCharge / this.batteryMax * 100;
	}
	
	generatorPower = 18;
	generatorMax = 20;
	get generatorPercent () {
		return this.generatorPower / this.generatorMax * 100;
	}
	
	solarPower = Math.random() * 10;
	solarMax = this.solarPower + (Math.random() * 10);
	get solarPercent () {
		return this.solarPower / this.solarMax * 100;
	}

	static get styles() {
		return css`

			:host > .content {
				display: grid;
				grid-template-columns: 5fr 1fr 5fr;
				grid-gap: 24px;
				padding: 24px;
				max-width: 1280px;
				margin: 0px auto;
			}

			.card {
				--icon-size: 145px;
				--padding: 24px;
				background: white;
				width: 100%;
				border-radius: 15px;
				grid-column-end: span 2;
				box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2), 0px 3px 5px rgba(0, 0, 0, 0.2);
				display: grid;
				grid-template-columns: 2fr var(--icon-size);
				grid-template-rows: 1fr min-content;
				grid-template-areas:
					"content icon"
					"footer icon";
				padding: 0px var(--padding);
				box-sizing: border-box;
			}
			

			@media only screen and (min-width: 1920px) {
				.card {
					--icon-size: 175px;
					--padding: 48px;
				}
			}

			.card.reversed {
				grid-gap: var(--padding);
				grid-template-columns: var(--icon-size) 2fr;
				grid-template-areas:
					"icon content"
					"icon footer";
			}

			.card > .content {
				grid-area: content;
			}

			.card > .icon {
				/* background: salmon; */
				/* overflow: hidden; */
				grid-area: icon;
				padding-top: var(--padding);
				padding-bottom: var(--padding);
			}

			.card > .footer {
				grid-area: footer;
				display: grid;
				/* place-items: center center; */
				padding-bottom: var(--padding);
				font-size: 0.67em;
			}

			.card .icon .backdrop {
				background: #1C7C54;
				width: 100%;
				padding-bottom: 100%;
				border-radius: 50%;
				height: 0px;
				overflow: hidden;
			}

			.icon svg,
			.icon svg path {
				fill: white !important;
			}

			
			.card:nth-child(4n) .icon svg,
			.card:nth-child(4n) .icon svg path {
				fill: #1C7C54 !important;
			}

			.card:nth-child(4n),
			.card:nth-child(4n + 3) {
				grid-column-end: span 1;
			}

			.card:nth-child(4n + 3) {
				background: #132E32;
			}

			.card:nth-child(4n + 3) mx-button {
				--color: #007F41;
			}
			
			.card:nth-child(4n) mx-button {
				--color: #40003F;
			}
			
			.card:nth-child(4n) {
				background: #1C7C54;
			}
			
			.card:nth-child(4n) .icon .backdrop,
			.card:nth-child(4n + 3) .icon .backdrop {
				background: white;
			}

			.banner {
				/* box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05), -3px -3px 5px rgba(255, 255, 255, 0.8); */
				border-radius: 15px;
				background: white;
				margin-top: 32px;
				grid-column: 1 / span 3;
				height: 50px;
				display: grid;
				grid-template-columns: 1fr min-content min-content;
				padding: 0px 16px;
				grid-gap: 16px;
				box-sizing: border-box;
				white-space: nowrap;
			}

			mx-button {
				--color: #006494;
			}

			.status {
				line-height: 48px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.banner mx-button {
				font-size: 13px;
			}

			.center {
				display: grid;
				place-items: center center;
			}

			.icon.tower svg {
				transform: scale(1.5);
				transform-origin: 50% 20%;
			}

			.icon.generator svg {
				transform: scale(1.3);
				transform-origin: 50% 0%;
			}

			.icon.solar svg {
				transform: scale(1.4);
				transform-origin: 50% 55%;
			}

			.icon.battery svg {
				transform: scale(0.45);
				transform-origin: 50% 20%;
			}

			.card .content {
				padding-top: calc(var(--padding) + 8px);
			}

			.card .content h6 {
				margin: 0px;
				font-weight: 900;
				letter-spacing: 1px;
				text-transform: uppercase;
			}

			.card .content h6.title {
				opacity: 0.8;
			}

			.card .content h1 {
				margin: 0px;
				font-size: 3em;
				color: #1C7C54;
			}

			.card .more {
				padding-top: 24px;
				opacity: 0.8;
				font-weight: 500;
			}
			
			.card:nth-child(4n) .content h6,
			.card:nth-child(4n) .content h1,
			.card:nth-child(4n + 3) .content h6,
			.card:nth-child(4n + 3) .content h1 {
				color: white;
			}
		`;
	}

	render() {
		return html`
		<div class="content">
			<div class="banner">
				<span class="status">
					${lang.status.toUpperCase()}: ${lang.system_operational_no_warnings}
				</span>
				<div class="center">
					<mx-button>
						${lang.yesterday}
					</mx-button>
				</div>
				<div class="center">
					<mx-button raised>
						${lang.this_week}
					</mx-button>
				</div>
			</div>

			<div class="card reversed">
				<div class="content">
					<h6 class="title">${lang.tower_operations}</h6>
					<h1>${this.towerPower.toFixed(1)} kW</h1>
					<h6>${lang.percent_of_max(this.towerPowerPercent)}</h6>
				</div>
				<div class="footer">
					<mx-button raised>
						${lang.more_details}
					</mx-button>
				</div>
				<div class="icon tower">
					<div class="backdrop">
						${unsafeHTML(towerIcon)}
					</div>
				</div>
			</div>

			<div class="card">
				<div class="content">
					<h6 class="title">${lang.battery_percentage}</h6>
					<h1>${parseInt(this.batteryPercent)}%</h1>
					<h6>${this.batteryCharge} KwH (${lang.charging})</h6>
					<!-- <h6 class="more">${lang.more} ›</h6> -->
				</div>
				<div class="footer">
					<mx-button raised>
						${lang.more_details}
					</mx-button>
				</div>
				<div class="icon battery">
					<div class="backdrop">
						${unsafeHTML(batteryIcon)}
					</div>
				</div>
			</div>

			<div class="card">
				<div class="content">
					<h6 class="title">${lang.solar_production}</h6>
					<h1>${this.solarPower.toFixed(1)} kW</h1>
					<h6>${lang.percent_of_max(this.solarPercent)}</h6>
					<!-- <h6 class="more">${lang.more} ›</h6> -->
				</div>
				<div class="footer">
					<mx-button raised>
						${lang.more_details}
					</mx-button>
				</div>
				<div class="icon solar">
					<div class="backdrop">
						${unsafeHTML(solarIcon)}
					</div>
				</div>
			</div>

			<div class="card">
				<div class="content">
					<h6 class="title">${lang.generator_production}</h6>
					<h1>${this.generatorPower.toFixed(1)} kW</h1>
					<h6>${lang.percent_of_max(this.generatorPercent)}</h6>
				</div>
				<div class="footer">
					<mx-button raised>
						${lang.more_details}
					</mx-button>
				</div>
				<div class="icon generator">
					<div class="backdrop">
						${unsafeHTML(generatorIcon)}
					</div>
				</div>
			</div>

		</div>
		`;
	}
}

customElements.define('dg-page-dashboard', DgPageDashboard);
