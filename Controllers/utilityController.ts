import basePrices from '../data/base_prices.json';
import discounts from '../data/discounts.json';
import {Customer} from '../Models/Customer';

interface Util extends Object {
    GetInsurance: (customer: Customer) => number;
    FindCityBasePrice: (city: string) => number;
    FindDiscount: (DoB: string) => number;
}

const util: Util = {
    GetInsurance: (customer: Customer): number => {
        const basePrice: number = util.FindCityBasePrice(customer.city);
        const discount: number = util.FindDiscount(customer.DoB);
        const finalPrice = basePrice * (1-discount*0.01);
        if (finalPrice < 0)
        {
            return -1;
        }
        return finalPrice;
    },
    FindCityBasePrice: (city: string): number => {
        const price: any = basePrices.find(entry => entry.city == city || entry.city == "other");
        if (price == undefined) 
        {
            return -1;
        }
        return price.amount;

    },
    FindDiscount: (DoB: string): number => {
        const DoBTime: string[] = DoB.split("-");
        const day: number = parseInt(DoBTime[2]);
        const month: number = parseInt(DoBTime[1]);
        const year: number = parseInt(DoBTime[0]);
        const currentTime = new Date();
        var age: number = currentTime.getFullYear() - year;
        if (currentTime.getMonth() < month || (currentTime.getMonth() == month && currentTime.getDate() < day)) {
            age--;
          }
        let discount: number = 0;
        discounts.map(entry => {
            const ageString = entry.age;
            const [min, max] = ageString.split("-").map(age => parseFloat(age));
            if (age >= min && age < max) {
                discount = entry.discount;
            }
        });
        return discount;
    }
}

export default util;