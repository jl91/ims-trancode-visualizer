import { Injectable } from "@angular/core";
import { WebsqlService } from "./websql.service";

@Injectable({
  providedIn: 'root'
})
export class TrancodeFieldService {


  constructor(
    private websqlService: WebsqlService
  ) {
  }


}

