



using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;



namespace SpaCore {
	public class Startup {
		
		public IConfiguration Configuration { get; }
		
		
		public Startup( IConfiguration configuration ) {
			Configuration = configuration;
		}
		
		
		public void ConfigureServices( IServiceCollection services ) {
			services.AddMvc( );
			// Node server activation for prerendering single page apps
			services.AddNodeServices( );
			services.Configure<RazorViewEngineOptions>( razor => {
				// Overwrite the razor view engine's default view location
				razor.ViewLocationFormats.Clear( );
				// Identify custom path names for the razor view engine
				razor.ViewLocationFormats.Add( "~/Web/{1}/{0}" + RazorViewEngine.ViewExtension );
				razor.ViewLocationFormats.Add( "~/Web/Base/{0}" + RazorViewEngine.ViewExtension );
			} );
			// In production mode, the Angular files will be served from this directory
			services.AddSpaStaticFiles( configuration => {
				configuration.RootPath = "Exe";
			} );
		}
		
		public void Configure( IApplicationBuilder app, IHostingEnvironment env ) {
			if ( env.IsDevelopment( ) ) { app.UseDeveloperExceptionPage( ); }
			else { app.UseExceptionHandler( "/Home/Error" ); }
			// Allows SPA files to be reached by the browser, but reason is unknown
			app.UseDefaultFiles( );
			app.UseStaticFiles( );
			// Unsure of the purpose for this configuration as it appears to do nothing
			/* app.UseSpaStaticFiles( ); */
			app.UseMvc( routes => {
				routes.MapRoute( name: "default", template: "{controller}/{action}/{id?}" );
				routes.MapSpaFallbackRoute( "spa-fallback", new { controller = "Home", action = "Index" } );
			} );
			app.UseSpa( spa => {
				// Output location of the built Angular file bundles loaded in the browser
				spa.Options.SourcePath = "Exe";
				spa.UseSpaPrerendering( options => {
					// Location to output and read files built for server-side prerendering
					options.BootModulePath = $"{ spa.Options.SourcePath }/Node/main.js";
					/* options.BootModuleBuilder = env.IsDevelopment( )
						// Generates the development mode server-side rendered bundle
						? new AngularCliBuilder( npmScript: "core" ) : null; */
					// Not sure what this does since identity of sockjs-node is a mystery
					options.ExcludeUrls = new[ ] { "/sockjs-node" };
				} );
				// Builds Angular files when running dotnet run in development mode
				if ( env.IsDevelopment( ) ) { spa.UseAngularCliServer( npmScript: "build" ); }
			} );
		}
		
	}
}



