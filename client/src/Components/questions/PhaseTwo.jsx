import React, { useState } from 'react'
import Question from '../UI/question';
import ScrollToBottom from 'react-scroll-to-bottom';
import format from "date-fns/format"
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import axios from 'axios';

function PhaseTwo({ user }) {
    const choices = [
        { title: "Chambre Single", prix: 600, id: "cs", },
        { title: "Chambre Single Premium", prix: 750, id: "csp" },
        { title: "Chambre Double", prix: 800, id: "cd" },
        { title: "Chambre Double Premium", prix: 800, id: "cd" },
        { title: "Suite Royale", prix: 1200, id: "sr" }]

    const [room, setRoom] = useState(null);
    const [priceApproved, setPriceApproved] = useState(false)
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [approveAll, setApproveAll] = useState(false)

    const phaseDone = (choice) => {
        setLoading(true);
        setTimeout(() => {
            setRoom(choice)
            setLoading(false)
            ScrollToBottom()
        }, 2000)
    }
    const resetAll = () => {
        setRoom(null)
        setPriceApproved(false)
        setFromDate(null)
        setToDate(null)
    }
    const differenceDate = differenceInCalendarDays(new Date(toDate), new Date(fromDate));
    const priceToPay = differenceDate === 0 ? 1 : differenceDate * room?.prix

    const saveBooking = async () => {
        const bookingData = {
            room, fromDate, toDate, customer: user
        }
        setApproveAll(true)
        await axios.post('http://localhost:8080/api/save-booking', bookingData).then(r => {
            if (r.data.success) {
                console.log('Booking saved successfully')
            }
        })
    }
    return (
        <div className="text-gray-600 h-full">
            <div className="flex flex-col space-y-4">
                {room && <div className="flex flex-col space-y-4">
                    <p className="p-2 text-sm rounded-r-xl rounded-b-xl px-4 w-auto mr-auto  bg-gray-300 text-gray-800">Type de chambre ?</p>
                    <p className="p-2 text-sm rounded-l-xl rounded-t-xl ml-auto  bg-green-800 text-white">{room.title}</p>
                </div>}
                {room && priceApproved && <div className="flex flex-col space-y-4">
                    <p className="p-2 text-sm rounded-r-xl rounded-b-xl px-4 w-auto mr-auto  bg-gray-300 text-gray-800">Approuver le prix de {room.prix} dhs / nuitée ?</p>
                    <p className="p-2 text-sm rounded-l-xl rounded-t-xl ml-auto  bg-green-800 text-white">Oui, j'approuve</p>
                </div>}
                {room && fromDate && <div className="flex flex-col space-y-4">
                    <p className="p-2 text-sm rounded-r-xl rounded-b-xl px-4 w-auto mr-auto  bg-gray-300 text-gray-800">À partir de quand ?</p>
                    <p className="p-2 text-sm rounded-l-xl rounded-t-xl ml-auto  bg-green-800 text-white">À partir du {format(new Date(fromDate), "dd/MM/yyyy")}</p>
                </div>}
                {room && toDate && <div className="flex flex-col space-y-4">
                    <p className="p-2 text-sm rounded-r-xl rounded-b-xl px-4 w-auto mr-auto  bg-gray-300 text-gray-800">Jusqu'à quand souhaitez vous la réserver ?</p>
                    <p className="p-2 text-sm rounded-l-xl rounded-t-xl ml-auto  bg-green-800 text-white">Jusqu'au {format(new Date(toDate), "dd/MM/yyyy")}</p>
                </div>}
                {room && approveAll && < div className="flex flex-col space-y-4">
                    <p className="p-2 text-sm rounded-r-xl rounded-b-xl px-4 w-auto mr-auto  bg-gray-300 text-gray-800">Cela fais un total de {differenceDate === 0 ? "1" : differenceDate} jours, soit un total à payer de {priceToPay}, voulez vous confirmer ?</p>
                    <p className="p-2 text-sm rounded-l-xl rounded-t-xl ml-auto  bg-green-800 text-white">Oui, je confirme</p>
                    <p className="p-2 text-sm rounded-r-xl rounded-b-xl px-4 w-auto mr-auto  bg-gray-300 text-gray-800">Nous vous remercions pour votre commande</p>
                </div>}
            </div>
            {
                !room && !priceApproved && !loading && <div className="flex flex-col h-full justify-between">
                    <Question req="Quelle type de chambre souhaitez vous réserver ?" />
                    <div className="overflow-scroll h-20 relative  border-t flex items-center space-x-2">
                        {choices.map(choice => (<div key={choice.id} onClick={() => phaseDone(choice)} className="w-full ">
                            <p className="p-2 rounded-xl border whitespace-nowrap hover:-translate-y-1 ease-in-out transform transition duration-300">{choice.title}</p></div>))}
                    </div>
                </div>
            }
            {loading && <Question req="..." loading={true} />}
            {
                room && !priceApproved && !loading && <div className="flex mt-6 flex-col h-full justify-between">
                    <Question req={`Le prix à la nuitée coûte ${room.prix} dhs, souhaitez vous confirmer cette chambre ?`} />
                    <div className="overflow-scroll h-20 relative bottom-10 border-t flex items-center space-x-2">
                        <p onClick={() => setPriceApproved(true)} className="p-2 border rounded-xl ">Confirmer</p>
                        <p onClick={() => setRoom(null)} className="p-2 border rounded-xl ">Changer</p>
                    </div>
                </div>
            }
            {
                room && priceApproved && !fromDate && !loading && <div className="flex mt-6 flex-col h-full justify-between">
                    <Question req="À partir de quand souhaitez vous réserver votre chambre ?" />
                    <div className="overflow-scroll h-20 relative bottom-10 border-t flex items-center space-x-2">
                        <input type="date" className="w-full p-2 appearance-none rounded-xl" onChange={(e) => setFromDate(e.target.value)} />
                    </div>
                </div>
            }
            {
                room && priceApproved && fromDate && !toDate && !loading && <div className="flex mt-6 flex-col h-full justify-between">
                    <Question req="Jusqu'à quand souhaitez vous la réserver ? ?" />
                    <div className="overflow-scroll h-20 relative bottom-10 border-t flex items-center space-x-2">
                        <input type="date" className="w-full appearance-none p-2 rounded-xl" onChange={(e) => setToDate(e.target.value)} />
                    </div>
                </div>
            }
            {
                room && priceApproved && fromDate && toDate && !approveAll && !loading && <div className="flex mt-6 flex-col h-full justify-between">
                    <Question req={`Cela fais un total de ${differenceDate === 0 ? "1" : differenceDate} jours, soit un total à payer de ${priceToPay} dhs`} />
                    <div className="overflow-scroll h-20 relative bottom-10 border-t flex items-center space-x-2">
                        <p className="p-2 border" onClick={saveBooking}>Oui, je confirme</p>
                        <p className="p-2 border" onClick={resetAll} >Non, je souhaite changer ma réservation</p>
                    </div>
                </div>
            }
            {
                approveAll && <div className="flex mt-6 flex-col h-full justify-between">
                    <Question req={`Nous allons bientôt vous contacter pour procéder au règlement de votre commande 👌`} />

                </div>
            }
        </div >
    )
}

export default PhaseTwo

