// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './home.component';

// const routes: Routes = [{ path: '', component: HomeComponent }];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class HomeRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SyriaShmoosSystemComponent } from '../pages/syria-shmoos/syria-shmoos-system.component';

const routes: Routes = [{ path: '', component: SyriaShmoosSystemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

