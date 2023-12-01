class Contact {
    constructor(id, serviceId, name, phone, email, status, time, message) {
        this.id = id;
        this.serviceId = serviceId;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.time = time;
        this.message = message;
        this.status = status;
    }
}

module.exports = Contact;