export class Produto {
    id: number;
    nome: string;
    preco: number;
    estoque: number;
    categoria:string;

    constructor(id:number, nome: string, preco: number, estoque: number, categoria: string) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
    }

}