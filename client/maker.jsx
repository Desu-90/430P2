const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleWord = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const color = e.target.querySelector('#domoColor').value;
    if(!name || !age || !color) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, age, color}, loadDomosFromServer);
};

const WordForm = (props) => {
    return(
        <form id='wordForm'
            onSubmit={handleWord}
            name='wordFOrm'
            action='/maker'
            method='POST'
            className='wordForm'
        >
            <label htmlFor='word'>English Word: </label>
            <input id='word' type='text' name='name' placeholder='English Word' />
            <label htmlFor='jword'>Japanese Word: </label>
            <input id='jword' type='text' name='japanese word' placeholder='Japanese Word' />

        </form>
    )
}

const WordList = (props) => {
    if(props.flash.length === 0) {
        return (
            <div className='flashList'>
                <h3 className='emptyFlash'>No Flashcards Yet!</h3>
            </div>
        );
    };

    const flashNodes = props.flash.map(flash => {
        return (
            <div key={flash._id} className='flash'>
                <h2>単語</h2>
                <h3 className='word'> English Word: {flash.word} </h3>
                <h3 className='jword'> Japanese Word: {flash.jword} </h3>
            </div>
        );
    });

    return (
        <div className='flashList'>
            {flashNodes}
        </div>
    );
}

const loadFlashcardsfromServer = async () => {
    const response = await fetch('/getFlash');
    const data = await response.json();
    ReactDOM.render(
        <WordList flash={data.flash} />,
        document.getElementById('flash')
    );
}

const init = () => {
    ReactDOM.render(
        <WordForm />,
        document.getElementById('makeFlash')
    );

    ReactDOM.render(
        <WordList flash={[]} />,
        document.getElementById('flash')
    );

    loadFlashcardsfromServer();
};

window.onload = init;