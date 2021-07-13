import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardMotorcycle from './CardMotorcycle';
import { Container, Form, Modal, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ListMotorcycles = () => {

    const URL = "http://localhost:3004/motorcycles"
    
    const getData = async () => {
        const response = axios.get(URL);
        return response;
    }

    const [list, setList] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({})

    const handleCloseModal = () => {setShowModal(false)}
    const handleOpenModal = () => {setShowModal(true)}

    const handleChangeModal = ({target}) => {
        setDataModal({
            ...dataModal,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put(`${URL}/${dataModal.id}`, dataModal)
        if (response.status === 200) {
            Swal.fire(
                'Guardado!',
                `El registro ${response.data.reference} ha sido actualizado exitosamente!`,
                'success'
            )
            handleCloseModal();
            setUpdateList(!updateList)
        }else {
            Swal.fire(
                'Error!',
                'Hubo un problema al actualizar el registro!',
                'error'
            )
        }
    }

    useEffect(() => {
        //UseEffect' Body
        getData().then((response) => {
            setList(response.data);
        })
    }, [updateList])


    return (
        <Container className="mb-5">
            <Row>
            {
                list.map((motorcycle, index) => (
                    <CardMotorcycle 
                        key={index}
                        motorcycle={motorcycle}
                        setUpdateList={setUpdateList}
                        updateList={updateList}
                        handleCloseModal= {handleCloseModal}
                        handleOpenModal = {handleOpenModal}
                        setDataModal= {setDataModal}
                    />
                ))
            }
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header>
                    <Modal.Title>Actualizar Datos</Modal.Title>
                </Modal.Header>
                <Form
                    onSubmit = {handleSubmit}
                >
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Referencia</Form.Label>
                            <Form.Control 
                                type="text"
                                name="reference"
                                placeholder="Referencia"
                                value={dataModal.reference}
                                onChange={handleChangeModal}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text"
                                name="model"
                                placeholder="Modelo"
                                value={dataModal.model}
                                onChange={handleChangeModal}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="number"
                                name="price"
                                placeholder="Precio"
                                value={dataModal.price}
                                onChange={handleChangeModal}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control 
                                type="text"
                                name="image"
                                placeholder="URL de la imagen"
                                value={dataModal.image}
                                onChange={handleChangeModal}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <select 
                                className="form-control"
                                name="trademark"
                                onChange={handleChangeModal}
                                required
                            >
                                <option value={dataModal.tradamark}>{dataModal.trademark}</option>
                                <option value="YAMAHA">YAMAHA</option>
                                <option value="SUZUKI">SUZUKI</option>
                                <option value="HONDA">HONDA</option>
                            </select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" type="reset" onClick={handleCloseModal}>
                            Cancelar
                        </button>
                        <button className="btn btn-success" type="submit">
                            Guardar
                        </button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </Container>
    )
}

export default ListMotorcycles
