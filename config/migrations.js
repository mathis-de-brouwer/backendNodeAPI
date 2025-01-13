const fs = require('fs').promises;
const path = require('path');
const connection = require('./database');

async function runMigrations() {
    try {
        // migrations table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS migrations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                migration VARCHAR(255) NOT NULL,
                batch INT NOT NULL,
                executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // list migration files
        const migrationsDir = path.join(__dirname, '../migrations');
        const files = await fs.readdir(migrationsDir);

        //executed migrations
        const [executed] = await connection.query('SELECT migration FROM migrations');
        const executedFiles = executed.map(row => row.migration);

        // rnu pending migrations
        for (const file of files) {
            if (!executedFiles.includes(file)) {
                const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8');
                
                const statements = sql.split(';').filter(stmt => stmt.trim());
                
                for (const statement of statements) {
                    if (statement.trim()) {
                        await connection.query(statement);
                    }
                }
                
                await connection.query(
                    'INSERT INTO migrations (migration, batch) VALUES (?, ?)',
                    [file, 1]
                );
                console.log(`Migrated: ${file}`);
            }
        }
        
        console.log('All migrations completed');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

module.exports = runMigrations;