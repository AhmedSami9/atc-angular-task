import { initFlowbite } from 'flowbite';
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './shared/components/Loader/loader.service';
import { Toast } from "primeng/toast";
import { environment } from '../environments/environments';


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
    constructor(public loader: LoaderService) {
       console.log('ENV PROD:', environment);
    }
}

