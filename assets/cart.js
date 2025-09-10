function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', (event) => {
      event.preventDefault();
      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
      cartItems.updateQuantity(this.dataset.index, 0);
    });
  }
}
customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends HTMLElement {
  constructor() {
    super();
    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
      .reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);

    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', this.debouncedOnChange.bind(this));

    const gift_form_minicart = document.getElementById("gift_form_minicart");
    if (gift_form_minicart) {
      gift_form_minicart.addEventListener("change", (event) => {
        if (event.currentTarget.checked) {
          this.addGiftwrapCartClick(gift_form_minicart);
        } else {
          this.updateQuantity(event.currentTarget.dataset.index, 0);
        }
      });
    }

    document.querySelectorAll('.bls__js-addtocart-page').forEach(
      (upsell) => upsell.addEventListener('click', this.addProductUpSellEvent.bind(this))
    );
  }

  onChange(event) {
    this.updateQuantity(event.target.dataset.index, event.target.dataset.key, event.target.value, document.activeElement.getAttribute('name'));
  }

  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      }
    ];
  }

  updateQuantity(line, key, quantity, name) {
    quantity = quantity ? quantity : 0;
    this.enableLoading(line);

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => response.text())
      .then((state) => {
        const parsedState = JSON.parse(state);

        if (parsedState.item_count != undefined) {
          document.querySelectorAll(".cart-count").forEach(el => {
            el.innerHTML = el.classList.contains('cart-count-drawer')
              ? `(${parsedState.item_count})`
              : parsedState.item_count;
          });

          if (document.querySelector('header-total-price')) {
            document.querySelector('header-total-price').updateTotal(parsedState);
          }
        }

        const html = new DOMParser().parseFromString(parsedState.sections[document.getElementById('main-cart-items').dataset.id], 'text/html');

        if (parsedState.item_count == 0) {
          this.getSectionsToRender().forEach((section => {
            const elementToReplace = document.querySelector('.cart-wrapper');
            elementToReplace.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.section], '.cart-wrapper');
          }));
        } else {
          this.getSectionsToRender().forEach((section => {
            const elementToReplace =
              document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
            elementToReplace.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
          }));

          const totals = this.getSectionInnerHTML(parsedState.sections[document.getElementById('main-cart-items').dataset.id], '.cart__footer .totals');
          const totals_content = document.querySelector('.cart__footer .totals');
          if (totals && totals_content) totals_content.innerHTML = totals;

          const shareProgressHTML = new DOMParser().parseFromString(parsedState.sections[document.getElementById('main-cart-items').dataset.id], 'text/html').querySelector('#share-progress-bar');
          const shareProgress = document.getElementById('share-progress-bar');
          if (shareProgress && shareProgressHTML) {
            shareProgress.innerHTML = shareProgressHTML.innerHTML;
          }
        }

        this.disableLoading();
      })
      .catch(() => {
        this.disableLoading();
      })
      .finally(() => {
        BlsLazyloadImg.init();
      });
  }

  addProductUpSellEvent(event) {
    event.preventDefault();
    const target = event.currentTarget;
    const variant_id = target.closest('.bls__product-addtocart-js').getAttribute('data-product-variant-id');
    const body = JSON.stringify({
      id: Number(variant_id),
      quantity: 1,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_add_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => response.text())
      .then((state) => {
        const parsedState = JSON.parse(state);
        const html = new DOMParser().parseFromString(parsedState.sections[document.getElementById('main-cart-items').dataset.id], 'text/html');

        this.getSectionsToRender().forEach((section => {
          const elementToReplace = document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        }));

        const totals = this.getSectionInnerHTML(parsedState.sections[document.getElementById('main-cart-items').dataset.id], '.cart__footer .totals');
        const totals_content = document.querySelector('.cart__footer .totals');
        if (totals && totals_content) totals_content.innerHTML = totals;

        const shareProgressHTML = new DOMParser().parseFromString(parsedState.sections[document.getElementById('main-cart-items').dataset.id], 'text/html').querySelector('#share-progress-bar');
        const shareProgress = document.getElementById('share-progress-bar');
        if (shareProgress && shareProgressHTML) {
          shareProgress.innerHTML = shareProgressHTML.innerHTML;
        }

        BlsLazyloadImg.init();
      })
      .catch(() => {
        this.disableLoading();
      });
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    document.body.classList.add('start', 'loading');
    document.activeElement.blur();
  }

  disableLoading() {
    document.body.classList.add('finish');
    setTimeout(() => {
      document.body.classList.remove('start', 'loading', 'finish');
    }, 500);
  }
}

customElements.define('cart-items', CartItems);
