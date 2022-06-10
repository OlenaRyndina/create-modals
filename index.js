let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: './assets/apples.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: './assets/oranges.jpg'},
    {id: 3, title: 'Манго', price: 40, img: './assets/mango.jpg'}
];

const toHTML = fruit => `
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
`

function render() {
	const html = fruits.map(fruit => toHTML(fruit)).join('');
	document.querySelector('#fruits').innerHTML = html;
}

render();

const priceModal = $.modal({
	title: 'Цена на товар',
	closable: true,
	width: '400px',
	footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
        	priceModal.close();
        }}
	]
})

document.addEventListener('click', event => {
	event.preventDefault();
	const btnType = event.target.dataset.btn;
	const id = +event.target.dataset.id;
	const fruit = fruits.find(fruit => fruit.id === id);

	if(btnType === 'price') {

		priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
			`)
		priceModal.open();
	} else if (btnType === 'remove') {

		$.confirm({
			title: 'Вы уверены?',
			content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
		}).then(() => {
			fruits = fruits.filter(fruit => fruit.id !== id);
			render();
		})
		  .catch(() => {
		  	console.log('Cancel');
		  })
	}
})