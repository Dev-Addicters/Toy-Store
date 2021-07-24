import React from 'react'
import EditItem from '../Components/EditItem'

export default function Edit({updateProduct}) {
    return (
        <div className="showGrid">
          <EditItem updateProduct={updateProduct}/>
        </div>
    )
}
