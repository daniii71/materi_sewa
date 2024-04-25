import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function UpdateRuang(props) {
    const history = useHistory(); // Gunakan useHistory hook untuk mendapatkan objek history
    const [ruang, setRuang] = useState({
        no_ruang: '',
        keterangan: '',
        tempat: '',
    });

    useEffect(() => {
        const getRuangById = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:8080/api/data_ruang/${props.match.params.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRuang({
                    ...response.data,
                    no_ruang: response.data.no_ruang
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getRuangById();
    }, [props.match.params.id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8080/api/data_ruang/${props.match.params.id}`, ruang, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            Swal.fire({
                icon: 'success',
                title: 'Update Successful',
                text: 'Data ruang berhasil diperbarui',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '/data-ruang';
            });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    // Fungsi untuk menangani penekanan tombol "Batal Upload"
    const handleCancel = () => {
        history.goBack(); // Kembali ke halaman sebelumnya
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Update Ruang</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="noRuang" className="form-label">No Ruang</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="noRuang"
                                        value={ruang.no_ruang}
                                        onChange={(e) => setRuang({ ...ruang, no_ruang: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="keterangan" className="form-label">Keterangan</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="keterangan"
                                        value={ruang.keterangan}
                                        onChange={(e) => setRuang({ ...ruang, keterangan: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tempat" className="form-label">Tempat</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tempat"
                                        value={ruang.tempat}
                                        onChange={(e) => setRuang({ ...ruang, tempat: e.target.value })}
                                    />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary btn-lg px-5"><i className="bi bi-upload"></i></button>
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

export default UpdateRuang;
