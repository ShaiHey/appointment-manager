import { useEffect } from 'react';
import './Home.css'
import useTitle from '../../../hooks/useTitle';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useService from '../../../hooks/useService';
import { ToastContainer, toast } from 'react-toastify';
import AppointmentService from '../../../services/appointment';
import { init } from '../../../redux/appointmentSlice';
import Card from '../card/Card';
import { useTranslation } from 'react-i18next';

function Home(): JSX.Element {
    const { t } = useTranslation();
    const nextAppointment = useAppSelector(state => state.appointment.nextAppointment)
    const dispatch = useAppDispatch()
    const appointmentService = useService(AppointmentService)

    useTitle(`Appointment Manager - ${t('home')}`)

    useEffect(() => {
        appointmentService.getAll()
            .then(data => dispatch(init(data)))
            .catch(error => {
                toast.error(error.response?.data || error.message);
            })
    }, [])

    return (
        <div className='Home'>
            <h1>{t('appointments')}</h1>
            <div>
                <h1>{t('next_appointment')}</h1>
                {nextAppointment && Object.keys(nextAppointment).length !== 0 ? 
                    <Card appointment={nextAppointment} key={nextAppointment?.id} />
                :
                    <h2>{t('no_next_appointment')}</h2>
                }
            </div>

            <ToastContainer />
        </div>
    )
}

export default Home;