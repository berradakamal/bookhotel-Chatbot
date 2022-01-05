import React, { useState } from 'react';
import axios from "axios";
import PhaseOne from "./questions/PhaseOne";
import PhaseTwo from "./questions/PhaseTwo";


function Booking() {
    // HERE WE HAVE THE QUESTION MANAGER AND HANDLING GENERAL STATE, THE OBJECTIF IS SIMPLE BRING A USER TO INTERACTIVELY BOOK A ROOM TO A HOTEL WE'LL GO THROUGH 3 PROCESSES, FIRST WE TAKE INFORMATIONS ABOUT THE USER, THEN WE INVITE HIM TO SPECIFY WHAT KIND OF ROOM DOEST HE WANT, AND WE SEE THE AVAILABILITIES REMAINING WE CONFIRM THE RESERVATION WITH AN EMAIL 

    const [phase1, setPhase1] = useState(true);
    const [phase2, setPhase2] = useState(false);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)



    const saveHandler = async ({ url, data }) => {
        setLoading(true)
        console.log(data)
        await axios.post('http://localhost:8080/api/' + url, data).then(response => {
            setLoading(false)
            if (response.data.success) {
                setUser(response.data.user)
                setPhase1(false);
                setPhase2(true)
                return true
            } else {
                return false
            }
        })
    }

    return (
        <div className="bg-white rounded-2xl mx-auto w-full overflow-y-scroll  sm:w-2/5 h-[500px] p-4 sm:p-8 ">
            {phase1 && <PhaseOne saveData={saveHandler} />}
            {phase2 && <PhaseTwo saveData={saveHandler} user={user} />}

        </div>
    )
}

export default Booking
