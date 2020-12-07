import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import lang from './../i18n';
import profileIcon from './../res/profile.jpg';
import auth from './../lib/auth';


class DgHeader extends LitElement {

	authState = false;

	firstUpdated() {
		auth.on('authStateChanged', authState => {
			this.authState = authState;
		})
	}

	static get properties() {
		return {
			authState: { type: Boolean },
			status: { type: String }
		}
	}

	static get styles() {
		return css`
			:host {
				cursor: default !important;
				--height: 48px;
				font-size: 13px;
				color: rgba(0, 0, 0, 0.9);
			}

			.root {
				height: var(--height * 2);
				display: grid;
				grid-template-columns: 1fr 100px min-content 48px 16px;
				grid-template-rows: var(--height) var(--height);
			}

			.title {
				line-height: var(--height);
				background: white;
				padding-left: 16px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.lang {
				background: white;
				font-weight: bold;
				line-height: var(--height);
				/* background: salmon; */
				text-align: center;
			}

			.logout {
				background: white;
				/* background: aquamarine; */
				display: grid;
				place-items: center center;
			}

			.logout mx-button {
				--color: #1C7C54;
			}

			.profile {
				background: white;
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

			.status {
				grid-column: 1 / 5;
				background: #D2E1E1;
				line-height: var(--height);
				padding-left: 16px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 16px;
			}
		`;
	}

	render() {
		return html`
			<div class="root">
				<span class="title">${lang.dynamic_view_minigrid_controller}</span>
				<span class="lang">${navigator.language.toUpperCase()}</span>
				<div class="logout">
					${(() => {
						if(this.authState) return html`
							<mx-button @click=${() => auth.logout()}>
								${lang.logout}
							</mx-button>
						`;
						else return html`
							<mx-button>
								${lang.create_account}
							</mx-button>
						`;
					})()}
				</div>
				<div class="profile">
					${(() => {
						if(this.authState) return html`
							<div class="img">
							</div>
						`;
					})()}
				</div>
				<div class="status">
					${this.status}
				</div>
			</div>
		`;
	}
}

customElements.define('dg-header', DgHeader);
