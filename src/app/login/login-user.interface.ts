export interface LoginUser{
    email: string;
    password: string;
}
export interface Token { 
    token: string;
}
export interface RegisterUser {
    nombre:   string;
    apellido: string;
    email:    string;
    password: string;
}
export interface EditarUsuario {
    nombre?:   string;
    apellido?: string;
    email?:    string;
    password?: string;
}
export interface Usuario {
    _id:      string;
    nombre:   string;
    apellido: string;
    email:    string;
    password: string;
    __v:      number;
}
