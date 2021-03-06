import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../products.service';
import {ProductDetail} from '../shared/productDetail.model';
import {Subscription} from 'rxjs/Subscription';

import {
  style,
  animate,
  animateChild,
  transition,
  trigger,
  query as q,
  stagger
} from '@angular/animations';
const query = (s, a, o = {optional: true}) => q(s, a, o);

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('list', [
      transition(':enter', [
        // child animation selector + stagger
        query('@items',
          stagger(300, animateChild())
        )
      ]),
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({transform: 'scale(1)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('1s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px'}))
      ]),
    ])
  ]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductDetail[];
  productsSubscription: Subscription;

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsSubscription = this.productsService.getProducts()
      .subscribe(
        (data) => {
          console.log(data);
          this.products = data.content;
          console.log(this.products);
        }
      );
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
