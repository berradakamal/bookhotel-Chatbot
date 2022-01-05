import React from 'react'

function Question({ req, loading }) {

    return (
        <div className=" flex items-center space-x-2">
            <img src='/bot.png' alt="avatar" object-fit="contain" className="rounded-full w-12 shadow-xl h-12" />
            <p className={`text-gray-600 ${loading ? "animate-pulse" : "null"} `}>{req}</p>
        </div>
    )
}

export default Question
