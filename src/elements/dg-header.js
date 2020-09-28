import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import lang from './../i18n';
import profileIcon from './../res/profile.jpg';


class DgHeader extends LitElement {
	static get styles() {
		return css`
			:host {
				cursor: default !important;
				--height: 48px;
				font-size: 13px;
				color: rgba(0, 0, 0, 0.9);
			}

			.root {
				height: var(--height);
				background: white;
				display: grid;
				grid-template-columns: 1fr 100px 150px 48px 16px;
			}

			.title {
				line-height: var(--height);
				padding-left: 16px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.lang {
				font-weight: bold;
				line-height: var(--height);
				/* background: salmon; */
				text-align: center;
			}

			.logout {
				/* background: aquamarine; */
				display: grid;
				place-items: center center;
			}

			.logout mx-button {
				--color: #1C7C54;
			}

			.profile {
				display: grid;
				place-items: center center;
			}

			.profile .img {
				height: 32px;
				width: 32px;
				background: #1C7C54;
				background-image: url(${unsafeCSS(profileIcon)});
				background-position: 746px -61px;
				border-radius: 16px;
				cursor: pointer;
			}
		`;
	}

	render() {
		return html`
			<div class="root">
				<span class="title">${lang.dynamic_view_minigrid_controller}</span>
				<span class="lang">${navigator.language.toUpperCase()}</span>
				<div class="logout">
					<mx-button>
						${lang.logout}
					</mx-button>
				</div>
				<div class="profile">
					<div class="img">
					</div>
				</div>
			</div>
		`;
	}
}

customElements.define('dg-header', DgHeader);
