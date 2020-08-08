import { Component, OnInit } from '@angular/core';
import { catI } from '../../models/category.interface';
import { CategoryService } from '../../services/category.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  categories: catI[]; 

  constructor(private categoryService: CategoryService, private menuCrl : MenuController) { }

  ngOnInit() {
    this.categoryService.getCategory().subscribe(res => {
      this.categories = res;
    });
  }

  toggleMenu(){
    this.menuCrl.toggle();
  }

  prox(){
    alert('Esta categoria estará disponible próximamente');
  }

  carrito(){
    console.log('Carrito Abierto');    
  }

}
