import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  prodotti!: IProduct[]
  constructor(private adminSvc:AdminService){}

  ngOnInit(){
    this.getAllProducts();
  }
  getAllProducts() {
    this.adminSvc.getProducts().subscribe(res=> {
      console.log(res, "Lista prodotti")
      this.prodotti = res;
    })
    }

}
