import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateValidators } from './../../shared/validators/date-validators';
import * as moment from 'moment';
import { TodoService } from './../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  /**
   * @var todoForm: Form Group Prise en charge du formulaire par ReactiveForms
   */
  public todoForm: FormGroup;

  /**
   * Abonnement à un todo qui vient du tableau des todos, et uqi passe par l'intermediaire du service
   */
  private todoSubscription: Subscription;

  /**
   * Définit un objet todo à mettre à jour
   * @var todoToUpdate: TodoInterface todo qui vient du tableau
   */
  private todoToUpdate: TodoInterface;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService) {
      this.todoToUpdate = {
        title: '',
        begin: new Date(),
        end: new Date()
    };
    //Abonnement au todo
    this.todoSubscription = this.todoService.getTodo().subscribe((unTodo) => {
      console.log('Je viens de recevoir un todo : ' + JSON.stringify(unTodo));
      this.todoToUpdate = unTodo;
      this._loadForm();
    });
  }

  /**
   * @return FormControl Contrôle title du formulaire
   */
  public get title() {
    return this.todoForm.controls.title;
  }

  /**
   * Méthode définie dans l'interface OnInit. Elle est appelée immédiatement après le constructeur de la classe courante.
   * Construction du formulaire todoForm
   */
  ngOnInit() {
    //Définit le formulaire, ce qu'il contient et les règles de validation du formulaire
    this.todoForm = this.formBuilder.group(
      {
        title: [
          this.todoToUpdate.title, // Valeur par défaut pour le contrôle titre
          [Validators.required, Validators.minLength(5)] // Règles de validation à appliquer
        ],
        begin: [
          moment(this.todoToUpdate.begin).format('YYYY-MM-DD'), 
          [Validators.required]
        ],
        end: [
          moment(this.todoToUpdate.end).format('YYYY-MM-DD'),
          [Validators.required]
        ]
      },
      {validator: Validators.compose([DateValidators.dateLessThan('begin', 'end', { 'begin': true })
    ])}

    );
  } 



  _loadForm(): void {
    this.ngOnInit();
  }



 /**
   * Emet le nouveau todo vers le service TodoService
   */
  public saveTodo(): void {
    const _todo: TodoInterface = this.todoForm.value;
    _todo.isChecked = false;
    // On doit tenir compte d'un todoToUpdate complet
    console.log('todoToUpdate : ' + JSON.stringify(this.todoToUpdate));
    if (this.todoToUpdate.hasOwnProperty('id')) {
      // C'est une mise à jour
      _todo.id = this.todoToUpdate.id;
      this.todoService.updateTodo(_todo);
    } else {
      // C'est une insertion
      this.todoService.addTodo(
        _todo
      );
    }

  }

}

  


 
