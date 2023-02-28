import { Container } from "react-bootstrap";

import Main from "./Comps/Main";

function App() {
  return (
    <Container
      className="d-flex "
      style={{ minHeight: "100vh"}}
    >
      <div className="w-100" >
        <Main />
      </div>
    </Container>
  );
}

export default App;
