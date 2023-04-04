/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import qs from 'query-string';
import API from '../API';

class ModelCar {
    async getModelName() {
        try {
            const data = await API.get('Model/GetModels');
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getModelEngine(params) {
        const param = qs.stringify(params);
        try {
            const data = await API.get(`Model/GetEngines?${param}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getModelComplect(params) {
        const {
            value: { modelName },
            engineName
        } = params;
        const param = qs.stringify({ modelName, engineName });
        try {
            const data = await API.get(`Model/GetComplecations?${param}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getPartsGroup(params) {
        const { modelComplect } = params;
        const param = qs.stringify({ ComplectationName: modelComplect });
        try {
            const data = await API.get(`Model/GetPartsGroups?${param}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getPartsSubGroup(params) {
        const {
            value: { modelName },
            value: { modelComplect },
            partsGroup
        } = params;
        const param = qs.stringify({
            ComplectationName: modelComplect,
            modelName,
            GroupName: partsGroup
        });

        try {
            const data = await API.get(`Model/GetPartsSubGroups?${param}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async getParts(params) {
        const {
            value: { modelName },
            value: { modelComplect },
            value: { partsGroup },
            partsSubGroup
        } = params;
        const param = qs.stringify({
            PartsSubGroupName: partsSubGroup,
            ComplectationName: modelComplect,
            modelName,
            GroupName: partsGroup
        });
        try {
            const data = await API.get(`Model/GetParts?${param}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}
export default ModelCar;
