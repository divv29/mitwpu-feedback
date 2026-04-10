<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_PORT', '5432');
define('DB_NAME', 'mitwpu_feedback');
define('DB_USER', 'postgres');
define('DB_PASS', 'your_password_here');

function getDB() {
    static $conn = null;
    if ($conn === null) {
        $dsn = "pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME;
        try {
            $conn = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        } catch (PDOException $e) {
            die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
        }
    }
    return $conn;
}

// Session start
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// CORS / JSON headers helper
function jsonResponse($data, $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Auth check helper
function requireAuth($role = 'student') {
    if (!isset($_SESSION['user_id'])) {
        jsonResponse(['error' => 'Unauthorized', 'redirect' => '../index.html'], 401);
    }
    if ($role === 'admin' && $_SESSION['role'] !== 'admin') {
        jsonResponse(['error' => 'Forbidden'], 403);
    }
}
