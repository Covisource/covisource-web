import React from 'react'

const Notification = (props) => {
    return (
        <div className="h-16 w-72 relative shadow-xl bg-purple-400 text-gray-50 p-2 text-center grid place-items-center rounded-lg">
            <i className="fal fa-times absolute top-2 right-3"></i>
            <span className="">{props.title}</span>
        </div>
    )
}

export default Notification
