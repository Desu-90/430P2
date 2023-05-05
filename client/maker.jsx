const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleCard = (e) => {
    e.preventDefault();
    helper.hideError();

    const eWord = e.target.querySelector('#CardEng').value;
    const jWord = e.target.querySelector('#CardJpn').value;
    if(!eWord || !jWord) {
        helper.handleError('All fields are required');
        return false;
    }
    helper.sendPost(e.target.action, {eWord, jWord}, loadCardsFromServer);
};

const handlePasswordChange = (e) => {
    e.preventDefault();
    helper.hideError();
  
    const currentPassword = e.target.querySelector('#currentPassword').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
  
    if (!currentPassword || !pass || !pass2) {
      helper.handleError('All fields are required!');
      return false;
    }
  
    if (pass !== pass2) {
      helper.handleError('Passwords do not match!');
      return false;
    }
  
    helper.sendPut(e.target.action, { currentPassword, pass }, 'success');
  };

  const deleteCard = async (id) => {
    try {
      const response = await fetch(`/delete?id=${id}`, {
        method: 'DELETE',
      });
  
      if (response.status === 200) {
        // Card was deleted successfully
        console.log(`Card with ID ${id} was deleted successfully!`);
      } else {
        // Handle error
        console.log(`Failed to delete card with ID ${id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  

const CardForm = (props) => {
    return(
        <form id='cardForm'
            onSubmit={handleCard}
            name='cardForm'
            action='/maker'
            method='POST'
            className='cardForm'
        >
            <label htmlFor='eWord'>English Word: </label>
            <input id='CardEng' type='text' name='eWord' placeholder='English Word' />
            <label htmlFor='eWord'>Japanese Word: </label>
            <input id='CardJpn' type='text' name='jWord' placeholder='Japanese Word' />
            <input className='makeCardSubmit' type='submit' value='Make Card' />
        </form>
    )
}

const AccountWindow = (props) => {
    return (
      <form
        id="accountForm"
        name="accountForm"
        onSubmit={handlePasswordChange}
        action="/changepassword"
        method="PUT"
        className="mainForm"
      >
        <label htmlFor="currentPassword">Current Password: </label>
        <input id="currentPassword" type="password" name="currentPassword" placeholder="Current password" />
        <label htmlFor="pass">New Password: </label>
        <input id="pass" type="password" name="pass" placeholder="New password" />
        <label htmlFor="pass2">Confirm New Password: </label>
        <input id="pass2" type="password" name="pass2" placeholder="Confirm new password" />
        <input className="formSubmit" type="submit" value="Change Password" />
      </form>
    );
  };

const CardList = (props) => {
    if(props.cards.length === 0) {
        console.log('We work?')
        return (
            <div className='cardList'>
                <h3 className='emptyCard'>No Cards Yet!</h3>
            </div>
        );
    };
    
    const handleDeleteClick = async (id) => {
        try {
          await deleteCard(id);
          await loadCardsFromServer();
        } catch (err) {
          console.log(err);
        }
      };
    const cardNodes = props.cards.map(card => {
        
        return (
            <div className='card'>
                <h3 className='cardEng'> English: {card.eWord} </h3>
                <h3 className='cardJpn'> Japanese: {card.jWord} </h3>
                <button id='deleteB' onClick={() => handleDeleteClick(card._id)}>X</button>
                <button id='addB'>Add to Quiz</button>
            </div>
        );
    });

    return (
        <div className='cardList'>
            {cardNodes}
        </div>
    );
}

const loadCardsFromServer = async () => {
    const response = await fetch('/getCards');
    const data = await response.json();
    ReactDOM.render(
        <CardList cards={data.cards} />,
        document.getElementById('cards')
    );
}

const init = () => {
    const accountB = document.querySelector('#account');
    const makerB = document.querySelector('#maker');
    accountB.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<AccountWindow />,
              document.getElementById('content'));
          return false;
    })
    makerB.addEventListener('click', (e) => {
        ReactDOM.render(
            <CardForm />,
            document.getElementById('makeCard')
        );
    
        ReactDOM.render(
            <CardList cards={[]} />,
            document.getElementById('cards')
        );
    
        loadCardsFromServer();
    })
    ReactDOM.render(
        <CardForm />,
        document.getElementById('makeCard')
    );

    ReactDOM.render(
        <CardList cards={[]} />,
        document.getElementById('cards')
    );

    loadCardsFromServer();
}

window.onload = init;