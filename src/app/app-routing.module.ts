import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { GamesComponent } from './components/games/games.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SavedComponent } from './components/saved/saved.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/search/:game-search', component: GamesComponent },
  { path: 'overview/:id', component: OverviewComponent },
  { path: 'saved', component: SavedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
