import { HomeService } from './../home.service';
import { Component } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent {

  prodotto!:IProduct

  prodottiCorrelati!:IProduct[]


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

  })}

}


