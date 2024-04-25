import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function UpdateKamar(props) {
    const [kamar, setKamar] = useState({
        nama_pelanggan: '',
        jumlah_orang: '',
        jam_awal: '',
        jam_akhir: '',
        tanggal: '',
    });

    useEffect(() => {
        const getKamarById = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/data_boking/${props.match.params.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setKamar(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getKamarById();
    }, [props.match.params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/data_boking/${props.match.params.id}`, kamar, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Update Successful',
                text: 'Data Kamar berhasil diperbarui',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '/edit-kamar';
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleCancel = () => {
        // Mengarahkan pengguna ke halaman tertentu ketika pembatalan dilakukan
        window.location.href = '/cancel-url'; // Ganti dengan URL yang sesuai
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Update Kamar</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="namaPelanggan" className="form-label">Nama Pelanggan</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="namaPelanggan"
                                        value={kamar.nama_pelanggan}
                                        onChange={(e) => setKamar({ ...kamar, nama_pelanggan: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="jumlahOrang" className="form-label">Jumlah Orang</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="jumlahOrang"
                                        value={kamar.jumlah_orang}
                                        onChange={(e) => setKamar({ ...kamar, jumlah_orang: e.target.value })}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="jamAwal" className="form-label">Jam Awal</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="jamAwal"
                                            value={kamar.jam_awal}
                                            onChange={(e) => setKamar({ ...kamar, jam_awal: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="jamAkhir" className="form-label">Jam Akhir</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="jamAkhir"
                                            value={kamar.jam_akhir}
                                            onChange={(e) => setKamar({ ...kamar, jam_akhir: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tanggal" className="form-label">Tanggal</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tanggal"
                                        value={kamar.tanggal}
                                        onChange={(e) => setKamar({ ...kamar, tanggal: e.target.value })}
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary btn-lg px-5 mr-2"><i class="bi bi-upload"></i> </button>
                                    <button type="button" className="btn btn-danger btn-lg ms-2 px-5" onClick={handleCancel}><i class="bi bi-x"></i> </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateKamar;
