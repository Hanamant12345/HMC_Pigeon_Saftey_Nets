// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const statusMessage = document.getElementById('form-status-message');

  // Show loading state
  statusMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'bg-green-100', 'text-green-700');
  statusMessage.textContent = 'Submitting...';
  statusMessage.classList.add('bg-gray-200', 'text-gray-800');

  try {
    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      statusMessage.classList.remove('bg-gray-200', 'text-gray-800');
      statusMessage.classList.add('bg-green-100', 'text-green-700');
      statusMessage.textContent = 'Thank you for your enquiry! We will get back to you shortly.';
      form.reset();
    } else {
      statusMessage.classList.remove('bg-gray-200', 'text-gray-800');
      statusMessage.classList.add('bg-red-100', 'text-red-700');
      statusMessage.textContent = 'Something went wrong. Please try again or call us.';
    }
  } catch (error) {
    console.error('Submission error:', error);
    statusMessage.classList.remove('bg-gray-200', 'text-gray-800');
    statusMessage.classList.add('bg-red-100', 'text-red-700');
    statusMessage.textContent = 'Network error. Please try again later.';
  }

  // Auto-hide message after 5 seconds
  setTimeout(() => {
    statusMessage.classList.add('hidden');
  }, 5000);
});
