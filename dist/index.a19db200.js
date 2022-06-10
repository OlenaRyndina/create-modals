let fruits = [
    {
        id: 1,
        title: "\u042F\u0431\u043B\u043E\u043A\u0438",
        price: 20,
        img: "./assets/apples.jpg"
    },
    {
        id: 2,
        title: "\u0410\u043F\u0435\u043B\u044C\u0441\u0438\u043D\u044B",
        price: 30,
        img: "./assets/oranges.jpg"
    },
    {
        id: 3,
        title: "\u041C\u0430\u043D\u0433\u043E",
        price: 40,
        img: "./assets/mango.jpg"
    }
];
const toHTML = (fruit)=>`
    <div class="col">
	    <div class="card">
            <img src="${fruit.img}" class="card-img-top" alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
	</div>
`;
function render() {
    const html = fruits.map((fruit)=>toHTML(fruit)).join("");
    document.querySelector("#fruits").innerHTML = html;
}
render();
const priceModal = $.modal({
    title: "\u0426\u0435\u043D\u0430 \u043D\u0430 \u0442\u043E\u0432\u0430\u0440",
    closable: true,
    width: "400px",
    footerButtons: [
        {
            text: "Ok",
            type: "primary",
            handler () {
                priceModal.close();
            }
        }
    ]
});
document.addEventListener("click", (event)=>{
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit1 = fruits.find((fruit)=>fruit.id === id);
    if (btnType === "price") {
        priceModal.setContent(`
            <p>Цена на ${fruit1.title}: <strong>${fruit1.price}$</strong></p>
			`);
        priceModal.open();
    } else if (btnType === "remove") $.confirm({
        title: "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B?",
        content: `<p>Вы удаляете фрукт: <strong>${fruit1.title}</strong></p>`
    }).then(()=>{
        fruits = fruits.filter((fruit)=>fruit.id !== id);
        render();
    }).catch(()=>{
        console.log("Cancel");
    });
});

//# sourceMappingURL=index.a19db200.js.map
