import {sales} from "./modules/sales.js"
import {ppr} from "./modules/ppr.js"

let struct_upload_types = ["sales", "ppr"]

export function upload(type=struct_upload_types[0], dates, file, username, password) {
    //check if token is still valid, if not get a new one

    //call specific function expressed in type
    switch (type) {
        case struct_upload_types[0]:
            sales(dates, file, username, password);
            break;
        case struct_upload_types[1]:
            ppr(dates, file, username, password);
            break;
    }
  }