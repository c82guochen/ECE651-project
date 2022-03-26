import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { productsUrl } from '../../../config/api';
import { Product } from '../../../model/product';
import { CartItem } from '../../../model/cart';
import { stringify } from '@angular/compiler/src/util';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  loadCartItems(name: string) {
    // this.cartService.getCartItems().subscribe((items: any) => {
    //   this.cartItems = items;
    //   console.log('loadCartItems', items);
    //   //this.cartTotal = this.cartItems.reduce((sum, cv) => sum + cv.qty * cv.price, 0)
    // });
  }
}
