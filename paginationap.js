
app.get('/products', async (req, res) => {
    // client is the instance of the database instance

      try{
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.body.offset) || 0;

        // get the data of productss
        const productQuery = ` SELECT * FROM products ORDER BY  id LIMIT $1 OFFSET $2`;

        const result = await client.query(productQuery, [limit, offset]);

        const countQuery = 'SELECT COUNT(*) FROM products';
        const countResult = await client.query(countQuery);
        const totalCount = parseInt(countResult.rows[0].count, 10);

        // send data to send in response
        res.json({
            data: result.rows,
            meta: {
                totalCount,
                limit,
                offset,
                totolPages: Math.ceil(totalCount/limit),
            },
        })
      }

      catch(error){
           
             res.status(500).json({error:"Internal server error"});

      }
})