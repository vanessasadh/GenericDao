
export class Pedido {
    id: number;
    clienteId: number;
    produtoId: number;
    quantidadeId: number;
    data: Date;


    constructor(id: number, clienteId: number, produtoId: number, quantidadeId: number, data: Date) {
        this.id = id;
        this.clienteId = clienteId;
        this.produtoId = produtoId;
        this.quantidadeId = quantidadeId;
        this.data = data;
    }
}