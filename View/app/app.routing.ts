



import { NgModule } from '@angular/core'
// Needs this module to work with server-side rendering
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { CounterComponent } from './counter/counter.component'
import { FetchDataComponent } from './fetch-data/fetch-data.component'



const routes: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{ path: 'counter', component: CounterComponent },
	{ path: 'fetch-data', component: FetchDataComponent }
]


@NgModule( {
	declarations: [
		HomeComponent,
		CounterComponent,
		FetchDataComponent
	],
	imports: [
		CommonModule,
		RouterModule.forRoot( routes )
	],
	exports: [ RouterModule ]
} )


export class RouteModule {  }


