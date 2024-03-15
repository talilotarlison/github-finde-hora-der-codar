const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // faça a validação ou processamento adicional aqui
});

// get dados buscar usuario =============================================
var btn = document.getElementById("btn");
var buscar = document.getElementById("buscar");

// Dados da Api github ====================================
var nome = document.querySelector(".nome");
var twitter = document.querySelector(".twitter");
var bio = document.querySelector(".bio");
var seguidores = document.querySelector(".seguidores");
var seguindo = document.querySelector(".seguindo");
var localizacao = document.querySelector(".localizacao");
var site = document.querySelector(".site");
var numProjetos = document.querySelector(".numProjetos");
var foto = document.querySelector(".fotoPerfil");
var projetoFavoritos = document.querySelector(".favProjetos");


// mostrar resultados e erros da api =============================
var exibir = document.querySelector("#userExibe");
var erro = document.querySelector(".erro");
var spinner = document.querySelector("#spinner");

// chamada da funcao para buscar api =============================
btn.addEventListener("click", () => {
  console.log("clicou");
  ocultaTela();
  var nomeUsuario = buscar.value;
  if (buscar.value !== "") {
    erro.innerHTML = "";
    chamarApiGithub(nomeUsuario);
    limparCampo();
  } else {
    erro.innerHTML = '<p class="erro">Campo não pode ser vazio!!</p>';
  }
});

function limparCampo() {
  buscar.value = "";
}

function exibeSpinner() {
  spinner.classList.add("loading");
}

function removeSpinner() {
  spinner.classList.remove("loading");
}
// função que chama api do github====================================
async function chamarApiGithub(nomeUsuario) {
  var buscaUsuario = nomeUsuario;
  const res = await fetch(`https://api.github.com/users/${buscaUsuario}`);
  const github = await res.json();
  if ((status = 200)) {
    if (github.message === "Not Found") {
      exibeSpinner();
      console.log(github.message);
      setTimeout(() => {
        removeSpinner();
        erro.innerHTML = `<p class="erro">Usuario <b>${nomeUsuario}</b> não encontrado!!</p>`;
      }, "1000");
    } else {
      var dodosUsuario = {
        nome: github.name,
        twitter: github.twitter_username,
        bio: github.bio,
        seguidores: github.following,
        seguindo: github.followers,
        localizacao: github.location,
        site: github.blog,
        numProjetos: github.public_repos,
        foto: github.avatar_url,
        github:nomeUsuario
      };
      exibeSpinner();
      console.log(github);
      setTimeout(() => {
        console.log("Carregado os dados");
        removeSpinner();
        exibirDados(dodosUsuario);
      }, "1000");
    }
  } else {
    erro.innerHTML = '<p class="erro">Erro de conexão, usuario não encontrado!!</p>'; 
  }
}

function exibirDados(usuario) {
  exibirTela();
  nome.innerText = usuario.nome ?? 'Sem nome';
  twitter.innerText = `@${usuario.twitter ?? 'Sem Twitter'}`;
  bio.innerText = usuario.bio ?? 'Sem Informações';
  seguidores.innerText = `${usuario.seguidores} Seguidores`;
  seguindo.innerText = `${usuario.seguindo} Seguindo`;
  localizacao.innerHTML = `<span class="material-symbols-outlined">
location_on
</span> ${usuario.localizacao ?? 'Sem localização'} `;
  site.innerHTML = `<span class="material-symbols-outlined">
language
</span> ${usuario.site !== '' ? usuario.site : 'Sem website'} `;
  numProjetos.innerText = ` ${usuario.numProjetos}  Projetos públicos`;
  foto.setAttribute("src", usuario.foto)
  projetoFavoritos.setAttribute("href", `https://github.com/${usuario.github}`)
}

function exibirTela() {
  exibir.classList.add("user");
}

function ocultaTela() {
  exibir.classList.remove("user");
}
