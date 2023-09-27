import { style } from '@angular/animations';
import { HomeService } from './../home.service';
import { Component, ElementRef } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/interfaces/IProduct';
import {NavbarComponent} from '../components/navbar/navbar.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent {
  [x: string]: any;

  prodotto:IProduct |undefined

  prodottiCorrelati!:IProduct[]

  responsiveOptions: any[] | undefined;

  numeroCarrello:number|undefined

  nomeUtente!:string

  myThumbnail!:string

  myFullresImage!:string

  cart:any|undefined |null
  
  constructor(
    private adminSvc:AdminService,
    private authSvc:AuthService,
    private homeSvc:HomeService,
    private router:Router,
    private route:ActivatedRoute,
    private el: ElementRef
    ){}


  ngOnInit(){

    this.route.params
    .subscribe((params:any)=>{

      this.adminSvc.getProduct(params.id).subscribe((prodotto)=>{
          this.prodotto = prodotto
          this.myThumbnail=`${prodotto.image}`;
          this.myFullresImage=`${prodotto.image}`;

          console.log(this.prodotto);

            this.homeSvc.relatedProducts(prodotto.category.id as number).subscribe((res)=>{
                    console.log(res);

                    this.prodottiCorrelati = res

                })
      });

      this.homeSvc.getCart().subscribe(res =>{
        console.log(res);
        if(res){
          this.cart = res
        this.numeroCarrello = res?.cartItem.length;
          }
      })
      //this.initAnimation();
      const utente:any = localStorage.getItem('user')
      const utenteparsato = JSON.parse(utente)
      console.log(utenteparsato);

      this.nomeUtente = utenteparsato.username

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
}


addToCart(id:number){
  this.homeSvc.addToCart(id).subscribe(res=>{
    this.homeSvc.getCart().subscribe(res =>{
      console.log(res);
       this.numeroCarrello = res?.cartItem.length;
    })
  })
}


logout(){
  this.authSvc.logout()
  this.router.navigate(['/auth'])
}


}


