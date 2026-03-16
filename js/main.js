document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
  
  // Close menu when clicking a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
      item.addEventListener('click', () => {
          if (navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
          }
      });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '0.5rem 0';
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.padding = '0';
      header.style.boxShadow = 'none';
    }
  });
  
  // Appearance of elements on scroll
  const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
  };
  
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);
  
  const animateItems = document.querySelectorAll('.animate-on-scroll');
  animateItems.forEach(item => {
      observer.observe(item);
  });
});
