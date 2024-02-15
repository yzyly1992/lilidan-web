import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = [
    {
      id: 0,
      name: 'Velvet Reverie',
      price: 10,
      discount: 10,
      description: 'Velvet Reverie (Rose): Envelop yourself in the ethereal embrace of Velvet Reverie. Unveil the secrets of petals as they gently cradle your senses, inviting you to a dreamlike realm of timeless beauty.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 1,
      name: "Serenity's Breath",
      price: 10,
      discount: 10,
      description: "Serenity's Breath (Lavender): Inhale Serenity's Breath, where whispers of lavender unfold like a delicate dance. Allow the tranquil breeze of purple hues to guide you to a sanctuary of calm and contemplation.",
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Citrus Serenade',
      price: 10,
      discount: 10,
      description: 'Citrus Serenade (Orange and Lime Blend): Dance through the zesty notes of Citrus Serenade, where vibrant oranges and lively limes join forces in a harmonious celebration. Refresh your spirit and invigorate your senses with the lively citrus melody.',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Jade Whispers',
      price: 10,
      discount: 10,
      description: "Jade Whispers (Green Tea with Jasmine): Listen to the Jade Whispers as green tea leaves entwine with the delicate notes of jasmine. Embark on a journey where purity meets allure, and tranquility finds its elegant voice.",
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  constructor() { }

  getProducts() {
    return this.products;
  }

  getProduct(id: number) {
    return this.products.find(product => product.id === id);
  }
}
