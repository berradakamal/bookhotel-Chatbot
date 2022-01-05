import React from 'react'

function Screen({ children }) {
    return (
        <div className="flex flex-col h-full justify-between">
            {children}
        </div>
    )
}

export default Screen
