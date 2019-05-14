// Import the LitElement base class and html helper function
import { LitElement, html, css } from 'lit-element';
import 'wired-card';
import 'wired-slider';
import 'wired-progress';
import 'wired-toggle';
import 'wired-button';

class ViewB extends LitElement {

  static get styles() {
    return css`
    :host {
      --wired-toggle-on-color: yellow;
    }`;
  }

  static get properties() {
    return {
      value: { type: String },
      sliderDisabled: {
        type: Boolean,
        attribute: 'slider-disabled'
      },
      toggleDisabled: {
        type: Boolean,
        attribute: 'toggle-disabled'
      },
    }
  }

  render(){
    return html`
      <!-- template content -->
      <wired-card elevation="4">
        <h4>Micro Frontend 2</h4>
        <section>
          <wired-progress percentage .value="${this.value}"></wired-progress>
        </section>
        <section>
          <wired-slider ?disabled="${this.sliderDisabled}" @change="${(e) => this.value = e.detail.value}"></wired-slider>
          <wired-toggle ?disabled="${this.toggleDisabled}" @change="${(e) => PubSub.publish('favorite-channel', e.detail.checked)}"></wired-toggle>
        </section>
      </wired-card>
    `;
  }

  constructor() {
    super();
    this.value = 0;
    this.sliderDisabled = false;
    this.toggleDisabled = false;
  }

  connectedCallback() {
    super.connectedCallback();
    //Subscribe to channel
    PubSub.subscribe('value-channel').on((value) => {
      this.value = value ;
    });

    //Subscribe to channel
    PubSub.subscribe('broadcast-channel').on((value) => {
      this.sliderDisabled = value;
      this.toggleDisabled = value;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    //Subscribe to channel
    PubSub.unsubscribe('value-channel');
    PubSub.unsubscribe('broadcast-channel');
  }

}
// Register the new element with the browser.
customElements.define('view-b', ViewB);
