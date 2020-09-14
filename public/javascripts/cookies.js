console.log(sessionStorage.length)
function checkCookies() {
  if (sessionStorage.cookies === 'accepted') {
    document.querySelector('.cookies').style.display = 'none'
  }
}

function acceptCookies() {
  sessionStorage.setItem('cookies', 'accepted')
  document.querySelector('.cookies').style.display = 'none'
}
