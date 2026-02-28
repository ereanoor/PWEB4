# Penjelasan Kode

## 1. index.html

File ini bertugas sebagai kerangka visual dan jembatan interaksi (trigger) bagi pengguna.

### A. Bagian `<head>` 
```html
<style>
    body { text-align: center; font-family: sans-serif; }
    .grup-lampu { display: flex; justify-content: center; gap: 20px; }
    /* ... styling lainnya ... */
</style>
```
Fungsi: Menggunakan Internal CSS untuk mengatur tata letak secara instan.

Penggunaan ```display: flex;``` pada``` .grup-lampu``` sangat penting agar lampu-lampu berjejer rapi secara horizontal (menyamping), tidak menumpuk ke bawah.

### B. Bagian <body> dan Komponen Rangkaian
```
HTML
<div class="item-lampu">
    <img id="l1" src="images/off.gif" alt="Lampu 1">
    <button onclick="tekanLampu('l1')">Lampu 1</button>
</div>
```
Tag ```<img id="...">```: Setiap gambar lampu wajib memiliki atribut id yang unik (seperti l1, l2, la, lb). id ini berfungsi sebagai "KTP" agar JavaScript tahu persis lampu mana yang harus diubah gambarnya. Secara bawaan, semua atribut src diisi dengan images/off.gif (kondisi mati).

Atribut onclick pada ```<button>```: Ini adalah Event Listener. Ketika tombol diklik, HTML akan memanggil fungsi JavaScript.

Pada tombol individual, argumen yang dikirim berupa String tunggal: ```onclick="tekanLampu('l1')"```

Pada tombol grup, argumen yang dikirim berupa Array yang berisi sekumpulan String ID: ```onclick="tekanGrup(['l1', 'l2', 'l3'])"```

## 2.  script.js
File ini berisi algoritma untuk menghidupkan dan mematikan lampu tanpa harus mengecek layar (HTML) berulang kali, melainkan dengan melacak data di memori program.

### A. Objek State Management (statusLampu)
```JavaScript
let statusLampu = {
    'l1': false, 'l2': false, 'l3': false,
    'la': false, 'lb': false, 'lc': false, 'ld': false
};
```
Kode ini membuat sebuah objek bernama statusLampu.

Objek ini berfungsi sebagai database sementara. Setiap Key (kunci) merepresentasikan ID lampu, dan setiap Value (nilai) adalah data boolean.

Nilai false menandakan lampu dalam keadaan mati, dan true menandakan lampu menyala.

### B. Fungsi Saklar Individual (tekanLampu)
```JavaScript
function tekanLampu(id) {
    const lampu = document.getElementById(id);
    if (statusLampu[id]) {
        lampu.src = 'images/off.gif';
        statusLampu[id] = false;
    } else {
        lampu.src = 'images/on.gif';
        statusLampu[id] = true;
    }
}
```
```const lampu = document.getElementById(id);``` : Mengambil elemen <img> dari HTML yang ID-nya dikirim oleh tombol, lalu menyimpannya di variabel lokal lampu.

```if (statusLampu[id])``` : Program mengecek ke dalam objek statusLampu, apakah nilai ID tersebut saat ini true (menyala)?

Blok If (true): Jika menyala, program mengubah gambar (src) menjadi off.gif (mematikan lampu) dan mengembalikan nilai di objek menjadi false.

Blok Else (false): Jika mati, program mengubah gambar menjadi on.gif (menyalakan lampu) dan mengubah nilai di objek menjadi true.

### C. Fungsi Saklar Grup/Paralel (tekanGrup)
```JavaScript
function tekanGrup(kumpulanId) {
    let patokan = statusLampu[kumpulanId[0]];
    
    for (let i = 0; i < kumpulanId.length; i++) {
        let id = kumpulanId[i];
        if (patokan) {
            document.getElementById(id).src = 'images/off.gif';
            statusLampu[id] = false;
        } else {
            document.getElementById(id).src = 'images/on.gif';
            statusLampu[id] = true;
        }
    }
}
```
```let patokan = statusLampu[kumpulanId[0]];``` : Karena ini adalah tombol grup, fungsi menerima Array (contoh: ['la', 'lb']). Program mengambil status dari lampu urutan pertama di dalam grup tersebut (index 0) untuk dijadikan acuan. Jika lampu pertama menyala, maka semua lampu di grup itu harus dimatikan serentak, begitu pula sebaliknya.

```for (let i = 0; i < kumpulanId.length; i++)``` : Sebuah perulangan (looping) yang akan berjalan sebanyak jumlah ID yang ada di dalam Array (misal: berjalan 2 kali untuk grup AB, dan 4 kali untuk tombol Master).

```let id = kumpulanId[i];``` : Pada setiap putaran, program mengambil satu ID spesifik dari Array.

Logika Serentak (If-Else): * Jika patokan awal tadi true (menyala), program mengubah src lampu yang sedang di-looping menjadi off.gif dan statusnya di-set false.

Jika patokan awal false (mati), program mengubah gambarnya menjadi on.gif dan statusnya di-set true. Hal ini terjadi berulang kali dengan sangat cepat hingga semua lampu di dalam Array berubah wujudnya secara bersamaan.
