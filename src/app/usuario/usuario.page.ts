import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../login/login-user.interface';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  forma!: FormGroup;
  constructor(
    private serviciosServicios: ServiciosService,
    public router: Router,

  ) { }

  ngOnInit() {
    this.init()
  }
  init() {
    this.obtenerUsuario();
  }
  obtenerUsuario(){
    this.serviciosServicios.obtenerUsuarioDelToken().subscribe((resp : Usuario) => {
      const { nombre, apellido, email } = resp;
      this.inicializarForma(nombre, apellido, email);
    });
  }
  inicializarForma(nombre: string, apellido: string, email: string) : void {
    this.forma = new FormGroup(
      {
        nombre: new FormControl(nombre, [Validators.required]),
        apellido: new FormControl(apellido, [Validators.required]),
        email: new FormControl(email, [Validators.required, Validators.email, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
        password: new FormControl('', [Validators.required]),
      }
    );
  }
  editarUsuario(){
    this.serviciosServicios.editarUsuario(this.forma.value).subscribe((resp : Usuario) => {
      this.router.navigate(['/home']);
    });
  }
    /* Getters */
    get correoNoValido(): boolean {
      return this.forma.get('email')!.invalid && this.forma.get('email')!.touched;
    }
}
