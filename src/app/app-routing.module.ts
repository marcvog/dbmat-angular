import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserNotAuthorizedComponent } from './user-not-authorized/user-not-authorized.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'unauthorized', component:UserNotAuthorizedComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
