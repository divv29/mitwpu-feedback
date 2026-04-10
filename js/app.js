// MIT-WPU Feedback System — Main JS

const API = {
  auth: 'php/auth.php',
  feedback: 'php/feedback.php',
  admin: 'php/admin.php'
};

// ===== AUTH =====
async function login(email, password) {
  const fd = new FormData();
  fd.append('action', 'login');
  fd.append('email', email);
  fd.append('password', password);
  return await apiPost(API.auth, fd);
}

async function register(name, email, password) {
  const fd = new FormData();
  fd.append('action', 'register');
  fd.append('name', name);
  fd.append('email', email);
  fd.append('password', password);
  return await apiPost(API.auth, fd);
}

async function logout() {
  const fd = new FormData();
  fd.append('action', 'logout');
  await apiPost(API.auth, fd);
  window.location.href = 'index.html';
}

async function checkSession() {
  try {
    const r = await fetch(API.auth + '?action=check');
    return await r.json();
  } catch { return { authenticated: false }; }
}

// ===== API HELPERS =====
async function apiPost(url, formData) {
  const r = await fetch(url, { method: 'POST', body: formData });
  return await r.json();
}

async function apiGet(url) {
  const r = await fetch(url);
  return await r.json();
}

// ===== UI HELPERS =====
function showError(selector, msg) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 5000);
}

function hideError(selector) {
  const el = document.querySelector(selector);
  if (el) el.classList.remove('show');
}

function setLoading(btn, loading) {
  if (loading) {
    btn.dataset.original = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn.dataset.original || btn.innerHTML;
    btn.disabled = false;
  }
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// ===== LOGIN PAGE =====
function initLoginPage() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabBtns = document.querySelectorAll('.tab-toggle button');

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      loginForm.style.display = tab === 'login' ? 'block' : 'none';
      registerForm.style.display = tab === 'register' ? 'block' : 'none';
    });
  });

  // Login
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError('#loginError');
    const btn = loginForm.querySelector('button[type="submit"]');
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    if (!email.endsWith('@mitwpu.edu.in')) {
      showError('#loginError', 'Only @mitwpu.edu.in email addresses are allowed.');
      return;
    }

    setLoading(btn, true);
    const res = await login(email, password);
    setLoading(btn, false);

    if (res.error) {
      showError('#loginError', res.error);
    } else {
      window.location.href = res.redirect;
    }
  });

  // Register
  registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError('#registerError');
    const btn = registerForm.querySelector('button[type="submit"]');
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;

    if (!email.endsWith('@mitwpu.edu.in')) {
      showError('#registerError', 'Only @mitwpu.edu.in email addresses are allowed.');
      return;
    }
    if (password !== confirm) {
      showError('#registerError', 'Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      showError('#registerError', 'Password must be at least 6 characters.');
      return;
    }

    setLoading(btn, true);
    const res = await register(name, email, password);
    setLoading(btn, false);

    if (res.error) {
      showError('#registerError', res.error);
    } else {
      window.location.href = res.redirect;
    }
  });
}

// ===== DASHBOARD PAGE =====
async function initDashboard() {
  const session = await checkSession();
  if (!session.authenticated) {
    window.location.href = 'index.html';
    return;
  }

  // Set user info
  document.querySelectorAll('.user-name').forEach(el => el.textContent = session.user.name);
  document.querySelectorAll('.user-email').forEach(el => el.textContent = session.user.email);
  document.querySelectorAll('.user-initials').forEach(el => el.textContent = getInitials(session.user.name));

  // Load subjects & progress
  const [subRes, progRes] = await Promise.all([
    apiGet(API.feedback + '?action=get_subjects'),
    apiGet(API.feedback + '?action=get_progress')
  ]);

  const subjects = subRes.subjects || [];
  const progress = progRes;
  const submittedIds = new Set((progress.submitted || []).map(s => s.subject_id));

  // Update progress badge
  document.getElementById('completedCount').textContent = `${progress.completed}/${progress.total}`;
  document.getElementById('progressText').textContent = `${progress.completed} of ${progress.total} subjects completed`;

  // Render subjects
  const grid = document.getElementById('subjectsGrid');
  if (!grid) return;

  grid.innerHTML = subjects.map(sub => {
    const done = submittedIds.has(sub.id);
    const meta = SUBJECT_META[sub.name] || { icon: '📘', color: '#F3F4F6', accent: '#6B7280' };
    return `
      <div class="subject-card ${done ? 'completed' : ''}" onclick="${done ? '' : `window.location.href='feedback.html?subject_id=${sub.id}&teacher_id=${sub.teacher_id}&subject_name=${encodeURIComponent(sub.name)}&teacher_name=${encodeURIComponent(sub.teacher_name)}'`}" style="cursor:${done ? 'default' : 'pointer'}">
        <div class="subject-icon" style="background:${meta.color}; color:${meta.accent}">${meta.icon}</div>
        <h3>${sub.name}</h3>
        <p class="teacher-name">👨‍🏫 ${sub.teacher_name || 'TBD'}</p>
        <span class="status-pill ${done ? 'done' : 'pending'}">
          ${done ? '✅ Submitted' : '📝 Pending'}
        </span>
      </div>
    `;
  }).join('');
}

// ===== FEEDBACK FORM PAGE =====
function initFeedbackPage() {
  const params = new URLSearchParams(window.location.search);
  const subjectId = params.get('subject_id');
  const teacherId = params.get('teacher_id');
  const subjectName = decodeURIComponent(params.get('subject_name') || '');
  const teacherName = decodeURIComponent(params.get('teacher_name') || '');

  if (!subjectId || !subjectName) {
    window.location.href = 'dashboard.html';
    return;
  }

  const allQuestions = [];
  const sets = ['set1', 'set2', 'set3'];
  const setLabels = ['Teaching Effectiveness', 'Personality & Body Language', 'Assessment & Student Support'];

  const qData = QUESTIONS[subjectName] || QUESTIONS['Operating System'];
  sets.forEach((s, si) => {
    (qData[s] || []).forEach((q, qi) => {
      allQuestions.push({ ...q, set: s, setIndex: si, setLabel: setLabels[si], qIndex: qi });
    });
  });

  const totalQ = allQuestions.length;
  let currentIndex = 0;
  const answers = {};

  // Auto-saved answers from sessionStorage
  const saved = JSON.parse(sessionStorage.getItem(`feedback_${subjectId}`) || '{}');
  Object.assign(answers, saved);

  document.getElementById('subjectTitle').textContent = subjectName;
  document.getElementById('teacherTitle').textContent = `Teacher: ${teacherName}`;

  function saveToSession() {
    sessionStorage.setItem(`feedback_${subjectId}`, JSON.stringify(answers));
  }

  function renderQuestion(idx) {
    const q = allQuestions[idx];
    const progress = ((idx + 1) / totalQ) * 100;

    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('progressLabel').textContent = `Question ${idx + 1} of ${totalQ}`;
    document.getElementById('setLabel').textContent = `Set ${q.setIndex + 1}: ${q.setLabel}`;
    document.getElementById('qNum').textContent = `Question ${q.qIndex + 1}`;
    document.getElementById('qText').textContent = q.text;

    const optsList = document.getElementById('optionsList');
    const letters = ['A', 'B', 'C', 'D'];
    optsList.innerHTML = q.options.map((opt, i) => `
      <button class="option-btn ${answers[idx] === letters[i] ? 'selected' : ''}" onclick="selectAnswer(${idx}, '${letters[i]}', this)">
        <span class="opt-label">${letters[i]}</span>
        <span class="opt-text">${opt}</span>
      </button>
    `).join('');

    document.getElementById('prevBtn').style.visibility = idx === 0 ? 'hidden' : 'visible';
    const nextBtn = document.getElementById('nextBtn');
    if (idx === totalQ - 1) {
      nextBtn.textContent = 'Submit Feedback';
      nextBtn.className = 'btn btn-primary';
    } else {
      nextBtn.textContent = 'Next →';
      nextBtn.className = 'btn btn-primary';
    }

    // Animate
    const card = document.getElementById('questionCard');
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    setTimeout(() => {
      card.style.transition = 'all 0.3s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 50);
  }

  window.selectAnswer = function(idx, letter, btn) {
    answers[idx] = letter;
    saveToSession();
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  };

  document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion(currentIndex);
    }
  });

  document.getElementById('nextBtn').addEventListener('click', async () => {
    if (answers[currentIndex] === undefined) {
      const card = document.getElementById('questionCard');
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.border = '2px solid #EF4444';
      setTimeout(() => card.style.border = '', 1500);
      return;
    }

    if (currentIndex < totalQ - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
    } else {
      // Submit
      await submitFeedback(subjectId, teacherId, answers, allQuestions);
    }
  });

  renderQuestion(0);
}

async function submitFeedback(subjectId, teacherId, answers, allQuestions) {
  const btn = document.getElementById('nextBtn');
  setLoading(btn, true);

  const set1Answers = [], set2Answers = [], set3Answers = [];
  allQuestions.forEach((q, idx) => {
    if (q.set === 'set1') set1Answers.push(answers[idx] || 'D');
    else if (q.set === 'set2') set2Answers.push(answers[idx] || 'D');
    else set3Answers.push(answers[idx] || 'D');
  });

  const fd = new FormData();
  fd.append('action', 'submit');
  fd.append('subject_id', subjectId);
  fd.append('teacher_id', teacherId);
  fd.append('set1_answers', JSON.stringify(set1Answers));
  fd.append('set2_answers', JSON.stringify(set2Answers));
  fd.append('set3_answers', JSON.stringify(set3Answers));

  const res = await apiPost(API.feedback, fd);
  setLoading(btn, false);

  if (res.error) {
    alert(res.error);
  } else {
    sessionStorage.removeItem(`feedback_${subjectId}`);
    sessionStorage.setItem('last_score', res.overall_score);
    window.location.href = 'success.html';
  }
}

// ===== SUCCESS PAGE =====
function initSuccessPage() {
  const score = parseFloat(sessionStorage.getItem('last_score') || 0);
  const el = document.getElementById('finalScore');
  if (el) {
    let count = 0;
    const interval = setInterval(() => {
      count = Math.min(count + 2, score);
      el.textContent = count.toFixed(1) + '%';
      if (count >= score) clearInterval(interval);
    }, 30);
  }
}

// Auto-init based on page
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'login') initLoginPage();
  else if (page === 'dashboard') initDashboard();
  else if (page === 'feedback') initFeedbackPage();
  else if (page === 'success') initSuccessPage();
});
