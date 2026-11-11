
const perfis = {
  crianca: {
    nome: "Criança",
    icone: "🧸",
    descricao: "Escolha seu avatar para entrar no seu espaço de descobertas."
  },
  adulto: {
    nome: "Adulto",
    icone: "🌿",
    descricao: "Entre no seu ambiente pessoal para organizar sua rotina e seus objetivos."
  },
  responsavel: {
    nome: "Responsável pela criança",
    icone: "💛",
    descricao: "Acesse o painel de gerenciamento da criança e das autorizações."
  },
  profissional: {
    nome: "Profissional",
    icone: "🩺",
    descricao: "Acesse o painel de acompanhamento dos usuários autorizados."
  },
  clinica: {
    nome: "Clínica",
    icone: "🏥",
    descricao: "Acesse a administração da clínica e de sua equipe."
  },
  root: {
    nome: "Administrador ROOT",
    icone: "🛡️",
    descricao: "Acesso administrativo geral e restrito da plataforma."
  }
};

const boasVindas = document.getElementById("boasVindas");
const painel = document.getElementById("painelAcesso");
const conteudo = document.getElementById("conteudoAcesso");

function mostrarPainel(html) {
  boasVindas.classList.add("oculto");
  painel.classList.remove("oculto");
  conteudo.innerHTML = html;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function voltar() {
  painel.classList.add("oculto");
  boasVindas.classList.remove("oculto");
  conteudo.innerHTML = "";
}

document.getElementById("voltarInicio").addEventListener("click", voltar);

document.getElementById("inicioLink").addEventListener("click", e => {
  e.preventDefault();
  voltar();
});

function abrirPerfil(role) {
  const perfil = perfis[role];

  if (role === "crianca" || role === "adulto") {
    const avatares = role === "crianca"
      ? [["🦊", "Raposa"], ["🐼", "Panda"], ["🦁", "Leão"], ["🐰", "Coelho"]]
      : [["🌻", "Sol"], ["🌿", "Folha"], ["🌙", "Lua"], ["⭐", "Estrela"]];

    mostrarPainel(`
      <div class="cabecalho-form">
        <div class="perfil-icone">${perfil.icone}</div>
        <h2>${perfil.nome}</h2>
        <p>${perfil.descricao}</p>
      </div>

      <div class="lista-avatares">
        ${avatares.map((a, i) => `
          <button class="avatar ${i === 0 ? "selecionado" : ""}"
            data-avatar="${a[1]}" type="button">
            ${a[0]}
            <span>${a[1]}</span>
          </button>
        `).join("")}
      </div>

      <label class="formulario">
        Como podemos chamar você?
        <input id="nomePerfil" type="text"
          placeholder="Digite seu nome ou apelido" maxlength="40">
      </label>

      <button class="acao" id="entrarSemSenha" type="button">
        Entrar no meu mundo
      </button>

      <p class="nota-seguranca">
        ${role === "crianca"
          ? "O acesso infantil deve ser previamente autorizado pelo responsável no dispositivo."
          : "Este acesso demonstrativo não cria uma conta nem valida identidade."}
      </p>

      <div id="retorno" aria-live="polite"></div>
    `);

    let avatarEscolhido = avatares[0][1];

    conteudo.querySelectorAll(".avatar").forEach(btn => {
      btn.addEventListener("click", () => {
        conteudo.querySelectorAll(".avatar").forEach(x => {
          x.classList.remove("selecionado");
        });

        btn.classList.add("selecionado");
        avatarEscolhido = btn.dataset.avatar;
      });
    });

    document.getElementById("entrarSemSenha").addEventListener("click", () => {
      const nome = document.getElementById("nomePerfil").value.trim();

      if (!nome) {
        document.getElementById("retorno").innerHTML =
          '<p class="nota-seguranca">Digite um nome ou apelido para continuar.</p>';
        return;
      }

      const avatar = avatares.find(a => a[1] === avatarEscolhido)[0];

      document.getElementById("retorno").innerHTML = `
        <div class="resultado-demo">
          <strong>Olá, ${escapeHtml(nome)}! ${avatar}</strong>
          <br>
          Seu ambiente ${perfil.nome.toLowerCase()} está pronto
          para ser desenvolvido na próxima etapa.
        </div>
      `;
    });

    return;
  }

  mostrarPainel(`
    <div class="cabecalho-form">
      <div class="perfil-icone">${perfil.icone}</div>
      <h2>${perfil.nome}</h2>
      <p>${perfil.descricao}</p>
    </div>

    <form class="formulario" id="formLogin">
      <label>
        E-mail
        <input type="email" id="email"
          placeholder="seuemail@exemplo.com"
          autocomplete="username" required>
      </label>

      <label>
        Senha
        <input type="password" id="senha"
          placeholder="Digite sua senha"
          autocomplete="current-password"
          required minlength="4">
      </label>

      <button class="acao" type="submit">
        Acessar ${role === "root" ? "administração" : "meu painel"}
      </button>
    </form>

    <p class="nota-seguranca">
      ${role === "root"
        ? "Conta ROOT principal: será provisionada de forma segura na implantação real. Não haverá cadastro público de ROOT."
        : "O cadastro, a recuperação de senha e a validação de acesso serão integrados ao backend em uma etapa futura."}
    </p>

    <div id="retorno" aria-live="polite"></div>
  `);

  document.getElementById("formLogin").addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    document.getElementById("retorno").innerHTML = `
      <div class="resultado-demo">
        <strong>Solicitação demonstrativa recebida.</strong>
        <br>
        Perfil: ${perfil.nome}
        <br>
        E-mail informado: ${escapeHtml(email)}
        <br><br>
        Nenhuma autenticação real foi realizada.
        O painel deste perfil será desenvolvido na próxima etapa.
      </div>
    `;
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

document.querySelectorAll(".perfil").forEach(botao => {
  botao.addEventListener("click", () => {
    abrirPerfil(botao.dataset.role);
  });
});
