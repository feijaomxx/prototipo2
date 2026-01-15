/* DADOS DO SISTEMA */
let equipeData = [
    { matricula: 1001, nome: "Davi Emanuel", cpf: "000.000.000-00", cargo: "Vendedor", status: "Ativo", supervisor: "Carlos (Sup)" },
    { matricula: 1002, nome: "Ana Souza", cpf: "111.111.111-11", cargo: "Vendedor", status: "Ativo", supervisor: "Carlos (Sup)" },
    { matricula: 2001, nome: "Pedro Mecânico", cpf: "222.222.222-22", cargo: "Mecânico", status: "Férias", supervisor: "Roberto (Gerente)" }
];

/* ESTOQUE DETALHADO */
let estoque = [
    { id: 1, marca: "Honda", modelo: "CB 500F", cor: "Vermelha", chassi: "9C2PC123456", anoFab: 2024, anoMod: 2024, km: 0, dataEntrada: "2024-11-01", local: "Matriz", combustivel: "Gasolina", valor: 38500, custo: 32000, qtd: 1, status: "Disponível", placa: "ABC-1234" },
    { id: 2, marca: "Yamaha", modelo: "XJ6 N", cor: "Preta", chassi: "9C6KJ987654", anoFab: 2023, anoMod: 2023, km: 12000, dataEntrada: "2024-12-15", local: "Filial 1", combustivel: "Gasolina", valor: 42900, custo: 36000, qtd: 1, status: "Disponível", placa: "OXY-9988" },
    { id: 3, marca: "Honda", modelo: "Biz 125", cor: "Branca", chassi: "9C2JC000111", anoFab: 2025, anoMod: 2025, km: 0, dataEntrada: "2025-01-05", local: "Matriz", combustivel: "Flex", valor: 16200, custo: 13500, qtd: 2, status: "Disponível", placa: "KLE-5544" },
    { id: 4, marca: "BMW", modelo: "G310 R", cor: "Azul", chassi: "WB100022233", anoFab: 2024, anoMod: 2024, km: 3500, dataEntrada: "2024-10-10", local: "Matriz", combustivel: "Gasolina", valor: 34500, custo: 29000, qtd: 1, status: "Disponível", placa: "BMW-0011" },
    { id: 5, marca: "Kawasaki", modelo: "Ninja 400", cor: "Verde", chassi: "95K00099887", anoFab: 2023, anoMod: 2023, km: 15000, dataEntrada: "2024-05-20", local: "Matriz", combustivel: "Gasolina", valor: 39000, custo: 33000, qtd: 1, status: "Disponível", placa: "HGT-7722" },
    { id: 6, marca: "Honda", modelo: "CG 160 Titan", cor: "Azul", chassi: "9C2CG160000", anoFab: 2025, anoMod: 2025, km: 0, dataEntrada: "2025-01-12", local: "Matriz", combustivel: "Flex", valor: 18500, custo: 15000, qtd: 1, status: "Reservado", placa: "JUI-1020" },
    { id: 15, marca: "Voltz", modelo: "EVS", cor: "Cinza", chassi: "95V00012345", anoFab: 2025, anoMod: 2025, km: 0, dataEntrada: "2025-01-10", local: "Filial 2", combustivel: "Elétrico", valor: 22000, custo: 17000, qtd: 3, status: "Disponível", placa: "ELT-1000" }
];

let rankingData = [
    { nome: "Davi Emanuel", vendas: 8, total: 245000 },
    { nome: "Ana Souza", vendas: 6, total: 180000 },
    { nome: "Carlos Lima", vendas: 5, total: 155000 },
    { nome: "Roberto Gerente", vendas: 2, total: 70000 }
];

const tabelaServicos = [
    { id: 1, nome: "Troca de Óleo + Filtro", valor: 85.00 },
    { id: 2, nome: "Revisão Geral (Básica)", valor: 250.00 },
    { id: 3, nome: "Troca Kit Relação", valor: 320.00 },
    { id: 4, nome: "Troca Pastilhas Freio (Par)", valor: 140.00 },
    { id: 5, nome: "Alinhamento e Balanceamento", valor: 100.00 },
    { id: 6, nome: "Lavagem Detalhada", valor: 60.00 }
];

let minhasVendas = [
    { id: 501, veiculoModelo: "Honda CB 500F", clienteNome: "João da Silva", valor: 38500, status: "Concluído" },
    { id: 502, veiculoModelo: "Yamaha NMax 160", clienteNome: "Maria Oliveira", valor: 19500, status: "Concluído" },
];

let leadsFinanceiro = [];
let listaOS = [
    { id: 101, veiculo: "JUI-1020", cliente: "Marcos Silva", servicos: [{ nome: "Revisão Geral", valor: 250 }], total: 250, status: "Concluído", dataEntrega: "2025-01-20" },
    { id: 102, veiculo: "ROY-3500", cliente: "Fernanda Lima", servicos: [{ nome: "Troca de Óleo", valor: 85 }, { nome: "Lavagem", valor: 60 }], total: 145, status: "Em Aberto", dataEntrega: "2025-01-18" }
];

let currentUser = null;
let veiculoSelecionado = null;
let servicosTempOS = [];
let osEmEdicaoID = null;
let leadEmAuditoriaID = null;

/* FUNÇÕES GERAIS */
function gerarLeadsFicticios() {
    const nomes = ["Lucas Silva", "Maria Oliveira", "Pedro Santos", "Julia Lima", "Fernanda Costa", "Rafael Souza", "Bruno Alves", "Carla Dias", "Marcos Rocha", "Bianca Melo"];
    const statusOpts = ["Pendente", "Análise Crédito", "Aguardando PIX"];
    const pagtoOpts = ["Financiamento", "PIX", "Consórcio", "Cartão"];
    for (let i = 0; i < 30; i++) {
        const veiculoRandom = estoque[Math.floor(Math.random() * estoque.length)];
        const vendedorLead = i % 2 === 0 ? "Davi Emanuel" : "Ana Souza";
        leadsFinanceiro.push({
            id: 2000 + i,
            data: new Date(2025, 0, i + 1).toLocaleDateString('pt-BR'),
            vendedor: vendedorLead,
            cliente: nomes[i % 10] + " " + String.fromCharCode(65 + i),
            cpf: "000.000.000-00",
            rg: "0000000",
            email: "exemplo@email.com",
            telefone: "(82) 99999-9999",
            endereco: "Rua Fictícia, 123 - Centro, Maceió/AL",
            veiculo: veiculoRandom.modelo,
            placa: veiculoRandom.placa,
            valor: veiculoRandom.valor,
            custo: veiculoRandom.custo,
            pagamento: pagtoOpts[i % 4],
            banco: "Santander",
            entrada: 0,
            trocaPlaca: "",
            trocaModelo: "",
            trocaValor: 0,
            status: statusOpts[i % 3]
        });
    }
}
gerarLeadsFicticios();

document.addEventListener("DOMContentLoaded", () => {
    // Carrega serviços no select
    const selServico = document.getElementById('selServicoOS');
    if (selServico) {
        tabelaServicos.forEach(s => {
            selServico.innerHTML += `<option value="${s.id}">${s.nome} - R$ ${s.valor.toFixed(2)}</option>`;
        });
    }
    const loginUser = document.getElementById('loginUser');
    if (loginUser) loginUser.focus();
});

function fazerLoginManual() {
    const userInp = document.getElementById('loginUser');
    const modulo = document.getElementById('moduloSelect').value;

    if (userInp && userInp.value) {
        const u = userInp.value.toLowerCase().trim();

        if (modulo === 'mecanica') {
            // Redireciona para o novo arquivo
            window.location.href = `mecanica.html?user=${u}`;
        } else {
            // Loga no sistema de vendas normal
            login(u);
        }
    } else {
        alert("Por favor, digite um usuário.");
    }
}

function login(role) {
    currentUser = role;
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appLayout').style.display = 'flex';
    const nomes = { 'vendedor': 'Davi E.', 'gerente': 'Roberto G.', 'mecanica': 'Oficina Central', 'financeiro': 'Ana Fin.' };
    document.getElementById('menuUserNome').innerText = nomes[role] || role.toUpperCase();
    document.getElementById('menuUserCargo').innerText = role.charAt(0).toUpperCase() + role.slice(1);
    montarMenu(role);
    atualizarFinanceiroAvancado();
    atualizarTodasTabelas();
    renderizarRanking();
    navegar('sec-home');
}

function fazerLogout() { location.reload(); }

function montarMenu(role) {
    const nav = document.getElementById('dynamicMenu');
    nav.innerHTML = `<a href="#" onclick="navegar('sec-home')"><i class="fa-solid fa-house"></i> Visão Geral</a>`;
    if (role.includes('vendedor') || role.includes('gerente')) {
        nav.innerHTML += `<a href="#" onclick="navegar('sec-estoque')"><i class="fa-solid fa-motorcycle"></i> Estoque</a>`;
        nav.innerHTML += `<a href="#" onclick="navegar('sec-historico')"><i class="fa-solid fa-clock-rotate-left"></i> Minhas Vendas</a>`;
    }
    if (role.includes('financeiro') || role.includes('gerente')) {
        nav.innerHTML += `<a href="#" onclick="navegar('sec-financeiro')"><i class="fa-solid fa-chart-pie"></i> Financeiro</a>`;
    }

    if (role.includes('mecanica') || role.includes('gerente')) {
        nav.innerHTML += ``;
    }
    if (role.includes('gerente')) {
        nav.innerHTML += `<a href="#" onclick="navegar('sec-equipe')"><i class="fa-solid fa-users"></i> Equipe</a>`;
    }
}

function navegar(id) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    const titles = { 'sec-home': 'Visão Geral', 'sec-estoque': 'Estoque', 'sec-solicitacao': 'Nova Venda', 'sec-historico': 'Minhas Vendas', 'sec-financeiro': 'Financeiro', 'sec-mecanica': 'Oficina', 'sec-equipe': 'Equipe' };
    document.getElementById('pageTitle').innerText = titles[id] || 'Facilita';
    toggleMenu(false);
}

function toggleMenu(force) {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('mobileOverlay');
    if (force === false) { sb.classList.remove('open'); ov.classList.remove('open'); }
    else { sb.classList.toggle('open'); ov.classList.toggle('open'); }
}

function atualizarKPIs() {
    const totalVendasHoje = rankingData.reduce((acc, curr) => acc + curr.vendas, 0);
    const totalFatHoje = rankingData.reduce((acc, curr) => acc + curr.total, 0);
    document.getElementById('kpiVendasHoje').innerText = totalVendasHoje;
    document.getElementById('kpiFaturamento').innerText = (totalFatHoje / 1000).toFixed(0) + 'k';
    const osPendentes = listaOS.filter(os => os.status === 'Em Aberto').length;
    document.getElementById('kpiOSPendentes').innerText = osPendentes;
    const finPendente = leadsFinanceiro.reduce((acc, curr) => acc + curr.valor, 0);
    document.getElementById('finPendente').innerText = finPendente.toLocaleString('pt-BR');
}

function renderizarRanking() {
    const lista = document.getElementById('listaRanking');
    if (!lista) return;
    lista.innerHTML = '';
    rankingData.sort((a, b) => b.vendas - a.vendas);
    rankingData.forEach((r, i) => {
        let icon = '';
        if (i === 0) icon = '🥇';
        if (i === 1) icon = '🥈';
        if (i === 2) icon = '🥉';
        lista.innerHTML += `
        <div class="ranking-item">
            <div><span class="rank-pos">${icon || (i + 1) + 'º'}</span> <strong>${r.nome}</strong></div>
            <div>${r.vendas} Vendas (R$ ${(r.total / 1000).toFixed(0)}k)</div>
        </div>`;
    });
}

// Helper para calcular dias
function calcularDiasEstoque(dataEntrada) {
    const entrada = new Date(dataEntrada);
    const hoje = new Date();
    const diffTime = Math.abs(hoje - entrada);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function filtrarEstoque(txt) {
    const rows = document.querySelectorAll('#tabelaEstoque tr');
    rows.forEach(r => r.style.display = r.innerText.toLowerCase().includes(txt.toLowerCase()) ? '' : 'none');
}

/* ATUALIZAÇÃO DAS TABELAS (ESTOQUE DETALHADO) */
function atualizarTodasTabelas() {
    const tbEst = document.getElementById('tabelaEstoque');
    if (tbEst) {
        tbEst.innerHTML = '';
        estoque.forEach(v => {
            let dias = calcularDiasEstoque(v.dataEntrada);
            let btn = '';
            let stClass = v.status === 'Disponível' ? 'st-disp' : (v.status === 'Reservado' ? 'st-res' : 'st-vend');

            if (v.status === 'Disponível' && currentUser && (currentUser.includes('vendedor') || currentUser.includes('gerente'))) {
                btn = `<button class="btn-primary btn-small" onclick="iniciarVendaWizard(${v.id})"><i class="fa-solid fa-cart-plus"></i> VENDER</button>`;
            } else if (v.qtd === 0) {
                btn = `<button class="btn-secondary btn-small" disabled>ESGOTADO</button>`;
            }

            tbEst.innerHTML += `
                <tr>
                    <td><strong>${v.marca}</strong> ${v.modelo}<br><small style="color:#666">${v.placa}</small></td>
                    <td>${v.cor}<br><small>${v.combustivel}</small></td>
                    <td><small>${v.chassi}</small></td>
                    <td>${v.anoFab}/${v.anoMod}</td>
                    <td>${v.km === 0 ? '0km (Nova)' : v.km + ' km'}</td>
                    <td>${v.local}</td>
                    <td><span style="${dias > 60 ? 'color:red; font-weight:bold' : ''}">${dias} dias</span></td>
                    <td style="font-weight:bold; color:var(--primary)">R$ ${v.valor.toLocaleString('pt-BR')}</td>
                    <td><span class="status-pill ${stClass}">${v.status}</span><br><small>Restam: ${v.qtd}</small></td>
                    <td>${btn}</td>
                </tr>`;
        });
    }

    const tbLeads = document.getElementById('tabelaLeadsFin');
    if (tbLeads) {
        tbLeads.innerHTML = '';
        leadsFinanceiro.forEach((l, i) => {
            // Agora o botão chama "abrirAuditoria" em vez de "aprovarLead"
            tbLeads.innerHTML += `
                <tr>
                    <td>${l.data}</td>
                    <td>${l.vendedor}</td>
                    <td>${l.cliente}</td>
                    <td>${l.veiculo}<br><small>${l.placa}</small></td>
                    <td style="font-weight:bold">R$ ${l.valor.toLocaleString('pt-BR')}</td>
                    <td>${l.pagamento}</td>
                    <td><span class="status-pill st-analise">${l.status}</span></td>
                    <td>
                        <button class="btn-secondary btn-small" onclick="abrirAuditoria(${i})" title="Auditar Venda"><i class="fa-solid fa-eye"></i></button>
                    </td>
                </tr>`;
        });
    }

    // (Outras tabelas mantidas)...
    const tbMinhas = document.getElementById('tabelaMinhasVendas');
    if (tbMinhas) {
        tbMinhas.innerHTML = '';
        minhasVendas.forEach((v, index) => {
            let acao = '';
            if (v.status !== 'Cancelado' && v.status !== 'Em análise de cancelamento') {
                acao = `<button class="btn-small btn-danger" onclick="solicitarCancelamento(${index})">X</button>`;
            }
            tbMinhas.innerHTML += `<tr><td>#${v.id}</td><td>${v.veiculoModelo}</td><td>${v.clienteNome}</td><td>R$ ${v.valor.toLocaleString('pt-BR')}</td><td><span class="status-pill st-vend">${v.status}</span></td><td>${acao}</td></tr>`;
        });
    }
    renderizarTabelaOS();
    renderizarEquipe();
    renderizarRanking();
}

/* WIZARD DE VENDA */
function iniciarVendaWizard(id) {
    veiculoSelecionado = estoque.find(v => v.id === id);
    if (!veiculoSelecionado) return;
    document.getElementById('solModelo').value = veiculoSelecionado.modelo;
    document.getElementById('solPlaca').value = veiculoSelecionado.placa;
    document.getElementById('solValor').value = veiculoSelecionado.valor.toLocaleString('pt-BR');
    ['cliNome', 'cliCPF', 'cliRG', 'cliEmail', 'cliTel', 'endCEP', 'endRua', 'endNum', 'endBairro', 'endCidade', 'pgEntrada', 'trocaPlaca', 'trocaModelo', 'trocaValor', 'negociacaoObs'].forEach(f => {
        const el = document.getElementById(f);
        if (el) el.value = '';
    });
    document.getElementById('solVendedor').value = document.getElementById('menuUserNome').innerText;
    navegar('sec-solicitacao');
    proximoPasso(1);
}

function proximoPasso(step) {
    if (step === 2) {
        if (!document.getElementById('cliNome').value || !document.getElementById('cliCPF').value) {
            alert("Preencha os dados obrigatórios do cliente!"); return;
        }
        gerarDocumentosVisuais();
    }
    document.querySelectorAll('.wizard-progress .step, .wizard-progress .line').forEach(el => el.classList.remove('active'));
    for (let i = 1; i <= step; i++) {
        document.querySelector(`.step-${i}`).classList.add('active');
        if (i < step) document.querySelector(`.line-${i}`).classList.add('active');
    }
    document.querySelectorAll('.wizard-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`sol-step${step}`).classList.add('active');
    window.scrollTo(0, 0);
}

function buscarCEP() {
    let cep = document.getElementById('endCEP').value.replace(/\D/g, '');
    if (cep.length !== 8) { alert("CEP inválido!"); return; }
    document.getElementById('endRua').value = "Buscando...";
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
            if (data.erro) { alert("CEP não encontrado!"); document.getElementById('endRua').value = ""; return; }
            document.getElementById('endRua').value = data.logradouro;
            document.getElementById('endBairro').value = data.bairro;
            document.getElementById('endCidade').value = data.localidade + "/" + data.uf;
            document.getElementById('endNum').focus();
        })
        .catch(() => { alert("Erro ao buscar CEP. Preencha manualmente."); document.getElementById('endRua').value = ""; });
}

function gerarDocumentosVisuais() {
    if (!veiculoSelecionado) return;
    const cli = document.getElementById('cliNome').value.toUpperCase();
    const cpf = document.getElementById('cliCPF').value;
    const rg = document.getElementById('cliRG').value || "N/I";
    const end = `${document.getElementById('endRua').value}, ${document.getElementById('endNum').value} - ${document.getElementById('endBairro').value}, ${document.getElementById('endCidade').value}`;
    const val = veiculoSelecionado.valor.toLocaleString('pt-BR');
    const dataHoje = new Date();

    // Gera o contrato no Wizard (para o vendedor ver)
    const contractDiv = document.getElementById('contractBody');
    if (contractDiv) {
        contractDiv.innerHTML = gerarHtmlContrato(cli, cpf, rg, end, val, veiculoSelecionado, dataHoje);
    }
}

// Função auxiliar para gerar o HTML do contrato (reaproveitada na Auditoria)
function gerarHtmlContrato(nome, cpf, rg, endereco, valor, veiculo, data) {
    const dia = data.getDate();
    const mes = data.toLocaleString('pt-BR', { month: 'long' });
    const ano = data.getFullYear();

    return `
        <p style="text-align:center; font-weight:bold; margin-bottom:20px;">INSTRUMENTO PARTICULAR DE COMPRA E VENDA DE VEÍCULO</p>
        <p><strong>VENDEDOR:</strong> FACILITA VEÍCULOS LTDA, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 12.345.678/0001-99, com sede em Av. Fernandes Lima, 100 - Farol, Maceió/AL.</p>
        <p><strong>COMPRADOR:</strong> <strong>${nome}</strong>, inscrito(a) no CPF nº ${cpf}, RG nº ${rg}, residente e domiciliado(a) em ${endereco}.</p>
        <p style="margin-top:15px;"><strong>CLÁUSULA 1ª - DO OBJETO</strong></p>
        <p>O Vendedor vende ao Comprador o veículo de sua propriedade, com as seguintes características:</p>
        <ul style="list-style: none; padding-left: 20px; font-size: 0.95rem;">
            <li><strong>Marca/Modelo:</strong> ${veiculo.marca ? veiculo.marca.toUpperCase() : ''} / ${veiculo.modelo.toUpperCase()}</li>
            <li><strong>Ano Fab/Mod:</strong> ${veiculo.anoFab || 'N/A'} / ${veiculo.anoMod || 'N/A'}</li>
            <li><strong>Cor:</strong> ${veiculo.cor ? veiculo.cor.toUpperCase() : 'N/A'}</li>
            <li><strong>Chassi:</strong> ${veiculo.chassi || 'N/A'}</li>
            <li><strong>Placa:</strong> ${veiculo.placa}</li>
            <li><strong>Combustível:</strong> ${veiculo.combustivel || 'N/A'}</li>
            <li><strong>Quilometragem:</strong> ${veiculo.km || 0} KM</li>
        </ul>
        <p style="margin-top:15px;"><strong>CLÁUSULA 2ª - DO PREÇO E PAGAMENTO</strong></p>
        <p>O preço certo e ajustado é de <strong>R$ ${valor}</strong> (Reais).</p>
        <p style="margin-top:15px;"><strong>CLÁUSULA 3ª - DAS CONDIÇÕES GERAIS</strong></p>
        <p>O Comprador declara ter examinado o veículo, aceitando-o no estado de conservação em que se encontra.</p>
        <p style="margin-top:30px; text-align: center;">Maceió - AL, ${dia} de ${mes} de ${ano}.</p>
    `;
}

function finalizarVendaWizard() {
    if (!veiculoSelecionado) return;
    // Captura dados completos para auditoria posterior
    const novoLead = {
        id: Date.now(),
        vendedor: document.getElementById('solVendedor').value,
        cliente: document.getElementById('cliNome').value.toUpperCase(),
        cpf: document.getElementById('cliCPF').value,
        rg: document.getElementById('cliRG').value || "N/I",
        email: document.getElementById('cliEmail').value || "N/I",
        telefone: document.getElementById('cliTel').value || "N/I",
        endereco: `${document.getElementById('endRua').value}, ${document.getElementById('endNum').value} - ${document.getElementById('endBairro').value}, ${document.getElementById('endCidade').value}`,

        veiculo: veiculoSelecionado.modelo,
        placa: veiculoSelecionado.placa, // Chave para buscar detalhes depois

        pagamento: document.getElementById('pgForma').value,
        banco: document.getElementById('pgBanco').value || "N/A",
        entrada: document.getElementById('pgEntrada').value || "0",

        trocaPlaca: document.getElementById('trocaPlaca').value || "-",
        trocaModelo: document.getElementById('trocaModelo').value || "-",
        trocaValor: document.getElementById('trocaValor').value || "0",

        valor: veiculoSelecionado.valor,
        custo: veiculoSelecionado.custo,
        status: "Análise Crédito" // Começa pendente
    };

    leadsFinanceiro.push(novoLead);
    veiculoSelecionado.status = "Reservado";
    alert("Solicitação de Venda enviada com sucesso para o Financeiro!");
    atualizarTodasTabelas();
    atualizarFinanceiroAvancado();
    navegar('sec-estoque');
}

/* --- AUDITORIA DE VENDAS (FINANCEIRO) --- */

function abrirAuditoria(index) {
    leadEmAuditoriaID = index;
    const lead = leadsFinanceiro[index];

    // Busca detalhes técnicos do carro no estoque usando a placa
    const carroDetalhes = estoque.find(c => c.placa === lead.placa) || { modelo: lead.veiculo, placa: lead.placa, valor: lead.valor };

    // PREENCHE OS CAMPOS DO MODAL DE AUDITORIA
    document.getElementById('auditNome').value = lead.cliente;
    document.getElementById('auditCPF').value = lead.cpf;
    document.getElementById('auditRG').value = lead.rg;
    document.getElementById('auditEmail').value = lead.email;
    document.getElementById('auditTel').value = lead.telefone;
    document.getElementById('auditEnd').value = lead.endereco;

    document.getElementById('auditPgForma').value = lead.pagamento;
    document.getElementById('auditPgBanco').value = lead.banco;
    document.getElementById('auditPgEntrada').value = "R$ " + parseFloat(lead.entrada).toLocaleString('pt-BR');

    document.getElementById('auditTrocaModelo').value = lead.trocaModelo;
    document.getElementById('auditTrocaPlaca').value = lead.trocaPlaca;
    document.getElementById('auditTrocaValor').value = "R$ " + parseFloat(lead.trocaValor).toLocaleString('pt-BR');

    // Gera contrato visual para auditoria
    const divContrato = document.getElementById('auditContractBody');
    const valorF = lead.valor.toLocaleString('pt-BR');
    const dataHoje = new Date();

    divContrato.innerHTML = gerarHtmlContrato(lead.cliente, lead.cpf, lead.rg, lead.endereco, valorF, carroDetalhes, dataHoje);

    // Atualiza assinatura
    document.getElementById('auditSigCliente').innerText = lead.cliente;

    // Abre modal
    document.getElementById('modalAuditoria').style.display = 'flex';
}

function fecharModalAuditoria() {
    document.getElementById('modalAuditoria').style.display = 'none';
    leadEmAuditoriaID = null;
}

function confirmarAprovacaoFinanceiro() {
    if (leadEmAuditoriaID === null) return;

    const lead = leadsFinanceiro[leadEmAuditoriaID];

    // Move para Minhas Vendas
    minhasVendas.push({
        id: lead.id,
        veiculoModelo: lead.veiculo,
        clienteNome: lead.cliente,
        valor: lead.valor,
        status: "Concluído"
    });

    // Atualiza Ranking do Vendedor
    const vendedorRank = rankingData.find(r => r.nome === lead.vendedor);
    if (vendedorRank) {
        vendedorRank.vendas += 1;
        vendedorRank.total += lead.valor;
    } else {
        rankingData.push({ nome: lead.vendedor, vendas: 1, total: lead.valor });
    }

    // Baixa definitiva no Estoque
    const carroEstoque = estoque.find(c => c.placa === lead.placa);
    if (carroEstoque) {
        carroEstoque.qtd = 0;
        carroEstoque.status = "Vendido";
    }

    // Remove da lista de pendências
    leadsFinanceiro.splice(leadEmAuditoriaID, 1);

    alert(`Venda Aprovada e Auditada com Sucesso!\nContrato validado.`);
    fecharModalAuditoria();
    atualizarTodasTabelas();
    atualizarFinanceiroAvancado();
}

function reprovarVendaFinanceiro() {
    if (leadEmAuditoriaID === null) return;
    const motivo = prompt("Motivo da Reprovação (ex: Documento ilegível, Score baixo):");
    if (motivo) {
        const lead = leadsFinanceiro[leadEmAuditoriaID];
        // Libera o carro de volta
        const carroEstoque = estoque.find(c => c.placa === lead.placa);
        if (carroEstoque) { carroEstoque.status = "Disponível"; }

        leadsFinanceiro.splice(leadEmAuditoriaID, 1);
        alert("Venda Reprovada. Carro voltou para 'Disponível'.");
        fecharModalAuditoria();
        atualizarTodasTabelas();
    }
}

function atualizarFinanceiroAvancado() {
    const custoEstoque = estoque.reduce((acc, curr) => acc + (curr.custo || 0), 0);
    const custoLeads = leadsFinanceiro.reduce((acc, curr) => acc + (curr.custo || 0), 0);
    const totalSaidas = custoEstoque + custoLeads;
    const totalEntradas = rankingData.reduce((acc, curr) => acc + curr.total, 0);
    const totalPendente = leadsFinanceiro.reduce((acc, curr) => acc + curr.valor, 0);
    const lucroEstimado = totalEntradas * 0.15;
    const margem = totalEntradas > 0 ? ((lucroEstimado / totalEntradas) * 100).toFixed(1) : 0;

    const elEntradas = document.getElementById('finEntradas');
    if (elEntradas) elEntradas.innerText = totalEntradas.toLocaleString('pt-BR');
    const elSaidas = document.getElementById('finSaidas');
    if (elSaidas) elSaidas.innerText = totalSaidas.toLocaleString('pt-BR');
    const elLucro = document.getElementById('finLucroLiquido');
    if (elLucro) elLucro.innerText = lucroEstimado.toLocaleString('pt-BR');
    const elMargem = document.getElementById('finMargem');
    if (elMargem) elMargem.innerText = margem + "%";
    const elPendente = document.getElementById('finPendente');
    if (elPendente) elPendente.innerText = totalPendente.toLocaleString('pt-BR');
}

function renderizarTabelaOS() {
    const tb = document.getElementById('tabelaOS');
    if (!tb) return;
    tb.innerHTML = '';
    listaOS.sort((a, b) => new Date(a.dataEntrega) - new Date(b.dataEntrega));
    listaOS.forEach((os, index) => {
        let stClass = os.status === 'Em Aberto' ? 'st-analise' : (os.status === 'Concluído' ? 'st-vend' : (os.status.includes('Cancelamento') ? 'st-cancel-pen' : 'st-cancelado'));
        const dataFormatada = os.dataEntrega ? new Date(os.dataEntrega).toLocaleDateString('pt-BR') : 'Sem data';
        tb.innerHTML += `<tr>
            <td>#${os.id}</td>
            <td>${os.veiculo}</td>
            <td>${dataFormatada}</td>
            <td>R$ ${os.total.toFixed(2)}</td>
            <td><span class="status-pill ${stClass}">${os.status}</span></td>
            <td>
                <button class="btn-small" onclick="editarOS(${os.id})">Editar</button>
                <button class="btn-small btn-secondary" onclick="reagendarOS(${index})">Reag</button>
                <button class="btn-small btn-danger" onclick="excluirOS(${index})">X</button>
            </td>
        </tr>`;
    });
}

function excluirOS(index) {
    if (confirm("Tem certeza que deseja excluir esta OS?")) {
        listaOS.splice(index, 1);
        renderizarTabelaOS();
    }
}

function reagendarOS(index) {
    const novaData = prompt("Digite a nova data (AAAA-MM-DD):", listaOS[index].dataEntrega);
    if (novaData) {
        listaOS[index].dataEntrega = novaData;
        alert("Reagendado!");
        renderizarTabelaOS();
    }
}

function abrirModalNovaOS() {
    osEmEdicaoID = null;
    servicosTempOS = [];
    document.getElementById('modalOSTitle').innerText = "Nova Ordem de Serviço";
    document.getElementById('osClienteInput').value = ''; document.getElementById('osVeiculoInput').value = '';
    document.getElementById('selServicoOS').value = '';
    document.getElementById('btnSalvarOS').style.display = 'inline-flex';
    document.getElementById('btnCancelarOS').style.display = 'none';
    document.getElementById('osAddServicesArea').style.display = 'block';
    document.getElementById('osAuditArea').style.display = 'none';
    atualizarListaServicosTemp();
    document.getElementById('modalOS').style.display = 'flex';
}

function editarOS(id) {
    osEmEdicaoID = id;
    const os = listaOS.find(o => o.id === id);
    if (!os) return;
    servicosTempOS = [...os.servicos];
    document.getElementById('modalOSTitle').innerText = `Editar OS #${os.id}`;
    document.getElementById('osClienteInput').value = os.cliente;
    document.getElementById('osVeiculoInput').value = os.veiculo;
    document.getElementById('osDataEntrega').value = os.dataEntrega || '';
    const podeEditar = os.status === 'Em Aberto';
    const ehGerente = currentUser && currentUser.includes('gerente');
    document.getElementById('osAddServicesArea').style.display = podeEditar ? 'block' : 'none';
    document.getElementById('btnSalvarOS').style.display = podeEditar ? 'inline-flex' : 'none';
    const btnCancel = document.getElementById('btnCancelarOS');
    btnCancel.style.display = (podeEditar && !os.status.includes('Cancelamento')) ? 'inline-flex' : 'none';
    document.getElementById('osAuditArea').style.display = (os.status === 'Pendente Cancelamento' && ehGerente) ? 'block' : 'none';
    atualizarListaServicosTemp();
    document.getElementById('modalOS').style.display = 'flex';
}

function fecharModalOS() { document.getElementById('modalOS').style.display = 'none'; }

function addServicoNaListaBtn() {
    const sel = document.getElementById('selServicoOS');
    const idServ = parseInt(sel.value);
    if (!idServ) return;
    const servico = tabelaServicos.find(s => s.id === idServ);
    if (servico) {
        servicosTempOS.push(servico);
        atualizarListaServicosTemp();
    }
}

function atualizarListaServicosTemp() {
    const tbody = document.getElementById('listaServicosAdd'); tbody.innerHTML = '';
    let total = 0;
    servicosTempOS.forEach(s => {
        tbody.innerHTML += `<tr><td>${s.nome}</td><td>R$ ${s.valor.toFixed(2)}</td><td></td></tr>`;
        total += s.valor;
    });
    document.getElementById('osTotalDisplay').innerText = total.toFixed(2).replace('.', ',');
}

function salvarOS() {
    const cli = document.getElementById('osClienteInput').value;
    const vei = document.getElementById('osVeiculoInput').value;
    const dataEntrega = document.getElementById('osDataEntrega').value;
    const total = parseFloat(document.getElementById('osTotalDisplay').innerText.replace(',', '.'));
    if (!cli || !vei || servicosTempOS.length === 0) { alert("Preencha os dados e serviços!"); return; }
    if (osEmEdicaoID) {
        const os = listaOS.find(o => o.id === osEmEdicaoID);
        if (os) {
            os.cliente = cli; os.veiculo = vei; os.servicos = servicosTempOS; os.total = total; os.dataEntrega = dataEntrega;
            alert("OS Atualizada!");
        }
    } else {
        listaOS.push({
            id: Math.floor(Math.random() * 9000) + 1000,
            cliente: cli, veiculo: vei, servicos: servicosTempOS, total: total, status: "Em Aberto", dataEntrega: dataEntrega
        });
        alert("OS Gerada!");
    }
    fecharModalOS();
    atualizarTodasTabelas();
    atualizarKPIs();
}

function solicitarCancelamentoOS() {
    if (confirm("Solicitar cancelamento desta OS?")) {
        const os = listaOS.find(o => o.id === osEmEdicaoID);
        if (os) {
            os.status = "Pendente Cancelamento";
            alert("Solicitado!");
            fecharModalOS();
            atualizarTodasTabelas();
        }
    }
}

function auditarCancelamentoOS(aprovar) {
    const os = listaOS.find(o => o.id === osEmEdicaoID);
    if (os) {
        os.status = aprovar ? "Cancelado" : "Em Aberto";
        alert(aprovar ? "OS Cancelada." : "Cancelamento rejeitado.");
        fecharModalOS();
        atualizarTodasTabelas();
    }
}

function renderizarEquipe() {
    const tbody = document.querySelector('#sec-equipe tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    equipeData.forEach((colab, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${colab.matricula}</td>
            <td>${colab.nome}<br><small>${colab.cpf}</small></td>
            <td>${colab.cargo}</td>
            <td><span class="status-pill st-disp">${colab.status}</span></td>
            <td>${colab.supervisor}</td>
            <td>
                <button class="btn-small" onclick="editarColaborador(${index})"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-small btn-secondary" onclick="transferirColaborador(${index})"><i class="fa-solid fa-exchange-alt"></i></button>
                <button class="btn-small btn-danger" onclick="excluirColaborador(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`;
    });
}

function excluirColaborador(index) {
    if (confirm(`Desligar ${equipeData[index].nome}?`)) {
        equipeData.splice(index, 1);
        renderizarEquipe();
    }
}

function transferirColaborador(index) {
    const novoSup = prompt(`Atual: ${equipeData[index].supervisor}\nNovo Supervisor:`);
    if (novoSup) {
        equipeData[index].supervisor = novoSup;
        alert("Transferido!");
        renderizarEquipe();
    }
}

function editarColaborador(index) {
    const colab = equipeData[index];
    const novoNome = prompt("Nome:", colab.nome);
    const novoCargo = prompt("Cargo:", colab.cargo);
    const novoStatus = prompt("Status:", colab.status);
    if (novoNome && novoCargo) {
        colab.nome = novoNome; colab.cargo = novoCargo; colab.status = novoStatus;
        renderizarEquipe();
    }
}

function solicitarCancelamento(index) {
    const venda = minhasVendas[index];
    if (currentUser.includes('vendedor')) {
        if (confirm("Enviar para auditoria de cancelamento?")) {
            venda.status = "Em análise de cancelamento";
            alert("Enviado para Supervisor!");
            atualizarTodasTabelas();
        }
    } else if (currentUser.includes('gerente')) {
        const motivo = prompt("Motivo do cancelamento:");
        if (motivo) {
            venda.status = "Cancelado";
            const carroEstoque = estoque.find(c => c.modelo === venda.veiculoModelo);
            if (carroEstoque) { carroEstoque.status = "Disponível"; carroEstoque.qtd = 1; }
            alert("Venda cancelada.");
            atualizarTodasTabelas();
        }
    }
}
