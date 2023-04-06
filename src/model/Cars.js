import { makeAutoObservable, observable, runInAction } from 'mobx';

class Cars {
    modelsList = [];

    modelEngines = [];

    modelComplects = [];

    partsGroups = [];

    partsSubGroups = [];

    parts = [];

    state = 'loading';

    constructor(ModelCar) {
        this.modelCar = new ModelCar();
        makeAutoObservable(this, {
            modelsList: observable,
            modelEngines: observable,
            partsGroups: observable,
            partsSubGroups: observable,
            parts: observable,
            action: [
                this.getModels,
                this.getModelComplect,
                this.getModelEngine,
                this.getParts,
                this.getPartsSubGroup,
                this.getPartsGroup
            ]
        });
    }

    async getModels() {
        try {
            const { data } = await this.modelCar.getModelName();
            runInAction(() => {
                this.modelsList = data;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    async getModelEngine(params) {
        try {
            const { data } = await this.modelCar.getModelEngine(params);
            runInAction(() => {
                this.modelEngines = data;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    async getModelComplect(params) {
        try {
            const { data } = await this.modelCar.getModelComplect(params);
            runInAction(() => {
                this.modelComplects = data;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    async getPartsGroup(params) {
        try {
            const { data } = await this.modelCar.getPartsGroup(params);
            runInAction(() => {
                this.partsGroups = data;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    async getPartsSubGroup(params) {
        try {
            const { data } = await this.modelCar.getPartsSubGroup(params);
            runInAction(() => {
                this.partsSubGroups = data;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    async getParts(params) {
        try {
            const { data } = await this.modelCar.getParts(params);
            runInAction(() => {
                this.parts = data;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }
}
export default Cars;
