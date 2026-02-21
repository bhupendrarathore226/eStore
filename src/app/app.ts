import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Catnavigation } from "./components/catnavigation/catnavigation";
import { ToastService } from './store/toast.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ShoppingMart');

  constructor(public toast: ToastService) {}
}
