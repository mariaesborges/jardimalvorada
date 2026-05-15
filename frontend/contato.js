/* ===== FORMULÁRIO DE CONTATO ===== */
(function initForm() {
  const form = document.querySelector('.cf-form');
  if (!form) return;

  /* ── Select customizado ──────────────────────────────────── */
  (function initCustomSelect() {
    const wrap      = form.querySelector('.cf-select-wrap');
    const trigger   = form.querySelector('.cf-select-trigger');
    const dropdown  = form.querySelector('.cf-select-dropdown');
    const textEl    = form.querySelector('.cf-select-text');
    const nativeSel = form.querySelector('.cf-select');
    const options   = form.querySelectorAll('.cf-select-option');

    if (!wrap) return;

    function openDropdown() {
      trigger.classList.add('open');
      dropdown.classList.add('open');
      wrap.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      trigger.classList.remove('open');
      dropdown.classList.remove('open');
      wrap.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', () => {
      dropdown.classList.contains('open') ? closeDropdown() : openDropdown();
    });

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const val = opt.dataset.value;

        options.forEach(o => o.classList.remove('selected'));

        if (val) {
          opt.classList.add('selected');
          textEl.textContent = opt.textContent;
          trigger.classList.add('has-value');
        } else {
          textEl.textContent = 'Selecione';
          trigger.classList.remove('has-value');
        }

        /* Sincroniza com o select nativo (usado na coleta de dados) */
        if (nativeSel) {
          const match = Array.from(nativeSel.options).find(o => o.text === val || o.value === val);
          if (match) nativeSel.value = match.value;
        }

        closeDropdown();
      });
    });

    /* Fecha ao clicar fora */
    document.addEventListener('click', e => {
      if (!wrap.contains(e.target)) closeDropdown();
    });

    /* Fecha com Escape */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDropdown();
    });
  })();

  /* ── Máscara de telefone: (00) 00000-0000 ────────────────── */
  const phoneInput = form.querySelector('input[name="telefone"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) {
        v = '(' + v.slice(0,2) + ') ' + v.slice(2,7) + '-' + v.slice(7);
      } else if (v.length > 2) {
        v = '(' + v.slice(0,2) + ') ' + v.slice(2);
      } else if (v.length > 0) {
        v = '(' + v;
      }
      this.value = v;
    });
  }

  /* ── Validação inline ────────────────────────────────────── */
  function showError(input, msg) {
    let err = input.parentElement.querySelector('.cf-error');
    if (!err) {
      err = document.createElement('span');
      err.className = 'cf-error';
      err.style.cssText = 'font-family:var(--font-sans);font-size:10px;color:#c0392b;margin-top:4px;display:block;';
      input.parentElement.appendChild(err);
    }
    err.textContent = msg;
    input.style.borderBottomColor = '#c0392b';
  }

  function clearError(input) {
    const err = input.parentElement.querySelector('.cf-error');
    if (err) err.remove();
    input.style.borderBottomColor = '';
  }

  function validateForm() {
    let valid = true;

    const nome  = form.querySelector('input[name="nome"]');
    const tel   = form.querySelector('input[name="telefone"]');
    const email = form.querySelector('input[name="email"]');

    if (!nome.value.trim()) {
      showError(nome, 'Por favor, informe seu nome.'); valid = false;
    } else { clearError(nome); }

    if (!tel.value.trim()) {
      showError(tel, 'Por favor, informe seu telefone.'); valid = false;
    } else { clearError(tel); }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRe.test(email.value)) {
      showError(email, 'Por favor, informe um e-mail válido.'); valid = false;
    } else { clearError(email); }

    return valid;
  }

  /* ── Submit → WhatsApp ───────────────────────────────────── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) return;

    const btn      = form.querySelector('.cf-submit');
    const original = btn.innerHTML;

    const nome     = form.querySelector('input[name="nome"]').value.trim();
    const telefone = form.querySelector('input[name="telefone"]').value.trim();
    const email    = form.querySelector('input[name="email"]').value.trim();
    const assunto  = form.querySelector('.cf-select-text').textContent.trim() || 'Não informado';
    const mensagem = form.querySelector('textarea[name="mensagem"]').value.trim();

    const texto = [
      '🏡 *Residencial Jardim Alvorada*',
      '━━━━━━━━━━━━━━━━━━━━━━',
      `*Nome:* ${nome}`,
      `*Telefone:* ${telefone}`,
      `*E-mail:* ${email}`,
      `*Assunto:* ${assunto}`,
      mensagem ? `*Mensagem:* ${mensagem}` : null,
      '━━━━━━━━━━━━━━━━━━━━━━',
      '_Mensagem enviada pelo site Jardim Alvorada_'
    ].filter(Boolean).join('\n');

    const numero = '5537999491046';
    const url    = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    btn.innerHTML = 'Abrindo WhatsApp…';
    btn.disabled  = true;

    setTimeout(() => {
      window.open(url, '_blank');
      btn.innerHTML = 'Mensagem enviada ✓';
      btn.style.background = '#3d4f28';

      setTimeout(() => {
        btn.innerHTML        = original;
        btn.disabled         = false;
        btn.style.background = '';
        form.reset();
        /* Reseta o select customizado */
        const textEl  = form.querySelector('.cf-select-text');
        const trigger = form.querySelector('.cf-select-trigger');
        const opts    = form.querySelectorAll('.cf-select-option');
        if (textEl)  textEl.textContent = 'Selecione';
        if (trigger) trigger.classList.remove('has-value');
        opts.forEach(o => o.classList.remove('selected'));
      }, 3500);
    }, 600);
  });

  /* ── Limpa erros ao digitar ──────────────────────────────── */
  form.querySelectorAll('.cf-input, .cf-textarea').forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });

})();