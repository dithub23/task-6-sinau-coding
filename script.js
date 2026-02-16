// Generate input jam otomatis
document.getElementById("jumlahFutsal").addEventListener("change", function () {
  let jumlah = parseInt(this.value);
  let container = document.getElementById("jamFutsal");
  container.innerHTML = "";

  for (let i = 1; i <= jumlah; i++) {
    container.innerHTML += `
            <label>Jam Futsal ke-${i}:</label>
            <input type="number" id="futsal${i}" min="1"><br>
        `;
  }
});

document
  .getElementById("jumlahBadminton")
  .addEventListener("change", function () {
    let jumlah = parseInt(this.value);
    let container = document.getElementById("jamBadminton");
    container.innerHTML = "";

    for (let i = 1; i <= jumlah; i++) {
      container.innerHTML += `
            <label>Jam Badminton ke-${i}:</label>
            <input type="number" id="badminton${i}" min="1"><br>
        `;
    }
  });

function hitungSewa() {
  let totalBiaya = 0;
  let output = "";

  let jenisLapangan = ["Futsal", "Badminton"];

  // NESTED LOOP
  for (let i = 0; i < jenisLapangan.length; i++) {
    if (jenisLapangan[i] === "Futsal") {
      let jumlahFutsal = parseInt(
        document.getElementById("jumlahFutsal").value,
      );

      for (let j = 1; j <= jumlahFutsal; j++) {
        let jam = parseInt(document.getElementById("futsal" + j).value);
        let biaya = 0;

        // NESTED IF
        if (jam >= 1) {
          for (let k = 1; k <= jam; k++) {
            if (k === 1) {
              biaya += 80000;
            } else {
              biaya += 50000;
            }
          }
        }

        totalBiaya += biaya;
        output += `Futsal ke-${j} (${jam} jam) = Rp ${biaya.toLocaleString()} <br>`;
      }
    } else if (jenisLapangan[i] === "Badminton") {
      let jumlahBadminton = parseInt(
        document.getElementById("jumlahBadminton").value,
      );

      for (let j = 1; j <= jumlahBadminton; j++) {
        let jam = parseInt(document.getElementById("badminton" + j).value);
        let biaya = 0;

        // NESTED IF
        if (jam >= 1) {
          for (let k = 1; k <= jam; k++) {
            if (k === 1) {
              biaya += 40000;
            } else {
              biaya += 25000;
            }
          }
        }

        totalBiaya += biaya;
        output += `Badminton ke-${j} (${jam} jam) = Rp ${biaya.toLocaleString()} <br>`;
      }
    }
  }

  output += `<hr><strong>Total Biaya = Rp ${totalBiaya.toLocaleString()}</strong>`;

  document.getElementById("output").innerHTML = output;
}

let rincianHTML = "";
let totalGlobal = 0;

// Generate input jam otomatis
document
  .getElementById("jumlahFutsal")
  .addEventListener("change", generateFutsal);
document
  .getElementById("jumlahBadminton")
  .addEventListener("change", generateBadminton);

generateFutsal();
generateBadminton();

function generateFutsal() {
  let jumlah = parseInt(document.getElementById("jumlahFutsal").value);
  let container = document.getElementById("jamFutsal");
  container.innerHTML = "";

  if (!jumlah || jumlah <= 0) return;

  for (let i = 1; i <= jumlah; i++) {
    container.innerHTML += `
            <input type="number" 
            placeholder="Jam Futsal ke-${i}" 
            id="futsal${i}" min="1">
        `;
  }
}

function generateBadminton() {
  let jumlah = parseInt(document.getElementById("jumlahBadminton").value);
  let container = document.getElementById("jamBadminton");
  container.innerHTML = "";

  if (!jumlah || jumlah <= 0) return;

  for (let i = 1; i <= jumlah; i++) {
    container.innerHTML += `
            <input type="number" 
            placeholder="Jam Badminton ke-${i}" 
            id="badminton${i}" min="1">
        `;
  }
}

function hitungSewa() {
  totalGlobal = 0;
  rincianHTML = "";

  let jenis = ["Futsal", "Badminton"];

  for (let i = 0; i < jenis.length; i++) {
    if (jenis[i] === "Futsal") {
      let jumlah = parseInt(document.getElementById("jumlahFutsal").value);

      for (let j = 1; j <= jumlah; j++) {
        let jam = parseInt(document.getElementById("futsal" + j).value);
        let biaya = 0;

        if (jam >= 1) {
          for (let k = 1; k <= jam; k++) {
            if (k === 1) biaya += 80000;
            else biaya += 50000;
          }
        }

        totalGlobal += biaya;

        rincianHTML += `
                    <div class="detail-item">
                        ⚽ Futsal ke-${j} (${jam} jam)
                        <br><strong>Rp ${biaya.toLocaleString()}</strong>
                    </div>
                `;
      }
    } else {
      let jumlah = parseInt(document.getElementById("jumlahBadminton").value);

      for (let j = 1; j <= jumlah; j++) {
        let jam = parseInt(document.getElementById("badminton" + j).value);
        let biaya = 0;

        if (jam >= 1) {
          for (let k = 1; k <= jam; k++) {
            if (k === 1) biaya += 40000;
            else biaya += 25000;
          }
        }

        totalGlobal += biaya;

        rincianHTML += `
                    <div class="detail-item">
                        🏸 Badminton ke-${j} (${jam} jam)
                        <br><strong>Rp ${biaya.toLocaleString()}</strong>
                    </div>
                `;
      }
    }
  }

  animateTotal();
}

function animateTotal() {
  let summary = document.getElementById("summary");
  summary.innerHTML = `
        <div class="total">Total Biaya: Rp <span id="counter">0</span></div>
        <button class="detail-btn" onclick="openModal()">Lihat Rincian</button>
    `;

  let counter = document.getElementById("counter");
  let start = 0;
  let end = totalGlobal;
  let duration = 1500;
  let stepTime = Math.abs(Math.floor(duration / end));
  let timer = setInterval(function () {
    start += Math.ceil(end / 100);
    if (start >= end) {
      start = end;
      clearInterval(timer);
    }
    counter.innerHTML = start.toLocaleString();
  }, 10);
}

function openModal() {
  document.getElementById("modal").style.display = "block";
  document.getElementById("detailOutput").innerHTML =
    rincianHTML + `<hr><h3>Total: Rp ${totalGlobal.toLocaleString()}</h3>`;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}
