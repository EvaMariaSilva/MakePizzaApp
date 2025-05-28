import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonButton, IonTitle, IonButtons, IonIcon, IonContent, IonList, IonListHeader, IonLabel, IonItem, IonCheckbox } from "@ionic/angular/standalone";

@Component({
  selector: 'app-toppins-modal',
  templateUrl: './toppins-modal.component.html',
  // template: '',
   template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Personaliza tu {{pizza.nombre}}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-list-header>
          <ion-label>¿Deseas agregar toppings?</ion-label>
        </ion-list-header>
        
        <ion-item *ngFor="let toppin of toppins">
          <ion-checkbox [(ngModel)]="toppin.selected" slot="start"></ion-checkbox>
          <ion-label>
            <h2>{{toppin.nombre}}</h2>
            <p>$ {{toppin.precio}}</p>
          </ion-label>
        </ion-item>
      </ion-list>

      <div class="total-section">
        <h3>Total: $ {{calculateTotal()}}</h3>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="dismiss()" color="medium">
            Cancelar
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button (click)="addToCart()" color="primary">
            Agregar al Carrito
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  `,
  styleUrls: ['./toppins-modal.component.scss'],
})
export class ToppinsModalComponent  implements OnInit {

  // constructor() { }

  // ngOnInit() {}

  @Input() pizza: any;
  @Input() toppins: any[] = [];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // Inicializar la propiedad selected en false
    this.toppins = this.toppins.map(toppin => ({
      ...toppin,
      selected: false
    }));
  }

  calculateTotal() {
    const selectedToppins = this.toppins.filter(t => t.selected);
    const toppinsTotal = selectedToppins.reduce((sum, t) => sum + t.precio, 0);
    return this.pizza.precio + toppinsTotal;
  }

  dismiss() {
    this.modalController.dismiss({
      confirmed: false
    });
  }

  addToCart() {
    const selectedToppins = this.toppins.filter(t => t.selected);
    this.modalController.dismiss({
      confirmed: true,
      selectedToppins: selectedToppins
    });
  }

}
