import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function UpdatePelanggan(props) {
    const [pelanggan, setPelanggan] = useState({
        nama_pelanggan: '',
        no_tlfon: '',
    });

    const history = useHistory();

    useEffect(() => {
        const getPelangganById = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/data_pelanggan/${props.match.params.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPelanggan(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getPelangganById();
    }, [props.match.params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/data_pelanggan/${props.match.params.id}`, pelanggan, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Update Successful',
                text: 'Data pelanggan berhasil diperbarui',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '/data-pelanggan';
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleCancel = () => {
        history.goBack(); // Kembali ke halaman sebelumnya
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Update Pelanggan</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="namaPelanggan" className="form-label">Nama Pelanggan</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="namaPelanggan"
                                        value={pelanggan.nama_pelanggan}
                                        onChange={(e) => setPelanggan({ ...pelanggan, nama_pelanggan: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="noTlfon" className="form-label">No Tlfon</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="noTlfon"
                                        value={pelanggan.no_tlfon}
                                        onChange={(e) => setPelanggan({ ...pelanggan, no_tlfon: e.target.value })}
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary btn-lg px-5"><i class="bi bi-upload"></i> </button>
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

export default UpdatePelanggan;
