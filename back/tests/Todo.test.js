const Todo = require("../src/models/Todo")


describe('Tests du modèle Todo', ()=>{

    test("Vérifier la création d'un Todo valide avec tous les champs requis.", async()=>{

        //Arrange
        const newTodo = {
            
            text : "vaisselle",
            completed : true,
        
        }

        //Act
        const validTodo = await new Todo(newTodo);

        //Assert
        expect(validTodo.text).toBe(newTodo.text);
        expect(validTodo.completed).toBe(newTodo.completed); //test que completed est false par défaut
    })

    test("Que le champ 'completed' a une valeur par défaut de false", async()=>{
        //Arrange
        const newTodo = {
            
            text : "",
            completed : false,
        
        }
        //Act
        const validTodo = await new Todo(newTodo);

        //Assert
        expect(validTodo.completed).toBe(newTodo.completed); 
    })
})