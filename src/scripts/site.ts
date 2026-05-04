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

/* Form submit -> mailto (works on a static page) */
const form = document.getElementById('earlyAccessForm') as HTMLFormElement | null;
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = form.elements as typeof form.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
      role: HTMLSelectElement;
      note: HTMLTextAreaElement;
    };
    const name = encodeURIComponent(fields.name.value.trim());
    const email = encodeURIComponent(fields.email.value.trim());
    const role = encodeURIComponent(fields.role.value.trim());
    const note = encodeURIComponent(fields.note.value.trim());

    if (!name || !email || !role) {
      [fields.name, fields.email, fields.role].forEach((f) => {
        if (!f.value.trim()) f.style.borderColor = 'var(--neon-orange)';
      });
      return;
    }

    const subject = encodeURIComponent('finant — Early access request');
    const body =
      `Hi Persefoni,%0D%0A%0D%0A` +
      `I'd like early access to finant.%0D%0A%0D%0A` +
      `Name: ${name}%0D%0A` +
      `Email: ${email}%0D%0A` +
      `I am a: ${role}%0D%0A` +
      (note ? `Note: ${note}%0D%0A` : '') +
      `%0D%0AThanks.`;

    window.location.href = `mailto:persefoni@finant.ai?subject=${subject}&body=${body}`;
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
