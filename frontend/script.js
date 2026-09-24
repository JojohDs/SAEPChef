const usuarios = [
    {
        id: 1,
        nome: "Chef Marco Bianchi",
        usuario: "chef1",
        email: "chef1@saepchef.com",
        senha: "123456",
        imagem: "chef1.jpg",
        tipo: "chef"
    },
    {
        id: 2,
        nome: "Chef Ana Ferreira",
        usuario: "chef2",
        email: "chef2@saepchef.com",
        senha: "123456",
        imagem: "chef2.jpg",
        tipo: "chef"
    },
    {
        id: 3,
        nome: "Chef Lucas Tanaka",
        usuario: "chef3",
        email: "chef3@saepchef.com",
        senha: "123456",
        imagem: "chef3.jpg",
        tipo: "chef"
    },
    {
        id: 4,
        nome: "Mariana Costa",
        usuario: "usuario1",
        email: "usuario1@gmail.com",
        senha: "123456",
        imagem: "usuario1.jpg",
        tipo: "comum"
    },
    {
        id: 5,
        nome: "Rafael Souza",
        usuario: "usuario2",
        email: "usuario2@gmail.com",
        senha: "123456",
        imagem: "usuario2.jpg",
        tipo: "comum"
    },
    {
        id: 6,
        nome: "Beatriz Lima",
        usuario: "usuario3",
        email: "usuario3@gmail.com",
        senha: "123456",
        imagem: "usuario3.jpg",
        tipo: "comum"
    }
];

let filtroChef = null;
let usuarioAtual = null;

const modalLogin = document.querySelector("#modalLogin");
const formLogin = document.querySelector("#formLogin");

const receitasIniciais = [
    {
        id: 1,
        titulo: "Receita 1",
        origem: "Itália",
        chef: "chef1",
        chefId: 1,
        imagem: "/frontend/src/anexos_prova/receitas/receita1.jpg",
        favoritos: [4, 5]
    },

    {
        id: 2,
        titulo: "Receita 2",
        origem: "Japão",
        chef: "chef2",
        chefId: 2,
        imagem: "/frontend/src/anexos_prova/receitas/receita2.jpg",
        favoritos: [3, 8, 6]
    },

    {
        id: 3,
        titulo: "Receita 3",
        origem: "Brasil",
        chef: "chef3",
        chefId: 3,
        imagem: "/frontend/src/anexos_prova/receitas/receita3.jpg",
        favoritos: [4, 2, 5, 8]
    },

    {
        id: 4,
        titulo: "Receita 4",
        origem: "Alemanha",
        chef: "chef4",
        chefId: 4,
        imagem: "/frontend/src/anexos_prova/receitas/receita4.jpg",
        favoritos: [9, 2, 3]
    },

    {
        id: 5,
        titulo: "Receita 5",
        origem: "China",
        chef: "chef5",
        chefId: 5,
        imagem: "/frontend/src/anexos_prova/receitas/receita5.jpg",
        favoritos: [1, 2]
    },

    {
        id: 6,
        titulo: "Receita 6",
        origem: "França",
        chef: "chef6",
        chefId: 6,
        imagem: "/frontend/src/anexos_prova/receitas/receita6.jpg",
        favoritos: [1, 4, 6, 7, 9]
    },

    {
        id: 7,
        titulo: "Receita 7",
        origem: "Russia",
        chef: "chef7",
        chefId: 7,
        imagem: "/frontend/src/anexos_prova/receitas/receita7.jpg",
        favoritos: [1]
    },

    {
        id: 8,
        titulo: "Receita 8",
        origem: "Egito",
        chef: "chef8",
        chefId: 8,
        imagem: "/frontend/src/anexos_prova/receitas/receita8.jpg",
        favoritos: [1, 3, 2, 6]
    },

    {
        id: 9,
        titulo: "Receita 9",
        origem: "Tailândia",
        chef: "chef9",
        chefId: 9,
        imagem: "/frontend/src/anexos_prova/receitas/receita9.jpg",
        favoritos: [8, 3]
    }
];

let receitas = receitasIniciais;

const muralReceitas = document.querySelector("#muralReceitas");

function criarCartao(receita) {

    const favoritada =
        usuarioAtual &&
        receita.favoritos.includes(usuarioAtual.id);

    return `
        <article class="cartao-receita">

            <div class="imagem-receita">

                <img
                    src="${receita.imagem}"
                    alt="Imagem da ${receita.titulo}"
                >

                <div class="tooltip">
                    <div>Receita publicada por: @${receita.chef}</div>
                    <div>Origem: ${receita.origem}</div>
                </div>

            </div>

            <div class="dados-receita">

                <h2>${receita.titulo}</h2>

                <button
                    class="favoritar ${favoritada ? "ativo" : ""}"
                    data-id="${receita.id}"
                    type="button"
                >
                    <span class="icone-estrela"></span>
                    <span>${receita.favoritos.length}</span>
                </button>

            </div>

        </article>
    `;
}

function renderizarMural() {

    const visiveis = filtroChef
        ? receitas.filter((receita) => receita.chefId === filtroChef)
        : receitas;

    muralReceitas.innerHTML = visiveis
        .map(criarCartao)
        .join("");
}

muralReceitas.addEventListener("click", (evento) => {

    const botao = evento.target.closest(".favoritar");

    if (botao) {
        alternarFavorito(Number(botao.dataset.id));
    }

});

function alternarFavorito(idReceita) {

    if (!usuarioAtual) {
        abrirLogin();
        return;
    }

    const receita = receitas.find(
        (item) => item.id === idReceita
    );

    if (!receita) {
        return;
    }

    const posicao = receita.favoritos.indexOf(usuarioAtual.id);

    if (posicao === -1) {
        receita.favoritos.push(usuarioAtual.id);
    } else {
        receita.favoritos.splice(posicao, 1);
    }

    renderizarMural();
}

function buscarChef(evento) {
    evento.preventDefault();

    if (!usuarioAtual) {
        abrirLogin();
        return;
    }

    const campoBusca = document.querySelector("#campoBusca");
    const termo = campoBusca.value
        .trim()
        .replace(/^@/, "")
        .toLowerCase();

    const chef = usuarios.find(
        (usuario) =>
            usuario.tipo === "chef" &&
            usuario.usuario.toLowerCase() === termo
    );

    if (!chef) {

        filtroChef = -1;
        document.querySelector("#mensagemBusca").textContent =
            "Chef não encontrado";

    } else {

        filtroChef = chef.id;
        document.querySelector("#mensagemBusca").textContent = "";
    }

    renderizarMural();
}

document.querySelector("#formBusca")
    .addEventListener("submit", buscarChef);

function abrirLogin() {
    modalLogin.classList.remove("escondido");
}


function fecharLogin() {

    modalLogin.classList.add("escondido");

    formLogin.reset();
}

document.querySelector("#fecharLogin")
    .addEventListener("click", fecharLogin);

document.querySelector("#cancelarLogin")
    .addEventListener("click", fecharLogin);

function entrar(evento) {

    evento.preventDefault();

    const email = document.querySelector("#email");
    const senha = document.querySelector("#senha");

    const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    document.querySelector("#erroEmail").textContent = "";
    document.querySelector("#erroSenha").textContent = "";
    document.querySelector("#erroLogin").textContent = "";

    if (!formato.test(email.value.trim())) {

        document.querySelector("#erroEmail").textContent =
            "E-mail inválido ou vazio.";

        return;
    }

    if (!senha.value.trim()) {

        document.querySelector("#erroSenha").textContent =
            "A senha é obrigatória.";

        return;
    }

    const encontrado = usuarios.find(
        (usuario) =>
            usuario.email === email.value.trim() &&
            usuario.senha === senha.value
    );

    if (!encontrado) {

        document.querySelector("#erroLogin").textContent =
            "Usuário não encontrado ou senha incorreta";

        return;
    }

    usuarioAtual = encontrado;

    fecharLogin();
    atualizarCabecalho();
    renderizarMural();
}

formLogin.addEventListener("submit", entrar);

function atualizarCabecalho() {

    const foto = document.querySelector("#fotoUsuario");
    const nome = document.querySelector("#nomeUsuario");
    const botao = document.querySelector("#botaoLogin");

    if (!usuarioAtual) {

        foto.src =
            "anexos_prova/imagens_usuarios/saepChef.jpg";

        nome.textContent = "@SAEPChef";
        botao.textContent = "Login";

        return;
    }

    foto.src =
    "/frontend/src/anexos_prova/imagens_usuarios/" +
    usuarioAtual.imagem;

    nome.textContent =
        `@${usuarioAtual.usuario}`;

    botao.textContent = "Logout";
}

function sair() {

    usuarioAtual = null;

    atualizarCabecalho();
    renderizarMural();
}

document.querySelector("#botaoLogin")
    .addEventListener("click", () => {

        if (usuarioAtual) {
            sair();
        } else {
            abrirLogin();
        }

    });

function abrirPainel() {

    if (!usuarioAtual) {
        abrirLogin();
        return;
    }

    if (usuarioAtual.tipo !== "chef") {
        return;
    }

    const proprias = receitas.filter(
        (receita) =>
            receita.chefId === usuarioAtual.id
    );

    const total = proprias.reduce(
        (soma, receita) =>
            soma + receita.favoritos.length,
        0
    );

    document.querySelector("#fotoPerfil").src =
    "/frontend/src/anexos_prova/imagens_usuarios/" +
    usuarioAtual.imagem;

    document.querySelector("#nomePerfil").textContent =
        `@${usuarioAtual.usuario}`;

    document.querySelector("#totalReceitas").textContent =
        proprias.length;

    document.querySelector("#totalFavoritos").textContent =
        total;

    document.querySelector("#painelPerfil")
        .classList.add("aberto");
}


function fecharPainel() {
    document.querySelector("#painelPerfil")
        .classList.remove("aberto");
}

document.querySelector("#botaoPerfil")
    .addEventListener("click", abrirPainel);

document.querySelector("#fecharPerfil")
    .addEventListener("click", fecharPainel);

renderizarMural();
atualizarCabecalho();