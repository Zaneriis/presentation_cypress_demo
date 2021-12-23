import logo from './logo_DOCAPOSTE_BD.png';
import { useState } from "react"
import './App.css';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as yup from "yup";

function App() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const validateUser = () => {
    return yup
      .object()
      .shape({
        username: yup.string().max(20).required(),
        email: yup.string().email().required(),
        age: yup.number().min(0).max(200).required(),
      })
      .isValidSync({
        "username": username,
        "email": email,
        "age": age
      });
  };

  return (
    <Container className='container' maxWidth="sm">
      <header>
        <img src={logo} alt="logo" />
      </header>
      <section>
        <form>
          <TextField id="input_username" label="Username" variant="standard" defaultValue={username} onChange={(e)=>{setUsername(e.target.value)}} />
          <TextField id="input_email" label="Email" variant="standard" defaultValue={email} onChange={(e)=>{setEmail(e.target.value)}} />
          <TextField id="input_age" label="Age" variant="standard" type="number" onChange={(e)=>{setAge(e.target.value)}} />
          <Button id="button_submit" disabled={!validateUser()} variant="contained">Envoyer</Button>
        </form>
      </section>
      <footer>
        <Accordion>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Connect to backend</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <img src="https://cataas.com/cat" alt="A random cat" />
          </AccordionDetails>
        </Accordion>
      </footer>
    </Container>
  );
}

export default App;
