

$(document).ready(function(){
    function toggleCheckbox(row) {
        const checkbox = $(row).find('input[type="checkbox"]');
        checkbox.prop('checked', !checkbox.prop('checked'));
        checkbox.toggleClass('visible-checkbox');
    }

    // Membaca klik pada row tabel 
    $('tbody').on('click', 'tr', function(){
        $(this).toggleClass('selected');  // Mentoggle class yang dipilih 
        toggleCheckbox(this);             // Toggle checkbox visibility
        checkSelectedRows();              // Check how many rows are selected
    });

<<<<<<< HEAD
    $.getJSON('mitra.json', function(mitraData){
=======
    $.getJSON('Scripts/mitra.json', function(mitraData){
>>>>>>> main
        //Membaca JSON dan menambah data pada JSON
        const tbody = $('tbody');

        $.each(mitraData.mitra, function(index,mitra){
            //Membuat row baru untuk setiap data di JSON
            const row = `
             <tr>
                    <th scope="row"> ${index + 1} </th>
                    <td> ${mitra.nama}</td>
                    <td> ${mitra.sejak}</td>
                    <td><img src="${mitra.imgSrc}" class="logo-image" style="height: 40px;"></td> 
                    <td><input type="checkbox" class="custom-checkbox" style="display: none;"></td>
            </tr>
            `;
            tbody.append(row);
               
                
        });
    })
    .fail(function() {
        console.error('Error loading JSON data');
    });
    
    function checkSelectedRows() {
        const selectedRows = $('tr.selected').length;
    
        if (selectedRows > 1) {
            $('.editBtn').addClass('disabled').prop('disabled', true);
        } else {
            $('.editBtn').removeClass('disabled').prop('disabled', false);
        }
    }
    $('#imageUpload').change(function(){
        let input = this;

        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function(e) {
                $('#imagePreview').attr('src', e.target.result);
                $('#imagePreview').show();  // Show the image preview
            }

            reader.readAsDataURL(input.files[0]); // Read the uploaded file
        }
    });

});
