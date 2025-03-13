const flip = () => {
  const divEl = document.querySelector('div[holder]')
  if (divEl.hasAttribute('backword')) {
    divEl.removeAttribute('backword')
    divEl.classList.remove('rotate-y-180')
  } else {
    divEl.setAttribute('backword', '')
    divEl.classList.add('rotate-y-180')
  }
}

document.querySelector('div[holder]').addEventListener('click', flip)
