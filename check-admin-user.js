const { Client } = require('pg');

async function checkAdmin() {
    const connectionString = 'postgresql://neondb_owner:npg_LkVE1ZNiDOy6@ep-icy-cell-aiiv3vnq-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
    const client = new Client({ connectionString });

    try {
        await client.connect();
        const res = await client.query('SELECT email FROM "user"');
        console.log("Existing users:", res.rows);
    } catch (err) {
        console.error('Error fetching users:', err);
    } finally {
        await client.end();
    }
}

checkAdmin();
