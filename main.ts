const params = new URL(document.location.href).searchParams

const display = params.get('display')

const focusables = document.querySelectorAll('.focusable')
const focusList = document.querySelector('#focus-list')

if (focusList) {
  focusables.forEach((focusable, index) => {
    const a = document.createElement('a')
    a.textContent = [...focusable.classList]
      .filter((c) => c !== 'focusable')
      .join(' ')
    a.href = `?focus=${a.textContent}`
    focusList.appendChild(a)

    if (index === focusables.length - 1) {
      return
    }
    const space = document.createTextNode(', ')
    focusList.appendChild(space)
  })
}

if (display === 'house-only') {
  document.querySelectorAll('.hud')?.forEach((hud) => hud.remove())
}

const size = params.get('size')

if (size === 'small') {
  const body = document.querySelector('body')
  if (body) {
    body.style.fontSize = '15px'
  }
}

const focusElements = params.getAll('focus')

if (focusElements.length > 0) {
  const focusables = document.querySelectorAll('.focusable')

  focusables.forEach((focusable) => {
    const elementToFocus = focusElements.some((element) =>
      focusable.classList.contains(element)
    )

    if (!elementToFocus) {
      focusable.classList.add('no-focus')
    }
  })
}

const textHide = params.get('text')

if (textHide === 'hide') {
  const focusables = document.querySelectorAll('.focusable')
  focusables.forEach((focusable) => focusable.classList.add('text-hide'))
}

const scrollParam = params.get('scroll')

if (scrollParam === 'end') {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

const primaryColorParam = params.get('primary')

if (primaryColorParam) {
  document.documentElement.style.setProperty(
    '--primary-color',
    `#${primaryColorParam}`
  )
}

const colorParam = params.get('color')

if (colorParam) {
  document.documentElement.style.setProperty('--color', `#${colorParam}`)
}
