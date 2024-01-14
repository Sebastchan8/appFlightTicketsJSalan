import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading-admin',
  templateUrl: './loading-admin.page.html',
  styleUrls: ['./loading-admin.page.scss'],
})
export class LoadingAdminPage implements OnInit {

  constructor(private loadingController: LoadingController,
    private router:Router) { }

  ngOnInit() {
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 1000,
      spinner: 'circles'
    });

    await loading.present();
    this.router.navigate(['/admin'])
  }

}
