/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import qs from 'query-string';
import API from '../API';

class PartService {
    sendCard(card) {
        API.post('AddModelCard', card, {
            Accept: '*/*',
            'content-Type': 'application/json'
        }).catch((error) => {
            throw new Error(error);
        });
    }

    async updateCard(params) {
        const param = qs.stringify(params);
        try {
            const data = await API.put(`UpdateCarCard/?${param}`);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCards() {
        try {
            const data = await API.get('GetCarCards');
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    searchCard(search) {
        try {
            const data = search;
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteCard(params) {
        const param = qs.stringify(params);
        try {
            const data = await API.delete(`DeleteCarCard/?${param}`);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default PartService;
