import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone:false,

})
export class CartPage implements OnInit {

  // constructor() { }

  // ngOnInit() {
  // }
   cartItems: any[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
    
    // Suscribirse al total del carrito
    this.cartService.getCartTotal().subscribe(total => {
      this.total = total;
    });
  }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
  }

  updateQuantity(index: number, event: any) {
    const quantity = parseInt(event.detail.value);
    this.cartService.updateQuantity(index, quantity);
    this.loadCart();
  }

  async removeItem(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de eliminar este item del carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.cartService.removeFromCart(index);
            this.loadCart();
            this.showToast('Item eliminado del carrito');
          }
        }
      ]
    });

    await alert.present();
  }

  async clearCart() {
    const alert = await this.alertController.create({
      header: 'Vaciar Carrito',
      message: '¿Estás seguro de vaciar todo el carrito?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Vaciar',
          handler: () => {
            this.cartService.clearCart();
            this.loadCart();
            this.showToast('Carrito vaciado');
          }
        }
      ]
    });

    await alert.present();
  }

  async processOrder() {
    if (this.cartItems.length === 0) {
      this.showToast('El carrito está vacío');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Procesando orden...',
      duration: 2000
    });

    await loading.present();

    // Aquí puedes agregar la lógica para enviar la orden a Firebase
    setTimeout(async () => {
      await loading.dismiss();
      
      const alert = await this.alertController.create({
        header: 'Orden Exitosa',
        message: 'Tu orden ha sido procesada correctamente. Total: $' + this.total,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.cartService.clearCart();
              this.router.navigate(['/home-menu']);
            }
          }
        ]
      });

      await alert.present();
    }, 2000);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  getToppinsText(item: any): string {
    if (!item.toppins || item.toppins.length === 0) {
      return '';
    }
    return 'con ' + item.toppins.map((t: any) => t.nombre).join(', ');
  }

  goBack() {
    this.router.navigate(['/home-menu']);
  }

}
