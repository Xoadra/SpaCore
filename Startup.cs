



using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
			// In production, the Angular files will be served from this directory
			services.AddSpaStaticFiles( configuration => {
				configuration.RootPath = "View/dist";
			} );
		}
		
		public void Configure( IApplicationBuilder app, IHostingEnvironment env ) {
			if ( env.IsDevelopment( ) ) { app.UseDeveloperExceptionPage( ); }
			else { app.UseExceptionHandler( "/Home/Error" ); }
			app.UseStaticFiles( );
			app.UseSpaStaticFiles( );
			app.UseMvc( routes => {
				routes.MapRoute( name: "default", template: "{controller}/{action=Index}/{id?}" );
			} );
			app.UseSpa( spa => {
				spa.Options.SourcePath = "View";
				spa.UseSpaPrerendering( options => {
					options.BootModulePath = $"{ spa.Options.SourcePath }/Node/main.bundle.js";
					options.BootModuleBuilder = env.IsDevelopment( )
						? new AngularCliBuilder( npmScript: "build:ssr" ) : null;
					options.ExcludeUrls = new[ ] { "/sockjs-node" };
				} );
				if ( env.IsDevelopment( ) ) { spa.UseAngularCliServer( npmScript: "start" ); }
			} );
		}
		
	}
}


