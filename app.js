class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Obtenir le total des éléments
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Obtenir le coût total
  getTotalCost() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // Ajouter un produit
  addItem(product, quantity) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
  }

  // Supprimer un produit
  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  // Afficher le contenu du panier dans le DOM
  displayCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';
    if (this.items.length === 0) {
      cartContainer.innerHTML = "<p>Le panier est vide.</p>";
    } else {
      this.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
          <p>Produit : ${item.product.name}</p>
          <p>Quantité : ${item.quantity}</p>
          <p>Prix total : ${item.getTotalPrice().toFixed(2)} €</p>
        `;
        cartContainer.appendChild(itemElement);
      });
      document.getElementById('total-cost').textContent = `Total : ${this.getTotalCost().toFixed(2)} €`;
    }
  }
}

// Initialisation des produits
const products = [
  new Product(1, "Livre", 12.99),
  new Product(2, "Stylo", 1.99),
  new Product(3, "Cahier", 5.49)
];

// Création d'un nouvel objet panier
const cart = new ShoppingCart();

// Fonction pour ajouter un produit au panier en utilisant son ID
function addProductToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.addItem(product, 1); // Ajoute 1 unité du produit sélectionné
    cart.displayCart(); // Met à jour l'affichage du panier
  }
}

// Afficher le panier au chargement initial
cart.displayCart();








