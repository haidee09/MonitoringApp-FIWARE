// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  back_sdklocal:"http://localhost:4000/api",
  //back_sdk:"http://207.249.127.149:4000/api",
  back_sdk:"http://207.249.127.218:4000/api"
  //back_sdk: "https://driving-monitor-api.herokuapp.com/api"
};
