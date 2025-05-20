import { useForm } from 'react-hook-form';
import './New.css';
import AppointmentDraft from '../../../models/appointment/AppointmentDraft';
import { useTranslation } from 'react-i18next';
import useService from '../../../hooks/useService';
import AppointmentService from '../../../services/appointment';
import { useAppDispatch } from '../../../redux/hooks';
import { add } from '../../../redux/appointmentSlice';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';

function New(): JSX.Element {

    const { t } = useTranslation();
    const { register, formState, handleSubmit, watch } = useForm<AppointmentDraft>();
    const appointmentService = useService(AppointmentService)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useTitle(`Appointment Manager - ${t('add_appointment')}`)

    function submit(draft: AppointmentDraft) {
        console.log(draft)
        appointmentService.create(draft)
            .then((data) => {
                dispatch(add(data))
                navigate('/')
            })
            .catch(console.error)
    }

    return (
        <div className='New'>
            <form onSubmit={handleSubmit(submit)}>
                <label htmlFor="clientName">{t('clientName')}</label>
                <input type="text" {...register('clientName', {
                    required: {
                        value: true,
                        message: t('clientName_required')
                    }
                })} />
                <span className='error'>{formState.errors.clientName?.message}</span>

                <label htmlFor="infos">{t('infos')}</label>
                <textarea {...register('infos', {
                    required: {
                        value: true,
                        message: t('infos_required')
                    }
                })} />
                <span className='error'>{formState.errors.infos?.message}</span>

                <label htmlFor="infos">{t('startDate')}</label>
                <input type="datetime-local" {...register('startDate', {
                    required: {
                        value: true,
                        message: t('startDate_required')
                    }
                })} />
                <span className='error'>{formState.errors.startDate?.message}</span>

                <label htmlFor="endDate">{t('endDate')}</label>
                <input type="datetime-local" {...register('endDate', {
                    required: {
                        value: true,
                        message: t('endDate_required')
                    }
                })} />
                <span className='error'>{formState.errors.endDate?.message}</span>

                <label htmlFor="paid">{t('paid')}</label>
                <input type="checkbox" {...register('paid')} />

                {watch('paid') && <>
                    <label htmlFor="price">{t('price')}</label>
                    <input type="number" {...register('price', {
                        required: {
                            value: true,
                            message: t('price_required')
                        }
                    })} />
                    <span className='error'>{formState.errors.price?.message}</span>
                </>
                }

                <button type="submit">{t('add_appointment')}</button>
            </form>
        </div>
    )
}

export default New;