import { faker } from "@faker-js/faker/.";
import { getDBConection } from "./database";

async function populateDB() {
    const db = await getDBConection();
    await db.exec(`CERATE TABLE IF NOT EXISTS Produto (
        AUTOINCREMENT,
        nome TEXT,
        preco REAL,
        estoque INTEGER,
        categoria TEXT);
        `);
         
        await db. exec(`CREATE TABLE IF OT EXIST Ciente autoincrement,
            nome TEXT,
            email TEXT UNIQUE,
            telefone TEXT,
            endereco TEXT);
            `);

            await db.exec(`CREATE TABLE IF NOT EXISTS Pedido (id INTEGER PRIMARY KEY AUTOINCREMENT,
                clienteId INTEGER,
                produtoId INTEGER,
                quantidade INTEGER,
                data TEXT,
                FOREIGN KEY (clienteId) REFERENCES Cliente(id),
                FOREIGN KEY (produtoId) REFERENCES Produto(id)
                );
                `);


        for (let  i = 0; i < 50; i++) {
            await db.run(`INSERT INTO produto (nome, preco,estoque,categoria) values(?, ?, ?, ?)`,
                [faker.commerce.productName(),
                    faker.commerce.price(),
                    faker.number.int({ min: 1, max: 100 }),
                    faker.commerce.department()
                ]
            );
         }

         for (let i = 0; i < 50; i++) {
            await db.run(`INSERT INTO Pedido (clienteId,
                produtoId, quantidade, data) VALUES (?, ?, ?, ?)`,
                [
                    faker.number.int({ min: 1, max: 50 }),
                    faker.number.int({ min: 1, max: 50 }),
                    faker.number.int({ min: 1, max: 10 }),
                    faker.date.past().toISOString()

                ]
            );
         }
         console.log('Banco populado.com sucesso!');
         await db.close();
        }

        populateDB();
         
    

            