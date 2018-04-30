



import 'zone.js/dist/zone-node'
import 'reflect-metadata'

import { APP_BASE_HREF } from '@angular/common'
import { enableProdMode } from '@angular/core'
import { renderModule, renderModuleFactory } from '@angular/platform-server'
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader'
import { createServerRenderer } from 'aspnet-prerendering'

export { NodeModule } from './app/app.server'



enableProdMode( )


export default createServerRenderer( params => {
	const { NodeModule, NodeModuleNgFactory, LAZY_MODULE_MAP } = ( module as any ).exports
	const options = {
		document: params.data.originalHtml,
		url: params.url,
		extraProviders: [
			provideModuleMap( LAZY_MODULE_MAP ),
			{ provide: APP_BASE_HREF, useValue: params.baseUrl },
			{ provide: 'BASE_URL', useValue: params.origin + params.baseUrl }
		]
	}
	const renderPromise = NodeModuleNgFactory
		? /* AoT */ renderModuleFactory( NodeModuleNgFactory, options )
		: /* dev */ renderModule( NodeModule, options )
	return renderPromise.then( html => ( { html } ) )
} )



