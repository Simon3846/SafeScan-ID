// Enhanced interactivity: toasts, modal confirm, drag-and-drop file upload,
// keyboard shortcuts and profile animations. This file overrides a few
// global functions from the inline script to add UX improvements.

(function () {
    function ensureToastContainer() {
        let c = document.querySelector('.toast-container');
        if (!c) {
            c = document.createElement('div');
            c.className = 'toast-container';
            document.body.appendChild(c);
        }
        return c;
    }

    window.showToast = function (message, type = 'info', timeout = 4000) {
        const container = ensureToastContainer();
        const t = document.createElement('div');
        t.className = `toast ${type}`;
        t.textContent = message;
        container.appendChild(t);
        setTimeout(() => {
            t.style.opacity = '0';
            t.style.transform = 'translateY(-6px)';
            setTimeout(() => t.remove(), 350);
        }, timeout);
    };

    // Replace/augment displayProfile to add animation and copy button
    document.addEventListener('DOMContentLoaded', () => {
        // Theme toggle: persist selection in localStorage
        const themeToggle = document.getElementById('themeToggle');
        function applyTheme(t) {
            document.documentElement.setAttribute('data-theme', t);
            localStorage.setItem('theme', t);
            if (themeToggle) {
                themeToggle.innerHTML = t === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars"></i>';
            }
        }
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        applyTheme(savedTheme);
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                applyTheme(next);
                showToast(`Tema alterado para ${next}`, 'info', 1200);
            });
        }
        // Wrap original displayProfile if present
        if (window.displayProfile) {
            const _old = window.displayProfile;
            window.displayProfile = function (id) {
                _old(id);
                const card = document.querySelector('.profile-card');
                if (card) {
                    card.classList.add('profile-enter');
                    // Append copy-to-clipboard button next to phone link
                    const phoneLink = card.querySelector('a[href^="tel:"]');
                    if (phoneLink && !card.querySelector('.copy-btn')) {
                        const btn = document.createElement('button');
                        btn.className = 'copy-btn';
                        btn.title = 'Copiar número';
                        btn.innerHTML = '<i class="bi bi-clipboard"></i>';
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(phoneLink.textContent.trim()).then(() => {
                                showToast('Número copiado para a área de transferência', 'success');
                            }).catch(() => showToast('Falha ao copiar', 'danger'));
                        });
                        phoneLink.parentNode.appendChild(btn);
                    }
                }
            };
        }

        // Override onScanFailure to show non-blocking toast
        window.onScanFailure = function (error) {
            // avoid spamming: only show brief notice
            showToast('Falha no scanner. Verifique a câmara ou carregue uma imagem.', 'warning', 2500);
        };

        // Replace file input handler to use toasts instead of alerts and support large files
        const oldInput = document.getElementById('qrFile');
        if (oldInput) {
            const newInput = oldInput.cloneNode(true);
            oldInput.parentNode.replaceChild(newInput, oldInput);
            newInput.addEventListener('change', event => {
                const file = event.target.files[0];
                if (file) {
                    const qrCode = new Html5Qrcode("qr-reader");
                    showToast('A processar imagem...', 'info', 2500);
                    qrCode.scanFile(file, true)
                        .then(decodedText => {
                            if (window.onScanSuccess) window.onScanSuccess(decodedText);
                            showToast('QR lido com sucesso', 'success');
                        })
                        .catch(err => {
                            showToast('Erro ao ler o QR. Tente outra imagem.', 'danger');
                        });
                }
            });

            // Add drag & drop support for the surrounding .file-upload
            const uploadBox = document.querySelector('.file-upload');
            if (uploadBox) {
                ['dragenter', 'dragover'].forEach(evt => uploadBox.addEventListener(evt, e => {
                    e.preventDefault();
                    e.stopPropagation();
                    uploadBox.classList.add('dragover');
                }));
                ['dragleave', 'drop'].forEach(evt => uploadBox.addEventListener(evt, e => {
                    e.preventDefault();
                    e.stopPropagation();
                    uploadBox.classList.remove('dragover');
                }));

                uploadBox.addEventListener('drop', (e) => {
                    const dt = e.dataTransfer;
                    if (dt && dt.files && dt.files.length) {
                        newInput.files = dt.files;
                        const ev = new Event('change');
                        newInput.dispatchEvent(ev);
                    }
                });
            }
        }

        // Modal creation for emergency alert confirmation
        function ensureModal() {
            let m = document.querySelector('.copilot-modal-backdrop');
            if (m) return m;
            m = document.createElement('div');
            m.className = 'copilot-modal-backdrop';
            m.style.display = 'none';
            m.innerHTML = `
                <div class="copilot-modal" role="dialog" aria-modal="true">
                    <div class="modal-body">
                        <div class="modal-text"></div>
                        <div class="modal-actions">
                            <button class="btn btn-secondary modal-cancel">Cancelar</button>
                            <button class="btn btn-danger modal-confirm">Confirmar</button>
                        </div>
                    </div>
                </div>`;
            document.body.appendChild(m);
            m.querySelector('.modal-cancel').addEventListener('click', () => m.style.display = 'none');
            return m;
        }

        window.sendEmergencyAlert = function (name) {
            const m = ensureModal();
            m.querySelector('.modal-text').textContent = `Deseja enviar um alerta de emergência para ${name}?`;
            m.style.display = 'flex';
            const confirmBtn = m.querySelector('.modal-confirm');
            const handler = () => {
                m.style.display = 'none';
                showToast('Alerta de emergência enviado (simulado)', 'success');
                confirmBtn.removeEventListener('click', handler);
            };
            confirmBtn.addEventListener('click', handler);
        };

        // Keyboard shortcut: press 'f' to focus manual ID input
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey && !e.altKey) {
                const input = document.getElementById('manualId');
                if (input) {
                    input.focus();
                    showToast('Foco no campo ID', 'info', 1200);
                    e.preventDefault();
                }
            }
        });

    });

})();
