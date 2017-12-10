import { Injectable} from '@angular/core';
import { GroupInterface, 
         TeamMemberInterfase,
         GalerijaInterface,
         PictureInterface,
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
  public activeUserIndex;
  
  public groups : GroupInterface[] = []
  public gallerys : GalerijaInterface[] = []
  public pictures : PictureInterface[] = []
  public table_rows : TableRow[] = []
  public members : TeamMemberInterfase[] = []
  // delete object
  public addToList = false // enables items selecting for deletion
  public selected_items = []  // arry of items _id or other information of selected itemd
  public item_type : string = '' // type for multiple delete
  public selected_DOM_items = [] // holds selected itmes DOM, for removing class after canceling deletion
  //group parmas
  public gallery_id : string = ''
  public group_id : string = ''

  public showSuccessMessage =(message:string,button_message:string,duration:number)=>{
    this.snackBar.open(message,button_message, {
      duration: duration,
      panelClass: 'blue-snackbar'
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
  loadGroups(){
    this.getGroups(this.selected_user._id).subscribe((groups:GroupInterface[]) => { this.groups = groups; console.log(this.groups)},
                                              err =>{ console.log(err)},
                                              ()=>{console.log('groups updated')})
  }
  getOneGroup(group_id:string){
    return this.http.get(environment.getGroups+'/one/'+group_id)
      .map(this.extractData)
      .catch(this.handleError);
  }

 /**####################################################################
 *             ----GALLERY---- SERVER REQUESTS
 *#####################################################################*/
  getGalleries(user_id){
    return this.http.get(environment.get_gallerys+user_id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  loadGallerys(user_id){
    this.getGalleries(user_id).subscribe(data=>{this.gallerys = data; console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{console.log('gallerys updated')})
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
getTable(group_id){
  return this.http.get(environment.getTableUrl+group_id,this.options)
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