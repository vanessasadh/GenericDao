
export class Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    endereco: string;


    constructor(id: number, nome: string, email: string, telefone: string, endereco: string) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
    }
}