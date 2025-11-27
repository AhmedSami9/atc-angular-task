import { initFlowbite } from 'flowbite';
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './shared/components/Loader/loader.service';
import { Toast } from "primeng/toast";
<<<<<<< HEAD
=======
import { environment } from '../environments/environments';

>>>>>>> 7ccaa20b961203887fe7b9e9e98608c4e3ecc1dc

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Test-ATC');
    ngOnInit(): void {
    initFlowbite();
  }
<<<<<<< HEAD
    constructor(public loader: LoaderService) {}
}
=======
    constructor(public loader: LoaderService) {
       console.log('ENV PROD:', environment);
    }
}

>>>>>>> 7ccaa20b961203887fe7b9e9e98608c4e3ecc1dc
