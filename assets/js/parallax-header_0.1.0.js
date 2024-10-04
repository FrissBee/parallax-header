'use strict';

(() => {
  const template = document.createElement('template');

  template.innerHTML = /* html */ `
    <style>
      .container { height: 924px; overflow: hidden;  }
      .container-image { position: absolute; top: 0px; width: 100%; background-size: cover; z-index: -1; overflow: hidden; }
      .ph-container-content { width: 100%; height: 924px; overflow: hidden; }
    </style>
    <div class="container">
      <div class="container-image">
        <slot name="image"></slot>
      </div>
      <div class="ph-container-content">
        <slot name="content"></slot>
      </div>
    </div>
    `;

  class ParallaxHeader extends HTMLElement {
    #root = null;
    #phContainer = null;
    #containerImage = null;
    #contentContainer = null;
    #slotContent = null;
    #yImage = 0.5;
    #yContent = 0.6;
    #xContent = 0;
    #isMultiContent = false;
    #multiContents = null;

    constructor() {
      super();
      this.#root = this.attachShadow({ mode: 'closed' });
      this.#root.appendChild(template.content.cloneNode(true));
      this.#phContainer = this.#root.querySelector('.container');
      this.#containerImage = this.#root.querySelector('.container-image');
      this.#contentContainer = this.#root.querySelector('.ph-container-content');
      this.#slotContent = this.#root.querySelector('slot[name="content"]');
    }

    static get observedAttributes() {
      return ['y-image', 'y-content', 'x-content', 'height-container', 'space-top', 'multi-content'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'y-image') {
        this.#yImage = Number(newValue);
      } else if (name === 'y-content') {
        this.#yContent = Number(newValue);
      } else if (name === 'x-content') {
        this.#xContent = Number(newValue);
      } else if (name === 'height-container') {
        this.#phContainer.style.height = newValue;
      } else if (name === 'space-top') {
        this.#containerImage.style.top = newValue;
      } else if (name === 'multi-content') {
        this.#isMultiContent = true;
      }
    }

    connectedCallback() {
      window.onload = () => {
        if (this.#isMultiContent === false) {
          window.onscroll = () => {
            this.#parallaxImage(this.#containerImage, this.#yImage);
            this.#parallaxContent(this.#contentContainer, this.#yContent, this.#xContent);
          };
        } else {
          const assignedNodes = this.#slotContent.assignedNodes();
          this.#multiContents = assignedNodes[0].querySelectorAll('.parallax-header-content');

          window.onscroll = () => {
            this.#parallaxImage(this.#containerImage, this.#yImage);

            this.#multiContents.forEach((elem) => {
              this.#parallaxContent(elem, Number(elem.getAttribute('y-content')), Number(elem.getAttribute('x-content')));
            });
          };
        }
      };
    }

    #parallaxImage(element, yImage) {
      element.style.transform = 'translateY(' + window.scrollY * yImage + 'px)';
    }

    #parallaxContent(element, yContent, xContent) {
      element.style.transform = 'translate(' + window.scrollY * xContent + 'px, ' + window.scrollY * yContent + 'px)';
    }
  }

  customElements.define('parallax-header', ParallaxHeader);
})();
