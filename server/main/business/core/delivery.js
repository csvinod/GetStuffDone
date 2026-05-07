

class Delivery {

    static Status = Object.freeze({
                    NONE: "None",
                    SCHEDULED: "Scheduled",
                    PICKED_UP: "Picked Up",
                    DELIVERED: "Delivered",
                    UNABLE_TO_PICKUP: "Unable to Pick Up",
                    UNABLE_TO_DELIVER: "Unable to Deliver",
                });

    constructor(order, status, timeslot) {
        this.order = order;
        this.status = status;
        this.timeslot = timeslot;
    }

    constructor(order) {
        this.order = order;
        this.status = Delivery.Status.NONE;
        this.timeslot = null;
    }

    getStatus() {
        return this.status;
    }

    setSchedule(timeslot) {
        this.timeslot = timeslot;
        this.status = Delivery.Status.SCHEDULED;
    }

    setStatus(status, proofOfStatus) {
        this.status = status;
        if (status === Delivery.Status.PICKED_UP || status === Delivery.Status.DELIVERED) {
            this.proofOfStatus = proofOfStatus;
        }
    }

}

module.exports = Delivery;