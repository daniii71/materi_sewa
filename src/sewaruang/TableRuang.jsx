import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Sidebar from '../controllers/Sidebar';

function Ruang() {
  const [ruang, setRuang] = useState([]);

  const getAllRuang = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`http://localhost:8080/api/data_ruang`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setRuang(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteRuang = async (id) => {
    const token = localStorage.getItem('token');

    await Swal.fire({
      title: 'Anda yakin?',
      text: 'Yakin ingin menghapus data Ruang ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/api/data_ruang/${id}`, {
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
            getAllRuang();
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
      }
    });
  };

  useEffect(() => {
    getAllRuang();
  }, []);

  const handleTambahRuang = () => {
    window.location.href = '/tambah-ruang';
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
                <h5 className="mb-0">Table Ruang</h5>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary btn-sm" onClick={handleTambahRuang}>
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table mb-0 table-sm">
                  <thead className="small text-uppercase bg-body text-muted">
                    <tr>
                      <th>No</th>
                      <th>No Ruang</th>
                      <th>Keterangan</th>
                      <th>Tempat</th>
                      <th className="text-end">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ruang.map((ruangData, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{ruangData.no_ruang}</td>
                        <td>{ruangData.keterangan}</td>
                        <td>{ruangData.tempat}</td>
                        <td>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={() => {
                                window.location.href = `/edit-ruang/${ruangData.id}`;
                              }}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteRuang(ruangData.id)}
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

export default Ruang;
