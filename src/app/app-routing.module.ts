import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { RecepiesComponent } from './components/recepies/recepies.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recepies', component: RecepiesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
