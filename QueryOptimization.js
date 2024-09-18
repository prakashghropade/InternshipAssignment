
SELECT user.user_id, user.name, SUM(order.amount) AS total_order_amount
FROM users user
JOIN orders order ON user.user_id = order.user_id
WHERE order.order_date >= NOW() - INTERVAL '1 month'
GROUP BY user.user_id, user.name
ORDER BY total_order_amount DESC
LIMIT 5;


// By using this indexs our query of serching is optimized
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_users_user_id ON users(user_id);


