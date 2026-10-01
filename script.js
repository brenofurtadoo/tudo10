const produtos = [
    {
        nome: "Pano multiuso",
        categoria: "Limpeza",
        preco: 10,
        imagem: "pano-multiuso.jpeg"
    },
    {
        nome: "Jarra de plástico",
        categoria: "Cozinha",
        preco: 10,
        imagem: "jarra-plastico.jpeg"
    },
    {
        nome: "Vaso de flor",
        categoria: "Decoração",
        preco: 10,
        imagem: "vaso-flor.jpeg"
    },
    {
        nome: "Flor de decoração artificial",
        categoria: "Decoração",
        preco: 10,
        imagem: "flor-artificial.jpeg"
    },
    {
        nome: "Quadros",
        categoria: "Decoração",
        preco: 10,
        imagem: "quadros.jpeg"
    },
    {
        nome: "Tapete 58x38",
        categoria: "Casa",
        preco: 10,
        imagem: "tapete.jpeg"
    },
    {
        nome: "Cesta organizadora",
        categoria: "Organização",
        preco: 10,
        imagem: "cesta-organizadora.jpeg",
        observacao: "2 unidades por R$10"
    },
    {
        nome: "Pano de microfibra",
        categoria: "Limpeza",
        preco: 10,
        imagem: "pano-microfibra.jpeg"
    },
    {
        nome: "Conjunto de pincéis",
        categoria: "Papelaria & Artesanato",
        preco: 10,
        imagem: "conjunto-pinceis.jpeg"
    },
    {
        nome: "Jogo de chaves",
        categoria: "Ferramentas",
        preco: 10,
        imagem: "jogo-chaves.jpeg",
        observacao: "4 chaves"
    },
    {
        nome: "Escorredor de louças — Tipo 1",
        categoria: "Cozinha",
        preco: 10,
        imagem: "escorredor-1.jpeg"
    },
    {
        nome: "Escorredor de louças — Tipo 2",
        categoria: "Cozinha",
        preco: 10,
        imagem: "escorredor-2.jpeg"
    },
    {
        nome: "Kit costura",
        categoria: "Papelaria & Artesanato",
        preco: 10,
        imagem: "kit-costura.jpeg"
    },
    {
        nome: "Kit Brush Pen",
        categoria: "Papelaria & Artesanato",
        preco: 10,
        imagem: "brush-pen.jpeg"
    },
    {
        nome: "Lixeira",
        categoria: "Casa",
        preco: 10,
        imagem: "lixeira.jpeg"
    },
    {
        nome: "Organizador com divisórias",
        categoria: "Organização",
        preco: 10,
        imagem: "organizador-divisorias.jpeg"
    },
    {
        nome: "Trena de medição",
        categoria: "Ferramentas",
        preco: 10,
        imagem: "trena.jpeg"
    }
];

const productList = document.getElementById("product-list");


// ======================================================
// PRODUTOS
// ======================================================

function renderizarProdutos(lista) {
    productList.innerHTML = "";

    lista.forEach(produto => {
        const card = document.createElement("article");

        card.classList.add("product-card");

        card.innerHTML = `
            <div class="product-image">
                <img
                    src="images/${produto.imagem}"
                    alt="${produto.nome}"
                >
            </div>

            <div class="product-info">

                <p class="product-category">
                    ${produto.categoria}
                </p>

                <h3>
                    ${produto.nome}
                </h3>

                ${
                    produto.observacao
                        ? `<span class="product-note">${produto.observacao}</span>`
                        : ""
                }

                <div class="product-bottom">

                    <strong>
                        R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    </strong>

                    <button
                        class="add-button"
                        data-nome="${produto.nome}"
                    >
                        + Adicionar
                    </button>

                </div>

            </div>
        `;

        productList.appendChild(card);
    });
}


// ======================================================
// CARRINHO
// ======================================================

let carrinho = [];

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

function adicionarAoCarrinho(nomeProduto) {
    const produto = produtos.find(
        item => item.nome === nomeProduto
    );

    if (!produto) return;

    const itemExistente = carrinho.find(
        item => item.nome === nomeProduto
    );

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}


function atualizarCarrinho() {

    cartItems.innerHTML = "";

    if (carrinho.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Seu carrinho está vazio.
            </p>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "R$ 0,00";

        return;
    }

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(item => {

        total += item.preco * item.quantidade;
        quantidadeTotal += item.quantidade;

        const elemento = document.createElement("div");

        elemento.classList.add("cart-item");

        elemento.innerHTML = `
            <img
                class="cart-item-image"
                src="images/${item.imagem}"
                alt="${item.nome}"
            >

            <div class="cart-item-info">

                <strong>
                    ${item.nome}
                </strong>

                <span>
                    R$ ${item.preco.toFixed(2).replace(".", ",")}
                </span>

                <div class="cart-item-actions">

                    <button
                        class="quantity-button"
                        data-action="minus"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantidade}
                    </span>

                    <button
                        class="quantity-button"
                        data-action="plus"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-button"
                data-action="remove"
            >
                ×
            </button>
        `;


        // DIMINUIR QUANTIDADE
        elemento
            .querySelector('[data-action="minus"]')
            .addEventListener("click", () => {

                item.quantidade--;

                if (item.quantidade <= 0) {

                    carrinho = carrinho.filter(
                        produto => produto.nome !== item.nome
                    );
                }

                atualizarCarrinho();
            });


        // AUMENTAR QUANTIDADE
        elemento
            .querySelector('[data-action="plus"]')
            .addEventListener("click", () => {

                item.quantidade++;

                atualizarCarrinho();
            });


        // REMOVER
        elemento
            .querySelector('[data-action="remove"]')
            .addEventListener("click", () => {

                carrinho = carrinho.filter(
                    produto => produto.nome !== item.nome
                );

                atualizarCarrinho();
            });


        cartItems.appendChild(elemento);
    });


    cartCount.textContent = quantidadeTotal;

    cartTotal.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;
}


// ======================================================
// ABRIR / FECHAR CARRINHO
// ======================================================

const cartButton = document.querySelector(".cart-button");
const cart = document.getElementById("cart");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");


function abrirCarrinho() {
    cart.classList.add("open");
    cartOverlay.classList.add("open");
}


function fecharCarrinho() {
    cart.classList.remove("open");
    cartOverlay.classList.remove("open");
}


cartButton.addEventListener("click", abrirCarrinho);

closeCart.addEventListener("click", fecharCarrinho);

cartOverlay.addEventListener("click", fecharCarrinho);


// ======================================================
// CHECKOUT
// ======================================================

const checkoutOverlay =
    document.getElementById("checkout-overlay");

const checkoutItems =
    document.getElementById("checkout-items");

const checkoutTotal =
    document.getElementById("checkout-total");

const checkoutButton =
    document.querySelector(".checkout-button");

const closeCheckout =
    document.getElementById("close-checkout");

const backToCart =
    document.getElementById("back-to-cart");


function abrirCheckout() {

    if (carrinho.length === 0) {
        return;
    }

    checkoutItems.innerHTML = "";

    let total = 0;

    carrinho.forEach(item => {

        total += item.preco * item.quantidade;

        const elemento = document.createElement("div");

        elemento.classList.add("checkout-item");

        elemento.innerHTML = `
            <img
                class="checkout-item-image"
                src="images/${item.imagem}"
                alt="${item.nome}"
            >

            <div class="checkout-item-info">

                <strong>
                    ${item.nome}
                </strong>

                <span>
                    ${item.quantidade} unidade(s)
                    × R$ ${item.preco.toFixed(2).replace(".", ",")}
                </span>

            </div>

            <strong class="checkout-item-price">
                R$ ${(item.preco * item.quantidade)
                    .toFixed(2)
                    .replace(".", ",")}
            </strong>
        `;

        checkoutItems.appendChild(elemento);
    });

    checkoutTotal.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;

    fecharCarrinho();

    checkoutOverlay.classList.add("open");
}


function fecharCheckout() {
    checkoutOverlay.classList.remove("open");
}


checkoutButton.addEventListener(
    "click",
    abrirCheckout
);

closeCheckout.addEventListener(
    "click",
    fecharCheckout
);


backToCart.addEventListener("click", () => {

    fecharCheckout();

    abrirCarrinho();
});


// ======================================================
// BOTÕES "ADICIONAR"
// ======================================================

function adicionarEventosProdutos() {

    document
        .querySelectorAll(".add-button")
        .forEach(botao => {

            botao.addEventListener("click", () => {

                const nomeProduto =
                    botao.dataset.nome;

                adicionarAoCarrinho(nomeProduto);
            });
        });
}


// ======================================================
// BUSCA + CATEGORIAS
// ======================================================

const searchInput =
    document.querySelector(".search input");

const categoryButtons =
    document.querySelectorAll(".category-button");

let categoriaSelecionada = "Todos";


function aplicarFiltros() {

    const texto =
        searchInput.value.toLowerCase().trim();

    const produtosFiltrados =
        produtos.filter(produto => {

            const correspondeBusca =
                produto.nome
                    .toLowerCase()
                    .includes(texto) ||

                produto.categoria
                    .toLowerCase()
                    .includes(texto);

            const correspondeCategoria =
                categoriaSelecionada === "Todos" ||

                produto.categoria ===
                categoriaSelecionada;

            return (
                correspondeBusca &&
                correspondeCategoria
            );
        });


    renderizarProdutos(produtosFiltrados);

    adicionarEventosProdutos();


    if (produtosFiltrados.length === 0) {

        productList.innerHTML = `
            <div class="no-products">

                <strong>
                    Nenhum produto encontrado
                </strong>

                <p>
                    Tente buscar outro produto
                    ou escolher outra categoria.
                </p>

            </div>
        `;
    }
}


searchInput.addEventListener(
    "input",
    aplicarFiltros
);


categoryButtons.forEach(botao => {

    botao.addEventListener("click", () => {

        categoriaSelecionada =
            botao.dataset.categoria;


        categoryButtons.forEach(button => {
            button.classList.remove("active");
        });


        botao.classList.add("active");

        aplicarFiltros();
    });
});


// ======================================================
// WHATSAPP
// ======================================================

const whatsappButton =
    document.getElementById("whatsapp-button");


whatsappButton.addEventListener("click", () => {

    if (carrinho.length === 0) {
        return;
    }

    let mensagem =
        "Olá! Gostaria de fazer um pedido:%0A%0A";

    let total = 0;


    carrinho.forEach(item => {

        const subtotal =
            item.preco * item.quantidade;

        total += subtotal;

        mensagem +=
            `• ${item.quantidade}x ${item.nome} — R$ ${subtotal
                .toFixed(2)
                .replace(".", ",")}%0A`;
    });


    mensagem +=
        `%0A*Total: R$ ${total
            .toFixed(2)
            .replace(".", ",")}*`;


    const numero = "5535997345805";

    const url =
        `https://wa.me/${numero}?text=${mensagem}`;


    window.open(url, "_blank");
});


// ======================================================
// INICIALIZAÇÃO
// ======================================================

renderizarProdutos(produtos);

adicionarEventosProdutos();