



import { Component } from '@angular/core'
import { Title } from '@angular/platform-browser'



@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
} )


export class AppComponent {
	
	title: string = 'app'
	
	
	constructor( private _title: Title ) {  }
	
	
	ngOnInit( ) {
		this._title.setTitle( 'SpaCore' )
	}
	
}


