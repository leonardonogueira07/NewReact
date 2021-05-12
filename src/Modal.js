import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './assets/css/App.css';
import CurrencyInput from 'react-currency-masked-input';

function Modal() {
    const [users, setUsers] = useState([]) //Listagem de usuarios
    const [showList, setShowList] = useState("block") //Mostra a lista
    const [showModal, setShowModal] = useState("none")  //Mostra Primeiro Modal
    const [showModal2, setShowModal2] = useState("none") //Carrega informações do modal2  
    const [userModal, setUserModal] = useState({}) //Carregando usuario no modal
    const [cardUser, setcardUser] = useState("") //Cartão
    const [inputValue, setInputValue] = useState("")
    const [validModal2, setvalidModal2] = useState()

    let cards = [
        // valid card
        {
          card_number: '1111111111111111',
          cvv: 789,
          expiry_date: '01/18',
        },
        // invalid card
        {
          card_number: '4111111111111234',
          cvv: 123,
          expiry_date: '01/20',
        },
      ];
    
    useEffect(() => {
        axios.get(`https://www.mocky.io/v2/5d531c4f2e0000620081ddce`)
        .then(res => {
        const users = res.data;
        setUsers( users );
      })
    },[])
    
    const iteracao = (obj) => {
        setShowModal("block")
        setUserModal(obj)  
        
    }
    const submeter = (evt) => {
        evt.preventDefault()
        setShowModal("none")
        setShowModal2("flex")
        let body = {
            // Card Info
            card_number: cards[cardUser].card_number,
            cvv: cards[cardUser].cvv,
            expiry_date: cards[cardUser].expiry_date,

            // Destination User ID
            destination_user_id: userModal.id,

            // Value of the Transaction
            value: inputValue
        };console.log(body)

        body = JSON.stringify( body );
        // send payment post
        fetch('https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989', {
            method: 'POST',
            body: body
        })
        .then(response => response.json())
        .then((paymentReceiptResponse) => {
            // send received json to parent component
            console.log(paymentReceiptResponse)
            console.log(cardUser)
            if(cards[cardUser] == "1111111111111111") {
                setShowModal2("block")
                setvalidModal2(false)
            } else {
                setShowModal2("block")
                setvalidModal2(paymentReceiptResponse.success)
            }
        })
    }
    
    

   
    return <>  
        { users.map(user => 
            <div style={{display:showList}}>
                <div className="container">
                <img src={user.img} alt="Perfil"/>
                <div className="data" >
                    <p>{user.name}</p>
                    <p>ID: {user.id} - Nome de Usuário: {user.username}</p>
                </div>
                <div className="container-btn">
                  <button className="btn" onClick={() => { iteracao( user ) }} >Pagar</button>
                </div>
            </div>   
            </div>
        )}
        
        <div className="overlay" style={{display:showModal}}>
            <div className="container-payment">
                <div className="items-payment">
                    <h1 className="title-payment">Forma de Pagamento</h1>
                    <div className="sub-title-payment">
                        <div className="sub-title-payment1">
                            Pagamento Para:
                        </div>
                        <div className="sub-title-playment2">
                            {userModal.name}
                        </div>
                    </div>
                    <form className="form-payment" onSubmit={submeter }>
                        <CurrencyInput name="myInput" className="input-form-payment" type="number" pattern="\d*" placeholder="R$0,00" required value={inputValue} onChange={e => setInputValue(e.target.value)}/>
                        <select className="select-form-payment" required value={cardUser} onChange={e => setcardUser(e.target.value)}>
                            <option value="" required></option>
                            
                            {cards.map((cards, i) => {
                                
                                return (
                                    <option value = {i} key = {'cartao' + i}>
                                        Cartão com final  {cards.card_number.substr(-4)}
                                    </option>
                                )
                            })}

                        </select>
                        <div className="buttons">
                            <button className="button-form-payment btnx">
                                Pagar
                            </button>
                            <button onClick={() => setShowModal("none")} className="buttons btnx">
                                Voltar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="overlay" style={{display:showModal2}}>
            <div className="container-payment">
                <div className="items-payment">
                    <div className="sub-title-payment">
                        <div className="sub-title-payment1">
                            <h3>Recebido de Pagamento</h3>
                        </div>
                    </div><br></br>
                    <h4 className="title-payment">O pagamento{(cardUser == true ? " " : " NÃO"   )} foi concluido com sucesso!</h4>
                    <div className="buttons">
                        <button onClick={() => setShowModal2("none")} className="buttons btnx">
                                Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>

}

export default Modal;