import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  tipo: 'pizza' | 'bebida';
  imagen?: string;
  toppins?: any[];
  subtotal?: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartItem[] = [];
  private cartItemCount = new BehaviorSubject(0);
  private cartTotal = new BehaviorSubject(0);

  constructor() {
    // Cargar carrito desde localStorage si existe
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.updateCartData();
    }
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  getCartTotal() {
    return this.cartTotal.asObservable();
  }

  addToCart(item: any, tipo: 'pizza' | 'bebida', toppins: any[] = []) {
    let cartItem: CartItem = {
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: 1,
      tipo: tipo,
      imagen: item.imagen,
      toppins: toppins,
      subtotal: item.precio
    };

    // Calcular precio con toppins
    if (toppins.length > 0) {
      const toppinsTotal = toppins.reduce((sum, toppin) => sum + toppin.precio, 0);
      cartItem.subtotal = cartItem.precio + toppinsTotal;
    }

    // Verificar si el item ya existe
    const existingIndex = this.cart.findIndex(ci => 
      ci.id === cartItem.id && 
      JSON.stringify(ci.toppins) === JSON.stringify(cartItem.toppins)
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].cantidad++;
      this.cart[existingIndex].subtotal = this.cart[existingIndex].subtotal! * this.cart[existingIndex].cantidad;
    } else {
      this.cart.push(cartItem);
    }

    this.updateCartData();
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.updateCartData();
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity === 0) {
      this.removeFromCart(index);
    } else {
      this.cart[index].cantidad = quantity;
      const basePrice = this.cart[index].precio;
      const toppinsPrice = this.cart[index].toppins?.reduce((sum, toppin) => sum + toppin.precio, 0) || 0;
      this.cart[index].subtotal = (basePrice + toppinsPrice) * quantity;
      this.updateCartData();
    }
  }

  clearCart() {
    this.cart = [];
    this.updateCartData();
  }

  private updateCartData() {
    // Actualizar contador de items
    const itemCount = this.cart.reduce((count, item) => count + item.cantidad, 0);
    this.cartItemCount.next(itemCount);

    // Actualizar total
    const total = this.cart.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    this.cartTotal.next(total);

    // Guardar en localStorage
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  // constructor() { }
}
