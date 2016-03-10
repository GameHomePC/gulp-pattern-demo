
class User extends Test {
    constructor() {
        super();

        this.h = 100;
    }

    getScroll() {

    }

    getClick() {

    }
}

class Test {
    constructor() {
        super();

        this.name = 'Вася'
    }

    getName(name) {
        return name ? name : this.name;
    }
}

var n = window.n = 2;