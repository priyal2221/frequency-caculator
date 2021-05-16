import React, { useEffect, useRef, useState } from "react";
import Item from "./Item";

const App = () => {
  const [num, setNum] = useState('');
  const [data, setData] = useState('');
  const [empty, setEmpty] = useState(true);
  const [frequentArray, setFrequentArray] = useState([]);

  const inputRef = useRef();

  const freqMap = {};

  const wordFreq = (string) => {
    setData(string);
    var words = string.replace(/[.,-;]/g, '').split(/\s/);
    words.forEach(w => {
      if (!freqMap[w]) {
        freqMap[w] = 0;
      }
      freqMap[w] += 1;
    });
    delete freqMap[''];
    const newArray = Object.entries(freqMap);
    newArray.sort((a, b) => {
      return b[1] - a[1];
    });
    setFrequentArray(newArray);
  };
  
  const handleClick = () => {
    setNum(inputRef.current.value);
    setEmpty(false);
  };

  const displayData = frequentArray.slice(0, num).map(item => {
    
    return <Item key = {Math.random(1000000)} word={item[0]} freq={item[1]} />
  }); 

  useEffect(() => {
    
    fetch("https://raw.githubusercontent.com/invictustech/test/main/README.md")
      .then((response) => response.text())
      .then(result => wordFreq(result.toLowerCase()))
      .catch((error) => console.log(error));

  },[])

  return (
    <div className="app">
      <h1>Frequency Calculator</h1>
      <div className="search">
        <input
          name="num"
          placeholder="Enter the number"
          ref={inputRef}
        ></input>
        <button onClick={handleClick}>Search !</button>
      </div>
      
      {num===0 && <h2><center>Nothing to display , please enter the number between 1 to 144 !</center></h2>}
      {(empty) ?<h2><center>No Items Yet!</center></h2>:
      (num >144)?
        <div>
          <h1>oops !</h1>
          <h2><center>You exceeded the limit of words, please enter the number between 1 to 144 </center></h2></div>:
        <div>
          <table className="item">
          <th>
            <td>Word</td>
            <td>Frequency</td>
          </th>
          </table>
          {displayData}
          <br/><br/>
        </div>}
      </div>
  );
};

export default App;