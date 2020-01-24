import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleNomeChange = this.handleNomeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSetorChange = this.handleSetorChange.bind(this);
    this.handlerRamalChange = this.handlerRamalChange.bind(this);
    this.handlerMensagemChange = this.handlerMensagemChange.bind(this);
  }

  state = {
    nome : '',
    email : '',
    setorSelecionado : '',
    ramal : '',
    mensagem : '',
    setores : ['GABINETE', 'ASSESP', 'AGEP','AGIP', 'AJL',
    'ASCOM', 'ASCOR', 'UCI', 'OUV','SUAG', 'SUPOP',
    'SUAF', 'SUGRE','SUAO', 'SUGAT','SUAPS'],
  }

  handleNomeChange = e => {
    this.setState({nome : e.target.value})
  }

  handleEmailChange = e => {
    this.setState({email : e.target.value})
  }

  handleSetorChange = e => {
    this.setState({setorSelecionado : e.target.value})
  }

  handlerRamalChange = e => {
    this.setState({ramal : e.target.value})
  }

  handlerMensagemChange = e => {
    this.setState({mensagem : e.target.value})
  }

  handleSubmit = (e) => { 
    e.preventDefault();
    const nome = this.state.nome;
    const email = this.state.email;
    const setor = this.state.setorSelecionado;
    const ramal = this.state.ramal;
    const mensagem = this.state.mensagem;
    const templateId = 'template2233';
    if (nome !== '' && (email !== '' && email.indexOf('@') > 0 && email.indexOf('.') > 2) && setor !== '' && (ramal !== '' && ramal.length > 3) && mensagem !== '') {
      window.emailjs.send("postmark", templateId, {"from_name": nome,"mensage": mensagem,"nome":nome,"setor":setor,"ramal":ramal,"email":email}
      ).then(res => {
        this.setState({
          nome : '',
          email : '',
          setorSelecionado : '',
          ramal : '',
          mensagem : '',
        })
        alert('E-mail enviado com sucesso para o Fale-Conosco do Ponto Eletrônico da SODF. Obrigado!')
      })
    }else {
      alert('Por favor, preencha corretamente todos os campos.')
    }
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <div className="wrapper">
            <h3>Ponto eletrônico SODF - Fale Conosco!</h3>
            <form>
              <p><label>Nome:</label>&nbsp;&nbsp;<input type="text" placeholder="Seu nome" className="campo nome" name="nome" onChange={this.handleNomeChange} value={this.state.nome}></input></p>
              <p><label>E-mail:</label>&nbsp;&nbsp;<input type="email" placeholder="Seu e-mail" className="campo nome" name="email" onChange={this.handleEmailChange} value={this.state.email}></input></p>
              <p><label>Setor:</label>&nbsp;&nbsp;<select className="campo setor" onChange={this.handleSetorChange}>
                <option value="">Selec. um setor</option>
              {this.state.setores.map(setor =>(
                <option value={setor} key={setor} >
                  {setor}
                </option>
              ))}
               </select>&nbsp;&nbsp;
               Ramal:&nbsp;&nbsp;<input type="text" placeholder="XXXX" maxLength="4" className="campo ramal" name="ramal" onChange={this.handlerRamalChange} value={this.state.ramal}></input></p>
               <p>Mensagem:</p>
               <textarea className="campo area" placeholder="Deixe aqui sua dúvida, reclamação, solitação ou elogio." value={this.state.mensagem}
               onChange={this.handlerMensagemChange}></textarea><br/>
               <button type="submit" className="botao" onClick={this.handleSubmit}>Enviar</button>
            </form>
          </div>
        </header>
      </div>
    );
  }
}

export default App