// MVP Interactivo - Fracht Group Argentina
// Gestión de datos dummy, estado, vistas responsivas (Cards en mobile / Tabla en desktop)

// Datos iniciales de demostración para el Panel de Administración
let submissions = [
  {
    id: 'SUB-2026-001',
    razonSocial: 'Logística Austral S.A.',
    nombreComercial: 'Austral Cargo',
    cuit: '30-71458921-8',
    direccionLegal: 'Av. Eduardo Madero 1020, Piso 14, CABA',
    telefono: '+54 11 4312-8800',
    email: 'contacto@australcargo.com.ar',
    contacto: 'Mariano Benítez',
    cuentaCorriente: 'Banco Santander - CBU 0720123400000012345678',
    emailCobranzas: 'tesoreria@australcargo.com.ar',
    clausulaFx: true,
    aceptaND: true,
    status: 'APPROVED',
    createdAt: '2026-08-24 14:32',
    ipAddress: '181.46.12.89',
    documents: {
      afip: { name: 'Constancia_AFIP_Austral.pdf', size: '245 KB' },
      estatuto: { name: 'Estatuto_Social_Vigente.pdf', size: '3.4 MB' },
      poderes: { name: 'Poder_Especial_Representacion.pdf', size: '1.1 MB' },
      iibb: { name: 'Constancia_Convenio_Multilateral.pdf', size: '410 KB' }
    }
  },
  {
    id: 'SUB-2026-002',
    razonSocial: 'Agroindustrias del Norte S.R.L.',
    nombreComercial: 'AgroNorte',
    cuit: '30-68945123-4',
    direccionLegal: 'Ruta Nacional 9 Km 280, Rosario, Santa Fe',
    telefono: '+54 341 489-7000',
    email: 'administracion@agronorte.com.ar',
    contacto: 'Valeria Rossi',
    cuentaCorriente: 'Banco Galicia - Cuenta Corriente $ / USD',
    emailCobranzas: 'pagos@agronorte.com.ar',
    clausulaFx: true,
    aceptaND: false,
    status: 'PENDING',
    createdAt: '2026-08-24 16:15',
    ipAddress: '190.220.88.14',
    documents: {
      afip: { name: 'Constancia_Inscripcion_AFIP.pdf', size: '180 KB' },
      estatuto: { name: 'Contrato_Social_Modificacion2025.pdf', size: '2.8 MB' },
      poderes: { name: 'Poder_General_Administracion.pdf', size: '890 KB' },
      iibb: { name: 'IIBB_SantaFe.pdf', size: '320 KB' }
    }
  },
  {
    id: 'SUB-2026-003',
    razonSocial: 'Comercio Exterior Global S.A.S.',
    nombreComercial: 'GlobalTrade Argentina',
    cuit: '30-71889900-2',
    direccionLegal: 'San Martín 650, Piso 5, Mendoza',
    telefono: '+54 261 423-1100',
    email: 'info@globaltrade.com.ar',
    contacto: 'Ignacio Larrea',
    cuentaCorriente: 'Banco BBVA - Referencias comerciales a disposición',
    emailCobranzas: 'finanzas@globaltrade.com.ar',
    clausulaFx: true,
    aceptaND: true,
    status: 'LOADED_ERP',
    createdAt: '2026-08-23 11:20',
    ipAddress: '200.45.190.55',
    documents: {
      afip: { name: 'Constancia_ARCA_2026.pdf', size: '210 KB' },
      estatuto: { name: 'Estatuto_SAS_Inscripto.pdf', size: '1.9 MB' },
      poderes: { name: 'Designacion_Administrador.pdf', size: '650 KB' },
      iibb: null
    }
  },
  {
    id: 'SUB-2026-004',
    razonSocial: 'Distribuidora Atlántica S.A.',
    nombreComercial: 'Atlántica Logística',
    cuit: '33-54890123-9',
    direccionLegal: 'Parque Industrial Mar del Plata, Lote 42, Bs.As.',
    telefono: '+54 223 499-5500',
    email: 'comercial@atlanticasa.com.ar',
    contacto: 'Carolina Méndez',
    cuentaCorriente: 'Cuenta Corriente 30 días fecha factura',
    emailCobranzas: 'contaduria@atlanticasa.com.ar',
    clausulaFx: true,
    aceptaND: false,
    status: 'PENDING',
    createdAt: '2026-08-24 18:40',
    ipAddress: '181.94.201.32',
    documents: {
      afip: { name: 'AFIP_Constancia_Actual.pdf', size: '195 KB' },
      estatuto: { name: 'Estatuto_y_Actas.pdf', size: '4.1 MB' },
      poderes: { name: 'Poder_Bancario_y_Comercial.pdf', size: '1.5 MB' },
      iibb: { name: 'ARBA_Inscripcion.pdf', size: '510 KB' }
    }
  }
];

// Estado de la UI
let currentTab = 'form'; // 'form' | 'admin'
let currentFilter = 'ALL';
let currentSearch = '';
let selectedSubmission = null;

// Archivos subidos en el formulario del cliente (Simulados)
let uploadedFiles = {
  afip: null,
  estatuto: null,
  poderes: null,
  iibb: null
};

// Estado del selector de Notas de Débito en el formulario
let aceptaNDFormValue = true;

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupFormInteractions();
  setupAdminDashboard();
  renderAdminViews();
  updateMetrics();
});

// Navegación entre Vista Cliente y Vista Administración
function setupNavigation() {
  const btnViewForm = document.getElementById('btn-view-form');
  const btnViewAdmin = document.getElementById('btn-view-admin');

  btnViewForm.addEventListener('click', () => {
    switchView('form');
  });

  btnViewAdmin.addEventListener('click', () => {
    switchView('admin');
  });
}

function switchView(view) {
  currentTab = view;
  const btnViewForm = document.getElementById('btn-view-form');
  const btnViewAdmin = document.getElementById('btn-view-admin');
  const viewForm = document.getElementById('view-form');
  const viewAdmin = document.getElementById('view-admin');

  if (view === 'form') {
    viewForm.classList.remove('hidden-view');
    viewAdmin.classList.add('hidden-view');
    btnViewForm.className = 'px-3 sm:px-4 py-1.5 text-xs font-bold font-brand rounded-lg bg-[#003B64] text-white shadow-sm transition';
    btnViewAdmin.className = 'px-3 sm:px-4 py-1.5 text-xs font-medium font-brand rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition';
  } else {
    viewForm.classList.add('hidden-view');
    viewAdmin.classList.remove('hidden-view');
    btnViewAdmin.className = 'px-3 sm:px-4 py-1.5 text-xs font-bold font-brand rounded-lg bg-[#003B64] text-white shadow-sm transition';
    btnViewForm.className = 'px-3 sm:px-4 py-1.5 text-xs font-medium font-brand rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition';
    renderAdminViews();
    updateMetrics();
  }
}

// Configuración de interacciones del formulario
function setupFormInteractions() {
  // 1. Selector de Notas de Débito (Sí / No)
  const btnNdYes = document.getElementById('btn-nd-yes');
  const btnNdNo = document.getElementById('btn-nd-no');

  btnNdYes.addEventListener('click', () => {
    aceptaNDFormValue = true;
    btnNdYes.className = 'flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-bold font-brand text-xs bg-emerald-600 text-white shadow-sm flex items-center justify-center gap-2 border-2 border-emerald-600 transition';
    btnNdNo.className = 'flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold font-brand text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center gap-2 border-2 border-transparent transition';
  });

  btnNdNo.addEventListener('click', () => {
    aceptaNDFormValue = false;
    btnNdNo.className = 'flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-bold font-brand text-xs bg-rose-600 text-white shadow-sm flex items-center justify-center gap-2 border-2 border-rose-600 transition';
    btnNdYes.className = 'flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold font-brand text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center gap-2 border-2 border-transparent transition';
  });

  // 2. Máscara de CUIT
  const cuitInput = document.getElementById('input-cuit');
  cuitInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    let formatted = value;
    if (value.length > 2 && value.length <= 10) {
      formatted = `${value.slice(0, 2)}-${value.slice(2)}`;
    } else if (value.length > 10) {
      formatted = `${value.slice(0, 2)}-${value.slice(2, 10)}-${value.slice(10)}`;
    }
    e.target.value = formatted;
  });

  // 3. Dropzones para los 4 PDFs
  setupDropzone('drop-afip', 'file-afip', 'info-afip', 'afip');
  setupDropzone('drop-estatuto', 'file-estatuto', 'info-estatuto', 'estatuto');
  setupDropzone('drop-poderes', 'file-poderes', 'info-poderes', 'poderes');
  setupDropzone('drop-iibb', 'file-iibb', 'info-iibb', 'iibb');

  // 4. Envío del Formulario
  const mainForm = document.getElementById('client-onboarding-form');
  mainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit();
  });
}

function setupDropzone(dropId, fileInputId, infoId, docKey) {
  const dropzone = document.getElementById(dropId);
  const fileInput = document.getElementById(fileInputId);
  const infoContainer = document.getElementById(infoId);

  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(docKey, file.name, `${(file.size / (1024 * 1024)).toFixed(2)} MB`, dropzone, infoContainer);
    }
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(docKey, file.name, `${(file.size / (1024 * 1024)).toFixed(2)} MB`, dropzone, infoContainer);
    }
  });
}

function setUploadedFile(key, name, size, dropzone, infoContainer) {
  uploadedFiles[key] = { name, size };
  dropzone.classList.add('has-file');
  infoContainer.innerHTML = `
    <div class="flex items-center justify-between bg-white border border-emerald-300 rounded-lg p-2.5 shadow-xs">
      <div class="flex items-center gap-2 overflow-hidden">
        <svg class="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="text-xs font-semibold text-slate-800 truncate max-w-[140px] sm:max-w-[200px]">${name}</span>
        <span class="text-[10px] sm:text-[11px] text-slate-500 shrink-0">(${size})</span>
      </div>
      <button type="button" class="text-rose-500 hover:text-rose-700 text-xs font-semibold px-2 py-1" onclick="removeUploadedFile(event, '${key}')">
        Quitar
      </button>
    </div>
  `;
}

window.removeUploadedFile = function(event, key) {
  event.stopPropagation();
  uploadedFiles[key] = null;
  const dropzone = document.getElementById(`drop-${key}`);
  const infoContainer = document.getElementById(`info-${key}`);
  const fileInput = document.getElementById(`file-${key}`);
  
  if (fileInput) fileInput.value = '';
  if (dropzone) dropzone.classList.remove('has-file');
  if (infoContainer) infoContainer.innerHTML = '';
};

// Procesamiento del formulario
function handleFormSubmit() {
  const submitBtn = document.getElementById('btn-submit-form');
  const originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Procesando...
  `;

  setTimeout(() => {
    const razonSocial = document.getElementById('input-razon-social').value || 'Empresa Cliente Demo S.A.';
    const nombreComercial = document.getElementById('input-nombre-comercial').value || '';
    const cuit = document.getElementById('input-cuit').value || '30-79998888-1';
    const direccion = document.getElementById('input-direccion').value || 'Av. Corrientes 1200, CABA';
    const telefono = document.getElementById('input-telefono').value || '+54 11 5555-4444';
    const email = document.getElementById('input-email').value || 'contacto@clientenuevo.com.ar';
    const contacto = document.getElementById('input-contacto').value || 'Alejandro Gómez';
    const ctaCte = document.getElementById('input-ctacte').value || '';
    const emailCobranzas = document.getElementById('input-email-cobranzas').value || 'cobranzas@clientenuevo.com.ar';

    const newSubmission = {
      id: `SUB-2026-00${submissions.length + 1}`,
      razonSocial,
      nombreComercial,
      cuit,
      direccionLegal: direccion,
      telefono,
      email,
      contacto,
      cuentaCorriente: ctaCte,
      emailCobranzas,
      clausulaFx: true,
      aceptaND: aceptaNDFormValue,
      status: 'PENDING',
      createdAt: '2026-08-24 ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ipAddress: '186.138.45.102',
      documents: {
        afip: uploadedFiles.afip || { name: 'Constancia_AFIP_Subida.pdf', size: '220 KB' },
        estatuto: uploadedFiles.estatuto || { name: 'Estatuto_Social_Subido.pdf', size: '2.5 MB' },
        poderes: uploadedFiles.poderes || { name: 'Poder_Representante.pdf', size: '980 KB' },
        iibb: uploadedFiles.iibb || { name: 'Constancia_IIBB.pdf', size: '340 KB' }
      }
    };

    submissions.unshift(newSubmission);
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    openSuccessModal(newSubmission);
  }, 1000);
}

function openSuccessModal(sub) {
  const modal = document.getElementById('modal-success');
  const details = document.getElementById('modal-success-details');

  details.innerHTML = `
    <div class="space-y-1.5 text-xs text-slate-700">
      <div><strong>Razón Social:</strong> <span class="text-[#003B64] font-bold">${sub.razonSocial}</span></div>
      <div><strong>CUIT:</strong> <span class="font-mono">${sub.cuit}</span></div>
      <div><strong>Notas de Débito:</strong> ${sub.aceptaND ? '<span class="text-emerald-700 font-bold">SÍ ACEPTA</span>' : '<span class="text-rose-700 font-bold">NO ACEPTA</span>'}</div>
    </div>
    <div class="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-200">
      Se emitió alerta por correo electrónico y el legajo ya está visible en la bandeja de administración.
    </div>
  `;

  modal.classList.remove('hidden');
}

window.closeSuccessModal = function() {
  document.getElementById('modal-success').classList.add('hidden');
  document.getElementById('client-onboarding-form').reset();
  ['afip', 'estatuto', 'poderes', 'iibb'].forEach(k => removeUploadedFile(new Event('click'), k));
  switchView('admin');
  showToast('¡Nueva solicitud agregada a la bandeja de administración!');
};

// Panel de Administración (Filtros y Métricas)
function setupAdminDashboard() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.className = 'filter-btn shrink-0 px-3 py-1.5 text-xs font-bold font-brand rounded-lg bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition');
      e.target.className = 'filter-btn shrink-0 px-3 py-1.5 text-xs font-bold font-brand rounded-lg bg-[#003B64] text-white border border-[#003B64] transition';
      currentFilter = e.target.getAttribute('data-filter');
      renderAdminViews();
    });
  });

  const searchInput = document.getElementById('admin-search-input');
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase();
    renderAdminViews();
  });

  document.getElementById('btn-export-excel').addEventListener('click', () => {
    exportToExcelSimulated();
  });

  document.getElementById('btn-export-csv').addEventListener('click', () => {
    exportToCsvSimulated();
  });
}

function updateMetrics() {
  const total = submissions.length;
  const pending = submissions.filter(s => s.status === 'PENDING').length;
  const approved = submissions.filter(s => s.status === 'APPROVED').length;
  const loaded = submissions.filter(s => s.status === 'LOADED_ERP').length;
  const ndYesCount = submissions.filter(s => s.aceptaND).length;
  const ndPercent = total > 0 ? Math.round((ndYesCount / total) * 100) : 0;

  document.getElementById('metric-total').textContent = total;
  document.getElementById('metric-pending').textContent = pending;
  document.getElementById('metric-approved').textContent = approved;
  document.getElementById('metric-loaded').textContent = loaded;
  document.getElementById('metric-nd-rate').textContent = `${ndPercent}%`;
}

// Renderizador Dual: Tabla para Desktop / Cards para Mobile
function renderAdminViews() {
  const tbody = document.getElementById('admin-table-body');
  const cardsContainer = document.getElementById('admin-cards-container');
  
  const filtered = submissions.filter(sub => {
    const matchesFilter = currentFilter === 'ALL' || sub.status === currentFilter;
    const matchesSearch = currentSearch === '' || 
      sub.razonSocial.toLowerCase().includes(currentSearch) ||
      sub.cuit.toLowerCase().includes(currentSearch) ||
      sub.email.toLowerCase().includes(currentSearch) ||
      sub.contacto.toLowerCase().includes(currentSearch);
    return matchesFilter && matchesSearch;
  });

  // Estado Vacío
  if (filtered.length === 0) {
    const emptyHtml = `
      <div class="py-12 px-4 text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200">
        <svg class="w-10 h-10 mx-auto text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        No se encontraron solicitudes que coincidan con la búsqueda.
      </div>
    `;
    tbody.innerHTML = `<tr><td colspan="7" class="py-8 text-center text-sm text-slate-500">${emptyHtml}</td></tr>`;
    cardsContainer.innerHTML = emptyHtml;
    return;
  }

  // 1. Renderizado Desktop (Tabla)
  tbody.innerHTML = filtered.map(sub => {
    const statusBadge = getStatusBadgeHtml(sub.status);
    const ndBadge = getNdBadgeHtml(sub.aceptaND);

    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-200/80">
        <td class="py-3.5 px-4 text-xs font-mono text-slate-500">${sub.id}</td>
        <td class="py-3.5 px-4">
          <div class="font-bold text-sm text-[#003B64] font-brand">${sub.razonSocial}</div>
          <div class="text-xs text-slate-500">${sub.nombreComercial || 'Sin nombre fantasía'}</div>
        </td>
        <td class="py-3.5 px-4">
          <div class="font-mono text-xs text-slate-800 font-semibold">${sub.cuit}</div>
        </td>
        <td class="py-3.5 px-4 text-xs text-slate-600">
          <div class="font-medium text-slate-800">${sub.contacto}</div>
          <div class="text-[11px] text-slate-500">${sub.email}</div>
        </td>
        <td class="py-3.5 px-4 text-center">
          ${ndBadge}
        </td>
        <td class="py-3.5 px-4 text-center">
          ${statusBadge}
        </td>
        <td class="py-3.5 px-4 text-right">
          <button onclick="openDetailModal('${sub.id}')" class="px-3 py-1.5 text-xs font-bold font-brand text-[#003B64] bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition">
            Ver Ficha
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // 2. Renderizado Mobile (Tarjetas Interactivas)
  cardsContainer.innerHTML = filtered.map(sub => {
    const statusBadge = getStatusBadgeHtml(sub.status);
    const ndBadge = getNdBadgeHtml(sub.aceptaND);

    return `
      <div class="mobile-submission-card bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <!-- Cabecera de Tarjeta -->
        <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
          <div>
            <span class="text-[10px] font-mono text-slate-400 block">${sub.id} • ${sub.createdAt}</span>
            <h4 class="text-base font-bold font-brand text-[#003B64] leading-tight mt-0.5">${sub.razonSocial}</h4>
            ${sub.nombreComercial ? `<span class="text-xs text-slate-500 font-medium">${sub.nombreComercial}</span>` : ''}
          </div>
          <div>${statusBadge}</div>
        </div>

        <!-- Cuerpo de Información Clave -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="bg-slate-50 p-2 rounded-lg">
            <span class="text-[10px] uppercase font-bold text-slate-400 block">CUIT</span>
            <span class="font-mono font-bold text-slate-800">${sub.cuit}</span>
          </div>
          <div class="bg-slate-50 p-2 rounded-lg">
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Notas de Débito</span>
            <div class="mt-0.5">${ndBadge}</div>
          </div>
        </div>

        <!-- Contacto -->
        <div class="text-xs text-slate-600 flex items-center justify-between pt-1">
          <div>
            <span class="font-semibold text-slate-800">${sub.contacto}</span>
            <span class="text-[11px] text-slate-400 block truncate max-w-[190px]">${sub.email}</span>
          </div>
          <button onclick="openDetailModal('${sub.id}')" class="px-3.5 py-2 text-xs font-bold font-brand text-white bg-[#003B64] hover:bg-[#0A4D74] rounded-xl shadow-xs shrink-0 transition flex items-center gap-1">
            <span>Ver Ficha</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function getStatusBadgeHtml(status) {
  if (status === 'PENDING') {
    return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold font-brand bg-amber-100 text-amber-800">Pendiente</span>';
  } else if (status === 'APPROVED') {
    return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold font-brand bg-emerald-100 text-emerald-800">Aprobado</span>';
  } else if (status === 'LOADED_ERP') {
    return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold font-brand bg-blue-100 text-blue-800">Cargado ERP</span>';
  }
  return '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold font-brand bg-rose-100 text-rose-800">Rechazado</span>';
}

function getNdBadgeHtml(aceptaND) {
  return aceptaND 
    ? '<span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> SÍ Acepta</span>'
    : '<span class="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> NO Acepta</span>';
}

// Modal de Detalle Completo
window.openDetailModal = function(id) {
  selectedSubmission = submissions.find(s => s.id === id);
  if (!selectedSubmission) return;

  const s = selectedSubmission;
  const modal = document.getElementById('modal-detail');
  
  document.getElementById('modal-detail-title').textContent = s.razonSocial;
  document.getElementById('modal-detail-cuit').textContent = `CUIT: ${s.cuit} | ID: ${s.id}`;

  const body = document.getElementById('modal-detail-body');
  body.innerHTML = `
    <div class="space-y-4">
      <!-- Sección 1: Datos Generales -->
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h4 class="text-xs font-bold font-brand text-[#003B64] uppercase tracking-wider mb-3">1. Datos Generales</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div><span class="text-slate-500">Razón Social:</span> <strong class="text-slate-800">${s.razonSocial}</strong></div>
          <div><span class="text-slate-500">Nombre Comercial:</span> <span class="text-slate-800">${s.nombreComercial || '-'}</span></div>
          <div class="sm:col-span-2"><span class="text-slate-500">Dirección Legal:</span> <span class="text-slate-800">${s.direccionLegal}</span></div>
          <div><span class="text-slate-500">Teléfono:</span> <span class="text-slate-800">${s.telefono}</span></div>
          <div><span class="text-slate-500">Mail Principal:</span> <span class="text-slate-800">${s.email}</span></div>
          <div><span class="text-slate-500">Persona de Contacto:</span> <span class="text-slate-800">${s.contacto}</span></div>
          <div><span class="text-slate-500">Mail Cobranzas / Facturas:</span> <span class="text-slate-800">${s.emailCobranzas}</span></div>
          <div class="sm:col-span-2"><span class="text-slate-500">Cuenta Corriente / Ref:</span> <span class="text-slate-800">${s.cuentaCorriente || '-'}</span></div>
        </div>
      </div>

      <!-- Sección 2: Condiciones Cambiarias -->
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h4 class="text-xs font-bold font-brand text-[#003B64] uppercase tracking-wider mb-2">2. Condiciones Cambiarias</h4>
        <div class="space-y-2 text-xs">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Tipo de cambio oficial al día de pago: <strong>Aceptado</strong></span>
          </div>
          <div class="pt-2 border-t border-slate-200">
            <span class="text-slate-500 block mb-1">Aceptación de Notas de Débito por Dif. Cambio:</span>
            ${s.aceptaND 
              ? '<span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-md"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> SÍ ACEPTA NOTAS DE DÉBITO</span>' 
              : '<span class="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 bg-rose-100 px-3 py-1 rounded-md"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> NO ACEPTA NOTAS DE DÉBITO</span>'}
          </div>
        </div>
      </div>

      <!-- Sección 3: PDFs Adjuntos -->
      <div>
        <h4 class="text-xs font-bold font-brand text-[#003B64] uppercase tracking-wider mb-3">3. Documentación Respaldatoria (PDFs)</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${renderDocItem('Constancia AFIP / ARCA', s.documents.afip)}
          ${renderDocItem('Estatuto / Contrato Social', s.documents.estatuto)}
          ${renderDocItem('Poderes de Administración', s.documents.poderes)}
          ${renderDocItem('IIBB / Convenio Multilateral', s.documents.iibb)}
        </div>
      </div>

      <!-- Auditoría -->
      <div class="text-[10px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
        <span>Fecha de envío: <strong>${s.createdAt}</strong></span>
        <span>IP: <strong class="font-mono">${s.ipAddress}</strong></span>
      </div>
    </div>
  `;

  const statusSelect = document.getElementById('modal-status-select');
  statusSelect.value = s.status;

  modal.classList.remove('hidden');
};

function renderDocItem(label, doc) {
  if (!doc) {
    return `
      <div class="border border-dashed border-slate-200 rounded-lg p-2.5 bg-slate-50 text-[11px] text-slate-400">
        <span>${label}: <em>No adjuntado</em></span>
      </div>
    `;
  }
  return `
    <div class="border border-slate-200 rounded-xl p-2.5 bg-white shadow-2xs flex items-center justify-between gap-2">
      <div class="flex items-center gap-2 overflow-hidden">
        <svg class="w-5 h-5 text-rose-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
        </svg>
        <div class="overflow-hidden">
          <div class="text-xs font-semibold text-slate-800 truncate max-w-[130px] sm:max-w-[160px]">${doc.name}</div>
          <div class="text-[10px] text-slate-400">${label} • ${doc.size}</div>
        </div>
      </div>
      <button onclick="downloadPdfSimulated('${doc.name}')" class="px-2.5 py-1 text-[11px] font-bold font-brand text-[#003B64] hover:bg-slate-100 rounded-lg shrink-0 border border-slate-200">
        Descargar
      </button>
    </div>
  `;
}

window.closeDetailModal = function() {
  document.getElementById('modal-detail').classList.add('hidden');
};

window.saveStatusChange = function() {
  if (!selectedSubmission) return;
  const newStatus = document.getElementById('modal-status-select').value;
  selectedSubmission.status = newStatus;
  renderAdminViews();
  updateMetrics();
  closeDetailModal();
  showToast(`Estado de ${selectedSubmission.razonSocial} actualizado.`);
};

// Descargas
window.downloadPdfSimulated = function(filename) {
  showToast(`Descargando PDF: ${filename}`);
};

function exportToExcelSimulated() {
  showToast('Generando Excel (.xlsx) para ERP Fracht...');
  setTimeout(() => {
    generateAndDownloadCsv('fracht_clientes_onboarding.csv');
  }, 500);
}

function exportToCsvSimulated() {
  showToast('Generando CSV estructurado...');
  setTimeout(() => {
    generateAndDownloadCsv('fracht_clientes.csv');
  }, 400);
}

function generateAndDownloadCsv(filename) {
  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += 'ID,Razon Social,Nombre Comercial,CUIT,Direccion Legal,Telefono,Email Principal,Persona Contacto,Email Cobranzas,Acepta Notas Debito,Estado,Fecha Envio\n';
  
  submissions.forEach(s => {
    csvContent += `"${s.id}","${s.razonSocial}","${s.nombreComercial}","${s.cuit}","${s.direccionLegal}","${s.telefono}","${s.email}","${s.contacto}","${s.emailCobranzas}","${s.aceptaND ? 'SI' : 'NO'}","${s.status}","${s.createdAt}"\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
