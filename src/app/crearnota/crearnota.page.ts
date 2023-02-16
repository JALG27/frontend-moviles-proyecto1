import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarNota, Nota } from '../home/nota.interface';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-crearnota',
  templateUrl: './crearnota.page.html',
  styleUrls: ['./crearnota.page.scss'],
})
export class CrearnotaPage implements OnInit {

  forma!: FormGroup;
  id: string = '';
  nota: Nota = { 
    _id:         "",
    usuarioId:   "",
    titulo:      "",
    descripcion: "",
    __v:         0,
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviciosServicios: ServiciosService

  ) { }

  ngOnInit() {
    this.init()
  }
  init() {
    this.inicializarForma('', '')
  }
  inicializarForma(titulo: string, descripcion: string) : void {
    this.forma = new FormGroup(
      {
        titulo: new FormControl(titulo, [Validators.required]),
        descripcion: new FormControl(descripcion, [Validators.required]),
      }
    );
  }
  crearNota() {
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
    const editarNota : EditarNota = { 
      titulo: this.forma.controls['titulo'].value,
      descripcion: this.forma.controls['descripcion'].value,
    }
    this.serviciosServicios.crearNota(editarNota).subscribe(()=>{
      this.router.navigate(['/home']);
    });
  }

}
