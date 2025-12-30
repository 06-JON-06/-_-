import './style.css';

const app = document.getElementById('app');
app.innerHTML = `
  <main>
    <h1>Hello Vite</h1>
    <p>Welcome to your Vite app.</p>
    <button id="btn">Click me</button>
  </main>
`;

document.getElementById('btn').addEventListener('click', () => {
  alert('Hello from Vite!');
});

console.log('Vite app started');
