



import 'zone.js/dist/zone-node'
import 'reflect-metadata'

/* import { APP_BASE_HREF } from '@angular/common'
import { enableProdMode } from '@angular/core'
import { renderModule, renderModuleFactory } from '@angular/platform-server'
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader'
import { createServerRenderer } from 'aspnet-prerendering'

export { CoreModule } from './app/app.server'



enableProdMode( )


export default createServerRenderer( params => {
	const { CoreModule, CoreModuleNgFactory, LAZY_MODULE_MAP } = ( module as any ).exports
	const options = {
		document: params.data.originalHtml,
		url: params.url,
		extraProviders: [
			provideModuleMap( LAZY_MODULE_MAP ),
			{ provide: APP_BASE_HREF, useValue: params.baseUrl },
			{ provide: 'BASE_URL', useValue: params.origin + params.baseUrl }
		]
	}
	const render = CoreModuleNgFactory
		? AoT renderModuleFactory( CoreModuleNgFactory, options )
		: dev renderModule( CoreModule, options )
	return render.then( html => ( { html } ) )
} ) */




import { APP_BASE_HREF } from '@angular/common'
import { enableProdMode } from '@angular/core'
import { renderModule, renderModuleFactory } from '@angular/platform-server'
// Allows server-side prerendering of Angular content
import { ngAspnetCoreEngine, IEngineOptions, createTransferScript } from '@nguniversal/aspnetcore-engine'
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader'
import { createServerRenderer } from 'aspnet-prerendering'

export { CoreModule } from './app/app.server'
/* import { NetCoreModule } from './app/app.server' */



// Supposedly allows faster builds for server rendering
enableProdMode( )


// Rendering setup used with platform-server provider
export default createServerRenderer( core => {
	const { CoreModule, CoreModuleNgFactory, LAZY_MODULE_MAP } = ( module as any ).exports
	const ops: IEngineOptions = {
		appSelector: '<app-root></app-root>',
		ngModule: CoreModule,
		request: core,
		providers: [
			provideModuleMap( LAZY_MODULE_MAP ),
			{ provide: APP_BASE_HREF, useValue: core.baseUrl },
			{ provide: 'BASE_URL', useValue: core.origin + core.baseUrl }
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



