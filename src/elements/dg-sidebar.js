import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import homeIcon from './../res/dash home.svg';
import operationsIcon from './../res/operations.svg';
import forecastIcon from './../res/forecast.svg';
import historyIcon from './../res/history.svg';
import solarIcon from './../res/Dynamic Grid icons-grid.svg';
import storageIcon from './../res/operations.svg';
import generatorIcon from './../res/Dynamic Grid icons-genset.svg';
import logo from './../res/DG-logos-01.svg';
import lang from './../i18n';

class DgSidebar extends LitElement {

	load = Math.random() * 5;
	solar = Math.random() * 5;
	genset = Math.random() * 5;


	static get styles() {
		return css`
			.logo {
				background: #132E32;
				height: 48px;
				line-height: 48px;
				box-shadow: 0px 0px 50px rgba(0, 100, 255, 0.15);
				text-align: center;
				font-weight: bold;
				margin-bottom: 24px;
			}

			.logo svg {
				height: 30px;
				padding-top: 8px;
			}

			.item {
				height: 24px;
				vertical-align: top;
				display:grid;
				grid-template-columns: 16px 24px 16px 1fr 32px;
				grid-template-rows: 24px;
				opacity: 0.75;
				margin-bottom: 30px;
				font-weight: 100;
			}

			.item:not(.selected)::after {
				content: '›';
				color: white;
				grid-area: 1 / 5 / 2 / 6;
				font-size: 20px;
			}

			.item.selected {
				opacity: 1;
			}

			.item svg {
				height: 24px;
				width: 24px;
				grid-area: 1 / 2 / 2 / 3;
			}

			.item svg, .item svg path {
				fill: white !important;
			}

			.item.generator svg {
				transform: scale(1.7);
			}

			.item.solar svg {
				transform: scale(1.5);
			}

			.item span {
				/* padding-top: 2px; */
				line-height: calc(100% - 2px);
				grid-area: 1 / 4 / 2 / 5;
				color: white;
				font-size: 15px;
				font-weight: 100;

				display: grid;
				width: 100%;
				height: 100%;
				place-items: center left;

			}

			.status {
				margin: 16px;
				padding: 16px;
				background: #E6EDF1;
				border-radius: 5px;
			}

			h3 {
				margin: 0px;
				font-size: 19px;
				font-weight: bold;
				opacity: 0.7;
			}

			h6 {
				margin: 0px;
				margin-top: 16px;
			}

			h1 {
				color: #1C7C54;
				margin: 0px;
			}

		`;
	}

	render() {
		return html`
			<div class="logo">
				${unsafeHTML(logo)}
			</div>
			<div class="item home selected">
				${unsafeHTML(homeIcon)}
				<span>
					${lang.dashboard}
				</span>
			</div>
			<div class="item operations">
				${unsafeHTML(operationsIcon)}
				<span>
					${lang.operations}
				</span>
			</div>
			<div class="item forecast">
				${unsafeHTML(forecastIcon)}
				<span>
					${lang.forecast}
				</span>
			</div>
			<div class="item history">
				${unsafeHTML(historyIcon)}
				<span>
					${lang.history}
				</span>
			</div>
			<div class="item solar">
				${unsafeHTML(solarIcon)}
				<span>
					${lang.solar}
				</span>
			</div>
			<div class="item storage">
				${unsafeHTML(storageIcon)}
				<span>
					${lang.storage}
				</span>
			</div>
			<div class="item generator">
				${unsafeHTML(generatorIcon)}
				<span>
					${lang.generator}
				</span>
			</div>

			<div class="status">
				<h3>${lang.current_status}</h3>
				<h6>${lang.load}</h6>
				<h1>${this.load.toFixed(1)} kW</h1>
				<h6>${lang.solar_production}</h6>
				<h1>${this.solar.toFixed(1)} kW</h1>
				<h6>${lang.genset_production}</h6>
				<h1>${this.genset.toFixed(1)} kW</h1>
			</div>
		`;
	}
}

customElements.define('dg-sidebar', DgSidebar);