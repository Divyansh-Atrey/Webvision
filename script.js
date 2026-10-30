let currentServing = 42;
let myToken = 48;
let waitingCount = 6;
let nextToken = 49;
let avgTime = 5;

let patients = [
  { id: 42, name: "Smt. Kamla Devi", type: "Senior Citizen", status: "serving" },
  { id: 43, name: "Vikramaditya Singh", type: "General", status: "waiting" },
  { id: 44, name: "Sunita Verma", type: "Maternal / Child", status: "waiting" },
  { id: 45, name: "Mohd. Irfan", type: "Urgent Care", status: "waiting" },
  { id: 46, name: "Pooja Hegde", type: "General", status: "waiting" },
  { id: 47, name: "Deepak Rawat", type: "General", status: "waiting" },
  { id: 48, name: "Rajesh Kumar", type: "General", status: "waiting" }
];

function showLogin() {
  document.getElementById("form-auth-login").classList.remove("hidden");
  document.getElementById("form-auth-register").classList.add("hidden");
  document.getElementById("auth-tab-login").classList.add("active");
  document.getElementById("auth-tab-register").classList.remove("active");
}

function showRegister() {
  document.getElementById("form-auth-login").classList.add("hidden");
  document.getElementById("form-auth-register").classList.remove("hidden");
  document.getElementById("auth-tab-login").classList.remove("active");
  document.getElementById("auth-tab-register").classList.add("active");
}

function selectPatientRole() {
  document.getElementById("role-btn-patient").classList.add("active");
  document.getElementById("role-btn-staff").classList.remove("active");
  if (document.getElementById("reg-patient-fields")) {
    document.getElementById("reg-patient-fields").classList.remove("hidden");
  }
  if (document.getElementById("reg-staff-fields")) {
    document.getElementById("reg-staff-fields").classList.add("hidden");
  }
  if (document.getElementById("login-patient-token-picker")) {
    document.getElementById("login-patient-token-picker").classList.remove("hidden");
  }
}

function selectStaffRole() {
  document.getElementById("role-btn-staff").classList.add("active");
  document.getElementById("role-btn-patient").classList.remove("active");
  if (document.getElementById("reg-patient-fields")) {
    document.getElementById("reg-patient-fields").classList.add("hidden");
  }
  if (document.getElementById("reg-staff-fields")) {
    document.getElementById("reg-staff-fields").classList.remove("hidden");
  }
  if (document.getElementById("login-patient-token-picker")) {
    document.getElementById("login-patient-token-picker").classList.add("hidden");
  }
}

function openApp() {
  document.getElementById("auth-gateway").classList.add("hidden");
  document.getElementById("app-shell").classList.remove("hidden");
  updateDisplay();
}

function closeApp() {
  document.getElementById("app-shell").classList.add("hidden");
  document.getElementById("auth-gateway").classList.remove("hidden");
}

function updateDisplay() {
  document.getElementById("strip-serving-token").innerText = "#" + currentServing;
  document.getElementById("strip-waiting-count").innerText = waitingCount;

  document.getElementById("auth-live-serving").innerText = "#" + currentServing;
  document.getElementById("auth-live-waiting").innerText = waitingCount;
  document.getElementById("auth-live-next-token").innerText = "#" + nextToken;

  document.getElementById("staff-current-token").innerText = "#" + currentServing;
  document.getElementById("patient-view-serving").innerText = "#" + currentServing;
  document.getElementById("patient-view-your-token").innerText = "#" + myToken;

  document.getElementById("metric-waiting").innerText = waitingCount;

  let currentPatient = null;
  for (let i = 0; i < patients.length; i++) {
    if (patients[i].id === currentServing) {
      currentPatient = patients[i];
      break;
    }
  }

  if (currentPatient) {
    document.getElementById("staff-current-name").innerText = currentPatient.name;
    document.getElementById("staff-current-meta").innerText = currentPatient.type + " • Serving Now";
  } else {
    document.getElementById("staff-current-name").innerText = "Walk-in Patient";
    document.getElementById("staff-current-meta").innerText = "General • Serving Now";
  }

  let ahead = myToken - currentServing;
  if (ahead < 0) ahead = 0;

  document.getElementById("patient-view-ahead-count").innerText = ahead;

  let waitTime = ahead * avgTime;
  if (ahead === 0) {
    document.getElementById("patient-view-wait-time").innerText = "Now";
    document.getElementById("patient-view-status-pill").innerText = "Serving Now";
    document.getElementById("patient-proximity-banner").className = "alert-banner serving";
    document.getElementById("patient-proximity-banner").innerText = "It is your turn! Please walk into Room 1.";
    document.getElementById("patient-progress-bar").style.width = "100%";
    document.getElementById("patient-progress-pct").innerText = "100%";
  } else if (ahead <= 3) {
    document.getElementById("patient-view-wait-time").innerText = waitTime + " mins";
    document.getElementById("patient-view-status-pill").innerText = ahead + " Tokens Away";
    document.getElementById("patient-proximity-banner").className = "alert-banner proximity";
    document.getElementById("patient-proximity-banner").innerText = "Get Ready! You are " + ahead + " tokens away. Please head to chamber door.";
    document.getElementById("patient-progress-bar").style.width = "80%";
    document.getElementById("patient-progress-pct").innerText = "80%";
  } else {
    document.getElementById("patient-view-wait-time").innerText = waitTime + " mins";
    document.getElementById("patient-view-status-pill").innerText = ahead + " Tokens Away";
    document.getElementById("patient-proximity-banner").className = "alert-banner safe";
    document.getElementById("patient-proximity-banner").innerText = "Safe to Wait: " + ahead + " patients ahead. Relax and wait remotely.";
    document.getElementById("patient-progress-bar").style.width = "40%";
    document.getElementById("patient-progress-pct").innerText = "40%";
  }

  renderQueue();
  renderTrain();
}

function callNext() {
  if (waitingCount > 0) {
    currentServing++;
    waitingCount--;
    for (let i = 0; i < patients.length; i++) {
      if (patients[i].id === currentServing) {
        patients[i].status = "serving";
      } else if (patients[i].id < currentServing) {
        patients[i].status = "completed";
      }
    }
  }
  updateDisplay();
}

function renderQueue() {
  let list = document.getElementById("staff-queue-list");
  if (!list) return;

  list.innerHTML = "";
  for (let i = 0; i < patients.length; i++) {
    let p = patients[i];
    let row = document.createElement("div");
    row.className = "queue-row";
    if (p.id === myToken) {
      row.className += " tracked";
    }

    row.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px;">
        <button type="button" class="token-square ${p.id === currentServing ? 'serving' : ''} ${p.id === myToken ? 'tracked' : ''}">${p.id}</button>
        <div>
          <div style="font-weight:bold; font-size:13px;">${p.name}</div>
          <div style="font-size:11px; color:#64748b;">${p.type}</div>
        </div>
      </div>
      <div>
        <span class="badge ${p.id === currentServing ? 'badge-success' : 'badge-muted'}">${p.id === currentServing ? 'Serving' : p.id < currentServing ? 'Done' : 'Waiting'}</span>
      </div>
    `;
    list.appendChild(row);
  }
}

function renderTrain() {
  let train = document.getElementById("patient-token-train");
  if (!train) return;

  train.innerHTML = "";
  for (let i = 0; i < patients.length; i++) {
    let p = patients[i];
    if (p.id >= currentServing) {
      let pill = document.createElement("span");
      pill.className = "train-pill";
      if (p.id === currentServing) pill.className += " serving";
      if (p.id === myToken) pill.className += " me";
      pill.innerText = "#" + p.id;
      train.appendChild(pill);
    }
  }
}

function setMode(mode) {
  let tabs = ["tab-split", "tab-patient", "tab-checkin", "tab-staff"];
  for (let i = 0; i < tabs.length; i++) {
    let t = document.getElementById(tabs[i]);
    if (t) t.classList.remove("active");
  }

  let activeTab = document.getElementById("tab-" + mode);
  if (activeTab) activeTab.classList.add("active");

  let checkin = document.getElementById("panel-checkin");
  let staff = document.getElementById("panel-staff");
  let patient = document.getElementById("panel-patient");
  let grid = document.getElementById("workspace-grid");

  if (mode === "checkin") {
    checkin.classList.remove("hidden");
    staff.classList.add("hidden");
    patient.classList.add("hidden");
  } else if (mode === "patient") {
    checkin.classList.add("hidden");
    staff.classList.add("hidden");
    patient.classList.remove("hidden");
    grid.style.gridTemplateColumns = "1fr";
  } else if (mode === "staff") {
    checkin.classList.add("hidden");
    staff.classList.remove("hidden");
    patient.classList.add("hidden");
    grid.style.gridTemplateColumns = "1fr";
  } else {
    checkin.classList.add("hidden");
    staff.classList.remove("hidden");
    patient.classList.remove("hidden");
    grid.style.gridTemplateColumns = "7fr 5fr";
  }
}

window.onload = function() {
  document.getElementById("auth-tab-login").onclick = showLogin;
  document.getElementById("auth-tab-register").onclick = showRegister;
  document.getElementById("link-to-register").onclick = showRegister;
  document.getElementById("link-to-login").onclick = showLogin;

  document.getElementById("role-btn-patient").onclick = selectPatientRole;
  document.getElementById("role-btn-staff").onclick = selectStaffRole;

  document.getElementById("btn-fill-login-demo").onclick = function() {
    document.getElementById("auth-login-identifier").value = "+91 98112 48048";
    document.getElementById("auth-login-secret").value = "1234";
  };

  document.getElementById("form-auth-login").onsubmit = function(event) {
    event.preventDefault();
    let name = document.getElementById("auth-login-identifier").value;
    let tokenSelect = document.getElementById("auth-login-token-select");
    if (tokenSelect && tokenSelect.value) {
      myToken = parseInt(tokenSelect.value);
    }
    document.getElementById("session-user-name").innerText = name || "Rajesh Kumar";
    openApp();
  };

  document.getElementById("form-auth-register").onsubmit = function(event) {
    event.preventDefault();
    let name = document.getElementById("auth-reg-name").value;
    let type = document.getElementById("auth-reg-category").value;

    let newPatient = {
      id: nextToken,
      name: name,
      type: type,
      status: "waiting"
    };

    patients.push(newPatient);
    myToken = nextToken;
    nextToken++;
    waitingCount++;

    document.getElementById("session-user-name").innerText = name;
    openApp();
  };

  document.getElementById("btn-skip-auth-split").onclick = openApp;

  document.getElementById("btn-quick-login-patient").onclick = function() {
    myToken = 48;
    document.getElementById("session-user-name").innerText = "Rajesh Kumar";
    openApp();
  };

  document.getElementById("btn-quick-login-staff").onclick = function() {
    document.getElementById("session-user-name").innerText = "Dr. R. Sharma (Staff)";
    openApp();
    setMode("staff");
  };

  document.getElementById("btn-logout").onclick = closeApp;

  document.getElementById("tab-split").onclick = function() { setMode("split"); };
  document.getElementById("tab-patient").onclick = function() { setMode("patient"); };
  document.getElementById("tab-checkin").onclick = function() { setMode("checkin"); };
  document.getElementById("tab-staff").onclick = function() { setMode("staff"); };

  document.getElementById("btn-next-patient").onclick = callNext;

  document.getElementById("btn-recall-token").onclick = function() {
    alert("Recall bell sounded for Token #" + currentServing);
  };

  document.getElementById("btn-skip-token").onclick = function() {
    callNext();
  };

  document.getElementById("btn-fast-forward-3").onclick = function() {
    callNext();
    callNext();
    callNext();
  };

  document.getElementById("btn-dec-pace").onclick = function() {
    if (avgTime > 1) {
      avgTime--;
      document.getElementById("stat-avg-mins").innerText = avgTime + " mins/patient";
      updateDisplay();
    }
  };

  document.getElementById("btn-inc-pace").onclick = function() {
    avgTime++;
    document.getElementById("stat-avg-mins").innerText = avgTime + " mins/patient";
    updateDisplay();
  };

  document.getElementById("btn-reset-demo").onclick = function() {
    currentServing = 42;
    myToken = 48;
    waitingCount = 6;
    nextToken = 49;
    updateDisplay();
  };

  document.getElementById("btn-open-qr-modal").onclick = function() {
    document.getElementById("modal-qr").classList.remove("hidden");
  };

  document.getElementById("btn-close-qr-modal").onclick = function() {
    document.getElementById("modal-qr").classList.add("hidden");
  };

  document.getElementById("btn-modal-go-checkin").onclick = function() {
    document.getElementById("modal-qr").classList.add("hidden");
    setMode("checkin");
  };

  document.getElementById("btn-modal-instant-token").onclick = function() {
    document.getElementById("modal-qr").classList.add("hidden");
    let newP = {
      id: nextToken,
      name: "Gate Walk-In",
      type: "General",
      status: "waiting"
    };
    patients.push(newP);
    myToken = nextToken;
    nextToken++;
    waitingCount++;
    updateDisplay();
  };

  let codeModal = document.getElementById("modal-code-files");
  document.getElementById("btn-open-code-modal").onclick = function() {
    codeModal.classList.remove("hidden");
  };
  if (document.getElementById("btn-open-code-auth")) {
    document.getElementById("btn-open-code-auth").onclick = function() {
      codeModal.classList.remove("hidden");
    };
  }
  document.getElementById("btn-close-code-modal").onclick = function() {
    codeModal.classList.add("hidden");
  };

  updateDisplay();
};