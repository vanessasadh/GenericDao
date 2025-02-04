import {getDBConection} from './database';
import {Pedido} from './Pedido';
export class PedidoDAO {
    async criar(pedido: Pedido): Promise<void> {
        const db = await getDBConection();
        await db.run(`INSERT INTO Pedido(clienteId, produtoId, quantidade, data) VALUES (?, ?, ?, ?)`,
            [pedido.clienteId,pedido.produtoId, pedido.quantidadeId, pedido.data]

        );
        await db.close();
    }
    async listarTodos(): Promise<Pedido[]>
    {
        const db = await getDBConection();
        const pedidos = await db.all(`SELECT * FROM Pedido`);
        await db.close();
        return pedidos.map((p) => new Pedido(p.id, p.clienteId, p.produtoId, p.quantidade, p.data));
    }
    async buscaporId(id: number): Promise<Pedido | null> {
        const db = await getDBConection();
        const pedido = await db. get(`SELECT * FROM Pedido WHERE id = ?`, [id]);
        await db. close();
        return pedido?  new Pedido(pedido.id, pedido.cliente, pedido.produtoId, pedido.quantidade, pedido.data): null;
    }
    async atualizar(pedido: Pedido): Promise<void> {
        const db = await getDBConection();
        await db.run(`UPDATE Pedido SET clienteId = ?, produtoId, = ?, quantidade = ?, data = ?, WHERE id = ?`,
            [pedido.clienteId,pedido.produtoId, pedido.quantidadeId, pedido.id]
        );
        await db. close();
    }
    async excluir(id: number): Promise<void> {
        const db = await getDBConection();
        await db.run(`DELETE FROM Pedido WHERE id = ?`, [id]);
        await db.close();
    }
}