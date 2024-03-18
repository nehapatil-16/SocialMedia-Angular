import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  apiUrl = 'http://127.0.0.1:8000/report/';

  constructor(private http: HttpClient) { }

  submitReport(reportData: any, token:string) {
    const headers= new HttpHeaders({
      // 'Content-Type':  'application/json',
      Authorization: token
    })
    // Send a POST request to the backend API
    console.log(reportData)
    return this.http.post(this.apiUrl, reportData,{headers: headers});
  }
  getReportPost(userId:number,postId:number, token:string){
    const headers= new HttpHeaders({
      Authorization: token
    })
    const url = `${this.apiUrl}?user=${userId}&user_post=${postId}`;
    return this.http.get(url, {headers: headers})
  }
}
