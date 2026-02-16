const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');
const reveals = document.querySelectorAll('.reveal');
const progressBars = document.querySelectorAll('.progress');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((el) => {
  const delay = el.dataset.delay;
  if (delay) {
    el.style.transitionDelay = `${delay}s`;
  }
  observer.observe(el);
});

progressBars.forEach((bar) => {
  const value = bar.dataset.progress || 0;
  const fill = bar.querySelector('span');
  if (fill) {
    observer.observe(bar);
    const handler = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fill.style.width = `${value}%`;
          obs.unobserve(entry.target);
        }
      });
    };
    const progressObserver = new IntersectionObserver(handler, { threshold: 0.3 });
    progressObserver.observe(bar);
  }
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    projects.forEach((project) => {
      const categories = project.dataset.category || '';
      const isVisible = filter === 'all' || categories.includes(filter);
      project.style.display = isVisible ? 'block' : 'none';
    });
  });
});

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('#name')?.value.trim() || '';
    const email = document.querySelector('#email')?.value.trim() || '';
    const subjectInput = document.querySelector('#subject')?.value.trim() || '';
    const message = document.querySelector('#message')?.value.trim() || '';
    const subject = subjectInput || 'New message from portfolio site';
    const bodyLines = [
      `Name: ${name || 'N/A'}`,
      `Email: ${email || 'N/A'}`,
      '',
      message || 'No message provided.',
    ];

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=jflorence.jf01@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    window.location.href = gmailUrl;
  });
}
