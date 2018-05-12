



import 'zone.js/dist/zone-node'
import 'reflect-metadata'

import { enableProdMode } from '@angular/core'
import { createServerRenderer } from 'aspnet-prerendering'
// Allows server-side prerendering of Angular content
import { ngAspnetCoreEngine, IEngineOptions, createTransferScript } from '@nguniversal/aspnetcore-engine'

export { CoreModule } from './app/app.server'

import { baseHref, baseUrl } from './origins'



// Supposedly allows faster builds for server rendering
enableProdMode( )


// Rendering setup used with platform-server provider
export default createServerRenderer( core => {
	const { CoreModule, CoreModuleNgFactory, lazyModuleMap } = ( module as any ).exports
	const ops: IEngineOptions = {
		appSelector: '<app-root></app-root>',
		// Only works without environment checks now
		ngModule: CoreModuleNgFactory,
		request: core,
		providers: [
			// Enables api data loading without JavaScript
			{ provide: baseHref, useValue: core.baseUrl },
			{ provide: baseUrl, useValue: core.origin + core.baseUrl }
		]
	}
	return ngAspnetCoreEngine( ops ).then( trans => {
		// Transfer data from the server to the frontend
		trans.globals.transferData = createTransferScript( {
			someData: 'Transfer this to the client on the window.TRANSFER_CACHE {  } object',
			// Data accessed sent by the backend server
			fromDotnet: core.data.thisCameFromDotNET
		} )
		return ( { html: trans.html, globals: trans.globals } )
	} )
} )



