export class AccountsView {
  constructor(
    public DEVELOPER_ROLE: string,
    public DBMDG_GROUP_NAME: string,
    public DBMDG_GROUP_DESC: string,
    public CONTACT: string,
    public CONTACT_NAME: string,
    public CONTACT_EMAIL: string,
    public LOCK_DATE: Date,
    public EXPIRY_DATE: Date,
    public PASSWORD_CHANGE_DATE: Date,
    public LAST_LOGIN_DATE: Date,
    public PASSWORD_VERSIONS: string,
    public COUNT_TABLES: number,
    public DBMACC_USER_PREFIX: string,
    public CREATED: Date,
    public USERNAME: string,
    public ACCOUNT_STATUS: string,
    public GLOBAL_NAME: string,
  ) { }
}
