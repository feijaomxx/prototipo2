let equipeData = [
    { matricula: 1001, nome: "Davi Emanuel", cpf: "000.000.000-00", cargo: "Vendedor", status: "Ativo", supervisor: "Carlos (Sup)" },
    { matricula: 1002, nome: "Ana Souza", cpf: "111.111.111-11", cargo: "Vendedor", status: "Ativo", supervisor: "Carlos (Sup)" },
    { matricula: 2001, nome: "Pedro Mecânico", cpf: "222.222.222-22", cargo: "Mecânico", status: "Férias", supervisor: "Roberto (Gerente)" }
];

let estoque = [
    { id: 1, placa: "ABC-1234", modelo: "Honda CB 500F (Vermelha)", ano: 2024, valor: 38500, custo: 32000, status: "Disponível" },
    { id: 2, placa: "OXY-9988", modelo: "Yamaha XJ6 N (Preta)", ano: 2023, valor: 42900, custo: 36000, status: "Disponível" },
    { id: 3, placa: "KLE-5544", modelo: "Honda Biz 125 (Branca)", ano: 2025, valor: 16200, custo: 13500, status: "Disponível" },
    { id: 4, placa: "BMW-0011", modelo: "BMW G310 R (Azul)", ano: 2024, valor: 34500, custo: 29000, status: "Disponível" },
    { id: 5, placa: "HGT-7722", modelo: "Kawasaki Ninja 400 (Verde)", ano: 2023, valor: 39000, custo: 33000, status: "Disponível" },
    { id: 6, placa: "JUI-1020", modelo: "Honda CG 160 Titan (Azul)", ano: 2025, valor: 18500, custo: 15000, status: "Reservado" },
    { id: 7, placa: "POP-3344", modelo: "Honda Pop 110i (Vermelha)", ano: 2024, valor: 10500, custo: 8000, status: "Disponível" },
    { id: 8, placa: "XRE-5511", modelo: "Honda XRE 300 (Sahara)", ano: 2023, valor: 28900, custo: 24000, status: "Disponível" },
    { id: 9, placa: "MTZ-0707", modelo: "Yamaha MT-07 (Cinza)", ano: 2024, valor: 46500, custo: 40000, status: "Disponível" },
    { id: 10, placa: "TRI-9000", modelo: "Triumph Trident 660 (Branca)", ano: 2023, valor: 49900, custo: 43000, status: "Disponível" },
    { id: 11, placa: "NCX-7500", modelo: "Honda NC 750X (Vermelha)", ano: 2024, valor: 52000, custo: 45000, status: "Disponível" },
    { id: 12, placa: "ADV-1500", modelo: "Honda ADV 150 (Verde)", ano: 2025, valor: 23500, custo: 19500, status: "Disponível" },
    { id: 13, placa: "FAZ-2500", modelo: "Yamaha Fazer 250 (Azul)", ano: 2024, valor: 21900, custo: 18000, status: "Disponível" },
    { id: 14, placa: "ROY-3500", modelo: "Royal Enfield Meteor 350", ano: 2023, valor: 26000, custo: 21500, status: "Reservado" },
    { id: 15, placa: "ELT-1000", modelo: "Voltz EVS (Elétrica)", ano: 2025, valor: 22000, custo: 17000, status: "Disponível" }
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
            veiculo: veiculoRandom.modelo,
            placa: veiculoRandom.placa,
            valor: veiculoRandom.valor,
            custo: veiculoRandom.custo,
            pagamento: pagtoOpts[i % 4],
            status: statusOpts[i % 3]
        });
    }
}
gerarLeadsFicticios();

document.addEventListener("DOMContentLoaded", () => {
    const selServico = document.getElementById('selServicoOS');
    if (selServico) {
        tabelaServicos.forEach(s => {
            selServico.innerHTML += `<option value="${s.id}">${s.nome} - R$ ${s.valor.toFixed(2)}</option>`;
        });
    }

    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const userInp = document.getElementById('loginUser');
            if (userInp) {
                const u = userInp.value.toLowerCase();
                if (u) login(u);
            }
        });
    }
});

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
        nav.innerHTML += `<a href="#" onclick="navegar('sec-mecanica')"><i class="fa-solid fa-wrench"></i> Oficina</a>`;
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

function filtrarEstoque(txt) {
    const rows = document.querySelectorAll('#tabelaEstoque tr');
    rows.forEach(r => r.style.display = r.innerText.toLowerCase().includes(txt.toLowerCase()) ? '' : 'none');
}

function atualizarTodasTabelas() {
    const tbEst = document.getElementById('tabelaEstoque');
    if (tbEst) {
        tbEst.innerHTML = '';
        estoque.forEach(v => {
            let btn = '';
            let stClass = v.status === 'Disponível' ? 'st-disp' : 'st-res';
            if (v.status === 'Disponível' && currentUser && (currentUser.includes('vendedor') || currentUser.includes('gerente'))) {
                btn = `<button class="btn-primary btn-small" onclick="iniciarVendaWizard(${v.id})"><i class="fa-solid fa-cart-plus"></i> VENDER</button>`;
            }
            tbEst.innerHTML += `
                <tr>
                    <td><strong>${v.placa}</strong></td>
                    <td>${v.modelo}</td>
                    <td>${v.ano}</td>
                    <td>R$ ${v.valor.toLocaleString('pt-BR')}</td>
                    <td><span class="status-pill ${stClass}">${v.status}</span></td>
                    <td>${btn}</td>
                </tr>`;
        });
    }

    const tbMinhas = document.getElementById('tabelaMinhasVendas');
    if (tbMinhas) {
        tbMinhas.innerHTML = '';
        minhasVendas.forEach((v, index) => {
            let acao = '';
            if (v.status !== 'Cancelado' && v.status !== 'Em análise de cancelamento') {
                acao = `<button class="btn-small btn-danger" onclick="solicitarCancelamento(${index})">X</button>`;
            }
            tbMinhas.innerHTML += `
            <tr>
                <td>#${v.id}</td>
                <td>${v.veiculoModelo}</td>
                <td>${v.clienteNome}</td>
                <td>R$ ${v.valor.toLocaleString('pt-BR')}</td>
                <td><span class="status-pill st-vend">${v.status}</span></td>
                <td>${acao}</td>
            </tr>`;
        });
    }

    const tbLeads = document.getElementById('tabelaLeadsFin');
    if (tbLeads) {
        tbLeads.innerHTML = '';
        leadsFinanceiro.forEach((l, i) => {
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
                        <button class="btn-success btn-small" onclick="aprovarLead(${i})"><i class="fa-solid fa-check"></i></button>
                        <button class="btn-danger btn-small" onclick="alert('Lead recusado!')"><i class="fa-solid fa-xmark"></i></button>
                    </td>
                </tr>`;
        });
    }

    renderizarTabelaOS();
    renderizarEquipe();
    renderizarRanking();
}

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
    const cli = document.getElementById('cliNome').value;
    const cpf = document.getElementById('cliCPF').value;
    const end = `${document.getElementById('endRua').value}, ${document.getElementById('endNum').value}, ${document.getElementById('endCidade').value}`;
    const val = veiculoSelecionado.valor.toLocaleString('pt-BR');
    const dataHoje = new Date().toLocaleDateString('pt-BR');
    document.getElementById('contractBody').innerHTML = `
        <p>Pelo presente instrumento, <strong>FACILITA VEÍCULOS LTDA</strong>, vende para <strong>${cli.toUpperCase()}</strong>, inscrito no CPF <strong>${cpf}</strong>, residente em <strong>${end}</strong>.</p>
        <p><strong>Objeto:</strong> Veículo ${veiculoSelecionado.modelo}, Placa ${veiculoSelecionado.placa}.</p>
        <p><strong>Valor:</strong> R$ ${val} (Valor por extenso), a ser pago conforme condições acordadas.</p>
        <p>O veículo é entregue no estado em que se encontra. Maceió - AL, ${dataHoje}.</p>
    `;
    document.getElementById('receiptBody').innerHTML = `
        <div class="receipt-item"><span>DATA:</span><span>${dataHoje}</span></div>
        <hr class="dashed">
        <div class="receipt-item"><span>CLIENTE:</span><span>${cli.substring(0, 15)}...</span></div>
        <hr class="dashed">
        <div class="receipt-item"><span>VEÍCULO:</span><span>${veiculoSelecionado.modelo}</span></div>
        <div class="receipt-item"><span>PLACA:</span><span>${veiculoSelecionado.placa}</span></div>
        <div class="receipt-item"><span>VALOR UNIT.:</span><span>R$ ${val}</span></div>
    `;
    document.getElementById('receiptTotal').innerText = val;
}

function finalizarVendaWizard() {
    if (!veiculoSelecionado) return;
    const novoLead = {
        id: Date.now(),
        vendedor: document.getElementById('solVendedor').value,
        cliente: document.getElementById('cliNome').value,
        veiculo: veiculoSelecionado.modelo,
        pagamento: document.getElementById('pgForma').value,
        valor: veiculoSelecionado.valor,
        custo: veiculoSelecionado.custo
    };
    leadsFinanceiro.push(novoLead);
    veiculoSelecionado.status = "Reservado";
    alert("Solicitação de Venda enviada com sucesso para o Financeiro!");
    atualizarTodasTabelas();
    atualizarFinanceiroAvancado();
    navegar('sec-estoque');
}

function aprovarLead(index) {
    const lead = leadsFinanceiro[index];
    minhasVendas.push({
        id: lead.id,
        veiculoModelo: lead.veiculo,
        clienteNome: lead.cliente,
        valor: lead.valor,
        status: "Concluído"
    });
    const vendedorRank = rankingData.find(r => r.nome === lead.vendedor);
    if (vendedorRank) {
        vendedorRank.vendas += 1;
        vendedorRank.total += lead.valor;
    } else {
        rankingData.push({ nome: lead.vendedor, vendas: 1, total: lead.valor });
    }
    leadsFinanceiro.splice(index, 1);
    alert(`Venda de ${lead.cliente} Aprovada!\nRanking e Caixa atualizados.`);
    atualizarTodasTabelas();
    atualizarFinanceiroAvancado();
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
            if (carroEstoque) carroEstoque.status = "Disponível";
            alert("Venda cancelada.");
            atualizarTodasTabelas();
        }
    }
}
