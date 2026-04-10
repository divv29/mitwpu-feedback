<?php
require_once 'config.php';
header('Content-Type: application/json');

requireAuth('student');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'submit':
        submitFeedback();
        break;
    case 'get_subjects':
        getSubjects();
        break;
    case 'check_submitted':
        checkSubmitted();
        break;
    case 'get_progress':
        getProgress();
        break;
    default:
        jsonResponse(['error' => 'Invalid action'], 400);
}

function getSubjects() {
    $db = getDB();
    $stmt = $db->query("
        SELECT s.id, s.name, s.code, t.name as teacher_name, t.id as teacher_id
        FROM subjects s
        LEFT JOIN teachers t ON s.teacher_id = t.id
        WHERE s.semester = 4
        ORDER BY s.id
    ");
    $subjects = $stmt->fetchAll();
    jsonResponse(['subjects' => $subjects]);
}

function checkSubmitted() {
    $subject_id = intval($_GET['subject_id'] ?? 0);
    $student_id = $_SESSION['user_id'];

    $db = getDB();
    $stmt = $db->prepare("SELECT id FROM feedback WHERE student_id = :sid AND subject_id = :subid");
    $stmt->execute([':sid' => $student_id, ':subid' => $subject_id]);
    $row = $stmt->fetch();

    jsonResponse(['submitted' => (bool)$row]);
}

function getProgress() {
    $student_id = $_SESSION['user_id'];
    $db = getDB();

    $stmt = $db->prepare("
        SELECT f.subject_id, s.name as subject_name
        FROM feedback f
        JOIN subjects s ON f.subject_id = s.id
        WHERE f.student_id = :sid
    ");
    $stmt->execute([':sid' => $student_id]);
    $submitted = $stmt->fetchAll();

    $total = $db->query("SELECT COUNT(*) as c FROM subjects WHERE semester = 4")->fetch()['c'];

    jsonResponse([
        'submitted' => $submitted,
        'total' => $total,
        'completed' => count($submitted)
    ]);
}

function submitFeedback() {
    $student_id = $_SESSION['user_id'];
    $subject_id = intval($_POST['subject_id'] ?? 0);
    $teacher_id = intval($_POST['teacher_id'] ?? 0);

    if (!$subject_id || !$teacher_id) {
        jsonResponse(['error' => 'Invalid subject or teacher.'], 400);
    }

    // Check for duplicate
    $db = getDB();
    $check = $db->prepare("SELECT id FROM feedback WHERE student_id = :sid AND subject_id = :subid");
    $check->execute([':sid' => $student_id, ':subid' => $subject_id]);
    if ($check->fetch()) {
        jsonResponse(['error' => 'You have already submitted feedback for this subject.'], 409);
    }

    $set1 = json_decode($_POST['set1_answers'] ?? '[]', true);
    $set2 = json_decode($_POST['set2_answers'] ?? '[]', true);
    $set3 = json_decode($_POST['set3_answers'] ?? '[]', true);

    // Score calculation (A=4, B=3, C=2, D=1)
    function calcScore($answers) {
        $map = ['A' => 4, 'B' => 3, 'C' => 2, 'D' => 1];
        if (empty($answers)) return 0;
        $total = 0;
        foreach ($answers as $a) {
            $total += $map[strtoupper($a)] ?? 0;
        }
        return round(($total / (count($answers) * 4)) * 100, 2);
    }

    $s1 = calcScore($set1);
    $s2 = calcScore($set2);
    $s3 = calcScore($set3);
    $overall = round(($s1 + $s2 + $s3) / 3, 2);

    $stmt = $db->prepare("
        INSERT INTO feedback (student_id, teacher_id, subject_id, set1_answers, set2_answers, set3_answers, set1_score, set2_score, set3_score, overall_score)
        VALUES (:sid, :tid, :subid, :s1, :s2, :s3, :sc1, :sc2, :sc3, :ov)
    ");
    $stmt->execute([
        ':sid' => $student_id,
        ':tid' => $teacher_id,
        ':subid' => $subject_id,
        ':s1' => json_encode($set1),
        ':s2' => json_encode($set2),
        ':s3' => json_encode($set3),
        ':sc1' => $s1,
        ':sc2' => $s2,
        ':sc3' => $s3,
        ':ov' => $overall
    ]);

    jsonResponse(['success' => true, 'overall_score' => $overall]);
}
