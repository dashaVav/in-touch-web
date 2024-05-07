export class Parse {
    static date(dateArray) {
        const [year, month, day, hour, minute, second, nanoseconds] = dateArray;
        const milliseconds = nanoseconds / 1000000;
        return new Date(Date.UTC(year, month - 1, day, hour, minute, second, milliseconds));
    }

    static dateOfBirth(dateArray) {
        const [year, month, day] = dateArray;
        return new Date(year, month - 1, day);
    }
}