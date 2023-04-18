import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrls: ['./card-task.component.sass']
})
export class CardTaskComponent implements OnInit {

  @Input()
  numero!: number;
  @Input()
  titulo!: string;
  @Input()
  descricao!: number;

  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  list: any[]= []

  constructor(private _service:TaskService,  private _snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.list = this._service.get('tasks')
  }

  onDelete(){

    this.delete.emit(this.numero)

  }
  onEdit(){

    this.edit.emit(this.numero)

  }

}
