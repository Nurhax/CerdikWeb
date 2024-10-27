// Mendapatkan instance modal dari Bootstrap
const addModal = new bootstrap.Modal(document.getElementById("addModal"));

function tambahObat() {
  // Mengambil nilai dari input nama obat baru
  let namaObatBaru = document.getElementById("namaObatBaru").value;

  // Mengecek apakah input tidak kosong
  if (namaObatBaru.trim() !== "") {
    // Mendapatkan elemen tabel dan tbody
    let table = document
      .getElementById("obatTable")
      .getElementsByTagName("tbody")[0];

    // Menambahkan baris baru di tabel
    let newRow = table.insertRow();

    // Menambahkan sel untuk nomor, nama obat, dan aksi
    let noCell = newRow.insertCell(0);
    let namaCell = newRow.insertCell(1);
    let actionCell = newRow.insertCell(2);

    // Mengatur nomor urut sesuai jumlah baris
    noCell.innerText = table.rows.length;

    // Mengisi nama obat
    namaCell.innerText = namaObatBaru;

    // Menambahkan tombol detail di kolom aksi
    actionCell.innerHTML = `
      <div class="btn-group">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Detail
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#addModal">Add New</a></li>
          <li><a class="dropdown-item" href="#">Edit</a></li>
        </ul>
      </div>
    `;

    // Mengosongkan input setelah data ditambahkan dan menutup modal
    document.getElementById("namaObatBaru").value = "";
    addModal.hide();
  } else {
    alert("Nama obat tidak boleh kosong.");
  }
}
