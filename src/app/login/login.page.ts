import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios/servicios.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  forma!: FormGroup;
  constructor(
    private serviciosServicios: ServiciosService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.forma = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
        password: new FormControl('', [Validators.required]),
      }
    );

  }
  login() {
    Object.values(this.forma.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        Object.values(control.controls).forEach((control2) =>
          control2.markAsTouched()
        );
      }
      control.markAsTouched();
    });
    // Revisar si el formulario es valido.
    if (this.forma.invalid) {
      return;
    }

    this.serviciosServicios.login(this.forma.value).subscribe();
  }

  /* Getters */
  get correoNoValido(): boolean {
    return this.forma.get('email')!.invalid && this.forma.get('email')!.touched;
  }


}
