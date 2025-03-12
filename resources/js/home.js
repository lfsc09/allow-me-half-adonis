document.querySelector('section[front]').addEventListener('click', () => {
  document.querySelector('section[front]').classList.add('hidden')
  document.querySelector('section[back]').classList.remove('hidden')
})

document.querySelector('section[back]').addEventListener('click', () => {
  document.querySelector('section[back]').classList.add('hidden')
  document.querySelector('section[front]').classList.remove('hidden')
})
