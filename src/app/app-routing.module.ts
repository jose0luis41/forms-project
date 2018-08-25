import { NgModule } from "../../node_modules/@angular/core";
import { RouterModule, Routes } from "../../node_modules/@angular/router";
import { FormComponent } from "./tabs/form/form.component";

const routes: Routes = [
        {path:'', redirectTo:'/formDI', pathMatch: 'full'},
        {path:'formDI', component: FormComponent},
        {path:'formS', component: FormComponent},
        {path:'formST', component: FormComponent},
        {path:'formCMD', component: FormComponent},
        {path:'formMT', component: FormComponent},

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{
}

export const routingComponents = [FormComponent];