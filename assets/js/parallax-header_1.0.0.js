'use strict';

(() => {
  const VAR_containerImageHeight = '924px';
  const VAR_containerImageTop = '0';

  // Image
  const templateContainerImage = document.createElement('template');

  templateContainerImage.innerHTML = /* html */ `
      <style>
        .container-image { width: 100%; height: ${VAR_containerImageHeight}; top: ${VAR_containerImageTop}; overflow: hidden; position: absolute; z-index: -1 }
      </style>
      <div class="container-image">
        <div class="wrapper-image">
          <slot></slot>
        </div>
      </div>
      `;

  class ParallaxHeaderImage extends HTMLElement {
    #root = null;

    constructor() {
      super();
      this.#root = this.attachShadow({ mode: 'closed' });
      this.#root.appendChild(templateContainerImage.content.cloneNode(true));
      this.containerImage = this.#root.querySelector('.container-image');
      this.wrapperImage = this.#root.querySelector('.wrapper-image');
    }

    static get observedAttributes() {
      return ['over-flow'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'over-flow') {
        this.containerImage.style.overflow = 'unset';
        this.wrapperImage.style.overflow = 'hidden';
      }
    }
  }

  customElements.define('parallax-header-image', ParallaxHeaderImage);

  // Content
  const templateContainerContent = document.createElement('template');

  templateContainerContent.innerHTML = /* html */ `
      <style>
        .container-content { width: 100%; top: ${VAR_containerImageTop}; position: relative;}
      </style>
      <div class="container-content">
        <div class="wrapper-content">
          <slot></slot>
        </div>
      </div>
      `;

  class ParallaxHeaderContent extends HTMLElement {
    #root = null;

    constructor() {
      super();
      this.#root = this.attachShadow({ mode: 'closed' });
      this.#root.appendChild(templateContainerContent.content.cloneNode(true));
      this.wrapperContent = this.#root.querySelector('.wrapper-content');
    }
  }

  customElements.define('parallax-header-content', ParallaxHeaderContent);

  // Container
  const template = document.createElement('template');

  template.innerHTML = /* html */ `
    <style>
      .container { height: ${VAR_containerImageHeight}px; overflow: hidden;  top: ${VAR_containerImageTop}; width: 100%; }
      .content { width: 100%; height: ${VAR_containerImageHeight}; overflow: hidden; }
    </style>
    <div class="container">
      <div class="content">
        <slot></slot>
      </div>
    </div>
    `;

  class ParallaxHeader extends HTMLElement {
    #root = null;
    #container = null;
    #content = null;
    #slotContent = null;
    #multiImages = null;
    #multiContents = null;
    #containerImageHeight = VAR_containerImageHeight;
    #containerImageTop = VAR_containerImageTop;

    constructor() {
      super();
      this.#root = this.attachShadow({ mode: 'closed' });
      this.#root.appendChild(template.content.cloneNode(true));
      this.#container = this.#root.querySelector('.container');
      this.#content = this.#root.querySelector('.content');
      this.#slotContent = this.#root.querySelector('slot');
    }

    static get observedAttributes() {
      return ['height-container', 'space-top'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'height-container') {
        this.#content.style.height = newValue;
        this.#containerImageHeight = newValue;
      }

      if (name === 'space-top') {
        this.#container.style.top = newValue;
        this.#containerImageTop = newValue;
      }
    }

    connectedCallback() {
      window.onload = () => {
        this.#content.style.height = parseInt(this.#containerImageHeight) + parseInt(this.#containerImageTop) + 'px';

        const assignedNodesContent = this.#slotContent.assignedElements();
        this.#multiImages = assignedNodesContent.filter((elem) => elem.localName === 'parallax-header-image');
        this.#multiContents = assignedNodesContent.filter((elem) => elem.localName === 'parallax-header-content');

        this.#multiImages.forEach((elem) => {
          elem.containerImage.style.height = this.#containerImageHeight;
          elem.containerImage.style.top = this.#containerImageTop;
        });

        window.onscroll = () => {
          this.#multiImages.forEach((elem) => {
            this.#parallaxContent(elem.wrapperImage, Number(elem.getAttribute('y-content')), Number(elem.getAttribute('x-content')));
          });

          this.#multiContents.forEach((elem) => {
            this.#parallaxContent(elem.wrapperContent, Number(elem.getAttribute('y-content')), Number(elem.getAttribute('x-content')));
          });
        };
      };
    }

    #parallaxContent(element, yContent, xContent) {
      element.style.transform = 'translate(' + window.scrollY * xContent + 'px, ' + window.scrollY * yContent + 'px)';
    }
  }

  customElements.define('parallax-header', ParallaxHeader);
})();
