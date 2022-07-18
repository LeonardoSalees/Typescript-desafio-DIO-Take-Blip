let apiKey:string
let requestToken:string
let username:string
let password:string
let sessionId:number
let listId = 7101979
let query:string

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button') as HTMLButtonElement;
let searchContainer = document.getElementById('search-container');

let searchInput = document.getElementById('search') as HTMLInputElement
let senhaInput = document.getElementById('senha') as HTMLInputElement
let loginInput = document.getElementById('login') as HTMLInputElement
let apiKeyInput = document.getElementById('api-key') as HTMLInputElement

loginButton?.addEventListener('click', async () => {
  await criarRequestToken();
  await logar();
  await criarSessao();
})

searchButton?.addEventListener('click', async () => {
  let lista = document.getElementById("lista");
  if (lista) {
    lista.outerHTML = "";
  }
  if(searchInput){
    query = searchInput.value;
  }  
  


  let listaDeFilmes = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "lista"
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title))
    ul.appendChild(li)
  }
  console.log(listaDeFilmes);
  searchContainer?.appendChild(ul);
})

function preencherSenha() {
  if(senhaInput){
    username = senhaInput.value;
  }
  validateLoginButton();
}

function preencherLogin() {
  if(loginInput){
    username = loginInput.value;
  }
  validateLoginButton();
}

function preencherApi() {
  if(apiKeyInput){
    apiKey = apiKeyInput.value;
  }
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}
interface IBodyReq{
  username: string,
  password:string,
  request_token:string
}

class HttpClient {
  static async get(url:string, method:string, body?: IBodyReq|ICriarLista|IAdicionarNomeNaLista|string):Promise<IRequestToken|ISessionId|number|string> {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}
let results: ILista
async function procurarFilme(query:string) {
  query = encodeURI(query)
  console.log(query)
  await HttpClient.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    "GET"
  ).then((data) =>{
    return data
  })

}

async function adicionarFilme(filmeId:number) {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    "GET"
  )
  console.log(result);
}

interface IRequestToken{
  request_token: string
}

async function criarRequestToken () {
  await HttpClient.get(
     `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
     "GET"
  ).then(data => {
    return data
  })
  
}

async function logar() {
  await HttpClient.get(
    `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    "POST",
    {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  )
}

interface ISessionId{
  session_id : string
}
async function criarSessao() {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    "GET"
    )
    sessionId = result.session_id
    return sessionId
  
}
interface ICriarLista{
  name: string,
  description:string,
  language: string
}
async function criarLista(nomeDaLista:string, descricao:string) {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    "POST",
    {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  )
  console.log(result);
}
interface IAdicionarNomeNaLista{
  media_id: number
}
async function adicionarFilmeNaLista(filmeId: number, listaId:number) {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    "POST",
    {
      media_id: filmeId
    }
  )
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    "GET"
  )
  console.log(result);
}

