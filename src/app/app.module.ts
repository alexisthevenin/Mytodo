import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

import { TodosViewComponent } from './components/todos-view/todos-view.component';

import { TodoService } from './shared/services/todo.service';
import { UiModule } from './modules/ui/ui.module';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodosViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    UiModule,
    MaterialModule
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
