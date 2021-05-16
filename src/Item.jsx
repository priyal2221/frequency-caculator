import React from "react";
const Item = ({word,freq}) => {
  return (
    <div className="item">
        <tr>
          <td>{word}</td>
          <td> {freq}</td>
        </tr>
    </div>
);
}
export default Item ;
