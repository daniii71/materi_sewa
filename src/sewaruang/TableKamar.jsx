import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan,  } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Sidebar from '../controllers/Sidebar';

    function Kamar() {
        const [kamar, setKamar] = useState([]);
      
        const getAllKamar= async () => {
          const token = localStorage.getItem('token');
      
          try {
            const response = await axios.get(`http://localhost:8080/api/data_boking`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
      
            setKamar(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        const deleteKamar = async (id) => {
          const token = localStorage.getItem('token');
      
          await Swal.fire({
            title: 'Anda yakin?',
            text: 'Yakin ingin menghapus data kamr ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
          }).then((result) => {
            if (result.isConfirmed) {
              axios
                .delete(`http://localhost:8080/api/data_boking/${id}`, {
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
                  getAllKamar();
                })
                .catch((error) => {
                  console.error('Error deleting data:', error);
                });
            }
          });
        };
      
        useEffect(() => {
          getAllKamar();
        }, []);
      
        const handleTambahKamar = () => {
          window.location.href = '/tambah-kamar';
        };

    return (
        <div>
           <div className="container m-5">
    <div className="row">
        <div className="col-md-3 col-12">
          <Sidebar />
        </div>
        <div className="col-9 mb-3 mb-lg-5">
            <div className="overflow-hidden card table-nowrap table-card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Table Kamar</h5>
                    <div className="d-grid gap-2">
                <button className="btn btn-primary btn-sm" onClick={handleTambahKamar}>
                <i className="bi bi-plus-circle-dotted"></i>
                </button>
              </div>
                </div>
                <div className="table-responsive">
                    <table className="table mb-0">
                        <thead className="small text-uppercase bg-body text-muted">
                            <tr>
                                <th>No</th>
                                <th>Nama Pelanggan</th>
                                <th>Jumlah Orng</th>
                                <th>Jam Awal</th>
                                <th>Jam Akhir</th>
                                <th>Tanggal</th>
                               
                                <th className="text-end">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                        {kamar.map((kamarData, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{kamarData.nama_pelanggan}</td>
                        <td>{kamarData.jumlah_orang}</td>
                        <td>{kamarData.jam_awal}</td>
                        <td>{kamarData.jam_akhir}</td>
                        <td>{kamarData.tanggal}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            {/* Perubahan disini: menggunakan Link dari React Router */}
                            <button 
                              className="btn btn-primary me-2" 
                              onClick={() => {
                                window.location.href = `/edit-kamar/${kamarData.id}`;
                              }}
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>

                            <button className="btn btn-danger" onClick={() => deleteKamar(kamarData.id)}>
                              <FontAwesomeIcon icon={faTrashCan} />
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

export default Kamar;