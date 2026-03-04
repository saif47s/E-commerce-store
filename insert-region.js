const { Client } = require('pg');

async function createRegion() {
    const connectionString = 'postgresql://neondb_owner:npg_LkVE1ZNiDOy6@ep-icy-cell-aiiv3vnq-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
    const client = new Client({ connectionString });

    try {
        await client.connect();

        console.log("Creating default US region...");
        const regionId = 'reg_' + Math.random().toString(36).substring(2, 10);

        // Add currency with required JSONB rounding
        await client.query(`
            INSERT INTO currency (code, symbol, symbol_native, name, raw_rounding) 
            VALUES ('usd', '$', '$', 'US Dollar', '{"value":0,"precision":2}'::jsonb)
            ON CONFLICT (code) DO NOTHING;
        `);

        // Add region
        await client.query(`
            INSERT INTO region (id, name, currency_code, automatic_taxes) 
            VALUES ('${regionId}', 'United States', 'usd', true);
        `);

        // Add country
        await client.query(`
            INSERT INTO region_country (iso_2, iso_3, num_code, name, display_name, region_id) 
            VALUES ('us', 'usa', 840, 'United States', 'United States', '${regionId}')
            ON CONFLICT (iso_2) DO UPDATE SET region_id = EXCLUDED.region_id;
        `);

        console.log("Successfully created US region with ID:", regionId);
    } catch (err) {
        console.error('Error creating region:', err);
    } finally {
        await client.end();
    }
}

createRegion();
