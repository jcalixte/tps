type TPSSearchParams = {
  display?: "pure" | "full"
}

const params = new URL(document.location.href).searchParams

const display = params.get("display")

if (display === "pure") {
  document.querySelector("header")?.remove()
}

const size = params.get("size")

if (size === "small") {
  const body = document.querySelector("body")
  if (body) {
    body.style.fontSize = "15px"
  }
}

const focusElements = params.getAll("focus")

if (focusElements.length > 0) {
  const focusables = document.querySelectorAll(".focusable")

  focusables.forEach((focusable) => {
    const elementToFocus = focusElements.some((element) =>
      focusable.classList.contains(element)
    )

    if (!elementToFocus) {
      focusable.classList.add("no-focus")
    }
  })
}

const textHide = params.get("text")

if (textHide === "hide") {
  const focusables = document.querySelectorAll(".focusable")
  focusables.forEach((focusable) => focusable.classList.add("text-hide"))
}
