import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { ICategory } from 'src/app/interfaces/ICategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories!:ICategory[];
  newCategory:ICategory = {
    name: ''
  };
  visible: boolean = false;
  constructor(private adminSvc:AdminService){}

  ngOnInit(){
    this.getAllCategories();
  }

  showDialog() {
      this.visible = true;
  }

  getAllCategories(){
    this.adminSvc.getCategories().subscribe(res=> {
      this.categories = res
    console.log(this.categories);

    })
  }
  addCategory(){
    this.adminSvc.postCategory(this.newCategory).subscribe(res=>{
      console.log(res)
    this.getAllCategories();
  })
  }

  deleteCategory(id:number){
    this.adminSvc.deleteCategory(id).subscribe(res=>{
      console.log(res)
    this.getAllCategories();
  })
}

toggleCategory(c:Partial<ICategory>){
  this.adminSvc.toggleCategory(c).subscribe(res=>{
    this.getAllCategories();
  }
  );
}
}
