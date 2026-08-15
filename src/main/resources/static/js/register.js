const API_BASE_URL =
    "https://rentx-production-513d.up.railway.app";
const ROLE_COPY = {
  USER: {
    eyebrow: 'join the fleet',
    headline: 'Your next ride<br>starts with<br>an account.',
    submitLabel: 'Create account as a rider',
    accent: '#E4342F',
    accentDark: '#A8241F'
  },
  PROVIDER: {
    eyebrow: 'list your vehicle',
    headline: 'Turn your ride<br>into income.<br>Join as owner.',
    submitLabel: 'Create account as an owner',
    accent: '#F2B705',
    accentDark: '#B58A03'
  }
};

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

document.getElementById('registerForm').addEventListener('submit', (event) => {
  event.preventDefault();
  register();
});

function register(){

    const name = document.getElementById("name").value;

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const role = document.getElementById("role").value;

    fetch(`${API_BASE_URL}/auth/register`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name,
            email,
            password,
            role

        })

    })

    .then(res=>res.json())

    .then(data=>{

        alert("Registration Successful");

        window.location.href="login.html";

    })

    .catch(error=>{

        alert("Registration Failed");

        console.log(error);

    });

}