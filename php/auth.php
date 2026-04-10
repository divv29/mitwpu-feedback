<?php
require_once 'config.php';
header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        handleLogin();
        break;
    case 'logout':
        handleLogout();
        break;
    case 'register':
        handleRegister();
        break;
    case 'check':
        checkSession();
        break;
    default:
        jsonResponse(['error' => 'Invalid action'], 400);
}

function handleLogin() {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Validate email domain
    if (!preg_match('/@mitwpu\.edu\.in$/', $email)) {
        jsonResponse(['error' => 'Only @mitwpu.edu.in email addresses are allowed.'], 403);
    }

    if (empty($email) || empty($password)) {
        jsonResponse(['error' => 'Email and password are required.'], 400);
    }

    $db = getDB();
    $stmt = $db->prepare("SELECT id, name, email, password, role FROM users WHERE email = :email");
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        jsonResponse(['error' => 'Invalid email or password.'], 401);
    }

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['name'] = $user['name'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['role'] = $user['role'];

    jsonResponse([
        'success' => true,
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $user['role']
        ],
        'redirect' => $user['role'] === 'admin' ? 'admin/dashboard.html' : 'dashboard.html'
    ]);
}

function handleLogout() {
    session_destroy();
    jsonResponse(['success' => true, 'redirect' => 'index.html']);
}

function handleRegister() {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!preg_match('/@mitwpu\.edu\.in$/', $email)) {
        jsonResponse(['error' => 'Only @mitwpu.edu.in email addresses are allowed.'], 403);
    }

    if (strlen($password) < 6) {
        jsonResponse(['error' => 'Password must be at least 6 characters.'], 400);
    }

    $db = getDB();
    $check = $db->prepare("SELECT id FROM users WHERE email = :email");
    $check->execute([':email' => $email]);
    if ($check->fetch()) {
        jsonResponse(['error' => 'Email already registered.'], 409);
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $db->prepare("INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, 'student') RETURNING id");
    $stmt->execute([':name' => $name, ':email' => $email, ':password' => $hash]);
    $row = $stmt->fetch();

    $_SESSION['user_id'] = $row['id'];
    $_SESSION['name'] = $name;
    $_SESSION['email'] = $email;
    $_SESSION['role'] = 'student';

    jsonResponse(['success' => true, 'redirect' => 'dashboard.html']);
}

function checkSession() {
    if (isset($_SESSION['user_id'])) {
        jsonResponse([
            'authenticated' => true,
            'user' => [
                'id' => $_SESSION['user_id'],
                'name' => $_SESSION['name'],
                'email' => $_SESSION['email'],
                'role' => $_SESSION['role']
            ]
        ]);
    } else {
        jsonResponse(['authenticated' => false]);
    }
}
