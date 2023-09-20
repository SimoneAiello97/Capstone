import { HomeService } from './../home.service';
import { Component } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';
import {NavbarComponent} from '../components/navbar/navbar.component';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent {
  [x: string]: any;

  prodotto!:IProduct

  prodottiCorrelati!:IProduct[]

  responsiveOptions: any[] | undefined;


  constructor(
    private adminSvc:AdminService,
    private homeSvc:HomeService,
    private router:Router,
    private route:ActivatedRoute
    ){}

  ngOnInit(){

    this.route.params
    .subscribe((params:any)=>{

      this.adminSvc.getProduct(params.id).subscribe((prodotto)=>{
          this.prodotto = prodotto
          console.log(this.prodotto);

            this.homeSvc.relatedProducts(prodotto.category.id as number).subscribe((res)=>{
                    console.log(res);

                    this.prodottiCorrelati = res
                })
      });

  })
  this.responsiveOptions = [
    {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
    }
];
this.homeSvc.getCart().subscribe(res=>{
  console.log(res);

})

}

addToCart(id:number){
  this.homeSvc.addToCart(id).subscribe(res=>{
    this.homeSvc.getCart().subscribe(res =>{
      console.log(res);
    })
  })
}

}


