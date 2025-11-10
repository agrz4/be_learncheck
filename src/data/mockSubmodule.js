const submoduleContent = {
    "35428": {
        topic: "Pengenalan React dan Komponen Dasar",
        objectives: "Memahami konsep dasar React, fungsi komponen, dan penggunaan props.",
        content: `
            React adalah library JavaScript untuk membangun antarmuka pengguna, dikembangkan oleh Facebook. Inti dari React adalah komponen. Ada dua jenis komponen utama: Component berbasis fungsi (Functional Component) dan Component berbasis kelas (Class Component).
            
            Functional Component lebih sederhana dan menggunakan 'Hooks' untuk mengelola state. Props adalah argumen yang diteruskan ke komponen dari komponen induk. Props bersifat read-only dan tidak boleh dimodifikasi oleh komponen penerima. Ini memastikan aliran data yang terprediksi.
            
            Contoh sederhana dari sebuah Functional Component adalah: 'function Welcome(props) { return <h1>Halo, {props.name}</h1>; }'.
        `
    }
};

module.exports = { submoduleContent };