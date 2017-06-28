export class Car {
    id: string;
    Model: string;
    Mileage: number;
    Color: string;
    Price: number;
    Year: number;
    Description: string;
    imgUrl: string;

    constructor(id: string, Model: string, Mileage: number, Color: string, Price: number, Year: number, Description: string, imgUrl: string) {
        this.id = id;
        this.Model = Model;
        this.Mileage = Mileage;
        this.Color = Color;
        this.Price = Price;
        this.Year = Year;
        this.Description = Description;
        this.imgUrl = imgUrl;
    }

    static toModel(obj: Car): any {
        return {
            Model: obj.Model,
            Mileage: obj.Mileage,
            Color: obj.Color,
            Price: obj.Price,
            Year: obj.Year,
            Description: obj.Description,
            imgUrl: obj.imgUrl
        };
    }

    static fromModel(model: any): Car {
        let id = model.id || model._id;
        let Model = model.Model;
        let Mileage = model.Mileage;
        let Color = model.Color;
        let Price = model.Price;
        let Year = model.Year;
        let Description = model.Description;
        let imgUrl = model.imgUrl;
        return new Car(id, Model, Mileage, Color, Price, Year, Description, imgUrl);
    }
}