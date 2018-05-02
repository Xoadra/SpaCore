



import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { environment } from './environments/environment'

import { ViewModule } from './app/app.browser'

import { getBaseUrl, baseUrl } from './origins'



const providers = [
	{ provide: baseUrl, useFactory: getBaseUrl, deps: [ ] }
]

if ( environment.production ) { enableProdMode( ) }


platformBrowserDynamic( providers ).bootstrapModule( ViewModule ).catch( err => console.log( err ) )



