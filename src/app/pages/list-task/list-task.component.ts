import { TaskService } from './../../service/task.service';
import { TaskComponent } from './../../components/task/task.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.sass']
})
export class ListTaskComponent implements OnInit {
  list: any[]= []

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private _service:TaskService) { }

  ngOnInit() {
    this.list = this._service.get('tasks')

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskComponent, { data: {type:"Adicionar"}
    });

    dialogRef.afterClosed().subscribe(result => {
      this._openSnackBar('Task Adicionada')
      this._refresh()
    });
  }

  onDelete(index:number){

    this.list.splice(index,1)
    this._service.set('tasks',this.list)
    this._openSnackBar('Task Excluida')
    this._refresh()


  }
  onEdit(index:number){

    const dialogRef = this.dialog.open(TaskComponent, { data: {type:"Editar", task: this.list[index], i:index}
    });

    dialogRef.afterClosed().subscribe(result => {
      this._openSnackBar('Task Editada')

      this._refresh()
    });

  }

  private _openSnackBar(mensagem:string){
    this._snackBar.open(mensagem, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000
    });
  }

  private _refresh(){
    this.list = this._service.get('tasks')
  }


}
