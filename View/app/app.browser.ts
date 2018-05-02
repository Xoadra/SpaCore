



import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { RouteModule } from './app.routing'

import { AppComponent } from './app.component'
import { NavMenuComponent } from './nav-menu/nav-menu.component'



@NgModule( {
	declarations: [
		AppComponent,
		NavMenuComponent
	],
	imports: [
		BrowserModule.withServerTransition( { appId: 'ng-cli-universal' } ),
		RouteModule,
		HttpClientModule,
		FormsModule
	],
	providers: [ ],
	bootstrap: [ AppComponent ]
} )


export class ViewModule {  }


