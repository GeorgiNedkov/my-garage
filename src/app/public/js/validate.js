$().ready(function () {
    $("#signForm").validate({
        rules: {
            Makes: "required",
            Mileage: "required",
            location: "required",
            Price: "required",
            Year: "required",
            Description: "required",
            Telephone: "required",
        },
        messages: {
            Makes: "Please enter the Makes",
            Mileage: "Please enter the Mileage|",
            location: "Please enter the Mileage",            
            Price: "Please enter the price|",
            Year: "Please enter the year",
            Description: "Please enter the description",
            Telephone: "Please enter the telephone number",
        }
    })
})