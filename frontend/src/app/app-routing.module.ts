import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { PageNotFoundComponent } from './cmps/page-not-found/page-not-found.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
// import { contactResolver } from './services/contact-resolver.service';
import { contactResolver } from './resolvers/contact.resolver';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { authGuard } from './guards/auth.guard';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { noAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [

  {
    path: "home", component: HomePageComponent,
    canActivate: [authGuard]
  },

  {
    path: "contact", component: ContactPageComponent,
    children: [
      {
        path: "edit",
        component: ContactEditPageComponent,
      },
      {
        path: "edit/:id",
        component: ContactEditPageComponent,
        resolve: { contact: contactResolver },
      }
    ],
    canActivate: [authGuard]
  },

  {
    path: "contact/:id", component: ContactDetailsComponent,
    resolve: { contact: contactResolver },
    canActivate: [authGuard]
  },

  {
    path: "stats", component: StatisticPageComponent,
    canActivate: [authGuard]
  },

  {
    path: "signup", component: SignupPageComponent,
    canActivate: [noAuthGuard],
    data: { isNoAuth: true }
  },

  // { path: "about", component: HomePageComponent }

  { path: "", pathMatch: "full", redirectTo: "signup" },
  { path: "**", component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
