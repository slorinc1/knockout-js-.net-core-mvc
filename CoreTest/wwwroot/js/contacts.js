var PhoneType = function(name) {
    this.name = name;
};

var phoneTypes = ko.observableArray(ko.utils.arrayMap([
    new PhoneType("Home"),
    new PhoneType("Mobile"),
    new PhoneType("Work")
], function(type) {
    return type.name;
}));

var PhoneViewModel = function(phone) {
    let self = this;

    if (phone) {
        self.type = ko.observable(phone.type);
        self.number = ko.observable(phone.number);
    } else {
        self.type = ko.observable();
        self.number = ko.observable("");
    }

    self.type.subscribe(function() {
        self.number(undefined);
    });

    self.phoneTypes = phoneTypes;
};

var initialData = [];
var map2 = function(phone) {
    return new PhoneViewModel(phone);
};

var ContactViewModel = function(contact) {
    var self = this;

    if (contact != null) {
        self.firstName = ko.observable(contact.firstName);
        self.lastName = ko.observable(contact.lastName);
        self.phones = ko.observableArray(ko.utils.arrayMap(contact.phones, map2));
    } else {
        self.firstName = ko.observable("");
        self.lastName = ko.observable("");
        self.phones = ko.observableArray();
    }
};

var mapContactToContactViewModel = function(contact) {
    return {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phones: ko.observableArray(contact.phones)
    };
};

var ContactsModel = function(contacts) {
    var self = this;
    self.contacts = ko.observableArray(ko.utils.arrayMap(contacts, mapContactToContactViewModel));

    self.addContact = function() {
        self.contacts.push(new ContactViewModel(null));
    };

    self.removeContact = function(contact) {
        self.contacts.remove(contact);
    };

    self.addPhone = function(contact) {
        contact.phones.push(new PhoneViewModel(null));
    };

    self.removePhone = function(phone) {
        $.each(self.contacts(), function() {
            this.phones.remove(phone);
        });
    };

    self.save = function() {
        self.lastSavedJson(JSON.stringify(ko.toJS(self.contacts), null, 2));
    };

    self.lastSavedJson = ko.observable("")
};

var viewModel = null;
viewModel = new ContactsModel([{ phones: [] }]);
ko.applyBindings(viewModel);

var createViewModel = function(data) {
    var result = [];
    $.each(data, function() {
        var mapped = mapContactToContactViewModel(this);
        result.push(mapped);
    });

    return result;
};

$(document).ready(function() {
    $.getJSON("https://localhost:5001/contacts/getcontactlist", function(data) {
        var parsed = createViewModel(data);
        viewModel.contacts(parsed);
    });
});