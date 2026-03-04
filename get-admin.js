const { Client } = require('pg');

async function getAdminUser() {
    const connectionString = 'postgres://postgres:admin@localhost/medusa-my-medusa-store';
    const client = new Client({ connectionString });

    try {
        await client.connect();
        // In Medusa v2, admin users are stored in 'user' table
        const res = await client.query('SELECT * FROM "user"');
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error fetching users:', err);
    } finally {
        await client.end();
    }
}

getAdminUser();
