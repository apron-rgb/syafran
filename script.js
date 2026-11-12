// DATA PERANGKAT
const devices = [
  {
    ip: "192.168.1.10",
    name: "PC-Laboratorium-01",
    type: "Workstation",
    status: "Terhubung"
  },
  {
    ip: "192.168.1.15",
    name: "Server-Lokal",
    type: "Server",
    status: "Terhubung"
  },
  {
    ip: "192.168.1.22",
    name: "Printer-Jaringan",
    type: "Printer",
    status: "Terputus"
  }
];

// FUNGSI TOAST
function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// JAM DAN TANGGAL DIGITAL
function updateDateTime() {
  const now = new Date();

  document.getElementById("dateText").textContent =
    now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });

  document.getElementById("clock").textContent =
    now.toLocaleTimeString("id-ID", {
      hour12: false
    });
}

updateDateTime();
setInterval(updateDateTime, 1000);

// NAVIGASI SIDEBAR
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {

    document.querySelectorAll(".nav-link")
      .forEach(item => item.classList.remove("active"));

    link.classList.add("active");

    document.getElementById("sidebar")
      .classList.remove("open");
  });
});

// MENU MOBILE
document.getElementById("menuToggle")
  .addEventListener("click", () => {

    document.getElementById("sidebar")
      .classList.toggle("open");
});

// PENCARIAN PERANGKAT
document.getElementById("deviceSearch")
  .addEventListener("input", event => {

    const keyword = event.target.value.toLowerCase();

    let visible = 0;

    document.querySelectorAll("#deviceTable tr")
      .forEach(row => {

        const match = row.textContent
          .toLowerCase()
          .includes(keyword);

        row.hidden = !match;

        if (match) visible++;
      });

    document.getElementById("rowCount")
      .textContent = visible;

    document.getElementById("emptyState")
      .hidden = visible !== 0;
  });

// DETAIL PERANGKAT
document.getElementById("deviceTable")
  .addEventListener("click", event => {

    const button = event.target.closest(".detail-btn");

    if (!button) return;

    const device = devices.find(item =>
      item.name === button.dataset.device
    );

    if (!device) return;

    document.getElementById("dialogName")
      .textContent = device.name;

    document.getElementById("dialogIp")
      .textContent = device.ip;

    document.getElementById("dialogType")
      .textContent = device.type;

    document.getElementById("dialogStatus")
      .textContent = device.status;

    document.getElementById("detailDialog")
      .showModal();
  });

// TUTUP DETAIL
document.getElementById("closeDialog")
  .addEventListener("click", () => {

    document.getElementById("detailDialog").close();
  });

// REFRESH DATA
document.getElementById("refreshBtn")
  .addEventListener("click", () => {

    const button = document.getElementById("refreshBtn");

    button.disabled = true;
    button.textContent = "Memperbarui...";

    setTimeout(() => {

      button.disabled = false;
      button.textContent = "↻ Refresh Data";

      showToast("Tampilan berhasil diperbarui.");

    }, 650);
  });

// EXPORT DATA KE CSV
document.getElementById("exportBtn")
  .addEventListener("click", () => {

    const header = [
      "IP Address",
      "Nama Perangkat",
      "Jenis",
      "Status"
    ];

    const rows = devices.map(device => [
      device.ip,
      device.name,
      device.type,
      device.status
    ]);

    const csv = [header, ...rows]
      .map(row =>
        row.map(value =>
          `"${String(value).replaceAll('"', '""')}"`
        ).join(",")
      ).join("\n");

    const blob = new Blob(
      ["\uFEFF" + csv],
      { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "data-perangkat.csv";
    link.click();

    URL.revokeObjectURL(url);

    showToast("File CSV berhasil disiapkan.");
  });

// PILIHAN PERIODE
document.getElementById("periodSelect")
  .addEventListener("change", event => {

    showToast(
      "Periode " + event.target.options[
        event.target.selectedIndex
      ].text + " dipilih."
    );
  });