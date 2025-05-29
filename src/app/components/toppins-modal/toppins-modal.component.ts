import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonTitle, IonCheckbox } from "@ionic/angular/standalone";

@Component({
  selector: 'app-toppins-modal',
  templateUrl: './toppins-modal.component.html',
  styleUrls: ['./toppins-modal.component.scss'],
  standalone: false
})
export class ToppinsModalComponent  implements OnInit {

  // constructor() { }

  // ngOnInit() {}
  @Input() pizza: any;
  @Input() toppins: any[] = [];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log('Pizza recibida:', this.pizza);
    console.log('Toppins recibidos:', this.toppins);
    
    // Inicializar la propiedad selected en false
    if (this.toppins && this.toppins.length > 0) {
      this.toppins = this.toppins.map(toppin => ({
        ...toppin,
        selected: false
      }));
    }
  }

  calculateTotal() {
    if (!this.pizza) return 0;
    
    const selectedToppins = this.toppins.filter(t => t.selected);
    const toppinsTotal = selectedToppins.reduce((sum, t) => sum + (t.precio || 0), 0);
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
