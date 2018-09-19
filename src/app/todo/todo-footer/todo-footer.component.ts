import { Component, OnInit } from '@angular/core';
import * as fromFiltro from './../../filter/filter.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { SetFiltroAction } from '../../filter/filter.action';
import { Todo } from '../model/todo.model';
import { BorrarAllTodoAction } from '../todo.actions';
@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {
  
  filtrosValidos:fromFiltro.filtrosValidos[]=['todos','completados','pendientes'];
  filtroActual:fromFiltro.filtrosValidos;
  pendientes:number;
  constructor(public store:Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state=>{
      this.filtroActual=state.filtro;
      this.contarPendientes(state.todos);
    });
  }
  cambiarFiltro(nuevoFiltro:fromFiltro.filtrosValidos){

      const accion=new SetFiltroAction(nuevoFiltro);

      this.store.dispatch(accion);

  }

  contarPendientes(todos:Todo[]){

    this.pendientes=todos.filter(todo=>!todo.completado).length;
  }
  borrarTodo(){
  
    const accion=new BorrarAllTodoAction();
    this.store.dispatch(accion);

  }
}
