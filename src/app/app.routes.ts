import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProjectsListComponent } from './pages/projects-list/projects-list';
import { ProjectDetailComponent } from './pages/project-detail/project-detail';
import { AboutPageComponent } from './pages/about-page/about-page';
import { ContactPageComponent } from './pages/contact-page/contact-page';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'progetti', component: ProjectsListComponent },
  { path: 'progetti/:id', component: ProjectDetailComponent },
  { path: 'chi-sono', component: AboutPageComponent },
  { path: 'contatti', component: ContactPageComponent },
  { path: '**', component: NotFoundComponent },
];
