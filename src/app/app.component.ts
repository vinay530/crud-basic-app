import { NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'crud-basic-app';
  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    const getLocalData = localStorage.getItem('angular_crud');
    if (getLocalData != null) {
      this.studentList = JSON.parse(getLocalData);
    }
  }

  openModel() {
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }

  closeModel() {
    this.studentObj = new Student();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  saveStudent() {
    debugger;
    const isLocalPresent = localStorage.getItem('angular_crud');
    //check if record present
    if (isLocalPresent != null) {
      const oldArr = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArr.length + 1;
      oldArr.push(this.studentObj);
      this.studentList = oldArr;
      localStorage.setItem('angular_crud', JSON.stringify(oldArr));
    } else {
      //for 1st entry if no data
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('angular_crud', JSON.stringify(newArr));
    }
    this.closeModel();
  }
  onEdit(item: Student) {
    debugger;
    this.studentObj = item;
    this.openModel();
  }

  updateStudent() {
    debugger;
    const currentRecord = this.studentList.find(
      (m) => m.id === this.studentObj.id
    );
    //if working with find check for undefined
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.pincode = this.studentObj.pincode;
      currentRecord.state = this.studentObj.state;
      currentRecord.email = this.studentObj.email;
      currentRecord.mobile = this.studentObj.mobile;
    }
    localStorage.setItem('angular_crud', JSON.stringify(this.studentList));
    this.closeModel();
  }

  onDelete(item: Student) {
    const  isDelete = confirm("are you sure want to delete?");
    if(isDelete){
      const currentRecord = this.studentList.findIndex(m => m.id === this.studentObj.id);
      this.studentList.splice(currentRecord,1);
      localStorage.setItem('angular_crud', JSON.stringify(this.studentList));
    }
  }

}

export class Student {
  id: number;
  name: string;
  mobile: string;
  pincode: string;
  address: string;
  state: string;
  email: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobile = '';
    this.pincode = '';
    this.address = '';
    this.state = '';
    this.email = '';
  }
}
