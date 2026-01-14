/* DADOS INICIAIS DA OFICINA */

// Lista de Serviços (Mão de Obra)
const servicosBase = [
    { id: 1, nome: "Troca de Óleo (Mão de Obra)", valor: 50.00 },
    { id: 2, nome: "Alinhamento", valor: 80.00 },
    { id: 3, nome: "Balanceamento", valor: 60.00 },
    { id: 4, nome: "Revisão Geral", valor: 250.00 },
    { id: 5, nome: "Troca de Pastilha", valor: 90.00 }
];

// Estoque de Peças
let estoquePecas = [
    { id: 101, nome: "Óleo 10W40 (Litro)", qtd: 20, custo: 25.00, venda: 45.00 },
    { id: 102, nome: "Filtro de Óleo", qtd: 15, custo: 15.00, venda: 30.00 },
    { id: 103, nome: "Pastilha de Freio (Par)", qtd: 8, custo: 60.00, venda: 120.00 },
    { id: 104, nome: "Amortecedor Tras.", qtd: 4, custo: 200.00, venda: 350.00 }
];

// Ordens de Serviço
let listaOS = [];
// Financeiro (Histórico)
let financeiroMec = [];

// Variáveis temporárias para criação de OS
let itensTempOS = [];

/* --- INICIALIZAÇÃO --- */
document.addEventListener("DOMContentLoaded", () => {
    // Recuperar usuário do login (simulado via localStorage se quisesse, mas aqui é visual)
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user') || 'Mecânico';
    document.getElementById('menuUserNome').innerText = user.toUpperCase();

    atualizarTudo();
});

function toggleMenu() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('mobileOverlay');
    sb.classList.toggle('open');
    ov.classList.toggle('open');
}

function navegar(secId) {
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
    document.getElementById(secId).classList.add('active');

    // Atualiza menu ativo
    document.querySelectorAll('.menu-items a').forEach(a => a.classList.remove('active'));
    // (Lógica simples de active no menu omitida para brevidade)

    // Títulos
    if (secId === 'sec-os') document.getElementById('pageTitle').innerText = "Gestão de Ordens de Serviço";
    if (secId === 'sec-pecas') document.getElementById('pageTitle').innerText = "Estoque de Peças";
    if (secId === 'sec-fin-mec') document.getElementById('pageTitle').innerText = "Financeiro da Oficina";
}

function atualizarTudo() {
    renderizarTabelaOS();
    renderizarEstoquePecas();
    atualizarFinanceiroMec();
}

/* --- FUNÇÕES DE OS --- */

function abrirModalNovaOS() {
    itensTempOS = [];
    document.getElementById('osCliNome').value = "";
    document.getElementById('osCliTel').value = "";
    document.getElementById('osVeiculo').value = "";
    document.getElementById('osPlaca').value = "";
    document.getElementById('osDataEntrega').value = "";

    // Preencher Selects
    const selServ = document.getElementById('selServico');
    selServ.innerHTML = '<option value="">Selecione Serviço...</option>';
    servicosBase.forEach(s => {
        selServ.innerHTML += `<option value="${s.id}|serv">${s.nome} - R$ ${s.valor}</option>`;
    });

    const selPeca = document.getElementById('selPeca');
    selPeca.innerHTML = '<option value="">Selecione Peça...</option>';
    estoquePecas.forEach(p => {
        selPeca.innerHTML += `<option value="${p.id}|peca">${p.nome} (Estoque: ${p.qtd}) - R$ ${p.venda}</option>`;
    });

    renderizarItensTemp();
    document.getElementById('modalNovaOS').style.display = 'flex';
}

function addServicoItem() {
    const val = document.getElementById('selServico').value;
    if (!val) return;
    const [id, type] = val.split('|');
    const serv = servicosBase.find(s => s.id == id);

    itensTempOS.push({
        tipo: 'Serviço',
        nome: serv.nome,
        valor: serv.valor,
        idRef: serv.id
    });
    renderizarItensTemp();
}

function addPecaItem() {
    const val = document.getElementById('selPeca').value;
    if (!val) return;
    const [id, type] = val.split('|');
    const peca = estoquePecas.find(p => p.id == id);

    // Verifica estoque (simples)
    if (peca.qtd <= 0) { alert("Peça sem estoque!"); return; }

    itensTempOS.push({
        tipo: 'Peça',
        nome: peca.nome,
        valor: peca.venda,
        custo: peca.custo, // Importante para o lucro
        idRef: peca.id
    });
    renderizarItensTemp();
}

function renderizarItensTemp() {
    const tbody = document.getElementById('listaItensOS');
    tbody.innerHTML = '';
    let total = 0;

    itensTempOS.forEach((item, index) => {
        total += item.valor;
        tbody.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.tipo}</td>
                <td>R$ ${item.valor.toFixed(2)}</td>
                <td><button class="btn-small btn-danger" onclick="removerItemTemp(${index})">X</button></td>
            </tr>
        `;
    });
    document.getElementById('totalOSDisplay').innerText = total.toFixed(2);
}

function removerItemTemp(index) {
    itensTempOS.splice(index, 1);
    renderizarItensTemp();
}

function salvarOSMecanica() {
    const cli = document.getElementById('osCliNome').value;
    const vei = document.getElementById('osVeiculo').value;
    if (!cli || !vei || itensTempOS.length === 0) { alert("Preencha cliente, veículo e adicione itens!"); return; }

    const total = itensTempOS.reduce((acc, i) => acc + i.valor, 0);
    const custoTotal = itensTempOS.reduce((acc, i) => acc + (i.custo || 0), 0); // Só peças tem custo aqui

    const novaOS = {
        id: Math.floor(Math.random() * 9000) + 1000,
        cliente: cli,
        veiculo: vei,
        status: "Em Aberto",
        itens: [...itensTempOS],
        total: total,
        custo: custoTotal,
        data: new Date().toLocaleDateString()
    };

    listaOS.push(novaOS);

    // Baixa no estoque das peças usadas
    novaOS.itens.forEach(item => {
        if (item.tipo === 'Peça') {
            const p = estoquePecas.find(x => x.id === item.idRef);
            if (p) p.qtd -= 1;
        }
    });

    fecharModal('modalNovaOS');
    atualizarTudo();
    alert("OS Gerada com Sucesso!");
}

function finalizarOS(index) {
    if (confirm("Finalizar OS e lançar no financeiro?")) {
        const os = listaOS[index];
        os.status = "Concluído";

        // Lança no financeiro
        financeiroMec.push({
            data: new Date().toLocaleDateString(),
            desc: `OS #${os.id} - ${os.cliente}`,
            tipo: 'Entrada',
            valor: os.total
        });

        // Lança o custo das peças como saída (opcional, ou deduz do lucro)
        // Aqui vamos lançar apenas a entrada bruta e calcular lucro depois

        atualizarTudo();
    }
}

function cancelarOS(index) {
    if (confirm("Cancelar OS? As peças voltarão ao estoque.")) {
        const os = listaOS[index];
        os.status = "Cancelado";

        // Devolve peças
        os.itens.forEach(item => {
            if (item.tipo === 'Peça') {
                const p = estoquePecas.find(x => x.id === item.idRef);
                if (p) p.qtd += 1;
            }
        });

        atualizarTudo();
    }
}

function renderizarTabelaOS() {
    const tbody = document.getElementById('tabelaOSMecanica');
    tbody.innerHTML = '';

    listaOS.forEach((os, index) => {
        let btnAcao = '';
        if (os.status === 'Em Aberto') {
            btnAcao = `
                <button class="btn-success btn-small" onclick="finalizarOS(${index})">Finalizar</button>
                <button class="btn-danger btn-small" onclick="cancelarOS(${index})">X</button>
            `;
        } else {
            btnAcao = `<span class="status-pill ${os.status === 'Concluído' ? 'st-vend' : 'st-cancelado'}">${os.status}</span>`;
        }

        tbody.innerHTML += `
            <tr>
                <td>#${os.id}</td>
                <td>${os.cliente}</td>
                <td>${os.veiculo}</td>
                <td>${os.status}</td>
                <td>R$ ${os.total.toFixed(2)}</td>
                <td>${btnAcao}</td>
            </tr>
        `;
    });
}

/* --- FUNÇÕES DE ESTOQUE --- */

function abrirModalEntradaPeca() {
    document.getElementById('pecaNome').value = '';
    document.getElementById('pecaQtd').value = '';
    document.getElementById('pecaCusto').value = '';
    document.getElementById('pecaVenda').value = '';
    document.getElementById('modalEntradaPeca').style.display = 'flex';
}

function salvarEntradaPeca() {
    const nome = document.getElementById('pecaNome').value;
    const qtd = parseInt(document.getElementById('pecaQtd').value);
    const custo = parseFloat(document.getElementById('pecaCusto').value);
    const venda = parseFloat(document.getElementById('pecaVenda').value);

    if (!nome || !qtd || !custo || !venda) { alert("Preencha tudo!"); return; }

    // Adiciona ao estoque
    estoquePecas.push({
        id: Date.now(),
        nome: nome,
        qtd: qtd,
        custo: custo,
        venda: venda
    });

    // Lança custo no financeiro
    financeiroMec.push({
        data: new Date().toLocaleDateString(),
        desc: `Compra de Peças: ${nome}`,
        tipo: 'Saída',
        valor: custo * qtd
    });

    fecharModal('modalEntradaPeca');
    atualizarTudo();
}

function renderizarEstoquePecas() {
    const tbody = document.getElementById('tabelaPecas');
    tbody.innerHTML = '';
    let totalItens = 0;
    let baixas = 0;

    estoquePecas.forEach(p => {
        totalItens += p.qtd;
        if (p.qtd < 5) baixas++;

        tbody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td style="${p.qtd < 5 ? 'color:red; font-weight:bold' : ''}">${p.qtd}</td>
                <td>R$ ${p.custo.toFixed(2)}</td>
                <td>R$ ${p.venda.toFixed(2)}</td>
                <td><button class="btn-small">Editar</button></td>
            </tr>
        `;
    });

    document.getElementById('kpiTotalPecas').innerText = totalItens;
    document.getElementById('kpiPecasBaixas').innerText = baixas;
}

/* --- FUNÇÕES DE FINANCEIRO --- */

function atualizarFinanceiroMec() {
    const tbody = document.getElementById('tabelaFinMecanica');
    tbody.innerHTML = '';

    let entradas = 0;
    let saidas = 0;

    financeiroMec.forEach(f => {
        if (f.tipo === 'Entrada') entradas += f.valor;
        else saidas += f.valor;

        tbody.innerHTML += `
            <tr>
                <td>${f.data}</td>
                <td>${f.desc}</td>
                <td style="color:${f.tipo === 'Entrada' ? 'green' : 'red'}">${f.tipo}</td>
                <td>R$ ${f.valor.toFixed(2)}</td>
            </tr>
        `;
    });

    document.getElementById('finMecEntradas').innerText = entradas.toFixed(2);
    document.getElementById('finMecSaidas').innerText = saidas.toFixed(2);
    document.getElementById('finMecSaldo').innerText = (entradas - saidas).toFixed(2);
}

function lancarDespesaAvulsa() {
    const desc = prompt("Descrição da Despesa:");
    const valor = parseFloat(prompt("Valor (R$):"));
    if (desc && valor) {
        financeiroMec.push({
            data: new Date().toLocaleDateString(),
            desc: desc,
            tipo: 'Saída',
            valor: valor
        });
        atualizarTudo();
    }
}

/* --- GERAIS --- */
function fecharModal(id) {
    document.getElementById(id).style.display = 'none';
}
