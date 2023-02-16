import { EditarNota } from './../home/nota.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nota } from '../home/nota.interface';
import { ServiciosService } from '../servicios/servicios.service';

@Component({
  selector: 'app-editarnota',
  templateUrl: './editarnota.page.html',
  styleUrls: ['./editarnota.page.scss'],
})
export class EditarnotaPage implements OnInit {
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
    this.obtenerNota();
  }
  inicializarForma(titulo: string, descripcion: string) : void {
    this.forma = new FormGroup(
      {
        titulo: new FormControl(titulo, [Validators.required]),
        descripcion: new FormControl(descripcion, [Validators.required]),
      }
    );
  }
  obtenerNota(){
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.serviciosServicios.obtenerNotaPorId(this.id).subscribe((resp : Nota) => {
      this.nota = resp;
      const { titulo, descripcion } = resp;
      this.inicializarForma(titulo, descripcion);
    });
  }
  editarNota() {
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
    this.serviciosServicios.editarNota(this.id, editarNota).subscribe(()=>{
      this.router.navigate(['/home']);
    });
  }
  

}
