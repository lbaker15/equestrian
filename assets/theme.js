


window.addEventListener('DOMContentLoaded', () => {
  let menu = document.querySelector('.header__menu');
  let list = document.querySelector('.header__menu-list');

  //BURGER MENU
  let state = false;
  if (menu) {
    menu.addEventListener('click', () => {
      if (!state) {
        list.style.display = 'block'
        setTimeout(() => list.style.transform = 'translateX(0vw)', 1)
        document.body.style.overflowY = 'hidden'
        menu.classList.add('js-drawer-open');
        state = true;
      } else {
        setTimeout(() => list.style.display = 'none', 500)
        list.style.transform = 'translateX(-100vw)'
        document.body.style.overflowY = 'scroll'
        menu.classList.remove('js-drawer-open');
        state = false;
      }
    })
  }

  let prodSize = document.getElementById('prod-size');
  let prodSizeH2 = document.querySelector('#prod-size h2');
  let prodSizeH = document.getElementById('prod-size-hide');
  let selectedV = document.getElementById('selected_variant');
  let prodCart = document.getElementById('prod-cart');
  let prodDets = document.getElementById('prod-dets');
  let garCare = document.getElementById('gar-care');
  let shipping = document.getElementById('shipping');
  let prodDetsSection = document.getElementById('prod-dets-section');
  let garCareSection = document.getElementById('gar-care-section');
  let shippingSection = document.getElementById('shipping-section');
  let sizeGuide = document.getElementById('size-guide');
  let prodSizeClicked = false
  if (prodSize) {
    prodSize.addEventListener('click', (e) => {
      if (e.target === prodSizeH2) {
        let tl = gsap.timeline({ paused: true })
        if (!Array.from(prodSize.classList).find(item => item === 'no-stock')) {
          tl.fromTo(prodSize, { borderLeft: '2px solid black', borderRight: '2px solid black' }, { borderLeft: '0', borderRight: '0', duration: 0.3, ease: 'easeOut' })
        } else {
          tl.fromTo(prodSize, { borderLeft: '1px solid grey', borderRight: '1px solid grey' }, { borderLeft: '0', borderRight: '0', duration: 0.3, ease: 'easeOut' })
        }
        tl.fromTo(prodSizeH, { display: 'none', opacity: 0 }, { opacity: 1, display: 'block', duration: 0.3, ease: 'easeOut' })
        if (!prodSizeClicked) {
          tl.restart(0)
          prodSizeClicked = true;
        } else {
          tl.reverse()
          prodSizeClicked = false;
        }
      } else if (e.target.id.includes('variant_select')) {
        let inventory = e.target.dataset.value;
        let id = String(e.target.id).split('variant_select')[0]
        selectedV.setAttribute('value', String(id));
        selectedV.setAttribute('data-value', String(inventory));
      }
    })
  }

  if (prodCart) {
    prodCart.addEventListener('click', () => {
      let inventory = selectedV.dataset.value;
      //Check if inventory is enough before request
      let id = 42959644623077;
      let quantity = 1;
      let data = { id, quantity }
      fetch('/cart/add.js', {
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'xmlhttprequest'
        },
        method: 'POST'
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        /* we have JSON */
        if (json) {
          let add = document.getElementById('add-c')
          let added = document.getElementById('added-c')
          console.log(added)
          add.style.display = 'none';
          added.style.display = 'flex';
        }
      }).catch(function (err) {
        console.error(err)
      });
    })
  }

  let sizePopState = false;
  let popSizeClose = document.getElementById('pop-size-close');
  let popOverlay = document.querySelector('.size-guide-pop-overlay ');
  let tl2 = gsap.timeline({ paused: true })
  tl2.fromTo(popOverlay, { display: 'none', opacity: 0 }, { opacity: 1, display: 'flex', duration: 0.02 })
  tl2.fromTo('.size-guide-pop', { display: 'none', opacity: 0 }, { opacity: 1, display: 'flex', duration: 0.2 })
  if (sizeGuide) {
    sizeGuide.addEventListener('click', () => {
      if (!sizePopState) {
        tl2.restart(0)
        sizePopState = true;
      } else if (sizePopState) {
        tl2.reverse(0)
        sizePopState = false;
      }
    })
  }
  if (popSizeClose) {
    popSizeClose.addEventListener('click', () => {
      tl2.reverse(0)
      sizePopState = false;
    })
  }

  let arr = [prodDets, garCare, shipping];
  let arrSections = [prodDetsSection, garCareSection, shippingSection]
  if (arr.length > 0) {
    arr.map((item, i) => {
      if (item) {
        item.addEventListener('click', () => {
          gsap.to(window, { duration: 0.5, scrollTo: arrSections[i] })
        })
      }
    })
  }

  let prodImgCarousel = Array.from(document.querySelectorAll('.product__hero-c-img'));
  let prodHeroImg = document.querySelector('.product__hero-img')
  let prodHeroImgOverlay = document.querySelector('.product__hero-img-overlay')
  let prodHeroImgOut = document.querySelector('.product__hero-img-overlay-img img')
  let scroller = document.querySelector('.product__hero-scroller-in')
  let pl = document.getElementById('prod-left');
  let pr = document.getElementById('prod-right');
  let carouselL = document.querySelector('.product-hero__carousel-l')
  let carouselR = document.querySelector('.product-hero__carousel-r')
  let tlOverlay = gsap.timeline({ paused: true })
  tlOverlay.fromTo(prodHeroImgOverlay, { display: 'none' }, { display: 'flex' })
  tlOverlay.fromTo(prodHeroImgOverlay, { opacity: 0 }, { opacity: 1, duration: 0.3 })
  tlOverlay.fromTo(document.body, { overflowY: 'scroll' }, { overflowY: 'hidden' }, '<')
  let prodImgOverlay = false;
  let count = 1;

  gsap.set('.product__hero-carousel-inner', { width: (prodImgCarousel.length * (83)) - 46 })

  if (prodImgCarousel.length) {
    prodImgCarousel.map((item, i) => {
      item.addEventListener('click', (e) => {
        count = i + 1;
        let img = (e.target.querySelector('div').dataset.value);
        prodHeroImg.style.backgroundImage = `url('${img}')`
        prodHeroImgOut.src = img;
        let len = prodImgCarousel.length;
        let gap = 100 / len;
        let val = (i === len - 1) ? ((i + 1) * gap) + 20 : (i + 1) * gap;
        gsap.to(scroller, { width: val + '%' })
      })
    })
  }
  const minusCount = () => {
    count -= 1;
    if (count === 0) {
      count = prodImgCarousel.length;
    }
  }
  const addCount = () => {
    count += 1;
    if (count === prodImgCarousel.length + 1) {
      count = 1;
    }
  }
  const setImageCarousel = (boolean) => {
    let img = (prodImgCarousel[count - 1]) ? prodImgCarousel[count - 1].querySelector('div').dataset.value : '';
    prodHeroImgOut.src = img;
    prodHeroImg.style.backgroundImage = `url('${img}')`;
  }
  const scrollerFunc = () => {
    let len = prodImgCarousel.length;
    let gap = 100 / len;
    let val = (count === len) ? ((count) * gap) + 20 : (count) * gap
    gsap.to(scroller, { width: val + '%' })
  }
  if (carouselL) {
    carouselL.addEventListener('click', (e) => {
      minusCount()
      setImageCarousel(true)
      scrollerFunc()
    })
  }
  if (carouselR) {
    carouselR.addEventListener('click', (e) => {
      addCount()
      setImageCarousel(true)
      scrollerFunc()
    })
  }
  if (prodHeroImg) {
    prodHeroImg.addEventListener('click', () => {
      if (!prodImgOverlay) {
        tlOverlay.restart(0)
        prodImgOverlay = true;
      } else {
        tlOverlay.reverse(0)
        prodImgOverlay = false;
      }
    })
  }
  if (prodHeroImgOut) {
    prodHeroImgOut.addEventListener('click', () => {
      tlOverlay.reverse()
      prodImgOverlay = false;
    })
  }
  if (pl) {
    pl.addEventListener('click', () => {
      minusCount()
      setImageCarousel(false)
      scrollerFunc()
    })
  }
  if (pr) {
    pr.addEventListener('click', () => {
      addCount()
      setImageCarousel(false)
      scrollerFunc()
    })
  }

  gsap.registerPlugin(ScrollTrigger);
  let colImgS = Array.from(document.querySelectorAll('.images'));
  colImgS.map(item => {
    if (item) {
      let images = Array.from(item.querySelectorAll('.collection__img-s'));
      images.map((image, index) => {
        if (image) {
          let num = 50 / (images.length); // 5 10 4 
          let val = 0 + ((index) * num);
          //5 = 50
          gsap.fromTo(image, { opacity: 0 }, {
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: `100% ${val}%`,
              end: '100% 0%',
              markers: { startColor: 'blue' },
              toggleActions: 'restart none none reverse'
            }
          })
        }
      })
    }
  })


})