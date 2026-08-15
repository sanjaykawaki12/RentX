const ROLE_COPY = {
  USER: {
    eyebrow: 'ready to ride',
    headline: 'Book a car<br>or bike.<br>In minutes.',
    submitLabel: 'Log in to ride',
    accent: '#E4342F',
    accentDark: '#A8241F'
  },
  PROVIDER: {
    eyebrow: 'put your ride to work',
    headline: 'List your<br>vehicle.<br>Start earning.',
    submitLabel: 'Log in to list',
    accent: '#F2B705',
    accentDark: '#B58A03'
  }
};

const API_BASE = 'https://rentx-production-513d.up.railway.app';

const brandPanel = document.querySelector('.brand-panel');
const brandEyebrow = document.getElementById('brandEyebrow');
const brandHeadline = document.getElementById('brandHeadline');
const sceneUser = document.getElementById('sceneIconUser');
const sceneProvider = document.getElementById('sceneIconProvider');
const roleButtons = document.querySelectorAll('.role-btn');
const roleInput = document.getElementById('role');
const submitLabel = document.getElementById('submitLabel');
const submitBtn = document.getElementById('submitBtn');
const root = document.documentElement;

function setRole(role) {
  const copy = ROLE_COPY[role];

  roleInput.value = role;

  roleButtons.forEach((btn) => {
    const active = btn.dataset.role === role;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-checked', String(active));
  });

  brandPanel.dataset.role = role;
  brandEyebrow.textContent = copy.eyebrow;
  brandHeadline.innerHTML = copy.headline;
  submitLabel.textContent = copy.submitLabel;

  sceneUser.style.display = role === 'USER' ? 'block' : 'none';
  sceneProvider.style.display = role === 'PROVIDER' ? 'block' : 'none';

  root.style.setProperty('--accent', copy.accent);
  root.style.setProperty('--accent-dark', copy.accentDark);
}

roleButtons.forEach((btn) => {
  btn.addEventListener('click', () => setRole(btn.dataset.role));
});

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePassword.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
});

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  login();
});

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.style.opacity = isLoading ? '0.7' : '1';
  submitBtn.style.cursor = isLoading ? 'not-allowed' : 'pointer';
  submitLabel.textContent = isLoading ? 'Logging in…' : ROLE_COPY[roleInput.value].submitLabel;
}

async function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const role = roleInput.value;

  if (!email || !password) {
    alert('Enter your email and password.');
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, role })
    });

    if (!res.ok) {
      throw new Error(`Login failed with status ${res.status}`);
    }

    const data = await res.json();

    localStorage.setItem('userId', data.id);
    localStorage.setItem('userRole', data.role);
    localStorage.setItem('userName', data.name);

    setLoading(false);
    window.location.href = data.role === 'USER' ? 'user.html' : 'owner.html';

  } catch (error) {
    console.error(error);
    setLoading(false);
    alert('Invalid login. Check your email and password and try again.');
  }
}