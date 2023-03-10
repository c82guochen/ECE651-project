import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../model/cart';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import { OrderItem } from 'src/app/model/order';
import { CheckoutOrder } from 'src/app/model/checkout';

@Component({
  selector: 'app-shopping-cart-detail',
  templateUrl: './shopping-cart-detail.component.html',
  styleUrls: ['./shopping-cart-detail.component.css']
})
export class ShoppingCartDetailComponent implements OnInit {
  cartItem!: CartItem;
  constructor(private cServ: CartService, private userService: UserService) { }
  user: User | null = null;
  kart: any[] = [];
  checkoutOrder!: CheckoutOrder;
  total_price = 0;
  address: string = '';
  card: string = '';
  
  order: any[] = [];
  ngOnInit(): void {
    console.log('shoppingcart Detail');
    this.cServ.getCartItems().subscribe((it) => {
      this.kart = it;
      for (let item of it) {
        this.total_price += item.product.price * item.quantity;
      }
    });
    this.userService.getUser().subscribe((user: any) => {
      this.address =
        user.shipping_address.address +
        ', ' +
        user.shipping_address.province +
        ', ' +
        user.shipping_address.postal_code;
      this.card = user.credit_card;
    });
  }

  delete(id: number) {
    console.log('trigger deleting product');
    this.cServ.delProduct(id).subscribe((res) => {
      console.log(res);
      this.kart = res as any[];
      this.total_price = 0;
      for (let item of res as any[]) {
        this.total_price += item.product.price * item.quantity;
      }
    });
  }

  // clear() {
  //   // TODO: send a clear cart request
  // }

  placeOrder() {
    let status = 'unpaid';
    // let order = [];
    if (this.address == '') {
      window.alert('Fail to place an order, address is missing');
      return false;
    } else if (this.card == '') {
      window.alert('Fail to place an order, card is missing');
      return false;
    } else {

      for (let item of this.kart) {
        let obj: CheckoutOrder = { product_id: -1, quantity: -1 }
        obj.product_id = item.product.id;
        obj.quantity = item.quantity;
        this.order.push(obj);
      }

      this.cServ.create_new_order(status, this.order).subscribe((data) => {
        console.log('data = ', data);
      });
      window.alert('success place order');
      return true;
    }
  }

}
