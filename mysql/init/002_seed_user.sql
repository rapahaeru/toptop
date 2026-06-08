SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
-- Senhas: admin → 'admin123' | cael → 'cael123' (bcrypt, cost=10)
INSERT IGNORE INTO toptop.user (created_time, updated_time, name, username, email, password) VALUES
(NOW(), NOW(), 'admin', 'admin', 'teste@gmail.com', '$2b$10$SMvchkKhs1tkO7Y.Itj7U.6PR.dyXJZW30g0LQINT3qya5FQXrl.u'),
(NOW(), NOW(), 'Cael', 'cael', 'rapahaeru@gmail.com', '$2b$10$RukCWatJxZubqITRmXzda.Q/vKadz4W0zOsGzZYFovcuVmwQ2zEwC')
