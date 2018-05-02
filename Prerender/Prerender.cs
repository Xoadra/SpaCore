



using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.AspNetCore.SpaServices.Prerendering;
using Microsoft.Extensions.DependencyInjection;



namespace SpaCore.Prerender {
	public static class Pre {
		
		public static IRequest Decode( this HttpRequest source ) {
			// Unknown purpose as of yet, but the info here is required further below
			IRequest http = new IRequest( );
			http.cookies = source.Cookies;
			http.headers = source.Headers;
			http.host = source.Host;
			return http;
		}
		
		public static async Task<RenderToStringResult> Prerender( this HttpRequest trans ) {
			// Grab key website data that will be serialized for use in universal rendering
			INodeServices node = trans.HttpContext.RequestServices.GetRequiredService<INodeServices>( );
			IHostingEnvironment zone = trans.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>( );
			IHttpRequestFeature item = trans.HttpContext.Features.Get<IHttpRequestFeature>( );
			// Identify web app's host and subroute to target for prerending server-side
			string root = zone.ContentRootPath;
			string path = item.RawTarget;
			// Build out the url from the previous parameters for prerendering it's content
			string url = $"{ trans.Scheme }://{ trans.Host }{ path }";
			// Allow for the passing of custom data as a request for the frontend app
			TransferData data = new TransferData( );
			// Customized data sent to the frontend is sent through here as a parameter
			// Feel free to add more custom data here through TransferData class fields
			data.elements = trans.Decode( );
			data.thisCameFromDotNET = "The server beckons thee!!!";
			// Requires a cancellation token for performing universal app prerendering
			CancellationTokenSource origin = new CancellationTokenSource( );
			CancellationToken exe = origin.Token;
			// Locate the generated server-side bundle used for the initial prerendering
			JavaScriptModuleExport js = new JavaScriptModuleExport( root + "/Node/main.bundle" );
			// Serialize and prerender the frontend app as a universal/isomorphic one
			return await Prerenderer.RenderToString( "/", node, exe, js, url, path, data, 30000, trans.PathBase.ToString( ) );
		}
		
	}
}



