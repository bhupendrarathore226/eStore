import { Component } from '@angular/core';
import { Catnavigation } from '../catnavigation/catnavigation';
import { Sidenavigation } from "./sidenavigation/sidenavigation";
import { Products } from "../products/products";

@Component({
  selector: 'app-home',
  imports: [Catnavigation, Sidenavigation, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
