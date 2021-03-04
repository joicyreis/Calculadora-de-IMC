import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  weight: number;
  height: number;
  alert: String;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return (this.height && this.weight && this.height > 0 && this.weight > 0);
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);
    if(imc <= 18.5) {
      this.alert = "Você está abaixo do peso ideal."
    } else if(imc > 18.5 && imc <= 24.9) {
      this.alert = "Parabéns! Você está no peso ideal."
    } else if(imc > 24.9 && imc <= 29.9) {
      this.alert = "Você está acima do peso ideal."
    } else if(imc > 29.9 && imc <= 39.9) {
      this.alert = "Condiderado obesidade."
    } else if(imc > 39.9) {
      this.alert = "Considerado obesidade grave."
    }
    this.showMessage(`Seu IMC é <b>${imc.toFixed(2)}</b>. ${this.alert}`);
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create(
      {
        message: msg,
        color: 'primary',
        buttons: [
          {
            icon: 'close'
          }
        ]
      }
    );
    toast.present();
  }
}
