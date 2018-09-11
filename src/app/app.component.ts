import { Component } from '@angular/core';
import { TodoInterface } from './shared/interfaces/todo-interface' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: String = 'The New Todo List ';

  /**
   * @var todos: TodoInterface[]
   * Tableau des todos
   */
  public todos: TodoInterface[];


  /**
   * @var aTodo: String
   * Nouveau todo à ajouter à notre tableau
   */
  public aTodo: String;

  public checkedStatus: boolean = false;

  /**
   * Constructeur de la classe AddComponent
   * Invoqué dès la création d'un objet de type AddComponent
   */
  public constructor () {
    this.todos = [];
    this.aTodo = '';
  }

  /**
   * Ajouter un todo au tableau des todos
   * @return void
   */
 /** public addTodo(): void {
   /** this.todos.push({title: this.aTodo, isChecked: false});
} */





  /**
   * Supprime un todo
   * @param index: number Indice de l'élément à supprimer du tableau
   */
  public delete(index: number): void {
    console.log('Okay, je dois enlever l\'élément à l\'indice : ' + index);
    // On peut donc supprimer l'élément du tableau
    this.todos.splice(index, 1); 
  }


  


 

  /**
   * Détermine si le bouton ajouter doit être actif ou non
   */
  public notEnough(): boolean {
    return this.aTodo.length >= 5 ? false : true;
  }



  /**
  * @param changeTitle 
  */
  public changeTitle(): void {
  this.title = 'Hola Angular ';

  }
}
