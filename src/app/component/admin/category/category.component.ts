import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { urlEndpoint } from 'src/app/utils/constant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  editbutton: string = 'Add';
  categoryName: string = '';
  categorys: Category[] = [];
  categoryId: number = 0;
  error: string = '';
  editflag: Boolean = false;
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categorys = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  Add() {
    if (this.categoryId) {
      this.categoryService
        .editCategory({ id: this.categoryId, title: this.categoryName })
        .subscribe({
          next: (response: any) => {
            this.categorys = response.data;
          },
          error: (err) => {
            let message: string = err?.error?.error?.message;
            this.error = message.includes(',')
              ? message.split(',')[0]
              : message;
          },
        });
  
    } else {
      let category: Category ={
        title: this.categoryName
      }
      this.categoryService.addCategory(category).subscribe({
        next: (response: any) => {
          this.categorys = response.data;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
    }
    this.editflag = false;
    this.categoryId = 0;
    this.categoryName = '';
    this.editbutton = 'ADD';
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response: any) => {
        this.categorys = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    this.ngOnInit();
  }
  edit(category: Category) {
    this.editflag = true;
    this.categoryName = category.title;
    this.categoryId = category.id!;
    this.editbutton = 'EDIT';
    this.Add;
  }
}
