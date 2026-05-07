
// App Landing

exports.safeLanding = (req, res) => {
    console.log("Handling request for safeLanding");
    return res.status(200).send('<h1>GetStuffDone!</h1>');
}
