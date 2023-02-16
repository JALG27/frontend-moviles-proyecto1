export interface Nota {
    _id:         string;
    usuarioId:   string;
    titulo:      string;
    descripcion: string;
    __v:         number;
}
export interface EditarNota {
    titulo:      string;
    descripcion: string;
}