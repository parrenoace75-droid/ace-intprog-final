import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model.js';
import refreshTokenModel from '../accounts/refresh-token.model.js';

const db: any = {};
export default db;

initialize();

async function initialize() {
    const sequelize = new Sequelize(
        process.env.MYSQL_URL || 'mysql://root:@localhost:3306/node_mysql_api',
        { dialect: 'mysql' }
    );

    db.Account = accountModel(sequelize);
    db.RefreshToken = refreshTokenModel(sequelize);
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    await sequelize.sync();
}