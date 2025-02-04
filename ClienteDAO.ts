import { getDBConection } from "./models/database";
import {Cliente} from './models/Cliente'


export class ClienteDAO {
    async criar (cliente: Cliente):Promise<void> {
        const db = await getDBConection();
        await db.run(`INSERT INTO CLIENTE (nome, email, telefone, endereco) VALUES (?, ?,?,?)`,

                [cliente.nome, cliente.email, cliente.telefone,cliente.endereco]
            
        );
        await db.close();

    }
    async listarTodos(): Promise<Cliente[]>
    {
        const db = await getDBConection();
        const clientes = await db.all(`SELECT * FROM Cliente`);
        await db. close();
        return clientes.map((c) => new Cliente(c.id, c.nome, c.email, c.telefone, c.endereco));
    }
    async buscarPorId(id: number): Promise<Cliente | null> {
        const db = await getDBConection();
        const cliente =await db.get(`SELSCT * FROM Cliente WHERE id = ?`, [id]);
        await db.close();
        return cliente ?  new Cliente(cliente.id, cliente.nome, cliente.email,cliente.telefone, cliente.endereco): null;
    }
    async atualizar(cliente: Cliente): Promise<void> {
        const db = await getDBConection();
        await db.run(`UPDATE Cliente SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id  = ?`,
            [cliente.nome, cliente.email, cliente.telefone, cliente.endereco, cliente.id]
        );
        await db.close();
    }
    async excluir(id: number): Promise<void> {
        const db = await getDBConection();
        await db.run(`DELETE FROM Cliente WHERE id = ? ,[id]`);
        await db.close();
    }
}