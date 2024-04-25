import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddPelanggan() {
  const [namePelanggan, setNamePelanggan] = useState("");
  const [noTlfon, setNoTlfon] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/data_pelanggan",
        {
          nama_pelanggan: namePelanggan,
          no_tlfon: noTlfon,
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
          text: 'Pelanggan berhasil ditambahkan!',
        }).then(() => {
          window.location.href = "/data-pelanggan"; // Baris yang menyebabkan error
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Menambah',
        text: 'Terjadi kesalahan saat menambahkan Pelanggan.',
      });
    }
  };
  

  return (
    <>
      <div className="container p-3">
        <div className="m-5">
          <h3 className="text-center">Tambah Pelanggan</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={namePelanggan}
                    onChange={(e) => setNamePelanggan(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example1">
                    Name Pelanggan
                  </label>
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={noTlfon}
                    onChange={(e) => setNoTlfon(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example2">
                    No Tlfon
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

export default AddPelanggan;
