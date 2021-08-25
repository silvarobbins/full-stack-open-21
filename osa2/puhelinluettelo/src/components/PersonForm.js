import React from 'react'


const PersonForm = ({newName, newNumber, addPerson, handleNameChange, handleNumberChange}) => {
    return(
        <div>
            <h2>Add a new</h2>
            <form onSubmit={addPerson}>
                <div>
                    Name: <input value={newName} onChange={handleNameChange}/>
                </div>
                    Number: <input value={newNumber} onChange={handleNumberChange}/>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
        )
    }

export default PersonForm