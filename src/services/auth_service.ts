import { TypedKnex } from "@wwwouter/typed-knex";
import { Knex } from "knex";
import Session from "../networks/session";
import { rxjh_account } from '../utilities/db';

class AuthService {
    protected session: Session;
    protected db_acc: Knex;

    constructor(session: Session) {
        this.session = session;
        this.db_acc = rxjh_account;
    }

    public authenticate(username: string, password: string) {
        // console.log(username, password);
        this.db_acc.from('tbl_account')
            .select('*')
            .where('username', '=', username)
            .then(rows => {
                console.log(rows)
            })
        
    }
}

export default AuthService;