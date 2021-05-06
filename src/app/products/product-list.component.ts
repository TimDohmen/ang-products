import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "./product-service";
import { IProduct } from "./product.interface";

@Component({
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  // can do styles or styleUrls
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {
    // can do access mod in constructor so you dont need _productService = productService
  }
  pageTitle: string = 'Product List';
  // strings and number types dont need to be explicity typed
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  errorMessage: string = ""
  sub!: Subscription;

  // listFilter = 'cart'
  private _listFilter = ''
  get listFilter(): string {
    return this._listFilter
  }
  set listFilter(val: string) {
    this._listFilter = val
    // console.log("sett triggered", val);
    this.products = this.performFilter(val)
  }
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase()
    console.log(filterBy)
    return this.products.filter((p: IProduct) => p.productName.toLocaleLowerCase().includes(filterBy))
  }

  filteredProducts: IProduct[] = [];


  products: IProduct[] = [

  ];
  toggleImage(): void {
    this.showImage = !this.showImage
  }


  ngOnInit(): void {
    console.log('OnInit hook')
    // this.listFilter = 'cart'
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
      // can also do a complete action in here as well
      // good to unsubscribe to obseravable as well
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // recieves emit from child component
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List ' + message
  }
}