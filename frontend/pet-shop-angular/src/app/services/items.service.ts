import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


// Define an interface for the attributes of an item
export interface ItemAttributes {
 id: number; // The item ID (optional)
 name: string; // The item name
 description: string; // The item description
 categories: string; // The item categories
 price: number; // The item price
 image?: string; // The item image URL (optional)
}

@Injectable({
 providedIn: 'root' // This service is provided at the root level
})
export class ItemsService {

 private itemsSource = new BehaviorSubject<ItemAttributes[]>([]);
 items$ = this.itemsSource.asObservable();
 
 constructor(private http: HttpClient) { }

 // Method to retrieve items from the backend API
 // with an HTTP GET request to the /petapi/items endpoint with the categories query parameter
 getItems(categories: string) {
 return this.http.get(`/petapi/items?categories=${categories}`);
 }

 searchItems(name: string): Observable<ItemAttributes[]> {
 return this.http.get<ItemAttributes[]>(`/petapi/items?name=${name}`);
 }
 

 // Method to save an item to the backend API
 saveItem(item: ItemAttributes) {
 // Make an HTTP POST request to the /petapi/items endpoint with the item data
 return this.http.post('/petapi/items', item);
 }
 // Method to delete an item from the backend API
deleteItem(id: number) {
 // Make an HTTP DELETE request to the /petapi/items/:id endpoint with the item ID
 return this.http.delete(`/petapi/items/${id}`);
}

 setItems(items: ItemAttributes[]) {
 this.itemsSource.next(items);
 }

}

  

  /*
    return [{
      id: 1,
      name: "Trond",
      description: "Kul",
      price: 23,
    },{
      id: 2,
      name: "Trond",
      description: "Kul",
      price: 23,
    },{
      id: 3,
      name: "Trond",
      description: "Kul",
      price: 23,
    }]
*/