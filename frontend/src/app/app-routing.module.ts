import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { PageNotFoundComponent } from './cmps/page-not-found/page-not-found.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditPageComponent } from './pages/contact-edit-page/contact-edit-page.component';
import { contactResolver } from './services/contact-resolver.service';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  {
    path: "contact", component: ContactPageComponent, children: [
      { path: "edit", component: ContactEditPageComponent },
      {
        path: "edit/:id",
        component: ContactEditPageComponent,
        resolve: { contact: contactResolver },
      }
    ]
  },
  // { path: "contact/edit", component: ContactEditPageComponent },
  { path: "contact/:id", component: ContactDetailsComponent },
  // {
  //   path: "contact/edit/:id",
  //   component: ContactEditPageComponent,
  //   resolve: { contact: contactResolver },
  // },
  { path: "stats", component: StatisticPageComponent },
  // { path: "about", component: HomePageComponent }

  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "**", component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
