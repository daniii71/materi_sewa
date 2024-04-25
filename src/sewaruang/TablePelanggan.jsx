import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Sidebar from '../controllers/Sidebar';

function Pelanggan() {
  const [pelanggan, setPelanggan] = useState([]);

  const getAllPelanggan = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`http://localhost:8080/api/data_pelanggan`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPelanggan(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deletePelanggan= async (id) => {
    const token = localStorage.getItem('token');

    await Swal.fire({
      title: 'Anda yakin?',
      text: 'Yakin ingin menghapus data Pelanggan ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/data_pelanggan/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Berhasil Menghapus!!',
              showConfirmButton: false,
              timer: 1500
            });
            getAllPelanggan();
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
      }
    });
  };

  useEffect(() => {
    getAllPelanggan();
  }, []);

  const handleTambahPelanggan = () => {
    window.location.href = '/tambah-pelanggan';
  };

  return (
    <div>
      <div className="container m-5">
        <div className="row">
          <div className="col-md-3 col-12">
            <Sidebar />
          </div>
          <div className="col-9 mb-5 mb-lg-5">
            <div className="overflow-hidden card table-nowrap table-card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Table Pelanggan</h5>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-sm" onClick={handleTambahPelanggan}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table mb-0 table-sm">
                  <thead className="small text-uppercase bg-body text-muted">
                    <tr>
                      <th>No</th>
                      <th>Nama Pelanggan</th>
                      <th>No tlfon</th>
                      <th className="text-end">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pelanggan.map((pelangganData, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{pelangganData.nama_pelanggan}</td>
                        <td>{pelangganData.no_tlfon}</td>
                        <td>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={() => {
                                window.location.href = `/edit-pelanggan/${pelangganData.id}`;
                              }}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deletePelanggan(pelangganData.id)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pelanggan;
