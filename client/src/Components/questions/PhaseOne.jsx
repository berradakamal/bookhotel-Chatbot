import React, { useState } from 'react'
import axios from "axios"
import { HiOutlineMail } from "react-icons/hi"
import isEmail from "validator/lib/isEmail"
function PhaseOne({ saveData }) {
    // PHASE ONE IS FOR GETTING USER DATA AND STORE THEM TO DATABASE
    const [userData, setUserData] = useState({
        firstName: null,
        lastName: null,
        email: '',
    })

    let emailValid = isEmail(userData.email)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }


    const formValid = !!userData.firstName && !!userData.lastName && emailValid

    return (
        <div className="text-gray-500 flex flex-col space-y-5">
            <div>
                <p>Votre Prénom</p>
                <input type="text" placeholder="Entrez votre prénom ici" name="firstName" onChange={handleChange} className="p-2 border text-gray-600 rounded-xl w-full mt-2" />
            </div>
            <div>
                <p>Nom de Famille</p>
                <input type="text" placeholder="Entrez votre nom de famille ici" name="lastName" onChange={handleChange} className="p-2 border text-gray-600 rounded-xl w-full mt-2" />
            </div>
            <div>
                <p>Email</p>
                <div className="flex items-center border  justify-between rounded-xl mt-2 w-full">
                    <input type="text" name="email" onChange={handleChange} className=" w-full p-2 rounded-xl text-gray-600 " />
                    <HiOutlineMail size={20} className={`w-14 text-center transform transition  dur ease-in-out ${emailValid ? "text-green-600" : "text-gray-700"}`} />
                </div>
            </div>
            <button onClick={formValid ? () => saveData({ data: userData, url: "add-customer" }) : null} className={`${formValid ? "bg-green-800 cursor-pointer hover:-translate-y-1" : " cursor-not-allowed bg-gray-500"} text-white p-2 border rounded-2xl  transform transition duration-300 ease-in-out mx-auto w-full `}>Démarrer réservation</button>
        </div>
    )
}

export default PhaseOne
