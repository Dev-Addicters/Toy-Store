import React from 'react'
import NewItems from '../Components/NewItems'

export default function New({addNewCard }) {
    return (
        <div>
            <NewItems  addNewCard={addNewCard}/>
        </div>
    )
}
