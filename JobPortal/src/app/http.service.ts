import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import {Candidate} from './candidateSchema';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  createUrl = "http://localhost:3000/jobportal/person/"
   stateListUrl = 'http://localhost:3000/jobportal/state/';
  emailCheck = "http://localhost:3000/jobportal/uniqueEmail/";
  usernameCheck = "http://localhost:3000/jobportal/username/";
  loginUrl = "http://localhost:3000/jobportal/login/"
  emailSendUrl = "http://localhost:3000/jobportal/emailsender/";
  forgotPasswordUrl = "http://localhost:3000/jobportal/updatePassword/"
  fileUploadurl = "http://localhost:3000/jobportal/uploadPiture/"
  fetchDataUrl = "http://localhost:3000/jobportal/getCandidateData"

  /** to add new register candidate */
  creatCandidate(data)
  {
    console.log("inside server");
  return this.http.post<any>(this.createUrl, data)
  }

  /**taking the state names from the server */
  getStateList(){
    console.log("**********************")
    
    return this.http.get<any>(this.stateListUrl)
  }

  /** to check the valid user or not*/
  loginCheck(values)
  {
  return this.http.post<any>(this.loginUrl,values);
  }

  /**checking email is unique or not */
   checkEmail(email) {
    
     return this.http.post(this.emailCheck,email);
   }

   /**checking username is unique or not */
   checkUsername(username) {
    console.log("don ",username)
    return this.http.post(this.usernameCheck,username);
  }

  /**for sending the email for  forgot password field */
   emailSender(value){
     console.log("my personal - ",value)
    return this.http.post<any>(this.emailSendUrl, value)
   }

   /**changing the password */
   forgotPasword(data)
  {
  return this.http.post<any>(this.forgotPasswordUrl, data);
  }


  setToken(token){
    localStorage.setItem("loginUser",token);
  }
  
  getToken()
  {
    return localStorage.getItem("loginUser");
  }
  isloggedIn()
  {
    return this.getToken() !== null;
  }


  logout() {
    localStorage.removeItem("loginUser")
  }

  /**for uploading the image */

    public uploadImage(image: File) {
        const formData = new FormData();
        formData.append('photo',image);
        return this.http.post(this.fileUploadurl, formData);
    }

    /**for fetching the candidate data */
    getCandidateData(username) {
      console.log('sended name',username);
      return this.http.get<any>(`${this.fetchDataUrl}/${username}`);
    }
}


