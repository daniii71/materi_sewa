import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function AddRuang() {
  const [noRuang, setNoRuang] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tempat, setTempat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/data_ruang",
        {
          no_ruang: noRuang,
          kete_rangan: keterangan,
          tempat: tempat,
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
          window.location.href = "/data-ruang"; // Baris yang menyebabkan error
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
          <h3 className="text-center">Tambah Ruang</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={noRuang}
                    onChange={(e) => setNoRuang(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example1">
                    No Ruang
                  </label>
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <input
                    type="text"
                    className="form-control"
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example2">
                    Keterangan
                  </label>
                </div>
              </div>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                type="text"
                className="form-control"
                value={tempat}
                onChange={(e) => setTempat(e.target.value)}
              />
              <label className="form-label" htmlFor="form3Example3">
                Tempat
              </label>
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

export default AddRuang;
