const { Client } = require('pg');
const fs = require('fs');

async function getTables() {
    const client = new Client({
        connectionString: 'postgres://postgres@localhost/medusa-my-medusa-store',
    });

    try {
        await client.connect();

        const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);

        fs.writeFileSync('tables.json', JSON.stringify(res.rows, null, 2));

    } catch (err) {
        console.error('Error connecting or querying', err);
    } finally {
        await client.end();
    }
}

getTables();
