import { EditarUsuario } from './../login/login-user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, pipe, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EditarNota, Nota } from '../home/nota.interface';
import { LoginUser, RegisterUser } from '../login/login-user.interface';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  url: string = "http://localhost:3000";
  notasEndPoint = `${this.url}/Nota`;
  usuarioEndPoint = `${this.url}/user`;
  notas: Nota[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
  ) { }

  login(usuario: LoginUser) {
    const url = `${this.url}/Entrar`;
    return this.http.post(url, usuario)
    .pipe(
      catchError( this.handleError),
      map((resp: any) => {
        localStorage.setItem('token', resp.token);
        this.router.navigate(['/home']);
        return resp;
      })
    );

  }
  registerUser(registerUser: RegisterUser) {
    const url = `${this.url}/Registro`;
    return this.http.post(url, registerUser)
    .pipe(
      catchError( this.handleError),
      map((resp: any) => {
        this.router.navigate(['/login']);
        return resp;
      })
    );
  }
  crearNota(crearNota: EditarNota) {
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.notasEndPoint, crearNota, {headers})
    .pipe(
      catchError( this.handleError),
      map((resp: any) => {
        this.obtenerNotas().subscribe();
        this.router.navigate(['/home']);
        return resp;
      })
    );
  }
  obtenerNotas(){

    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);;

    return this.http.get(this.notasEndPoint, {headers})
    .pipe(
      catchError( this.handleError),
      map((resp: any) => {
        this.notas = resp;
        return resp;
      })
    );
  }
  borrarNota(idNota: string){
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);;

    return this.http.delete(`${this.notasEndPoint}/${idNota}`, {headers})
    .pipe(
      catchError( this.handleError),
      map((resp: any) => {
        this.obtenerNotas().subscribe();
        return resp;
      })
    );
  }
  obtenerNotaPorId(idNota: string){
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);;

    return this.http.get(`${this.notasEndPoint}/${idNota}`, {headers})
    .pipe(
      catchError( this.handleError),
      map((resp: any) => {
        return resp;
      })
    );
  }
  editarNota(idNota: string, editarNota: EditarNota){

    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);;

    return this.http.put(`${this.notasEndPoint}/${idNota}`, editarNota, {headers})
    .pipe(
      catchError( this.handleError),
      map((resp: any) => {
        this.obtenerNotas().subscribe();
        console.log("this.notas ", this.notas);
        return resp;
      })
    );
  }
  editarUsuario(editarUsuario: EditarUsuario){

    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);;

    return this.http.put(this.usuarioEndPoint, editarUsuario, {headers})
    .pipe(
      catchError( this.handleError),
      map((resp: any) => {
        return resp;
      })
    );
  }
  obtenerUsuarioDelToken(){
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);;

    return this.http.get(this.usuarioEndPoint, {headers})
    .pipe(
      catchError( this.handleError),
      map((resp: any) => {
        return resp;
      })
    );
  }
  obtenerToken() : string{
    return localStorage.getItem('token') || '';
  }
  handleError(err:any){
    console.log(err);
    return throwError(err);
  }
  borrarUsuario(){
    const token = this.obtenerToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);;

    return this.http.delete(this.usuarioEndPoint, {headers})
    .pipe(
      catchError( this.handleError),
      map((resp: any) => {
        localStorage.clear();
        return resp;
      })
    );
  }

}
