import Form from "react-bootstrap/Form";

function Input() {
  return (
    <Form.Control
      className="m-3"
      required
      size="md"
      type="text"
      placeholder="Categoria"
    />
  );
}

export default Input;