import Pagina from "../../../components/Pagina";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row, Table } from "react-bootstrap";

const index = () => {
  const { push, query } = useRouter();
  const [usuario, setUsuario] = useState([]);
  const [forum, setForum] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (query.id) {
      axios.get(`/api/usuarios/${query.id}`).then((res) => {
        setUsuario(res.data);
      });
    }
    getAll();
  }, [query.id]);

  function excluir() {
    setShow(true);
  }

  function getAll() {
    axios
      .get("/api/forum")
      .then((res) => {
        setForum(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Pagina titulo={usuario.nome}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja Exlcuir {usuario.nome}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tenha certeza disso, após essa ação o <strong>Usuario</strong> será
          exluido para sempre!
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#0D8CFF" }} onClick={handleClose}>
            Sair
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              axios.delete(`/api/usuarios/${usuario.id}`);
              push("/usuarios");
            }}
          >
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        <Col>
          <Card>
            <Card.Img src={usuario.foto} />
          </Card>
        </Col>
        <Col
          className="text-white rounded"
          style={{ border: "1px solid white", padding: 16 }}
        >
          <Row>
            <Col>
              <p>
                <strong>CPF:</strong> {usuario.cpf}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <strong>CEP:</strong> {usuario.cep}
              </p>
            </Col>
            <Col>
              <p>
                <strong>Email:</strong> {usuario.email}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <strong>Telefone:</strong> {usuario.telefone}
              </p>
            </Col>
            <Col>
              <p>
                <strong>Logradouro:</strong> {usuario.logradouro}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <strong>Bairro:</strong> {usuario.bairro}
              </p>
            </Col>
            <Col>
              <p>
                <strong>Número:</strong> {usuario.numero}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <strong>Cidade:</strong> {usuario.cidade}
              </p>
            </Col>
            <Col>
              <p>
                <strong>UF:</strong> {usuario.uf}
              </p>
            </Col>
          </Row>
          <div className="text-center">
            <Link
              className="btn"
              style={{ backgroundColor: "#0D8CFF" }}
              href={`${usuario.id}/form`}
            >
              Editar
            </Link>

            <Button onClick={excluir} className="btn btn-danger ms-2">
              Excluir
            </Button>
          </div>
        </Col>
      </Row>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Mensagem</th>
          </tr>
        </thead>
        <tbody>
          {forum.map((item) =>
            item.usuario == usuario.nome ? (
              <tr key={item.id}>
                <td>{item.usuario}</td>
                <td>{item.menssagem}</td>
                <td>
                  <Button onClick={() => excluir(item.id)}>Excluir</Button>
                </td>
              </tr>
            ) : (
              <></>
            )
          )}
        </tbody>
      </Table>
    </Pagina>
  );
};

export default index;
