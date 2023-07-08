type TPSSearchParams = {
  display?: "pure" | "full"
}

const params = new URL(document.location.href).searchParams

const display = params.get("display")

if (display === "pure") {
  document.querySelector("header")?.remove()
}
