document.getElementById('imageUpload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('uploadedImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('removeBgButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    if (!file) {
        alert('Silakan unggah gambar terlebih dahulu.');
        return;
    }

    // Tampilkan efek loading
    const loadingElement = document.getElementById('loading');
    const resultImage = document.getElementById('resultImage');
    loadingElement.style.display = 'flex';
    resultImage.style.display = 'none';

    const formData = new FormData();
    formData.append('image_file', file);

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': 'sXe1JjZTFehVgVw8hZdRZ9dv', // Ganti dengan API key Anda
        },
        body: formData,
    })
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        resultImage.src = url;
        resultImage.style.display = 'block';
        loadingElement.style.display = 'none'; // Sembunyikan efek loading
        document.getElementById('downloadButton').disabled = false;

        // Tambahkan event listener untuk tombol download
        document.getElementById('downloadButton').addEventListener('click', function() {
            const a = document.createElement('a');
            a.href = url;
            a.download = 'no-bg-image.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menghapus latar belakang.');
        loadingElement.style.display = 'none'; // Sembunyikan efek loading jika terjadi error
    });
});