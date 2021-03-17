import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirectiveDirective } from "./dropdown-directive.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";



@NgModule({
    declarations: [
      AlertComponent,
      LoadingSpinnerComponent,
      DropdownDirectiveDirective
  
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirectiveDirective,
        CommonModule,
    ]
  })
  export class SharedModule { }
   