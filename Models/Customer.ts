
export class Customer {
    //Initialising properties with default values
    id: string = "-1"
    email: string = "-1";
    name: string = "-1";
    surname: string = "-1";
    city: string = "-1";
    DoB: string = "-1";
    constructor(email?: string, name?: string, surname?: string, city?: string, DoB?: string) {
        //Since properties are initialised, they show up in the static "Object.keys()" method
        const fieldArray: string[] = Object.keys(this);
        for (let i = 0; i < arguments.length; i++)
        {
            //"arguments" variable only has the passed arguments, so we only iterate through the ones that are passed and set them
            let key: keyof (typeof this) = fieldArray[i] as keyof (typeof this);
            this[key] = arguments[i];
        }
    }
    
    addDataFromObject(data: Object, someshit: String = "s"): void {
        const fieldArray: string[] = Object.keys(this);
        const dataArray: string[] = Object.keys(data);
        //Using a similar algorithm we loop throught the fields and set them
        for (let i = 0; i < dataArray.length; i++)
        {
            let dataKey: keyof (typeof data) = dataArray[i] as keyof (typeof data);
            //Key("name")
            //Find corresponding key in Customer object
            let indexOfKey = fieldArray.indexOf(dataArray[i]);
            let fieldKey: keyof (typeof this) = fieldArray[indexOfKey] as keyof (typeof this);
            this[fieldKey] = <this[keyof this]>data[dataKey];
        }
    } 

    toObject(): object {
        return {
            name: this.name,
            surname: this.surname,
            DoB: this.DoB,
            city: this.city,
            email: this.email
        }
    }
}