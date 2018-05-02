



import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { environment } from './environments/environment'

import { ViewModule } from './app/app.browser'



export function getBaseUrl( ) {
	return document.getElementsByTagName( 'base' )[ 0 ].href
}


const providers = [
	{ provide: 'BASE_URL', useFactory: getBaseUrl, deps: [ ] }
]

if ( environment.production ) { enableProdMode( ) }


platformBrowserDynamic( providers ).bootstrapModule( ViewModule ).catch( err => console.log( err ) )


