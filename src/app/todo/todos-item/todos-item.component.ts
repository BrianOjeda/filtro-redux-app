import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html',
  styles: []
})
export class TodosItemComponent implements OnInit {

  @Input() todo:Todo;
  @ViewChild('txtInputFisico') txtUnputFisico:ElementRef;

  chkField: FormControl;
  txtInput: FormControl;
  editando:boolean;

  constructor(public store:Store<AppState>) { }

  ngOnInit() {
    this.chkField=new FormControl(this.todo.completado);
    this.txtInput=new FormControl(this.todo.texto,Validators.required);
    this.chkField.valueChanges.subscribe(()=>{
      const accion=new ToggleTodoAction(this.todo.id);
      this.store.dispatch(accion);
    });
    console.log(this.todo);
  }

  editar(){

    this.editando=true;
    setTimeout(()=>{
      this.txtUnputFisico.nativeElement.select();
    },1);
   

  }

  terminarEdicion(){
    this.editando=false;
    const accion=new EditarTodoAction(this.todo.id,this.txtInput.value);
    if(this.txtInput.invalid){
        return;
    }
    this.store.dispatch(accion);
  }
  borrarTodo(){
    const accion=new BorrarTodoAction(this.todo.id);

    this.store.dispatch(accion);
  }

}
