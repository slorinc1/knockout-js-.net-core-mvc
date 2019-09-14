var formatPrice = function(price) {
    return price + " +";
};

var getCurrency = function(price) {
    var value = price + " Ft";

    return value;
};

var ProductViewModel = function(product) {
    var self = this;

    self.name = product.name;
    self.price = product.price;
    self.imageUrl = product.imageUrl;
    self.category = product.category;
    self.ingredients = product.ingredients;
    self.rating = product.rating;
    self.ratingCount = product.ratingCount;
    this.displayPrice = ko.computed(function() {
        return getCurrency(this.price);
    }, this);
};

var mapProductToProductViewModel = function(product) {
    return new ProductViewModel(product);
};

var CartLine = function(prod, q) {
    var self = this;
    self.product = ko.observable(prod);
    self.quantity = ko.observable(q);
    self.subtotal = ko.computed(function() {
        return self.product() ? self.product().price * parseInt("0" + self.quantity(), 10) : 0;
    });
};

var Cart = function() {
    var self = this;
    self.lines = ko.observableArray([]);
    self.grandTotal = ko.computed(function() {
        var total = 0;

        if (self.lines().length == 0) {
            return total;
        }

        $.each(self.lines(), function() {
            total += this.subtotal()
        });

        return total;
    });

    self.addLine = function(product) {
        var match = ko.utils.arrayFirst(self.lines(), function(item) {
            return item.product().name == product.name;
        });

        if (!match) {
            self.lines.push(new CartLine(product, 1))
        } else {
            match.quantity(match.quantity() + 1);
        }
    };

    self.removeLine = function(line) {
        self.lines.remove(line);
    };
};

var MenuViewModel = function(menu) {
    var self = this;
    self.products = ko.observableArray(ko.utils.arrayMap(menu.products, mapProductToProductViewModel));
    self.cart = ko.observable(new Cart());

    self.addToCart = function(product) {
        self.cart().addLine(product);
    };

    self.removeFromCart = function(line) {
        self.cart().removeLine(line);
    };

    self.save = function() {
        let jsonCart = JSON.stringify(ko.toJS(self.cart()), null, 2);
        localStorage.setItem('cart', jsonCart);
    };
};

var viewModel = null;
viewModel = new MenuViewModel({ products: [] });
ko.applyBindings(viewModel);

var createProductsViewModel = function(data) {
    var result = [];
    $.each(data.products, function() {
        var mapped = new ProductViewModel(this);
        result.push(mapped);
    });

    return result;
};

$(document).ready(function() {
    $.getJSON("https://localhost:5001/menu/getmenu", function(data) {
        var parsed = createProductsViewModel(data);
        viewModel.products(parsed);
    });

    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : null;

    if (cart != null) {
        let arr = [];
        $.each(cart.lines, function() {
            var mapped = new CartLine(this.product, this.quantity);
            arr.push(mapped);
        });

        viewModel.cart().lines(arr);
    }
});