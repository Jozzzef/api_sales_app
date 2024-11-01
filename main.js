import {sales} from "./modules/sales.js"
import {ppr} from "./modules/ppr.js"

let struct_upload_types = ["sales", "ppr"]

export async function upload(type=struct_upload_types[0], file_path, franchisee_id, username, password) {
    //call specific function expressed in type
    switch (type) {
        case struct_upload_types[0]:  
            return await sales(file_path, franchisee_id, username, password);
        case struct_upload_types[1]:
            return await ppr(file_path, franchisee_id, username, password);
    }
}