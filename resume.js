/**
 * Resume Modal and Download Controller
 * Handles PDF download triggers, print preview, and interactive modal dialog.
 */
(function() {
  const resumeModal = document.getElementById('resume-modal');
  const openModalBtns = document.querySelectorAll('.open-resume-modal-btn');
  const closeModalBtns = document.querySelectorAll('.close-resume-modal-btn');
  const printResumeBtn = document.getElementById('print-resume-btn');
  const downloadResumeBtns = document.querySelectorAll('.trigger-download-resume');

  // Open Resume Modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        resumeModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Resume Modal
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal();
    });
  });

  // Close when clicking outside of dialog
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('open')) {
      closeModal();
    }
  });

  function closeModal() {
    if (resumeModal) {
      resumeModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Print Resume Functionality
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      const sheet = document.getElementById('resume-preview-sheet');
      if (!sheet) return;

      const printWindow = window.open('', '_blank');
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Ravi_Resume_JECRC_University</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; }
            h1 { font-size: 24px; margin-bottom: 4px; color: #0f172a; text-transform: uppercase; }
            h2 { font-size: 14px; border-bottom: 2px solid #4f46e5; padding-bottom: 4px; color: #4f46e5; margin-top: 18px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
            h3 { font-size: 13px; margin: 4px 0; color: #1e293b; }
            p, li { font-size: 12px; color: #334155; }
            ul { margin-top: 4px; padding-left: 18px; }
            .header-info { font-size: 11px; color: #64748b; margin-bottom: 12px; }
            .meta-line { display: flex; justify-content: space-between; font-weight: bold; font-size: 12px; }
          </style>
        </head>
        <body>
          ${sheet.innerHTML}
          <script>
            window.onload = function() { window.print(); window.close(); }
          <\/script>
        </body>
        </html>
      `;
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    });
  }

  // Ensure download buttons function cleanly
  downloadResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const fileUrl = 'assets/docs/Ravi_Resume.pdf';
      const anchor = document.createElement('a');
      anchor.href = fileUrl;
      anchor.download = 'Ravi_Resume_JECRC.pdf';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      if (window.showToast) {
        window.showToast('Resume download initiated!', 'success');
      }
    });
  });

  // Expose closeModal globally if needed
  window.closeResumeModal = closeModal;
})();
