import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { CartService } from '../services/cart.service';
import { ToppinsModalComponent } from '../components/toppins-modal/toppins-modal.component';

const db = getDatabase();
const dbPizzas = ref(db, 'pizzas/');
const dbBebidas = ref(db, 'bebidas/');
const dbToppins  = ref(db, 'toppins/');

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.page.html',
  styleUrls: ['./home-menu.page.scss'],
  standalone:false,
})
export class HomeMenuPage implements OnInit {
  // pizzas: any[] = [];
  // bebida: any[] = [];
  // toppins: any[] = [];

  // // constructor() { }
  // constructor(private router: Router, private loadingController: LoadingController, private alertController: AlertController) {
  //     onValue(dbPizzas, (snapshot) => {
  //       this.pizzas = [];
  //       snapshot.forEach((childSnapshot) => {
  //         this.pizzas.push({
  //           id: childSnapshot.key,
  //           nombre: childSnapshot.val().nombre,
  //           imagen: childSnapshot.val().imagen,
  //           sabor: childSnapshot.val().sabor,
  //           tamano: childSnapshot.val().tamano,
  //           precio: childSnapshot.val().precio,
  //         });
  //       });
  //     }, {
  //       onlyOnce: false
  //     });

  //     onValue(dbBebidas, (snapshot) => {
  //       this.bebida = [];
  //       snapshot.forEach((childSnapshot) => {
  //         this.bebida.push({
  //           id: childSnapshot.key,
  //           nombre: childSnapshot.val().nombre,
  //           tamano: childSnapshot.val().tamano,
  //           imagen: childSnapshot.val().imagen,
  //           precio: childSnapshot.val().precio,
  //         });
  //       });
  //     }, {
  //       onlyOnce: false
  //     });

  //     onValue(dbtoppins, (snapshot) => {
  //       this.toppins = [];
  //       snapshot.forEach((childSnapshot) => {
  //         this.toppins.push({
  //           id: childSnapshot.key,
  //           nombre: childSnapshot.val().nombre,
  //           tamano: childSnapshot.val().tamano,
  //           imagen: childSnapshot.val().imagen,
  //           precio: childSnapshot.val().precio,
  //         });
  //       });
  //     }, {
  //       onlyOnce: false
  //     });



  //   }

    

    

  // ngOnInit() {
  // }

  pizzas: any[] = [];
  bebidas: any[] = [];
  toppins: any[] = [];
  cartItemCount: number = 0;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadPizzas();
    this.loadBebidas();
    this.loadToppins();
    
    // Suscribirse al contador del carrito
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  loadPizzas() {
    onValue(dbPizzas, (snapshot) => {
      this.pizzas = [];
      snapshot.forEach((childSnapshot) => {
        this.pizzas.push({
          id: childSnapshot.key,
          nombre: childSnapshot.val().nombre,
          sabor: childSnapshot.val().sabor,
          tamano: childSnapshot.val().tamano,
          precio: childSnapshot.val().precio,
          imagen: childSnapshot.val().imagen || 'assets/default-pizza.jpg'
        });
      });
    }, {
      onlyOnce: false
    });
  }

  loadBebidas() {
    onValue(dbBebidas, (snapshot) => {
      this.bebidas = [];
      snapshot.forEach((childSnapshot) => {
        this.bebidas.push({
          id: childSnapshot.key,
          nombre: childSnapshot.val().nombre,
          precio: childSnapshot.val().precio,
          tamano: childSnapshot.val().tamano,
          imagen: childSnapshot.val().imagen || 'assets/default-bebida.jpg'
        });
      });
    }, {
      onlyOnce: false
    });
  }

  loadToppins() {
    onValue(dbToppins, (snapshot) => {
      this.toppins = [];
      snapshot.forEach((childSnapshot) => {
        this.toppins.push({
          id: childSnapshot.key,
          nombre: childSnapshot.val().nombre,
          precio: childSnapshot.val().precio,
        });
      });
    }, {
      onlyOnce: false
    });
  }

  // Agregar bebida directamente al carrito
  async addBebidaToCart(bebida: any) {
    this.cartService.addToCart(bebida, 'bebida');
    
    const toast = await this.alertController.create({
      message: `${bebida.nombre} agregado al carrito`,
      // duration: 2000,
      // position: 'bottom',
      buttons: ['OK']
    });
    await toast.present();
  }

  // Abrir modal para pizzas
  async openPizzaModal(pizza: any) {
    const modal = await this.modalController.create({
      component: ToppinsModalComponent,
      componentProps: {
        pizza: pizza,
        toppins: this.toppins
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data && data.confirmed) {
      this.cartService.addToCart(pizza, 'pizza', data.selectedToppins);
      
      const toast = await this.alertController.create({
        message: `${pizza.nombre} agregada al carrito`,
        // duration: 2000,
        // position: 'bottom',
        buttons: ['OK']
      });
      await toast.present();
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

}
