import { LitElement, html, css } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html'

class MxButton extends LitElement {
	static get styles() {
		return css`
			:host {
				--height: 32px;
				--outline: 2px;
				--color: royalblue;
			}

			.button {
				display: inline-block;
				box-sizing: border-box;
				border: var(--outline) solid var(--color);
				border-radius: calc(var(--height) / 2);
				padding: 0px var(--height);
				text-align: center;
				height: var(--height);
				line-height: calc(var(--height) - calc(var(--outline) * 2));
				cursor: pointer;
				color: rgba(0, 0, 0, 0.9);
			}

			.button[raised] {
				background: var(--color);
				color: rgba(255, 255, 255, 0.9);
			}
		`;
	}

	static get properties() {
		return {
			raised: { type: Boolean }
		}
	}

	render() {
		return html`
			<div class="button" ?raised="${this.raised}" part="button">
				<slot></slot>
			</div>
		`;
	}
}

customElements.define('mx-button', MxButton);
