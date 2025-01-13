const express = require('express');
const connection = require('./config/database');
const runMigrations = require('./config/migrations');
const userRoutes = require('./routes/users');
const newsRoutes = require('./routes/news');
const app = express();
const port = 3000;

(async () => {
    try {
        await runMigrations();
        
        app.use(express.static('public'));
        app.use(express.json());
        
        // api routes
        app.use('/api/users', userRoutes);
        app.use('/api/news', newsRoutes);

        // middleware error
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ error: 'Something went wrong!' });
        });

        // 404
        app.use((req, res) => {
            res.status(404).json({ error: 'Route not found' });
        });

        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
})();

process.on('SIGTERM', () => {
    connection.end();
    process.exit(0);
});