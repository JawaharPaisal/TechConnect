
document.addEventListener("DOMContentLoaded", () => {
    function counter(id, start, end, duration){
        let obj = document.getElementById(id),
        current = start,
        range = end - start,
        increment = end > start ? 1 : -1,
        step = Math.abs(Math.floor(duration /  range)),
        timer = setInterval(() => {
            current += increment;
            obj.textContent = current;
            if(current == end){
                clearInterval(timer);
            }
        }, step);
    }
    counter("count1", 0, 220, 0);
    counter("count2", 0, 50, 2500);
    counter("count3", 0, 200, 300);
    counter("count4", 0, 2110, 3000);
 });



 let navbar = document.querySelector('.header .navbar')
 
 document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.add('active');
};

document.querySelector('#close-navbar').onclick = () =>{
  navbar.classList.remove('active');
};

let registerBtn = document.querySelector('.account-form .register-btn');
let loginBtn = document.querySelector('.account-form .login-btn');

registerBtn.onclick = () =>{
  registerBtn.classList.add('active');
  loginBtn.classList.remove('active');
  document.querySelector('.account-form .login-form').classList.remove('active');
  document.querySelector('.account-form .register-form').classList.add('active');
};

loginBtn.onclick = () =>{
  registerBtn.classList.remove('active');
  loginBtn.classList.add('active');
  document.querySelector('.account-form .login-form').classList.add('active');
  document.querySelector('.account-form .register-form').classList.remove('active');
};

let accountForm = document.querySelector('.account-form')

document.querySelector('#account-btn').onclick = () =>{
  accountForm.classList.add('active');
}

document.querySelector('#close-form').onclick = () =>{
  accountForm.classList.remove('active');
};

document.addEventListener('DOMContentLoaded', async () => { 
  const userAccountDiv = document.getElementById('user-account'); 
  const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token=')); 
  if (token) { 
    try { 
      const response = await fetch('/api/userinfo', { 
    headers: { 'Authorization': `Bearer ${token.split('=')[1]}` } 
  }); 
  const userData = await response.json(); 
  userAccountDiv.innerHTML = ` <span>${userData.username}</span> <button id="logout-btn">Logout</button> `; 
  document.getElementById('logout-btn').addEventListener('click', () => { 
    document.cookie = 'token=; Max-Age=0; path=/;'; 
  window.location.href = '/'; 
}); 
} catch (error) { 
  console.error('Error fetching user info:', error); 
  userAccountDiv.innerHTML = ` <a href="/login">Sign In</a> `; 
} 
} else { 
  userAccountDiv.innerHTML = ` <a href="/login">Sign In</a> `; 
} 
});
