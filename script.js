// Elevate Academy demo interactions. Replace demo branding and contact details before launch.
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const nav = document.getElementById('mainNav');
  document.querySelectorAll('#mainNav .nav-link, #mainNav .btn').forEach((link) => {
    link.addEventListener('click', () => {
      if (nav && nav.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

  const form = document.getElementById('enquiryForm');
  const toast = document.getElementById('toastMessage');
  const formMessage = document.getElementById('formMessage');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const studentName = String(data.get('studentName') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const course = String(data.get('course') || '').trim();
      const message = String(data.get('message') || '').trim();
      const enquiry = [
        'Hello, I would like to enquire about admission.',
        `Student name: ${studentName}`,
        `Phone: ${phone}`,
        `Course: ${course}`,
        message ? `Message: ${message}` : ''
      ].filter(Boolean).join('\n');

      // Demo behavior: open a pre-filled message in the visitor's email app.
      // Replace this with the institute's approved form backend or official contact workflow.
      const subject = encodeURIComponent(`Admission enquiry — ${course}`);
      const body = encodeURIComponent(enquiry);
      showToast('Your enquiry is ready. Choose an email app to send it.');
      if (formMessage) formMessage.textContent = 'Your email app should open with a draft. This demo does not save submissions.';
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });
  }
});