// Inisialisasi modal
let addModal;
let editModal;

document.addEventListener("DOMContentLoaded", function () {
  addModal = new bootstrap.Modal(document.getElementById("addModal"));
  editModal = new bootstrap.Modal(document.getElementById("editModal"));
});

function redirectToLogin(){
  window.location = "LoginAdmin.html";
}

function tambahObat() {
  const namaObat = document.getElementById("namaObatBaru").value;
  if (namaObat.trim() === "") {
    alert("Nama obat tidak boleh kosong!");
    return;
  }

  const table = document
    .getElementById("obatTable")
    .getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();
  const rowCount = table.rows.length;

  newRow.innerHTML = `
        <td>${rowCount}</td>
        <td>${namaObat}</td>
        <td>
            <div class="dropdown">
                <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Detail
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" onclick="editObat(${rowCount}, '${namaObat}')">Edit</a></li>
                    <li><a class="dropdown-item" href="#" onclick="hapusObat(${rowCount})">Delete</a></li>
                </ul>
            </div>
        </td>
    `;

  document.getElementById("namaObatBaru").value = "";
  addModal.hide();
}

function editObat(id, nama) {
  document.getElementById("editObatId").value = id;
  document.getElementById("editNamaObat").value = nama;
  editModal.show();
}

function simpanEditObat() {
  const id = document.getElementById("editObatId").value;
  const namaBaru = document.getElementById("editNamaObat").value;

  if (namaBaru.trim() === "") {
    alert("Nama obat tidak boleh kosong!");
    return;
  }

  const table = document.getElementById("obatTable");
  const rows = table
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].cells[0].textContent == id) {
      rows[i].cells[1].textContent = namaBaru;
      const editLink = rows[i].querySelector(".dropdown-item");
      if (editLink) {
        editLink.setAttribute("onclick", `editObat(${id}, '${namaBaru}')`);
      }
      break;
    }
  }

  editModal.hide();
}

function hapusObat(id) {
  if (confirm("Apakah Anda yakin ingin menghapus obat ini?")) {
    const table = document.getElementById("obatTable");
    const rows = table
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].cells[0].textContent == id) {
        table.getElementsByTagName("tbody")[0].deleteRow(i);
        break;
      }
    }
  }
}
