export class Parse {
    static date(dateArray) {
        try {
            const [year, month, day, hour, minute, second, nanoseconds] = dateArray;
            const milliseconds = nanoseconds / 1000000;
            return new Date(year, month - 1, day, hour, minute, second, milliseconds);
        } catch (e) {
            return dateArray;
        }
    }

    static dateOfBirth(dateArray) {
        try {
            const [year, month, day] = dateArray;
            console.log(new Date(year, month - 1, day))
            return new Date(year, month - 1, day);
        } catch (e) {
            return dateArray;
        }
    }
}