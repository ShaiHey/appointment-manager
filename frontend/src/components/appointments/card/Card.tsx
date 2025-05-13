import './Card.css'
import Appointment from "../../../models/appointment/Appointment";

interface PropsCard {
    appointment: Appointment
}

function Card({ appointment }: PropsCard): JSX.Element {

    const startDateFormat = new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "full",
        timeStyle: "medium"
    }).format(new Date(appointment.startDate))

    return (
        <div className="Card">
            <h4>{appointment.clientName}</h4>
            <small>{startDateFormat}</small>
            <p>{appointment.infos}</p>
        </div>
    )
}

export default Card;