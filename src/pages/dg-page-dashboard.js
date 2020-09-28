import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import lang from './../i18n';
import towerIcon from './../res/tower.svg';
import solarIcon from './../res/Dynamic Grid icons-grid.svg';
import generatorIcon from './../res/Dynamic Grid icons-genset.svg';
import batteryIcon from './../res/battery-casing-redux.svg';

class DgPageDashboard extends LitElement {

	towerPower = Math.random() * 5;
	towerPowerMax = (Math.random() * 5) + this.towerPower;
	get towerPowerPercent () {
		return this.towerPower / this.towerPowerMax * 100;
	}

	batteryCharge = Math.random() * 5;
	batteryMax = (Math.random() * 5) + this.batteryCharge;
	get batteryPercent () {
		return this.batteryCharge / this.batteryMax * 100;
	}

	static get styles() {
		return css`

			:host > .content {
				display: grid;
				grid-template-columns: 5fr 1fr 5fr;
				grid-gap: 24px;
				padding: 24px;
				max-width: 1024px;
				margin: 0px auto;
			}

			.card {
				--icon-size: 100px;
				background: white;
				width: 100%;
				border-radius: 15px;
				grid-column-end: span 2;
				box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2), 0px 3px 5px rgba(0, 0, 0, 0.2);
				display: grid;
				grid-template-columns: 1fr var(--icon-size);
				grid-template-rows: 1fr min-content;
				grid-template-areas:
					"content icon"
					"footer icon";
				grid-gap: 24px;
				padding: 0px 24px;
				box-sizing: border-box;
			}

			.card > .content {
				grid-area: content;
			}

			.card > .icon {
				/* background: salmon; */
				/* overflow: hidden; */
				grid-area: icon;
				padding-top: 24px;
			}

			.card > .footer {
				grid-area: footer;
				display: grid;
				place-items: center center;
				padding-bottom: 24px;
			}

			.card.reversed {
				grid-template-columns: var(--icon-size) 1fr;
				grid-template-areas:
					"icon content"
					"icon footer";
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
				transform-origin: 48% 20%;
			}

			.card .content {
				padding-top: 32px;
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
					${lang.status.toUpperCase()}: ${lang.everything_is_functioning_well}
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
					<h6>${lang.percent_of_max(this.towerPowerPercent)}</h6>
					<h6 class="more">${lang.more} ›</h6>
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
					<h1>${this.towerPower.toFixed(1)} kW</h1>
					<h6>${lang.percent_of_max(this.towerPowerPercent)}</h6>
					<h6 class="more">${lang.more} ›</h6>
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
					<h1>${this.towerPower.toFixed(1)} kW</h1>
					<h6>${lang.percent_of_max(this.towerPowerPercent)}</h6>
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
