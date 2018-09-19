import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription} from 'rxjs';
import { TodoService } from './../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';

import { FormControl } from '@angular/forms';

import { MatTableDataSource, MatSort, MatSelect, MatOption } from '@angular/material';

import { TodoHelper } from '../../shared/helpers/todo-helper';
import { MatColumns } from './../../shared/interfaces/mat-columns';


@Component({
  selector: 'todos-view',
  templateUrl: './todos-view.component.html',
  styleUrls: ['./todos-view.component.scss']
})
export class TodosViewComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

   /**
   * @var todos: TodoInterface[]
   * Tableau des todos
   */
  public todos: TodoInterface[];
  public checkedStatus: boolean = false;
  

/**
 * Source des données pour le tableau Material
 */
public dataSource = new MatTableDataSource<TodoInterface>();

/**
 * Colonnes utilisées dans mat-table
 */
public columns = new FormControl();


/**public displayedColumns: String[] = [
  'title',
  'begin',
  'end',
  'update',
  'delete'
];
*/

/**
 * Colonnes à afficher dans le mat-select
 */
public availableColumns: any[] = [
  {value: 'begin', label: 'Du...'},
  {value: 'end', label: 'Au...'}
];

/**
 * Colonnes séléctionnées par défaut, pour que les boites soient cochées
 */
public selectedValue: String[] = [
  'begin',
  'end',
]

/**
 * Options réellement sélectionnées par l'utilisateur
 */
public selectedOptions: any;






  /**
   * Abonnement à un todo qui vient de TodoService!!
   */
  private todoSubscription: Subscription;

  /**
   * Gère le statut de la boite de selection multiple
   */


  /**
   *  Instance de la classe TodoHelper
   */
  public helper: TodoHelper;

  constructor(private todoService: TodoService) { 
    this.todos = []; // Définit le tableau des todos à afficher

    // Instancie de helper
    this.helper = new TodoHelper();
    this.selectedValue = this.helper.optionalColumnsToArray();



    
    this.todoSubscription = this.todoService.getTodo()
    .subscribe((todo) => {
      console.log('Observable Todo : ' + JSON.stringify(todo));
      // Ajoute le todo à la liste des todos

      const index = this.todos.findIndex((obj) => obj.id == todo.id);
      if (index === -1 && todo.hasOwnProperty('id'))  { 
        this.todos.push(todo);
      } else {
        this.todos[index] = todo;
      }
      this.dataSource.data = this.todos;
    }); 
  }

  /**
   * Après construction de l'objet, on charge la liste des todos existants dans la base
   */
  ngOnInit() {
    console.log('ngOnInit : ' + typeof this.todoService);
    
    // Récupère les todos existants dans la base
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log('Il y a ' + this.todos.length + ' todos à afficher')

      // On définit à ce moment la source de données
      this.dataSource.data = this.todos;
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * Supprime un todo de la liste
   */
  public delete(todo: TodoInterface): void {
    const index = this.todos.indexOf(todo);
    const _todo = this.todos[index]; // Récupère le todo

    this.todos.splice(index, 1); // Dépile l'élément du tableau

    this.dataSource.data = this.todos;
    
    this.todoService.deleteTodo(_todo); // Appelle le service
  }

 


    /**
   * Supprimer les todos cochés
   */
  public deleteCheckedTwo() {
    const _todos: TodoInterface[] = [];
  
    for (const todo of this.todos) {
      if (!todo.isChecked) {
        _todos.push(todo);
      } else {
        this.todoService.deleteTodo(todo);
    }
    this.todos = _todos;
    if (this.todos.length === 0) {
      this.checkedStatus = false;
    }
  }


}


public checkUnCheckAll() {
  this.checkedStatus = !this.checkedStatus;
  this._check();
}
 

  /**
   * Bascule l'état de isChecked d'un todo
   * @param index Indice de l'élément dans le tableau
   */
  public toggle(index: number): void {
    this.todos[index].isChecked = !this.todos[index].isChecked;
  }

  private _check(): void {
    for (let index = 0; index < this.todos.length; index++) {
      this.todos[index].isChecked = this.checkedStatus;
    }
  }


   /**
   * Détermine si aucune boite est cochée
   */
  public noneChecked(): boolean {
    let status: boolean = true;
    for (const todo of this.todos) {
      if (todo.isChecked) {
        status = false;

      }
    }
    return status;
  }


    /**
   * Détermine l'état d'un todo checked or not
   * @param TodoInterface todo le todo à tester
   */
  public isChecked(todo: TodoInterface): boolean {
    return todo.isChecked;
  }

  public update(todo: TodoInterface): void {
    console.log('Modification du todo : ' + todo.id);
    this.todoService.sendTodo(todo);
  }





  public changeView (event: any): void {
    this.helper.setDisplayedColumns(this.selectedValue);
  }



}
