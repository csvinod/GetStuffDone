This is a generic web application for Retail Services, possibly offering multiple services within the same application model.
Each service offering aims to connect outlets offering services for customers at home, including item pickup and delivery.   

The entity model is designed on some key assumptions:
1. While services are in-shop, the application prioritises the customer entering the order detals first
2. On successfully receiving an order, the application will notify service providers, who can accept an order for fulfilment.
3. Delivery will be on both legs, for picking up an item to be serviced, and for delivering the item to customer after service.

The entity model is kept as:
Customer -->
    Each customer has one or more Orders --> 
        Each order contains one or more Items to be serviced --> 
            Each service contains details of what needs to be done

The server exposes a REST API to the client -- the API definition may not be strictly following all conventions at the moment.

Web UI uses the Google Material UI toolkit for a standardized look and feel

A number of improvements are possible to the code quality. 
But the key focus was to demonstrate how a template approach can be taken for multiple services.
