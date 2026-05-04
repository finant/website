/* Scroll-triggered reveals */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* Contact form -> Netlify Forms (AJAX, stays on page) */
const form = document.getElementById('earlyAccessForm') as HTMLFormElement | null;
const status = document.getElementById('earlyAccessStatus');

if (form && status) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fields = form.elements as typeof form.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
      role: HTMLSelectElement;
    };

    const missing = [fields.name, fields.email, fields.role].filter((f) => !f.value.trim());
    if (missing.length) {
      missing.forEach((f) => (f.style.borderColor = 'var(--neon-orange)'));
      status.textContent = 'Please fill in name, email and role.';
      status.dataset.state = 'error';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitBtn.disabled = true;
    status.textContent = 'Sending…';
    status.dataset.state = 'pending';

    const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      status.textContent = 'Thanks — we\'ll be in touch.';
      status.dataset.state = 'success';
    } catch {
      status.textContent = 'Something went wrong. Please email persefoni@finant.ai instead.';
      status.dataset.state = 'error';
    } finally {
      submitBtn.disabled = false;
    }
  });
}

/* Smooth scroll for in-page links */
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id && id.length > 1) {
      const t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
