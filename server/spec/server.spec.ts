import { app } from '../handler';

import request from 'supertest';

describe("GET /usuario/:id/carrinho", () => {
    it("Retorna o carrinho de um usário conhecido", async () => {
        // O carrinho está vazio
        const res = await request(app).get("/usuario/1/carrinho");

        expect(res.status).toBe(200);
        expect(res.body.data.itens.length).toBe(0);
    });
    
    it("Retorna erro 404 se o usuário não existe", async () => {
        const res = await request(app).get("/usuario/10/carrinho");

        expect(res.status).toBe(404);
        expect(res.body.error).toBe("Usuário não encontrado");
    });
});

describe("POST /usuario/:id/carrinho", () => {
   it("Adiciona o item no carrinho", async () => {
       
   });
});

describe("DELETE /usuario/:id/carrinho/:idItem", () => {
    it("Remove o item do carrinho", async () => {
        
    });
});

describe("PUT /usuario/:id/carrinho", () => {
    it("Atualiza o item do carrinho", async () => {
        
    });
});

describe("GET /usuario/:id/carrinho/total", () => {
    it("Retorna o total do carrinho", async () => {
        
    }); 
});