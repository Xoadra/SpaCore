



import { APP_BASE_HREF } from '@angular/common'



export const baseHref = APP_BASE_HREF
export const baseUrl = 'BASE_URL'


export function getBaseUrl( ) {
	return document.getElementsByTagName( 'base' )[ 0 ].href
}


