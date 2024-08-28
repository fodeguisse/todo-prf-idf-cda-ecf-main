const request = require('supertest')
const { app } = require("../src/app");
const Todo = require("../src/models/Todo")

describe('Tests du contrôleur Todo', () => {

    beforeEach(async () => {
        await Todo.deleteMany({}); 
      });
    

    test("Vérifier que tous les todos triés par date de création décroissante.", async () => {
        const todo1 = new Todo({ text: 'Todo 1' });
        const todo2 = new Todo({ text: 'Todo 2' });
        await todo1.save();
        await todo2.save();
        
        const response = await request(app).get('/api/todos');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].text).toBe('Todo 1');  
        expect(response.body[1].text).toBe('Todo 2');
      });
    
    
    test("Assurer qu'un nouveau todo est crée avec le texte fourni et renvoie un statut 201.", async() =>{

        const todo = {
            text : "Lire",
        }

        const response = await request(app).post('/api/todos').send(todo);
        expect(response.body.text).toBe(todo.text);
        expect(response.status).toBe(201);

    })

    
    test("Assurer qu'un todo existant est supprimé et renvoie un message de confirmation.", async () => {
       
        const testTodo = new Todo({
          text: 'À supprimer'
        });
        await testTodo.save();
    
        const response = await request(app).delete(`/api/todos/${testTodo._id}`);
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Todo removed');
      });
    
})