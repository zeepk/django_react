import axios from 'axios';
import { createMessage } from './messages';

import { GET_LEADS, DELETE_LEAD, ADD_LEAD, GET_ERRORS } from './types';

//had to add these lines to get DELETE_LEAD to not give a 403 error
//courtesy of https://stackoverflow.com/a/46195212
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
// GET LEADS
export const getLeads = () => dispatch => {
	axios
		.get('/api/leads/')
		.then(res => {
			dispatch({
				type: GET_LEADS,
				payload: res.data
			});
		})
		.catch(err => console.log(err));
};

// DELETE LEAD
export const deleteLead = id => dispatch => {
	axios
		.delete(`/api/leads/${id}/`)
		.then(res => {
			dispatch(createMessage({ deleteLead: 'Lead Deleted' }));
			dispatch({
				type: DELETE_LEAD,
				payload: id
			});
		})
		.catch(err => console.log(err));
};

// ADD LEAD
export const addLead = lead => dispatch => {
	axios
		.post('/api/leads/', lead)
		.then(res => {
			dispatch(createMessage({ addLead: 'Lead Added' }));

			dispatch({
				type: ADD_LEAD,
				payload: res.data
			});
		})
		.catch(err => {
			const errors = {
				msg: err.response.data,
				status: err.response.status
			};
			dispatch({
				type: GET_ERRORS,
				payload: errors
			});
		});
};
