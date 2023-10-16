'use client'
import React, {useState, useEffect} from 'react'



function Vector() {
  const [text, setText] = useState("")
  const [query, setQuery] = useState("")
  const questions = [
    'Give introduction AWS Certified Solutions Architect - Associate (SAA-C03) Exam Guide.',
    'What target candidate should have ?',
    'What are types of questions asked in exam ?',
    'Give details about exam results',
    'What are exam content domains and weightings ?',
    'Which are Technologies and concepts that might appear on the exam',
    'Which are In-scope AWS services and features?',
    'Which are Out-of-scope AWS services and features?',
   
  ];

  const [remainingQuestions, setRemainingQuestions] = useState([...questions]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [show, setShow] = useState(true);
  const showRandomQuestion = () => {
    if (remainingQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const selectedQuestion = remainingQuestions[randomIndex];
      setQuery(selectedQuestion);

      const updatedRemainingQuestions = remainingQuestions.filter((_, index) => index !== randomIndex);
      setRemainingQuestions(updatedRemainingQuestions);
    } else {
      alert('No more questions!');
    }
  };       
   
useEffect(() => {
  showRandomQuestion();
  setInterval(() => {
    showRandomQuestion();
  }, 2000);
  
}
,[])
    async function queryData() {  
      setShow(false);
      setCurrentQuestion(query);
      setText("Wait loading...");
      const response = await fetch('/docs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),  
      });

      const data = await response.json();  
      console.log(data.result);
      setText(data.result);
      setShow(true);
      
    }

    

    return (
        <div style={{width: "100%", backgroundColor: "teal", borderRadius: "3px", padding: "10px", height: "80vh"}}>
            <div style={{width: "100%", marginTop: "-2px"}}>
            <h3 style={{color: "yellow", float: "left", width: "90%"}}>
              Langchain - Vector Demo uing PineCone
           
           </h3>
            <img src="https://storybook7.blob.core.windows.net/images/sanketterdal.png" 
          alt="logo" style={{float: "left",width: "10%"}} />
            </div>
            
            <br></br><br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <div style={{padding: "5px"}}>
              <p style={{color: "white", fontSize: "14px"}}>Below some random questions shown:</p>
               <div>
                <textarea id="text" rows={10} cols={100} placeholder="Enter text here"
                 value = {query} style={{width: "97%", height: "100px",
                 backgroundColor: "black", color: "white",
                 fontSize: "16px", 
                 borderRadius: "4px", padding: "10px"}}
                 onChange={e => setQuery(e.target.value)}
                ></textarea>
               </div>
                
               <div>
                {
                  show && <div>
                    <button style={{width: "120px", cursor: "pointer", height: "30px"}} onClick={queryData}>Query PineCone</button>&nbsp;
                  </div>
                }
               
              </div>
              <div style={{paddingTop: "20px", fontFamily: "sans-serif", color: "white"}}>
                {currentQuestion && <div>
                    <p>Q: {currentQuestion}</p>
                </div>}

              </div>
              <div style={{paddingTop: "20px", fontFamily: "sans-serif", color: "white"}}>
                
              {
                  text && <div>
                      <p>Answer: {text}</p> 
                  </div>
              }
              </div>
                
            </div>
        </div>
    )
}

export default Vector