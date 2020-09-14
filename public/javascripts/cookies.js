function checkCookies() {
  if (localStorage.cookies === 'accepted') {
    document.querySelector('.cookies').style.display = 'none'
  } else {
    document.querySelector('.cookies').style.display = 'block'
  } 
}

function acceptCookies() {
  localStorage.setItem('cookies', 'accepted')
  document.querySelector('.cookies').style.display = 'none'
}
