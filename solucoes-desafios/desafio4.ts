let apiKey: string
let requestToken:string
let username:string
let password:string
let sessionId:string
let listId = 7101979
let query:string

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button') as HTMLButtonElement;
let searchContainer = document.getElementById('search-container');

let searchInput = document.querySelector('#search') as HTMLInputElement
let senhaInput = document.getElementById('senha') as HTMLInputElement
let loginInput = document.getElementById('login') as HTMLInputElement
let apiKeyInput = document.getElementById('api-key') as HTMLInputElement

interface ISessionId{
  session_id : string
}

interface IBodyReq{
  username: string,
  password:string,
  request_token:string
}

interface IRequestToken{
  request_token: string
}

interface IResultList{
  overview:string
  original_title:string
}
interface IResult{
  results: IResultList[]
}
interface ICriarLista{
  name: string,
  description:string,
  language: string
}
interface IAdicionarNomeNaLista{
  media_id: number
}
interface Ibody{
  username?:string,
  password?:string,
  request_token?: string,
  name?:string,
  description?:string,
  language?:string,
  media_id?:number
}

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
  let query = searchInput.value;
  let listaDeFilmes = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "lista"
  for (const item of (listaDeFilmes as IResult).results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title))
    ul.appendChild(li)
  }
  searchContainer?.appendChild(ul);
})

function preencherSenha() {
  password = senhaInput.value;
  validateLoginButton();
}

function preencherLogin() {
  username =  loginInput.value;
  validateLoginButton();
}

function preencherApi() {
  apiKey = apiKeyInput.value;
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}
validateLoginButton()
class HttpClient {
  static async get(url:string, method:string, body?:Ibody|string):Promise<IResult|IRequestToken|ISessionId> {
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

async function procurarFilme(queryParam:string) {
  let query = (encodeURI(queryParam))
  console.log(query)
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    "GET"
  )
  return result
}

async function adicionarFilme(filmeId:number) {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    "GET"
  )
}

async function criarRequestToken () {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    "GET"
  )
  requestToken = (result as IRequestToken).request_token
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

async function criarSessao() {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    "GET"
  )
  sessionId = (result as ISessionId).session_id;
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
}
  
async function adicionarFilmeNaLista(filmeId:number, listaId:number) {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    "POST",
    {
      media_id: filmeId
    }
  )
}

async function pegarLista() {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    "GET"
  )
}