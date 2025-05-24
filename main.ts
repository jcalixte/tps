import { domToPng } from 'modern-screenshot'
import hexColorRegex from 'hex-color-regex'

const isColor = (color: string) => hexColorRegex().test(color)

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

const simpleCustomerSatisfaction = params.get('customer-satisfaction')

if (simpleCustomerSatisfaction === 'simple') {
  document.querySelector('.value-analysis-value-engineering')?.remove()
}

const size = params.get('size')

if (size === 'small') {
  const body = document.querySelector('body')
  if (body) {
    document.documentElement.style.setProperty('--min-height', '100px')
    document.documentElement.style.setProperty('--font-size', '13px')
    document.documentElement.style.setProperty('--min-font-size', '8px')
  }
}

const focusElements = params.getAll('focus')

if (focusElements.length > 0) {
  const focusables = document.querySelectorAll('.focusable')

  focusables.forEach((focusable) => {
    const elementToFocus = focusElements.some((element) =>
      focusable.classList.contains(element)
    )

    if (elementToFocus) {
      focusable.classList.add('focus')
    } else {
      focusable.classList.add('no-focus')
    }
  })
}

const textHide = params.get('text')

if (textHide === 'hide') {
  const focusables = document.querySelectorAll('.focusable')
  focusables.forEach((focusable) => focusable.classList.add('text-hide'))
}

const primaryColorParam = params.get('primary')

if (primaryColorParam && isColor(`#${primaryColorParam}`)) {
  document.documentElement.style.setProperty(
    '--primary-color',
    `#${primaryColorParam}`
  )
}

const colorParam = params.get('color')

if (colorParam && isColor(`#${colorParam}`)) {
  document.documentElement.style.setProperty('--color', `#${colorParam}`)
}

const screenshotHouseButton = document.querySelector('#screenshot-house')

if (screenshotHouseButton) {
  screenshotHouseButton.addEventListener('click', async () => {
    const house = document.querySelector('#thinking-people-system')
    if (!house) {
      return
    }

    const png = await domToPng(house)

    try {
      const response = await fetch(png)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ])
    } catch (error) {
      console.warn(error)
    }
  })
}

const useValue = params.get('use-value')

if (useValue !== null) {
  const value = document.querySelectorAll('.use-value')
  value.forEach((value) => {
    value.classList.add('display-use-value')

    if (useValue === 'simple') {
      value.classList.remove('raibow')
    } else {
      value.classList.add('raibow')
    }
  })
}
