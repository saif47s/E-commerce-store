const { Client } = require('pg');

async function checkRegions() {
    const connectionString = 'postgresql://neondb_owner:npg_LkVE1ZNiDOy6@ep-icy-cell-aiiv3vnq-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
    const client = new Client({ connectionString });

    try {
        await client.connect();

        // Let's create a default US region manually in the database if it's missing
        const res = await client.query('SELECT id, name FROM region');
        console.log("Existing regions:", res.rows);

    } catch (err) {
        console.error('Error fetching regions:', err);
    } finally {
        await client.end();
    }
}

checkRegions();
