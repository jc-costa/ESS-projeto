import { app } from './handler';

var server = app.listen(3000, function () {
    console.log("App listening on port 3000!");
});

function closeServer() {
    server.close();
}

export { app, server, closeServer };