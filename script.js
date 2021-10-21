const toggler = document.querySelector('.toggler')
const navbar = document.querySelector('.navbar')
const cards = document.querySelectorAll('.item_card')
const search_btn = document.querySelector('.search_button')
const search_field = document.querySelector('.search_field')
const slide_prev = document.querySelector('.btn_slider_control.prev')
const slide_next = document.querySelector('.btn_slider_control.next')
const slides = document.querySelectorAll('.slide')
const ddown = document.querySelector('.drop-down .selected')
const collapsible = document.querySelector('.drop-down .options')
let sid = 0

function toggle(el, className = 'active') {
  el.style.height = el.scrollHeight + 'px'
  el.classList.toggle(className)
  if (el.classList.contains(className))
    el.addEventListener('transitionend', () => {
      el.style.removeProperty('height')
    })
  else window.setTimeout(() => el.style.removeProperty('height'))
}

function handleTilt(e) {
  this.style.removeProperty('transition')
  let mouseX = e.pageX - this.offsetLeft
  let mouseY = e.pageY - this.offsetTop
  let offsetX = mouseX - this.offsetWidth / 2
  let offsetY = mouseY - this.offsetHeight / 2
  let decimalX = (offsetX / (this.offsetWidth / 2)) * 5
  let decimalY = (offsetY / (this.offsetHeight / 2)) * 5
  this.style.transform = `rotateX(${-decimalY}deg) rotateY(${decimalX}deg)`
}

function reset() {
  this.style.transition = 'transform .3s ease'
  this.style.transform = `rotateX(0deg) rotateY(0deg)`
}

window.addEventListener('load', () => {
  slides[sid].style.opacity = 1
  if (sid === 0) slide_prev.classList.add('disabled')
  else if (sid === slides.length - 1) slide_next.classList.add('disabled')
})

function slide(prev, next) {
  slides.forEach((slide) => slide.style.removeProperty('opacity'))
  prev && sid--
  next && sid++
  if (sid >= slides.length) sid = slides.length - 1
  if (sid <= 0) sid = 0

  if (sid === 0) slide_prev.classList.add('disabled')
  else if (sid === slides.length - 1) slide_next.classList.add('disabled')
  else {
    slide_next.classList.remove('disabled')
    slide_prev.classList.remove('disabled')
  }

  slides[sid].style.opacity = 1
}

cards.forEach((card) => {
  card.addEventListener('mousemove', handleTilt)
  card.addEventListener('mouseleave', reset)
})

toggler.addEventListener('click', () => {
  toggler.classList.toggle('toggled')
  toggle(navbar)
})
search_btn.addEventListener('click', () =>
  search_field.classList.toggle('active'),
)
ddown.addEventListener('click', () => toggle(collapsible, 'collapse'))

slide_prev.addEventListener('click', () => slide(true, false))
slide_next.addEventListener('click', () => slide(false, true))
