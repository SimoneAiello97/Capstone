/* import { IProduct } from './../../../interfaces/IProduct'; */
import { ICategory } from './../../../interfaces/ICategory';
import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { IProduct } from 'src/app/interfaces/IProduct';
import { IPage } from 'src/app/interfaces/IPage';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  protected page: IPage = {
    content: [],
    empty: false,
    first: false,
    last: false,
    number: 0,
    numberOfElements: 0,
    pageable: [],
    size: 0,
    sort: [],
    totalElements: 0,
    totalPages: 0
  };
  keyword!:string;

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
pagination:any =1

  newProduct:Partial<IProduct>  ={
    name: '',
    description: '',
    costPrice: 0,
    salePrice: 0,
    currentQuantity: 0,
    image: '',
    category: undefined
  }

  prodotti: IProduct[] = []

  visible4: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;

    showDialog4() {
        this.visible4 = true;
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
    this.getAllProducts(0,10);
    this.adminSvc.getCategories().subscribe(res=>
      {
        this.categorie=res
        console.log(this.categorie);

      });
      //this.loadProducts()
  }
  getAllProducts(n:number, n2:number) {
    this.adminSvc.getAllProducts(n,n2).subscribe(res=> {
      console.log(res, "Lista prodotti")
      this.page = res;
      this.prodotti = res.content
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
        this.getAllProducts(0,10);
        this.visible3 = false;
      })
    }

    editProduct(){
      this.adminSvc.putProduct(this.prodotto).subscribe(res=> {
      console.log(res, "prodotto aggiornato");
      this.getAllProducts(0,10);
      this.visible2 = false;
      })
    }

    deleteProduct(id:number){
    this.adminSvc.deleteProduct(id).subscribe(res=> {
      console.log("Elemento eliminato", res)
      this.getAllProducts(0,10);
    });
    }

    onPageChange(e: any) {
      console.log(e);
      this.adminSvc.getAllProducts(e.page, e.rows).subscribe(c => {
        this.prodotti = c.content;
      });
    }

    loadProducts() {
      this.adminSvc
        .searchProducts(this.page.number, this.keyword)
        .subscribe((data) => {
          console.log(data, "ricerca");

          this.prodotti = data.content;
        });
    }

}
