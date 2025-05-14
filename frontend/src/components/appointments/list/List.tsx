import { useState, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { useTranslation } from 'react-i18next';
import Card from '../card/Card';
import './List.css';
import useService from '../../../hooks/useService';
import AppointmentService from '../../../services/appointment';
import { init } from '../../../redux/appointmentSlice';
import { ToastContainer, toast } from 'react-toastify';

function List(): JSX.Element {
    const { t } = useTranslation();
    const appointments = useAppSelector(state => state.appointment.appointments);
    const dispatch = useAppDispatch();
    const appointmentService = useService(AppointmentService);

    useEffect(() => {
        if(appointments.length === 0) {
            appointmentService.getAll()
                .then(data => dispatch(init(data)))
                .catch(error => {
                    toast.error(error.response?.data || error.message);
                })
        }
    }, [])
    
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [filterBy, setFilterBy] = useState('all');

    const filteredAppointments = useMemo(() => {
        let filtered = [...appointments];
        
        if (filterBy !== 'all') {
            const now = new Date();

            if (filterBy === 'upcoming') {
                filtered = filtered.filter(a => new Date(a.startDate) > now);
            } else if (filterBy === 'past') {
                filtered = filtered.filter(a => new Date(a.startDate) <= now);
            } else if(filterBy === 'finished-and-pay') {
                filtered = filtered.filter(a => a.finished && a.pay);
            } else if(filterBy === 'finished-not-pay') {
                filtered = filtered.filter(a => a.finished && !a.pay);
            } else if(filterBy === 'paid') {
                filtered = filtered.filter(a => a.paid);
            }
        }

        
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(a => 
                a.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (a.infos && a.infos.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        
        return filtered.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
            } else if (sortBy === 'name') {
                return a.clientName.localeCompare(b.clientName);
            }
            return 0;
        });
    }, [appointments, searchTerm, sortBy, filterBy]);

    return (
        <>
            <div className="List-controls">
                <div className="List-filter">
                    <label htmlFor="filter">{t('filter')}:</label>
                    <select 
                        id="filter"
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                    >
                        <option value="all">{t('all_appointments')}</option>
                        <option value="paid">{t('paid')}</option>
                        <option value="upcoming">{t('upcoming')}</option>
                        <option value="past">{t('past')}</option>
                        <option value="finished-not-pay">{t('finished_not_pay')}</option>
                        <option value="finished-and-pay">{t('finished_and_pay')}</option>
                    </select>
                </div>

                <div className="List-search">
                    <input
                        type="text"
                        placeholder={t('search_appointments')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="List-sort">
                    <label htmlFor="sort">{t('sort_by')}:</label>
                    <select 
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="date">{t('date')}</option>
                        <option value="name">{t('client_name')}</option>
                    </select>
                </div>
            </div>

            <div className="List">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map(a => <Card key={a.id} appointment={a} />)
                ) : (
                    <div className="List-empty">
                        <h2>{t('no_appointments_found')}</h2>
                        <p>
                            {searchTerm || filterBy !== 'all' 
                                ? t('no_matching_appointments') 
                                : t('no_appointments_yet')}
                        </p>
                    </div>
                )}
            </div>
            <ToastContainer />
        </>
    );
}

export default List;