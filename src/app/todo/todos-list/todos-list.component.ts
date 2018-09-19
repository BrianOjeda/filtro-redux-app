import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { Todo } from '../model/todo.model';
@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styles: []
})
export class TodosListComponent implements OnInit {

  todos:Todo[]=[];
  filtro: string;

  constructor(public store:Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state=>{
      this.todos=state.todos;
      this.filtro=state.filtro;
    });
  }

}