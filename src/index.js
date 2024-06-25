const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware');
const route = require('./routes');
const db = require('./config/db');

//Connect to database
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//Custom middleware
app.use(SortMiddleware);

app.use(methodOverride('_method'));

//HTTP logger
//app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs', 
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                let sortType = 'default';
                
                if(field === sort.column) {
                    sortType = sort.type;
                } else {
                    sortType = 'default';
                }

                const icons = {
                    default: 'filter',
                    asc: 'arrow-up',
                    desc: 'arrow-down',
                }

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const icon = icons[sortType];
                const type = types[sortType];

                return '<a href="?_sort&column='+field+'&type='+type+'"><i data-feather="'+icon+'"></i></a>';
            }
        }
    }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Routes init
route(app);

app.listen(port, () => console.log('App listening on port '+port+''));