export class Car {
    id: string;
    Makes: string;
    Mileage: number;
    location: string;
    Price: number;
    Year: number;
    Description: string;
    imgUrl: string;
    Telephone: number;
    userID: string;
    userName: string;

    constructor(id: string, Makes: string, Mileage: number, location: string, Price: number, Year: number, Description: string, imgUrl: string, Telephone: number, userID: string, userName: string) {
        this.id = id;
        this.Makes = Makes;
        this.Mileage = Mileage;
        this.location = location;
        this.Price = Price;
        this.Year = Year;
        this.Description = Description;
        this.imgUrl = imgUrl;
        this.Telephone = Telephone;
        this.userID = userID;
        this.userName = userName;
    }

    static toModel(obj: Car): any {
        return {
            Makes: obj.Makes,
            Mileage: obj.Mileage,
            location: obj.location,
            Price: obj.Price,
            Year: obj.Year,
            Description: obj.Description,
            imgUrl: obj.imgUrl,
            Telephone: obj.Telephone,
            userID: obj.userID,
            userName: obj.userName
        };
    }

    static fromModel(model: any): Car {
        let id = model.id || model._id;
        let Makes = model.Makes;
        let Mileage = model.Mileage;
        let location = model.location;
        let Price = model.Price;
        let Year = model.Year;
        let Description = model.Description;
        let imgUrl = model.imgUrl;
        let Telephone = model.Telephone;
        let userID = model.userID;
        let userName = model.userName;
        return new Car(id, Makes, Mileage, location, Price, Year, Description, imgUrl, Telephone, userID, userName);
    }
}