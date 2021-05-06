import { Injectable } from "@angular/core";
import { IProduct } from "./product.interface";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

@Injectable({
  // can also bring in with providers in component
  // providedIn is better for tree shaking/getting rid of unused injected services
  // available for entire project
  providedIn: 'root'
})
export class ProductService {
  // angular.json file for path
  private productUrl = 'https://angproductserver.herokuapp.com/api/products'
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('ALL: ', JSON.stringify(data))),
      catchError(this.handleError)
    )
    //#region 
    // return [{
    //   "productId": 1,
    //   "productName": "Leaf Rake",
    //   "productCode": "GDN-0011",
    //   "releaseDate": "March 19, 2021",
    //   "description": "Leaf rake with 48-inch wooden handle.",
    //   "price": 19.95,
    //   "starRating": 3.2,
    //   "imageUrl": "assets/images/leaf_rake.png"
    // },
    // {
    //   "productId": 2,
    //   "productName": "Garden Cart",
    //   "productCode": "GDN-0023",
    //   "releaseDate": "March 18, 2021",
    //   "description": "15 gallon capacity rolling garden cart",
    //   "price": 32.99,
    //   "starRating": 4.2,
    //   "imageUrl": "assets/images/garden_cart.png"
    // },
    // {
    //   "productId": 5,
    //   "productName": "Hammer",
    //   "productCode": "TBX-0048",
    //   "releaseDate": "May 21, 2021",
    //   "description": "Curved claw steel hammer",
    //   "price": 8.9,
    //   "starRating": 4.8,
    //   "imageUrl": "assets/images/hammer.png"
    // },
    // {
    //   "productId": 8,
    //   "productName": "Saw",
    //   "productCode": "TBX-0022",
    //   "releaseDate": "May 15, 2021",
    //   "description": "15-inch steel blade hand saw",
    //   "price": 11.55,
    //   "starRating": 3.7,
    //   "imageUrl": "assets/images/saw.png"
    // },
    // {
    //   "productId": 10,
    //   "productName": "Video Game Controller",
    //   "productCode": "GMG-0042",
    //   "releaseDate": "October 15, 2020",
    //   "description": "Standard two-button video game controller",
    //   "price": 35.95,
    //   "starRating": 4.6,
    //   "imageUrl": "assets/images/xbox-controller.png"
    // }]
    //#endregion
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // client error
      errorMessage = `An error occured : ${err.error.message}`
    } else {
      // server error
      errorMessage = `Server return code : ${err.status}, err message is :  ${err.error.message}`
    }
    console.error(errorMessage)
    return throwError(errorMessage)
  }
}