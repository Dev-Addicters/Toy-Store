import React from 'react'
import NewItem from '../Components/NewItem'

export default function New({addNewCard }) {
    return (
        <div className="showGrid">
            <NewItem  addNewCard={addNewCard}/>
        </div>
    )
}
