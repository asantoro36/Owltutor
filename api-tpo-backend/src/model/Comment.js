class Comment {
    constructor(id, serviceId, userId, message, date, status) {
        this.id = id;
        this.serviceId = serviceId;
        this.userId = userId;
        this.message = message;
        this.date = date;
        this.status = status;
    }
}

module.exports = Comment;