import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model.js';
import refreshTokenModel from '../accounts/refresh-token.model.js';
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync(new URL('../../config.json', import.meta.url), 'utf-8'));

const db: any = {};
export default db;

initialize();

async function initialize() {
    const { host, port, user, password, database } = config.database;
    
    const sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect: 'mysql'
    });

    db.Account = accountModel(sequelize);
    db.RefreshToken = refreshTokenModel(sequelize);
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    await sequelize.sync();
}