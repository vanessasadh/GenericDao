import { GenericDao} from "./GenericDao";
import {Cliente} from "./Cliente";

describe('GenericDao Test Suite', () => {
    let produtoDao: GenericDao;

    beforeAll(() => {
        produtoDao = new GenericDao('Produto');
    });

    test('Deve inserir um produto com sucesso', async() => {
        const id = await produtoDao.insert({
            nome: 'Produto Teste',
            preco: '',
            estoque: '',
            categoria: '',
        });
        expect(id).toBeDefined();
    });

    test('Deve obter um produto pelo ID', async() => {
        const produto = await produtoDao.getById(1);
        expect(produto).toHaveProperty('id', 1);
    });

    test('Deve atualizar um produto', async()=> {

        await produtoDao.update(1, {nome: 'Produto atualizado'});
        const produto = await produtoDao.getById(1);
        expect(produto.nome).toBe('Produto atualizado');
    });

    test('Deve remover um produto', async() => {
        await produtoDao.delete(1);
        const produto = await produtoDao.getById(1);
        expect(produto).toBeUndefined();
    });
    test('Deve listar todos os produtos', async() => {
        const produtos = await produtoDao.getAll();
        expect(produtos.length).toBeGreaterThan(0);
    });

    test('Deve buscar produtos por critério', async() => {
        const produtos = await produtoDao.findBy('categoria', 'Teste');
        expect(produtos.length).toBeGreaterThan(0);
    });
});