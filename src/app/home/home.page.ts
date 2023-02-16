import { Nota } from './nota.interface';
import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios/servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public serviciosServicios: ServiciosService,
    public router: Router,
  ) { }
  ngOnInit() {
    this.init();
  }

  init() {
    this.cargarNotas();
  }

  cargarNotas() {
    this.serviciosServicios.obtenerNotas().subscribe((resp: Nota[]) => {
      this.serviciosServicios.notas = resp;
    });
  }

  borrarNota(idNota: string) {
    this.serviciosServicios.borrarNota(idNota).subscribe(() => {
      this.cargarNotas();
    });

  }
  borrarUsuario() {
    this.serviciosServicios.borrarUsuario().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
