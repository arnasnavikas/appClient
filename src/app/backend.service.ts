import { Injectable} from '@angular/core';
import { GroupInterface, 
         TeamMemberInterfase,
         GalerijaInterface,
         PictureInterface,
         city,
         TableRow } from "./interface.enum"
import { Http,Response,Headers,RequestOptions } from "@angular/http";  
import { Observable } from "rxjs/Rx";
import { environment } from '../environments/environment'
import { MatSnackBar} from '@angular/material';
import { Router } from '@angular/router'
@Injectable()
export class BackendService {

  constructor(public http  : Http,public snackBar: MatSnackBar,public router : Router) { }
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private options = new RequestOptions({ headers: this.headers });
  
  public selected_user :TeamMemberInterfase
  // nimation between pages
  public animationTriger
  public router_params

  public groups: GroupInterface[] =[]
// for animation 
  setParams(...args){
    console.log(args)
    console.log(this.router_params)
    if(JSON.stringify(this.router_params) === JSON.stringify(args)){
      console.log('same params')
      return;
    }
    this.animationTriger = 'invisible'
    this.router_params = args
  }
  public showSuccessMessage =(message:string,button_message:string,duration:number)=>{
    this.snackBar.open(message,button_message, {
      duration: duration,
      panelClass: 'position-snackbar'
    });
  }
/**####################################################################
 *             ----GROUP---- SERVER REQUESTS
 *#####################################################################*/

  getGroups(user_id){
    return this.http.get(environment.getGroups+user_id,this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  getOneGroup(route:string){
    return this.http.get(environment.getGroups+'/by-route/'+route)
      .map(this.extractData)
      .catch(this.handleError);
  }

 /**####################################################################
 *             ----GALLERY---- SERVER REQUESTS
 *#####################################################################*/
  getGallerys(user_id){
    return this.http.get(environment.get_gallerys+user_id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

/**####################################################################
 *             ----PICTURES---- SERVER REQUESTS
 *#####################################################################*/
getGalleryPictures(gallery_id){
  return this.http.get(environment.getPicturesUrl+gallery_id)
                  .map(this.extractData)
                  .catch(this.handleError);
}

/**####################################################################
 *             ----TABLE---- SERVER REQUESTS
 *#####################################################################*/
getTable(user_id){
  return this.http.get(environment.getTableUrl+user_id,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
/**####################################################################
 *             ----USERS---- SERVER REQUESTS
 *#####################################################################*/
getTeamMembers(){
  return this.http.get(environment.getTeamMemberUrl,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
getOneMember(user_id){
  return this.http.get(environment.getUserUrl+user_id,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
// download json with Lithuania city's
searchAdress(){
  let url = '../../../assets/lietuvos-miestai.json';
  return this.http.get(url)
                  .map(this.extractData)
                  .catch(this.handleError)
}
// send mail
sendMail(mailForm){
  let body = JSON.stringify(mailForm);
  return this.http.post(environment.sendMailUrl,'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError)
}
/**####################################################################
 *             ----SERVER RESPONSE FUNCTIONS---- 
 *#####################################################################*/
  // converting response data to json
  private extractData(res: Response) {
    let body = res.json();
    return body || { "error":"nera duomenu"};
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}