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
import { isSameDay, isSameMonth } from 'date-fns';
import Badge from '../../common/badge/Badge';
import { Calendar, DollarSign } from 'lucide-react';
import useCurrency from '../../../hooks/useCurrency';

function Home(): JSX.Element {
    const { t } = useTranslation();
    const nextAppointment = useAppSelector(state => state.appointment.nextAppointment)
    const appointments = useAppSelector(state => state.appointment.appointments);
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

    const todayAppointments = appointments.filter(a =>
        isSameDay(new Date(a.startDate), new Date())
    );

    const monthAppointments = appointments.filter(a => 
        isSameMonth(new Date(a.startDate), new Date())
    )

    const todayRevenue = todayAppointments.reduce((sum, a) => sum + (a.price || 0), 0);
    const monthRevenue = monthAppointments.reduce((sum, a) => sum + (a.price || 0), 0);

    const formattedRevenueToday = useCurrency(todayRevenue)
    const formattedRevenueMonth = useCurrency(monthRevenue)

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

            <div className='statistics'>
                <h1>{t('statistics')}</h1>
                <Badge title="today_appointments" value={todayAppointments.length} icon={<Calendar size={20} />} />
                <Badge title="estimated_revenue_today" value={formattedRevenueToday} icon={<DollarSign size={20} />} />
                <Badge title="estimated_revenue_month" value={formattedRevenueMonth} icon={<DollarSign size={20} />} />
            </div>

            <ToastContainer />
        </div>
    )
}

export default Home;