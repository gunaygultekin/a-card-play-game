const clubs = new Suit("club");
const diamonds = new Suit("diamond");
const hearts = new Suit("heart");
const spades = new Suit("spade");
const all_available_cards = [...clubs.cards, ...diamonds.cards, ...hearts.cards, ...spades.cards];
var rand_card_numbers = [];
var cardsToShow = [];
var steps = 0;
var previousCardIndex = 0;

function showRandomCards() {
	this.clearAll();

	const val = Number(document.getElementById("count").value);
	const numberOfCardToShow = val * 2; // val * 2
	let cards = [];

	for (let i = 0; i < val; i++) {
		let rand_card_number = getRandomNumber(all_available_cards.length - 1, rand_card_numbers);
		rand_card_numbers.push(rand_card_number);
		const cardToAdd = all_available_cards[rand_card_number];
		cards.push(cardToAdd);
		cards.push(cardToAdd);// add a pair
	}
	cardsToShow = this.shuffle(cards);
	this.virtualize();
}
function getRandomNumber(i, numbers) {
	let rnd_number;
	do {
		rnd_number = Math.floor(Math.random() * i) + 1;
	}
	while (this.isAddedBefore(rnd_number, numbers))
	return rnd_number;
}
function isAddedBefore(id, numbers) {
	const indx = numbers.findIndex(c => c === id);
	if (indx > -1) {
		return true;
	}
	return false;
}
function clearAll() {
	this.cardsToShow = [];
	this.rand_card_numbers = [];
	this.steps = 0;
	document.getElementById("cards").innerHTML = "";
	document.getElementById("steps").innerText = 0;
}
function shuffle(array) {
	return array.sort(() => Math.random() - Math.random());
}
function shuffleCards() {
	this.shuffle(this.cards);
}
function virtualize() {
	let html = "";
	if (this.cardsToShow.length > 0) {
		cardsToShow.forEach((card, index) => {
			const { type, name } = card;
			let temp = document.getElementById("template").cloneNode(true);
			temp.getElementsByClassName("card")[0].setAttribute("id", index);
			temp.getElementsByClassName("card")[0].setAttribute("onclick", "openCard('" + index + "')");
			temp.getElementsByTagName("img")[0].src = 'svg/Playing_card_' + type + '_' + name + '.svg';
			html += temp.innerHTML;
		});
	}
	document.getElementById("cards").innerHTML = html;
}
function openCard(index) {
	let currentCard = this.cardsToShow[index];
	console.log(this.cardsToShow[index]);

	let parentElem = document.getElementById("cards");
	let cardElement = parentElem.getElementsByClassName("card")[index];
	let curtainElement = cardElement.getElementsByClassName("curtain")[0];
	if (curtainElement.className === "curtain show") {
		this.hide(curtainElement);
	} else {
		this.show(curtainElement);
	}
	this.updateCount();

	if (this.previousCardIndex === 0) {
		this.previousCardIndex = index;
	}
	else {
		setTimeout(() => {
			this.checkItemsMatch(index);

			this.checkAllCardsOpen();
		}, 500)
	}
}
function show(item) {
	item.className = "curtain show";
}
function hide(item) {
	item.className = "curtain hide";
}
function updateCount() {
	this.steps += 1;
	document.getElementById("steps").innerText = this.steps;
}
function checkItemsMatch(index) {
	const firstCard = this.cardsToShow[previousCardIndex];
	const currentCard = this.cardsToShow[index];
	const { name, type } = currentCard;
	if (firstCard.name === name && firstCard.type === type) {
		// it is match, dont close it
		const parentElem = document.getElementById("cards");
		// close current card
		parentElem.getElementsByClassName("card")[index].className = "card block";
		// close previous card
		parentElem.getElementsByClassName("card")[previousCardIndex].className = "card block";
	}
	else {
		const parentElem = document.getElementById("cards");
		// close all current card
		let cardElement = parentElem.getElementsByClassName("card")[index];
		cardElement.getElementsByClassName("curtain")[0].className = "curtain show";
		// close previous card
		let previousCardElement = parentElem.getElementsByClassName("card")[previousCardIndex];
		previousCardElement.getElementsByClassName("curtain")[0].className = "curtain show";
	}
	this.previousCardIndex = 0; // reset
}
function checkAllCardsOpen() {
	const parentElem = document.getElementById("cards");
	const size = parentElem.getElementsByClassName("curtain show").length;
	if (size === 0) {
		alert("You have finished successfully with " + this.steps + " number of steps");
		this.clearAll();
		this.showRandomCards();
	}
}
function handleOnInput() {
	const inputVal = Number(document.getElementById("count").value);
	let buttonElem = document.getElementsByTagName("button")[0];
	let spanWrapper = document.getElementById("stepWrapper");
	if (inputVal < 2) {
		alert("Count should have at least 2");
		buttonElem.className = "hideElement";
		spanWrapper.className = "hideElement";
	}
	else {
		buttonElem.className = "";
		spanWrapper.className = "";
	}
}