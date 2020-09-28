import { LitElement, html, css } from 'lit-element';
import auth from './../lib/auth';

class DgRoot extends LitElement {

	authState = false;

	firstUpdated() {
		auth.on('authStateChanged', (evt) => {
			this.authState = evt;
		})
	}

	static get properties() {
		return {
			authState: { type: Boolean }
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
					<dg-page-login @authStateChange=${(evt) => console.log(evt)}></dg-page-login>
				`
			})()}
		`;
	}
}

customElements.define('dg-root', DgRoot);