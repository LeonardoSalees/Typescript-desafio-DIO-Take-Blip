let spanLoggin = document.getElementById('span-login')
let chave
fetch(
  'https://api.themoviedb.org/3/authentication/token/new?api_key=cd0adc1a14e898e81cfe7b02d1c66f50'
)
  .then(response => {
    return response.json()
  })
  .then(data => {})

async function requestGet(url) {
  let response = await fetch(url)
  let userData = await response.json()
  console.log(userData.request_token)
}
requestGet(
  'https://api.themoviedb.org/3/authentication/token/new?api_key=cd0adc1a14e898e81cfe7b02d1c66f50'
)
