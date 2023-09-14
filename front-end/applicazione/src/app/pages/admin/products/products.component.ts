import { ICategory } from './../../../interfaces/ICategory';
import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  prodotto:Partial<IProduct> = {
    name: '',
    description: '',
    costPrice: 0,
    salePrice: 0,
    currentQuantity: 0,
    image: '',
    category: undefined
  }

categorie!:ICategory[]


  newProduct:Partial<IProduct>  ={
    name: '',
    description: '',
    costPrice: 0,
    salePrice: 0,
    currentQuantity: 0,
    image: '',
    category: undefined
  }

  prodotti!: IProduct[]

  visible: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;

    showDialog() {
        this.visible = true;
    }
    showDialog2() {
      this.visible2 = true;
  }
  showDialog3() {
    this.visible3 = true;
}
  constructor(private adminSvc:AdminService){
  }

  ngOnInit(){
    this.getAllProducts();
    this.adminSvc.getCategories().subscribe(res=>
      {
        this.categorie=res
        console.log(this.categorie);

      });
  }
  getAllProducts() {
    this.adminSvc.getAllProducts().subscribe(res=> {
      console.log(res, "Lista prodotti")
      this.prodotti = res;
    })
    }

    getProduct(id:number){
      this.adminSvc.getProduct(id).subscribe(res=> {
        console.log(res, "prodotto singolo");
        this.prodotto = res
      })
    }

    addProduct(){
      this.adminSvc.postProduct(this.newProduct).subscribe(res=> {
        console.log(res, "prodotto aggiunto");
        this.getAllProducts();
        this.visible3 = false;
      })
    }

    editProduct(){
      this.adminSvc.putProduct(this.prodotto).subscribe(res=> {
      console.log(res, "prodotto aggiornato");
      this.getAllProducts();
      this.visible2 = false;
      })
    }

    deleteProduct(id:number){
    this.adminSvc.deleteProduct(id).subscribe(res=> {
      console.log("Elemento eliminato", res)
      this.getAllProducts();
    });
    }

}
