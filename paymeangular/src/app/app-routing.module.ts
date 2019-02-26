import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostscanvasComponent } from './components/postscanvas/postscanvas.component';
import { ProfilesettingsComponent } from './components/profilesettings/profilesettings.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';


const routes: Routes = [
  {path: 'home', component:PostscanvasComponent},
  {path: 'settings', component:ProfilesettingsComponent},
  {path: 'marketplace', component:MarketplaceComponent},
  {path: '**', redirectTo: '/home'}


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
