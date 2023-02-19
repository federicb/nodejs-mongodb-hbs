const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
// versiones posteriores a node 14 no se puede utilizar localhost, en su lugar 0.0.0.0
mongoose.connect('mongodb://0.0.0.0/notes-db-app', {
    // useCreateIndex: true,
    // userNewUrlParser: true,
    // useFindAndModify: false
})
    .then(db => console.log('DB is connected!'))
    .catch(err => console.error(err));