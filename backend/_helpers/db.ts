import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model.js';
import refreshTokenModel from '../accounts/refresh-token.model.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const config = JSON.parse(readFileSync(join(__dirname, '../../config.json'), 'utf-8'));

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