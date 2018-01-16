var address = 'http://arno-apdaila.lt/api'

export const environment = {
  production: true,
        ip_address : address,
                /** sends mail */
        sendMailUrl : address+'/mail/send',
/***************************** GALLERY  ************************* */
                /** load gallerys */
       get_gallerys : address+'/gallery/user-id/',
        /******************************* PICTURES************************** */
        /** get pictures by gallery route */
getPicturesUrl : address+'/picture/get-pictures/',

/******************************* GROUP **************************** */
                /** downloads all groups */
          getGroups : address+'/group/',
/******************************* TABLE **************************** */
                /** get table by group id*/
        getTableUrl : address+'/table/get-tables/',
/******************************* TEAM MEMBER **************************** */
                /** gets specific member  */
getUserUrl : address+'/my-team/',
                /** gets all  team members  */
getTeamMemberUrl : address+'/my-team/get-members',
                /** cities of lithuania */
  
}

