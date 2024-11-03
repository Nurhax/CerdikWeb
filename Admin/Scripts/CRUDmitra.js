
let selectedRows = $('tr.selected').length;
$(document).ready(function(){
    
   
    let mitraData = null;
    let selectedRowData = null;

    function toggleCheckbox(row) {
        //Menyalakan Checkbox
        const checkbox = $(row).find('input[type="checkbox"]');
        checkbox.prop('checked', !checkbox.prop('checked'));
        checkbox.toggleClass('visible-checkbox');
    }

  
    $('tbody').on('click', 'tr', function(){
        // Menghandle operasi saat row di click
        $(this).toggleClass('selected');  // mentoggle class selected
        toggleCheckbox(this);             // menyalakan checkbox untuk row ini
        updateSelectedRowData(this);      // mengupdate data row yang dipilih
        checkSelectedRows();              // mengecek berapa row yang dipilih
    });

    
    $.getJSON('Scripts/mitra.json', function(data){
        //Meng Load JSON
        mitraData = data; // Menyetor data JSON untuk referensi
        const tbody = $('tbody');

        $.each(mitraData.mitra, function(index, mitra) {
            //Mengkonstruksikan Table
            const row = `
                <tr data-id="${index + 1}"> <!-- Use index + 1 to match the id -->
                    <th scope="row">${index + 1}</th>
                    <td>${mitra.nama}</td>
                    <td>${mitra.sejak}</td>
                    <td><img src="${mitra.imgSrc}" class="logo-image" style="height: 40px;"></td>
                    <td><input type="checkbox" class="custom-checkbox" style="display: none;"></td>
                </tr>
            `;
            tbody.append(row);
        });
        
    }).fail(function() {
        console.error('Error loading JSON data');
    });

   
    function updateSelectedRowData(row) {
        //Mengupdate data row berdasarkan seleksi
        const isSelected = $(row).hasClass('selected');
        const rowId = $(row).data('id'); // Mencari data berdasarkan ID JSON
    
        if (isSelected) {
            selectedRowData = mitraData.mitra.find(item => item.id === rowId.toString()); 
        } else {
            selectedRowData = null;
        }
    }

    
    function checkSelectedRows() {
        //Mengenable atau disable  atau disable button berdasarkan jumlah row yang dipilih
        selectedRows = $('tr.selected').length
        if (selectedRows === 1) {
            $('.editBtn').removeClass('disabled').prop('disabled', false);
            $('.addBtn').addClass('disabled').prop('disabled', false);
        } else if (selectedRows === 0){
            $('.addBtn').removeClass('disabled').prop('disabled', false);
        $('.editBtn').addClass('disabled').prop('disabled', true);
        }else {
            $('.editBtn').addClass('disabled').prop('disabled', true);
            $('.addBtn').addClass('disabled').prop('disabled', false);
            selectedRowData = null; // Clear selected data if more than one or no row is selected
        }
    }

    // Edit button click handler
    $('.editBtn').on('click', function() {
        if (selectedRowData) {
            //Mengisi form dengan data 
            $('#inputNamaMitra').val(selectedRowData.nama);
            $('#inputSejak').val(selectedRowData.sejak);

            // preview image jika ada path nya
            if (selectedRowData.imgSrc) {
                $('#imagePreview').attr('src', selectedRowData.imgSrc).show();
            } else {
                $('#imagePreview').hide();
            }

            // Ubah button jadi update mitra
            $('#modalSaveButton').text('Edit Mitra');
        } else {
            // Kalau tidak ada data maka blank kan modal
            $('#inputNamaMitra').val('');
            $('#inputSejak').val('');
            $('#imagePreview').hide();
            $('#modalSaveButton').text('Add Mitra');
        }
    });
    $('.deleteBtn').on('click', function() {
        // pilih semua row
        const selectedRows = $('tr.selected');
    
        // hapus semua selected row 
        selectedRows.each(function() {
            const rowId = $(this).data('id'); //Ambil semua id setiap row
    
            $(this).remove();
    
            // Update JSON data
            mitraData.mitra = mitraData.mitra.filter(item => item.id !== rowId);
        });
    
        // Disable Edit button 
        $('.editBtn').addClass('disabled').prop('disabled', true);
    });

    $('#exampleModal').on('hidden.bs.modal', function() {
        //Mereset Modal
        $('#mitraForm')[0].reset(); // Clear form fields
        $('#imagePreview').hide();  // Hide the image preview
        $('#modalSaveButton').text('Add Mitra');
    });

   
    $('#imageUpload').change(function(){
        // Menampilkan Preview Image
        let input = this;

        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').attr('src', e.target.result).show();
            }
            reader.readAsDataURL(input.files[0]);
        }
    });

    $('#modalSaveButton').on('click', function() {
        //Mengupdate data JSON pada Tabel
        if (selectedRowData) {
            // Mengambil nilai pada Form
            const updatedNama = $('#inputNamaMitra').val();
            const updatedSejak = $('#inputSejak').val();
            const updatedImgSrc = $('#imagePreview').attr('src'); 
    
            // Mengupdate JSON di memory
            selectedRowData.nama = updatedNama;
            selectedRowData.sejak = updatedSejak;
            selectedRowData.imgSrc = updatedImgSrc;
    
            // Mengupdate Table
            const selectedRow = $('tr.selected');
            selectedRow.find('td:eq(0)').text(updatedNama); // Update Nama
            selectedRow.find('td:eq(1)').text(updatedSejak); // Update Sejak
            selectedRow.find('img.logo-image').attr('src', updatedImgSrc); // Update Image
    
            // Menutup Modal
            $('#exampleModal').modal('hide');
        }
    });
});
