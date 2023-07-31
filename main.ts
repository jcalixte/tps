type TPSSearchParams = {
  display?: 'house-only' | 'full'
}

const params = new URL(document.location.href).searchParams

const display = params.get('display')

if (display === 'house-only') {
  document.querySelector('header')?.remove()
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
