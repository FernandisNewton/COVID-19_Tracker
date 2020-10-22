import React from 'react'
import numeral from "numeral"
function Table({states}) {
    return (
        <div className="table">
          {
               
              states == null? <tr>
              <td><strong>Please select a State to view District data</strong></td>
            <td><strong></strong></td>
          </tr> :
              states.map(state=> (
            <tr>
                <td>{state.name}</td>
              <td><strong>{ numeral(state.confirmed).format("0,0")}</strong></td>
            </tr>
              ))
          }
           
        </div>
    )
}

export default Table
