/* ========================================= */
/* --- DADOS MOCKADOS (SIMULAÇÃO DE BANCO) --- */
/* ========================================= */

// Veículos: Custo é usado só pelo Financeiro
let estoqueVeiculos = [
    { id: 1, placa: "ABC-1234", modelo: "Honda CB 500F", ano: 2024, cor: "Vermelha", preco: 38000, custo: 32000, status: "disponivel" },
    { id: 2, placa: "OXY-9988", modelo: "Yamaha XJ6", ano: 2023, cor: "Branca", preco: 42000, custo: 35000, status: "disponivel" },
    { id: 3, placa: "KLE-5544", modelo: "Honda Biz 125", ano: 2025, cor: "Preta", preco: 15000, custo: 12000, status: "reservado" },
    { id: 4, placa: "BMW-0011", modelo: "BMW G310", ano: 2024, cor: "Azul", preco: 32000, custo: 27000, status: "disponivel" }
];

// Ranking Vendedores (Com tendência)
const rankingData = [
    { nome: "Davi Emanuel", vendas: 12, trend: "up" },
    { nome: "Ana Souza", vendas: 10, trend: "down" },
    { nome: "Carlos Silva", vendas: 8, trend: "up" }
];

// Serviços de Oficina (Acumulados)
let historicoOS = [
    { id: 101, veiculo: "ABC-1234", servico: "Troca de Óleo", total: 50, status: "Concluído" }
];

// Vendas Pendentes de Auditoria (Financeiro)
let vendasAuditoria = [];

// Estado Atual do Usuário
let currentUser = null;

/* ========================================= */
/* --- SISTEMA DE LOGIN E PERMISSÕES --- */
/* ========================================= */

document.getElementById('formLogin').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('loginUser').value.toLowerCase();
    const pass = document.getElementById('loginPass').value;

    if (pass === '123') {
        loginSistema(user);
    } else {
        alert("Senha incorreta! (Tente 123)");
    }
});

function loginSistema(role) {
    currentUser = role;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appLayout').style.display = 'flex';
    
    configurarMenu(role);
    renderizarRanking(); // Carrega ranking na home
    renderizarEstoque(); // Carrega tabela estoque
    renderizarTabelasEspecificas(role);

    // Define nome no menu
    const nomes = { 'vendedor': 'Davi (Vendedor)', 'gerente': 'Roberto (Gerente)', 'mecanica': 'Oficina Central', 'financeiro': 'Ana (Financeiro)' };
    document.getElementById('menuUserNome').innerText = nomes[role] || "Usuário";
    document.getElementById('menuUserCargo').innerText = role.toUpperCase();
}

function configurarMenu(role) {
    const nav = document.getElementById('dynamicMenu');
    nav.innerHTML = `<a href="#" onclick="navegar('sec-home')" class="active"><i class="fa-solid fa-house"></i> Visão Geral</a>`;

    // Menu Dinâmico baseado no cargo
    if (role === 'vendedor' || role === 'gerente') {
        nav.innerHTML += `<a href="#" onclick="navegar('sec-estoque')"><i class="fa-solid fa-motorcycle"></i> Estoque & Venda</a>`;
    }
    
    if (role === 'mecanica' || role === 'gerente') {
        nav.innerHTML += `<a href="#" onclick="navegar('sec-mecanica')"><i class="fa-solid fa-wrench"></i> Oficina</a>`;
    }

    if (role === 'financeiro' || role === 'gerente') {
        nav.innerHTML += `<a href="#" onclick="navegar('sec-financeiro')"><i class="fa-solid fa-chart-line"></i> Financeiro</a>`;
    }

    if (role === 'gerente') {
        nav.innerHTML += `<a href="#" onclick="navegar('sec-equipe')"><i class="fa-solid fa-users"></i> Gestão Equipe</a>`;
    }
}

function fazerLogout() {
    location.reload(); // Recarrega a página para zerar
}

/* ========================================= */
/* --- NAVEGAÇÃO SPA --- */
/* ========================================= */

function navegar(sectionId) {
    // Esconde todas as seções
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.menu-items a').forEach(a => a.classList.remove('active'));
    
    // Mostra a selecionada
    document.getElementById(sectionId).classList.add('active');
    
    // Atualiza título
    const titulos = {
        'sec-home': 'Visão Geral',
        'sec-estoque': 'Estoque de Veículos',
        'sec-venda': 'Nova Venda',
        'sec-mecanica': 'Gestão de Oficina',
        'sec-financeiro': 'Dashboard Financeiro',
        'sec-equipe': 'Gestão de Colaboradores'
    };
    document.getElementById('pageTitle').innerText = titulos[sectionId];
}

/* ========================================= */
/* --- ESTOQUE E VENDAS --- */
/* ========================================= */

function renderizarEstoque() {
    const tbody = document.getElementById('tabelaEstoque');
    tbody.innerHTML = '';

    estoqueVeiculos.forEach(v => {
        let btnAcao = '';
        let classeStatus = '';

        if(v.status === 'disponivel') {
            classeStatus = 'st-disponivel';
            // Só vendedor e gerente podem ver o botão vender
            if (currentUser === 'vendedor' || currentUser === 'gerente') {
                btnAcao = `<button class="btn-primary btn-small" onclick="iniciarVenda('${v.placa}')">VENDER</button>`;
            }
        } else {
            classeStatus = v.status === 'reservado' ? 'st-reservado' : 'st-vendido';
            btnAcao = `<span style="color:#999; font-size:0.8rem;">Indisponível</span>`;
        }

        const tr = `
            <tr>
                <td><strong>${v.placa}</strong></td>
                <td>${v.modelo} <br><small>${v.cor}</small></td>
                <td>${v.ano}</td>
                <td>R$ ${v.preco.toLocaleString('pt-BR')}</td>
                <td><span class="status-tag ${classeStatus}">${v.status.toUpperCase()}</span></td>
                <td>${btnAcao}</td>
            </tr>
        `;
        tbody.innerHTML += tr;
    });
}

// Filtro de Estoque
function filtrarEstoque(valor) {
    const linhas = document.querySelectorAll('#tabelaEstoque tr');
    valor = valor.toLowerCase();
    linhas.forEach(linha => {
        const texto = linha.innerText.toLowerCase();
        linha.style.display = texto.includes(valor) ? '' : 'none';
    });
}

// --- FLUXO WIZARD DE VENDA ---
let veiculoEmNegociacao = null;

function iniciarVenda(placa) {
    veiculoEmNegociacao = estoqueVeiculos.find(v => v.placa === placa);
    
    // Preenche Passo 1
    document.getElementById('vendaVeiculo').value = veiculoEmNegociacao.modelo + " - " + veiculoEmNegociacao.placa;
    document.getElementById('vendaValor').value = veiculoEmNegociacao.preco.toLocaleString('pt-BR');
    document.getElementById('vendaPlaca').value = placa;
    
    // Reseta campos
    document.getElementById('vendaCliente').value = '';
    document.getElementById('vendaCPF').value = '';
    document.getElementById('vendaObs').value = '';

    // Vai para tela de venda
    navegar('sec-venda');
    mudarPassoVenda(1);
}

function mudarPassoVenda(passo) {
    // Esconde todos steps
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    // Mostra o atual
    document.getElementById(`venda-step-${passo}`).classList.add('active');
}

function voltarEstoque() {
    navegar('sec-estoque');
}

function irParaContrato() {
    const cliente = document.getElementById('vendaCliente').value;
    const cpf = document.getElementById('vendaCPF').value;

    if(!cliente || !cpf) { alert("Preencha os dados do cliente!"); return; }

    // Preenche Contrato Visual
    document.getElementById('contratoNum').innerText = Math.floor(Math.random() * 10000);
    document.getElementById('c-cliente').innerText = cliente;
    document.getElementById('c-cpf').innerText = cpf;
    document.getElementById('c-veiculo').innerText = veiculoEmNegociacao.modelo;
    document.getElementById('c-valor').innerText = "R$ " + veiculoEmNegociacao.preco.toLocaleString('pt-BR');

    mudarPassoVenda(2);
}

function irParaPagamento() {
    mudarPassoVenda(3);
}

function finalizarVenda() {
    // 1. Muda status do veículo
    veiculoEmNegociacao.status = 'reservado';
    
    // 2. Cria registro para auditoria
    const venda = {
        cliente: document.getElementById('vendaCliente').value,
        veiculo: veiculoEmNegociacao.modelo,
        pagamento: document.getElementById('formaPagto').value,
        lucro: veiculoEmNegociacao.preco - veiculoEmNegociacao.custo // Cálculo de Lucro
    };
    vendasAuditoria.push(venda);

    alert("Venda enviada para análise do Financeiro!");
    
    // Volta pro estoque e atualiza
    renderizarEstoque();
    navegar('sec-estoque');
    
    // Atualiza tabela do financeiro se estiver logado
    renderizarAuditoriaFinanceira();
}

/* ========================================= */
/* --- MECÂNICA --- */
/* ========================================= */

let servicosTemp = [];

function abrirNovaOS() {
    document.getElementById('formNovaOS').style.display = 'block';
    servicosTemp = [];
    atualizarListaServicosVisual();
}

function fecharNovaOS() {
    document.getElementById('formNovaOS').style.display = 'none';
}

function addServicoNaLista() {
    const select = document.getElementById('selServico');
    const nome = select.options[select.selectedIndex].text;
    const valor = parseFloat(select.value);

    if (valor === 0) return;

    servicosTemp.push({ nome: nome.split('-')[0], valor: valor });
    atualizarListaServicosVisual();
}

function atualizarListaServicosVisual() {
    const ul = document.getElementById('listaServicosOS');
    ul.innerHTML = '';
    let total = 0;

    servicosTemp.forEach(s => {
        ul.innerHTML += `<li><span>${s.nome}</span> <span>R$ ${s.valor}</span></li>`;
        total += s.valor;
    });

    document.getElementById('totalOSValue').innerText = total.toFixed(2);
}

function salvarOS() {
    const cliente = document.getElementById('osCliente').value;
    const veiculo = document.getElementById('osVeiculo').value;
    const total = parseFloat(document.getElementById('totalOSValue').innerText);

    if(!cliente || total === 0) { alert("Preencha os dados!"); return; }

    historicoOS.push({
        id: Math.floor(Math.random() * 900) + 100,
        veiculo: veiculo,
        status: "Em Aberto",
        total: total
    });

    alert("OS Gerada com Sucesso!");
    fecharNovaOS();
    renderizarMecanica();
}

function renderizarMecanica() {
    const tbody = document.getElementById('tabelaMecanica');
    tbody.innerHTML = '';
    historicoOS.forEach(os => {
        tbody.innerHTML += `
            <tr>
                <td>#${os.id}</td>
                <td>${os.veiculo}</td>
                <td><span class="status-tag st-disponivel">${os.status}</span></td>
                <td>R$ ${os.total.toFixed(2)}</td>
                <td><button class="btn-small">Ver Detalhes</button></td>
            </tr>
        `;
    });
}

/* ========================================= */
/* --- FINANCEIRO E AUDITORIA --- */
/* ========================================= */

function renderizarAuditoriaFinanceira() {
    const tbody = document.getElementById('tabelaAuditoria');
    tbody.innerHTML = '';

    if (vendasAuditoria.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">Nenhuma venda pendente.</td></tr>';
        return;
    }

    vendasAuditoria.forEach((v, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${v.cliente}</td>
                <td>${v.veiculo}</td>
                <td>${v.pagamento}</td>
                <td><a href="#" style="color:blue"><i class="fa-solid fa-paperclip"></i> Ver Anexo</a></td>
                <td style="color:green; font-weight:bold;">R$ ${v.lucro.toLocaleString('pt-BR')}</td>
                <td>
                    <button class="btn-success btn-small" onclick="aprovarVenda(${index})">Aprovar</button>
                    <button class="btn-danger btn-small" style="background:#ffcdd2; color:red; border:none; padding:5px;">Reprovar</button>
                </td>
            </tr>
        `;
    });
}

function aprovarVenda(index) {
    alert("Venda Aprovada! Faturamento contabilizado.");
    vendasAuditoria.splice(index, 1);
    renderizarAuditoriaFinanceira();
}

/* ========================================= */
/* --- AUXILIARES E INICIALIZAÇÃO --- */
/* ========================================= */

function renderizarRanking() {
    const lista = document.getElementById('listaRanking');
    lista.innerHTML = '';
    rankingData.forEach((r, i) => {
        const icon = r.trend === 'up' 
            ? '<i class="fa-solid fa-arrow-up trend-up"></i>' 
            : '<i class="fa-solid fa-arrow-down trend-down"></i>';
            
        lista.innerHTML += `
            <div style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #eee;">
                <span><b>${i+1}º</b> ${r.nome}</span>
                <span>${r.vendas} Vendas ${icon}</span>
            </div>
        `;
    });
}

function renderizarTabelasEspecificas(role) {
    if(role === 'mecanica' || role === 'gerente') renderizarMecanica();
    if(role === 'financeiro' || role === 'gerente') renderizarAuditoriaFinanceira();
}
