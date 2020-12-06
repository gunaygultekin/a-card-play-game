class Suit {
  constructor(type) {
    this.type = type;

    this.cards = [];
    for (let i = 0; i < 13; i++) {
      this.cards.push({
        type: this.type,
        name: this.cardName(i)
      })
    }
  }

  cardName(index) {
    switch (index) {
      case 0:
        return "A";// ace
      case 10:
        return "J"; // jack
      case 11:
        return "Q"; // queen
      case 12:
        return "K"; // king
      default:
        return index + 1;
    }
  }
}