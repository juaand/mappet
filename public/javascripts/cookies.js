function checkCookies() {
  if (localStorage.cookies == 'true') {
    document.querySelector('.cookies').style.display = 'none'
  }
}

function acceptCookies() {
  localStorage.cookies = 'true'
  document.querySelector('.cookies').style.display = 'none'
}

$(document).ready(function () {
  checkCookies()
})