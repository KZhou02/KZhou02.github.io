// Existing code
window.onload = () => {
  const navMenu = document.querySelector('.nav-menu');
  const navItems = document.querySelectorAll('.nav-item');
  const hamburger = document.querySelector('.nav-toggle');
  
  const toggle = e => e.classList.toggle('is-active');
  const toggleNav = ({ target }) => Array.from(navMenu.classList).includes('is-active') ? toggle(navMenu) : null;

  hamburger.addEventListener('click', () => toggle(navMenu, 'is-active'));
  Array.from(navItems).forEach(e => e.addEventListener('click', toggleNav));

  // NEW: Theme Toggle Functionality
  initTheme();
}

// Theme Management
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const root = document.documentElement;
  
  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme === 'dark');
  } else if (systemPrefersDark) {
    root.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
  } else {
    root.setAttribute('data-theme', 'light');
    updateThemeIcon(false);
  }
  
  // Theme toggle click handler
  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme === 'dark');
  });
  
  // Update icon based on theme
  function updateThemeIcon(isDark) {
    themeIcon.className = isDark ? 'fa fa-sun-o' : 'fa fa-moon-o';
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only apply if user hasn't manually selected a theme
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      root.setAttribute('data-theme', newTheme);
      updateThemeIcon(e.matches);
    }
  });
}