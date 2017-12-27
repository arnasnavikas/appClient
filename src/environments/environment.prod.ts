var address = '192.168.1.67:3000'

export const environment = {
  production: true,
                /** sends mail */
        sendMailUrl : 'http://'+address+'/mail/send',
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
        getTableUrl : 'http://'+address+'/table/get-tables/',
/******************************* TEAM MEMBER **************************** */
                /** gets specific member  */
getUserUrl : 'http://'+address+'/my-team/',
                /** gets all  team members  */
getTeamMemberUrl : 'http://'+address+'/my-team/get-members',
                /** cities of lithuania */
  
}

