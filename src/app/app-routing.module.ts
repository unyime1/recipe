import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const approutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},  
];

@NgModule({
  imports: [RouterModule.forRoot(approutes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
