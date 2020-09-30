import { LitElement, html, css } from 'lit-element';
import auth from './../lib/auth';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import dgLogo from './../res/DG-logos-01.svg';
import { LOGIN, DASHBOARD, RESET, SIGNUP } from './../lib/pages';


class DgRoot extends LitElement {

	authState = false;
	page = LOGIN

	firstUpdated() {
		auth.on('authStateChanged', (evt) => {
			this.authState = evt;
		})
	}

	static get properties() {
		return {
			authState: { type: Boolean },
			page: { type: String }
		}
	}

	static get styles() {
		return css`
			mx-sidebar::part(sidebar) {
				background: #122E33;
				width: 225px;
			}

			mx-sidebar::part(content) {
				background: #E6EDF1;
			}

			
			.root {
				display: grid;
				grid-template-rows: 48px 1fr;
				height: 100vh;
			}

			.header {
				display: grid;
				grid-template-columns: 250px 1fr;
			}

			.content {
				display: grid;
				place-items: center center;
				background: #E6EDF1;
			}

			.logo {
				display: grid;
				place-items: center center;
			}

			.logo svg {
				height: 30px;
			}
		`;
	}

	render() {
		return html`
			${(() => {
				if(this.authState) return html`
					<mx-sidebar>
						<div slot="sidebar">
							<dg-sidebar></dg-sidebar>
						</div>
						<div slot="content">
							<dg-header></dg-header>
							<dg-page-dashboard>

							</dg-page-dashboard>
						</div>
					</mx-sidebar>
				`;
				else return html`
					
					<div class="root">
						<div class="header">
							<div class="logo">
								${unsafeHTML(dgLogo)}
							</div>
							<dg-header></dg-header>
						</div>
						<div class="content">
							${(() => {
								switch (this.page) {
									case LOGIN: {
										return html`
											<dg-page-login
											@signup=${(evt) => this.page = SIGNUP}
											@forgotPassword=${(evt) => this.page = RESET}
											></dg-page-login>
										`;
									}
									case RESET: {
										return html`
											<dg-page-forgot-password
											@signup=${(evt) => this.page = SIGNUP}
											@cancel=${(evt) => this.page = LOGIN}
											></dg-page-forgot-password>
										`;
									}
									case SIGNUP: {
										return html`
											<dg-page-signup
											@signup=${(evt) => this.page = SIGNUP}
											@cancel=${(evt) => this.page = LOGIN}
											></dg-page-signup>
										`;
									}
								}
							})()}
						</div>
					</div>

				`
			})()}
		`;
	}
}

customElements.define('dg-root', DgRoot);