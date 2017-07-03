export class Car {
    id: string;
    Makes: string;
    Mileage: number;
    Color: string;
    Price: number;
    Year: number;
    Description: string;
    imgUrl: string;
    userID: string;
    constructor(id: string, Makes: string, Mileage: number, Color: string, Price: number, Year: number, Description: string, imgUrl: string, userID: string) {
        this.id = id;
        this.Makes = Makes;
        this.Mileage = Mileage;
        this.Color = Color;
        this.Price = Price;
        this.Year = Year;
        this.Description = Description;
        this.imgUrl = imgUrl;
        this.userID = userID;
    }

    static toModel(obj: Car): any {
        return {
            Makes: obj.Makes,
            Mileage: obj.Mileage,
            Color: obj.Color,
            Price: obj.Price,
            Year: obj.Year,
            Description: obj.Description,
            imgUrl: obj.imgUrl,
            userID: obj.userID
        };
    }

    static fromModel(model: any): Car {
        let id = model.id || model._id;
        let Makes = model.Makes;
        let Mileage = model.Mileage;
        let Color = model.Color;
        let Price = model.Price;
        let Year = model.Year;
        let Description = model.Description;
        let imgUrl = model.imgUrl;
        let userID = model.userID;
        return new Car(id, Makes, Mileage, Color, Price, Year, Description, imgUrl, userID);
    }
}