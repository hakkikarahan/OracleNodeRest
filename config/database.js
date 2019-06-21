module.exports = {
  hrPool: {
    /* user: process.env.HR_USER,
    password: process.env.HR_PASSWORD,
    connectString: process.env.HR_CONNECTIONSTRING, */
    user          : "user",
    password      : "pass",
    connectString : "TnsName",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};

/* 
const oracledb = require('oracledb');

oracledb.getConnection(
  {
    user          : "oli",
    password      : "password",
    connectString : "ORACLE_DEV_DB_TNS_NAME"
  },
  connExecute
); */