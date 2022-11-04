// Creating a menu driven application using prompts that allow us to manage orders/dessert items within the order

class Dessert { // Dessert class that will accept the name of the dessert and a flavor
    constructor (name, flavor) {
        this.name = name;
        this.flavor = flavor;
    }
}

class Order { // Order class to take name for order and an array that contains the desserts ordered
    constructor (name) {
        this.name = name;
        this.desserts = [];
    }
}

class Menu { // class to drive the menu application and the user's choices
    constructor() {
        this.orders = [];
        this.selectedOrder = null;
    }

    start () { // method that starts the menu app
        let selection = this.showMainMenuOptions();

        while (selection != 0) { // selection is the option the user selects
            switch (selection) {
                case '1':
                    this.createOrder();
                    break;
                case '2':
                    this.viewOrder();
                    break;
                case '3':
                    this.deleteOrder();
                    break;
                case '4':
                    this.displayOrders();
                    break;
                default: 
                    selection = 0;
            }
            selection = this.showMainMenuOptions(); // lets the code keep looping
        }

        alert('Have a great day!'); // will appear once user exits out of menu
    }

    // Methods below to achieve our menu app class
    showMainMenuOptions() { // returns a prompt to the user to get their input
        return prompt(`
            0) exit
            1) create new order
            2) view order
            3) delete order
            4) display all orders
        `);
    }

    showOrderMenuOptions(orderInfo) {
        return prompt(`
            0) back
            1) add dessert
            2) delete dessert
            ----------------
            ${orderInfo} 
        `); // displays the order name and dessert items to the user
    }

    displayOrders() { // creates a blank string, iterates through each order, grab each order name and add a new line  - so each order name will show up on a diff line with an index number in front of it
        let orderString = '';
        for (let i = 0; i < this.orders.length; i++) {
            orderString += i + ') ' + this.orders[i].name + '\n';
        }
        alert(orderString); // shows the user all the orders
    }

    createOrder() { 
        let name = prompt('Please enter a name for this order:');
        this.orders.push(new Order(name)); // creating new instance of Order class and pushing it to order array
    }

    viewOrder() {
        let index = prompt('Enter the order number you wish to view');
        if (index > -1 && index < this.orders.length) { // displays the order name the user is adding or removing desserts to/from
            this.selectedOrder = this.orders[index];
            let description = 'Order Name: ' + this.selectedOrder.name + '\n';

            for (let i = 0; i < this.selectedOrder.desserts.length; i++) { // displays the desserts ordered to the user
                description += i + ') ' + this.selectedOrder.desserts[i].name + ' - ' + this.selectedOrder.desserts[i].flavor + '\n';
            }

            let selection = this.showOrderMenuOptions(description);
            switch (selection) {
                case '1': 
                    this.createDessert();
                    break;
                case '2':
                    this.deleteDessert();
            }
        }

    }

    deleteOrder(){
        let index = prompt('Enter the index of the order you wish to delete:');
        if (index > -1 && index < this.orders.length) {
            this.orders.splice(index, 1);
        }
    }

    createDessert() {
        let name = prompt ('Enter name of dessert you wish to order:');
        let flavor = prompt ('Enter the flavor you would like:');
        this.selectedOrder.desserts.push(new Dessert(name, flavor));
    }

    deleteDessert() {
        let index = prompt('Enter the dessert number you wish to delete:');
        if (index > -1 && index < this.selectedOrder.desserts.length) {
            this.selectedOrder.desserts.splice(index, 1);
        }
    }

}

let menu = new Menu(); // creating an instance of the Menu class
menu.start(); // starting the app