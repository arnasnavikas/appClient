// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var address = 'localhost:3000'

export const environment = {
  production: false,
                /** sends mail */
        sendMailUrl : 'http://'+address+'/sendMail',
/***************************** GALLERY  ************************* */
                /** load gallerys */
       get_gallerys : 'http://'+address+'/gallery/user-id/',
        /******************************* PICTURES************************** */
        /** get pictures by gallery route */
getPicturesUrl : 'http://'+address+'/picture/get-pictures/',

/******************************* GROUP **************************** */
                /** downloads all groups */
          getGroups : 'http://'+address+'/group/',
/******************************* TABLE **************************** */
                /** get table by group id*/
        getTableUrl : 'http://'+address+'/table/get-one/',
/******************************* TEAM MEMBER **************************** */
                /** gets specific member  */
getUserUrl : 'http://'+address+'/my-team/',
                /** gets all  team members  */
getTeamMemberUrl : 'http://'+address+'/my-team/get-members',
}

