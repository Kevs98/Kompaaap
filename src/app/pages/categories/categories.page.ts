import { Component, OnInit } from '@angular/core';
import { catI } from '../../models/category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: catI[]; 

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategory().subscribe(res => {
      this.categories = res;
    });
  }

}
