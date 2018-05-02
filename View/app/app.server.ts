



import { NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'
/* import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader' */

import { ViewModule } from './app.browser'

import { AppComponent } from './app.component'



@NgModule( {
	imports: [
		ViewModule,
		ServerModule
		/* ModuleMapLoaderModule */
	],
	bootstrap: [ AppComponent ]
} )


export class CoreModule {  }


