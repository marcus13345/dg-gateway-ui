import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import graph from './../res/generator-status.png';

class DgPageGenerator extends LitElement {
	static get styles() {
		return css`
			
			img {
				padding: 16px;
				margin-top: 24px;
			}

			.root {
				display: grid;
				place-items: center center;
			}
		`;
	}

	render() {
		return html`
			<div class="root">
				<img src="${graph}"/>
			</div>	
		`;
	}
}

customElements.define('dg-page-generator', DgPageGenerator);
