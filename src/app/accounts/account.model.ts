export class Account {
  constructor(
    public DBMACC_ID: number,
    public GLOBAL_NAME: string,
    public USERNAME: string,
    public ACCOUNT_STATUS: string,
    public CREATED: Date,
    public LOCK_DATE: Date,
    public EXPIRY_DATE: Date,
    public PASSWORD_CHANGE_DATE: Date,
    public LAST_LOGIN_DATE: Date,
    public PASSWORD_VERSIONS: string,
    public COUNT_TABLES: number,
    public DBMACC_USER_PREFIX: string,
    public DBMACC_INS_DATE: Date,
    public DBMACC_UPD_DATE: Date,
    public DBMDG_ID: number,
  ) { }
}
