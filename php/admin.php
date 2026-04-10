<?php
require_once 'config.php';
header('Content-Type: application/json');

requireAuth('admin');

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'overview':
        getOverview();
        break;
    case 'teacher_report':
        getTeacherReport();
        break;
    case 'all_teachers':
        getAllTeachers();
        break;
    case 'export_csv':
        exportCSV();
        break;
    default:
        jsonResponse(['error' => 'Invalid action'], 400);
}

function getOverview() {
    $db = getDB();

    $total_feedback = $db->query("SELECT COUNT(*) as c FROM feedback")->fetch()['c'];
    $total_students = $db->query("SELECT COUNT(*) as c FROM users WHERE role='student'")->fetch()['c'];
    $total_teachers = $db->query("SELECT COUNT(*) as c FROM teachers")->fetch()['c'];
    $avg_score = $db->query("SELECT ROUND(AVG(overall_score)::numeric, 2) as a FROM feedback")->fetch()['a'];

    // Teacher-wise averages
    $teacher_avgs = $db->query("
        SELECT t.name as teacher, t.id,
               ROUND(AVG(f.overall_score)::numeric,2) as avg_overall,
               ROUND(AVG(f.set1_score)::numeric,2) as avg_set1,
               ROUND(AVG(f.set2_score)::numeric,2) as avg_set2,
               ROUND(AVG(f.set3_score)::numeric,2) as avg_set3,
               COUNT(f.id) as feedback_count
        FROM teachers t
        LEFT JOIN feedback f ON t.id = f.teacher_id
        GROUP BY t.id, t.name
        ORDER BY avg_overall DESC NULLS LAST
    ")->fetchAll();

    // Subject-wise
    $subject_avgs = $db->query("
        SELECT s.name as subject, s.code,
               ROUND(AVG(f.overall_score)::numeric,2) as avg_score,
               COUNT(f.id) as count
        FROM subjects s
        LEFT JOIN feedback f ON s.id = f.subject_id
        GROUP BY s.id, s.name, s.code
        ORDER BY avg_score DESC NULLS LAST
    ")->fetchAll();

    // Recent feedback
    $recent = $db->query("
        SELECT u.name as student, t.name as teacher, s.name as subject,
               f.overall_score, f.created_at
        FROM feedback f
        JOIN users u ON f.student_id = u.id
        JOIN teachers t ON f.teacher_id = t.id
        JOIN subjects s ON f.subject_id = s.id
        ORDER BY f.created_at DESC
        LIMIT 10
    ")->fetchAll();

    jsonResponse([
        'stats' => [
            'total_feedback' => $total_feedback,
            'total_students' => $total_students,
            'total_teachers' => $total_teachers,
            'avg_score' => $avg_score ?? 0
        ],
        'teacher_avgs' => $teacher_avgs,
        'subject_avgs' => $subject_avgs,
        'recent' => $recent
    ]);
}

function getTeacherReport() {
    $teacher_id = intval($_GET['teacher_id'] ?? 0);
    if (!$teacher_id) jsonResponse(['error' => 'Teacher ID required'], 400);

    $db = getDB();
    $stmt = $db->prepare("
        SELECT t.name as teacher_name, t.department,
               s.name as subject, f.set1_score, f.set2_score, f.set3_score,
               f.overall_score, f.created_at,
               f.set1_answers, f.set2_answers, f.set3_answers
        FROM feedback f
        JOIN teachers t ON f.teacher_id = t.id
        JOIN subjects s ON f.subject_id = s.id
        WHERE f.teacher_id = :tid
        ORDER BY f.created_at DESC
    ");
    $stmt->execute([':tid' => $teacher_id]);
    $rows = $stmt->fetchAll();

    if (empty($rows)) {
        jsonResponse(['teacher' => null, 'feedbacks' => [], 'summary' => null]);
    }

    $avg1 = round(array_sum(array_column($rows, 'set1_score')) / count($rows), 2);
    $avg2 = round(array_sum(array_column($rows, 'set2_score')) / count($rows), 2);
    $avg3 = round(array_sum(array_column($rows, 'set3_score')) / count($rows), 2);
    $overall = round(($avg1 + $avg2 + $avg3) / 3, 2);

    // Insights
    $strengths = [];
    $weaknesses = [];
    if ($avg1 >= 75) $strengths[] = 'Strong Teaching Effectiveness';
    else $weaknesses[] = 'Teaching Effectiveness needs improvement';
    if ($avg2 >= 75) $strengths[] = 'Excellent Personality & Body Language';
    else $weaknesses[] = 'Personality/Body Language needs attention';
    if ($avg3 >= 75) $strengths[] = 'Great Assessment & Student Support';
    else $weaknesses[] = 'Assessment & Student Support needs work';

    jsonResponse([
        'teacher' => $rows[0]['teacher_name'],
        'department' => $rows[0]['department'],
        'feedbacks' => $rows,
        'summary' => [
            'avg_set1' => $avg1,
            'avg_set2' => $avg2,
            'avg_set3' => $avg3,
            'overall' => $overall,
            'count' => count($rows),
            'strengths' => $strengths,
            'weaknesses' => $weaknesses
        ]
    ]);
}

function getAllTeachers() {
    $db = getDB();
    $rows = $db->query("SELECT id, name FROM teachers ORDER BY name")->fetchAll();
    jsonResponse(['teachers' => $rows]);
}

function exportCSV() {
    $db = getDB();
    $rows = $db->query("
        SELECT u.name as student, t.name as teacher, s.name as subject,
               f.set1_score, f.set2_score, f.set3_score, f.overall_score, f.created_at
        FROM feedback f
        JOIN users u ON f.student_id = u.id
        JOIN teachers t ON f.teacher_id = t.id
        JOIN subjects s ON f.subject_id = s.id
        ORDER BY f.created_at DESC
    ")->fetchAll();

    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="feedback_report.csv"');

    $out = fopen('php://output', 'w');
    fputcsv($out, ['Student', 'Teacher', 'Subject', 'Teaching Score', 'Personality Score', 'Assessment Score', 'Overall Score', 'Date']);
    foreach ($rows as $r) {
        fputcsv($out, array_values($r));
    }
    fclose($out);
    exit;
}
