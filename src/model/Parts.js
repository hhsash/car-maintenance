/* eslint-disable no-unused-vars */
import { makeAutoObservable, observable, runInAction } from 'mobx';

class Parts {
    carCards = [];

    newCardList = [];

    search = '';

    miMaxValue = [];

    state = 'loading';

    constructor(Request) {
        this.services = new Request();
        makeAutoObservable(this, {
            carCards: observable,
            action: [
                this.getCards,
                this.sendCard,
                this.updateCard,
                this.deleteCard,
                this.slider
            ]
        });
    }

    get searchFilter() {
        if (this.search.length > 0) {
            return this.newCardList.filter((item) =>
                item.modelName.toLowerCase().includes(this.search)
            );
        }
        return this.newCardList;
    }

    sendCard({ mileage, modelComplect, modelName }, { parts }) {
        const card = {
            mileage,
            complecationName: modelComplect,
            modelName,
            parts
        };
        try {
            const { data } = this.services.sendCard(card);
            runInAction(() => {
                this.carCards = data;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    async updateCard({ id, userId }, changedMileage) {
        const card = {
            mileage: changedMileage,
            id,
            userId
        };
        try {
            const { data } = await this.services.updateCard(card);
            runInAction(() => {
                console.log(data);
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    async getCards() {
        try {
            this.state = 'loading';
            const { data } = await this.services.getCards();
            runInAction(() => {
                this.loading = true;
                this.carCards = data;
                this.newCardList = data;
                const range = this.carCards.reduce((acc, item) => {
                    acc[0] =
                        acc[0] === undefined || item.mileage < acc[0]
                            ? item.mileage
                            : acc[0];
                    acc[1] =
                        acc[1] === undefined || item.mileage > acc[1]
                            ? item.mileage
                            : acc[1];
                    return acc;
                }, []);
                this.minMaxValue = range;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    async searchCard(search) {
        try {
            const { data } = this.services.searchCard(search);
            runInAction(() => {
                this.search = data;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    async deleteCard({ id, userId }) {
        try {
            const { data } = this.services.deleteCard({ id, userId });
            runInAction(() => {
                this.newCardList = this.newCardList.filter(
                    (item) => item.id !== id
                );
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    changeCards = (func) => {
        this.newCardList = func;
    };
}
export default Parts;
