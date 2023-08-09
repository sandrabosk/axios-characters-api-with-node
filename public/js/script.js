document.addEventListener(
  'DOMContentLoaded',
  () => {
    console.log('axios-characters-api JS imported successfully!')
  },
  false
)

const goose = document.getElementById('goose')

document.addEventListener('mousemove', event => {
  const mouseX = event.clientX
  const mouseY = event.clientY

  const offsetX = mouseX - goose.offsetWidth / 2
  const offsetY = mouseY - goose.offsetHeight / 2

  const angle = Math.atan2(offsetY, offsetX)
  const degrees = angle * (180 / Math.PI)

  const horizontalOffsetX = mouseX - goose.getBoundingClientRect().left - goose.offsetWidth / 2
  const scaleX = horizontalOffsetX > 0 ? 1 : -1

  goose.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${degrees}deg) scaleX(${scaleX})`
})
