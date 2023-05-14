import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [selected, setSelected] = useState();

  const [question, setQuestion] = useState();

  let question_answer = {
    "One": "Less than 2 weeks",
    "Two": "2 to 8 weeks",
    "Three": "More than 8 weeks",
  } 

  axios.get('http://localhost:3000/questions').then(function(response) {
      setQuestion(response.data[0]['question']);
  }).catch(function(error) {
    alert(error);
  });

  useEffect(() => {}, [selected, question])

  const setAnswer = async () => {
    try {
      const body = { question_id: 1, option_id: 2 }

      const resp = await axios.post('http://localhost:3000/responses', body);

      alert(question_answer[selected], resp.data);

      setSelected('');
    }catch(error) {
      alert(error);
    } 
  }

  return (
    <div className="App">
      <h3>{question}</h3>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div className="Button" onClick={() => setSelected('One')}>
          <label>{question_answer.One}</label>
          <img className="Image" src='https://pixlok.com/wp-content/uploads/2021/03/Tick-PNG-Icon.jpg' style={{visibility: selected === 'One' ? 'visible' : 'hidden'}} />
        </div>
        <div className="Button" onClick={() => setSelected('Two')}>
          <label>{question_answer.Two}</label> 
          <img className="Image" src='https://pixlok.com/wp-content/uploads/2021/03/Tick-PNG-Icon.jpg' style={{visibility: selected === 'Two' ? 'visible' : 'hidden'}}></img>
        </div>
        <div className="Button" onClick={() => setSelected('Three')}>
          <label>{question_answer.Three}</label>
          <img className="Image" src='https://pixlok.com/wp-content/uploads/2021/03/Tick-PNG-Icon.jpg' style={{visibility: selected === 'Three' ? 'visible' : 'hidden'}}></img>
        </div>
      </div>
      <div className='Next' onClick={setAnswer}>
        <img className="NextImage" src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Eo_circle_yellow_arrow-down.svg/768px-Eo_circle_yellow_arrow-down.svg.png?20200417182514'></img>
      </div>
    </div>
  );
}

export default App;
