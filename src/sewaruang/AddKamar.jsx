import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddKamar() {
  const [namaPelanggan, setNamaPelanggan] = useState("");
  const [jumlahOrang, setJumlahOrang] = useState("");
  const [jamAwal, setJamAwal] = useState("");
  const [jamAkhir, setJamAkhir] = useState("");
  const [tanggal, setTanggal] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/data_boking",
        {
          nama_pelanggan: namaPelanggan,
          jumlah_orang: jumlahOrang,
          jam_awal: jamAwal,
          jam_akhir: jamAkhir,
        
          tanggal: tanggal,
         
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Ruang berhasil ditambahkan!',
        }).then(() => {
          window.location.href = "/data-kamar"; 
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengubah',
        text: 'Terjadi kesalahan saat menambahkan Ruang.',
      });
    }
  };
  
  return (
    <>
      <div className="container p-3">
        <div className="m-5">
          <h3 className="text-center">Tambah Kamar</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={namaPelanggan}
                    onChange={(e) => setNamaPelanggan(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example1">
                    Nama Pelanggan
                  </label>
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={jumlahOrang}
                    onChange={(e) => setJumlahOrang(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example2">
                    Jumlah Orang
                  </label>
                </div>
              </div>
            
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={jamAwal}
                    onChange={(e) => setJamAwal(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example2">
                    Jam Awal
                  </label>
                </div>
             
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={jamAkhir}
                    onChange={(e) => setJamAkhir(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example2">
                    Jam Akhir
                  </label>
                </div>
             
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example2">
                    Tanggal
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block text-center px-5"
            >
             <i className="bi bi-plus-square"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddKamar;
