import { TaskService } from './../../service/task.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {



  taskForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
  });

  constructor( private _service:TaskService, public dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    if (this.data.task) {
      this.taskForm.patchValue(this.data.task)

    }

  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    if (this.taskForm.valid) {

      let tasks = []



      if(this._service.get('tasks')){
        tasks = this._service.get('tasks')
      }

      console.log(this.data.i !== undefined );
      console.log(this.data);
      if(this.data.i !== undefined ){
        console.log(tasks[this.data.i] );

        tasks[this.data.i] = this.taskForm.value
      } else {

        tasks.unshift(this.taskForm.value)
      }


      this._service.set('tasks',tasks)
      this.dialogRef.close();
    }

  }



}
