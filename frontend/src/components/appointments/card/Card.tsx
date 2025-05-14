import './Card.css'
import Appointment from "../../../models/appointment/Appointment";
import useCurrency from '../../../hooks/useCurrency';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../redux/hooks';
import AppointmentService from '../../../services/appointment';
import useService from '../../../hooks/useService';
import { deleteApp, update } from '../../../redux/appointmentSlice';

interface PropsCard {
    appointment: Appointment
}

function Card({ appointment }: PropsCard): JSX.Element {
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const appointmentService = useService(AppointmentService);

    const startDateFormat = new Intl.DateTimeFormat(`${i18n.language}-${i18n.language}`, {
        dateStyle: "full",
        timeStyle: "medium"
    }).format(new Date(appointment.startDate));

    const formattedPrice = useCurrency(appointment.price!)

    function finished() {
        appointmentService.update(appointment.id, { finished: true })
            .then(appointmentUpdated => dispatch(update(appointmentUpdated)))
            .catch(console.error)
    }

    function pay() {
        appointmentService.update(appointment.id, { pay: true })
            .then(appointmentUpdated => dispatch(update(appointmentUpdated)))
            .catch(console.error)
    }

    function finishedAndPay() {
        appointmentService.update(appointment.id, { finished: true, pay: true })
            .then(appointmentUpdated => dispatch(update(appointmentUpdated)))
            .catch(console.error)
    }

    function deleteMe() {
        appointmentService.delete(appointment.id)
            .then(() => dispatch(deleteApp({ id: appointment.id })))
            .catch(console.error)
    }

    return (
        <div className="Card">
            <h4>{appointment.clientName}</h4>

            <div className="status-badges">
                {appointment.pay &&
                    <span className="status-badge paid">{t('pay')}</span>
                }
                {appointment.finished &&
                    <span className="status-badge finished">{t('finished')}</span>
                }
                {!appointment.pay && !appointment.finished &&
                    <span className="status-badge pending">{t('pending')}</span>
                }
            </div>

            <small>{startDateFormat}</small>
            <p>{appointment.infos}</p>
            {appointment.paid &&
                <div className='price'>{formattedPrice}</div>
            }
            <div className='actions'>
                {!appointment.finished && <button className='finished' onClick={finished}>{t('marked_finished')}</button>}
                {!appointment.pay && <button className='pay' onClick={pay}>{t('marked_pay')}</button>}
                {!appointment.finished && !appointment.pay && <button className='finished-pay' onClick={finishedAndPay}>{t('marked_finished_and_pay')}</button>}
                <button className='delete' onClick={deleteMe}>{t('delete_appointment')}</button>
            </div>
        </div>
    )
}

export default Card;