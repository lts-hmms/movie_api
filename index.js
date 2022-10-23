const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
uuid = require('uuid')

app = express();
app.use(bodyParser.json());

const options ={
    extensions: ['htm','html']
}
let users =[
    {
        username: 'Bodo73',
        id: "1",
        email:  'bodo@gmx.de',
        favorites:[]
    },
    {
        username: 'Bird',
        id: "2",
        email:  'peep@gmx.de',
        favorites:[]
    }
];
let movies = [
    {
        title: 'Black Panther',
        director: 'Ryan Coogler',
        year: 2018,
        genre: ['Action', 'Adventure', 'Fantasy'],
        description: `After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king. When a powerful enemy suddenly reappears, T'Challa's mettle as king -- and as Black Panther -- gets tested when he's drawn into a conflict that puts the fate of Wakanda and the entire world at risk. Faced with treachery and danger, the young king must rally his allies and release the full power of Black Panther to defeat his foes and secure the safety of his people.`,
        imageUrl: 'https://resizing.flixster.com/KBlur3LaA-y1U1yt6_Y2uO25ozA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzMxOGI1YzBhLWMyMjEtNGUxMS1iM2Q0LWQ4OGMyYzQyZjQyYS53ZWJw',
    },
    {
        title: 'The Big Sick',
        director: 'Michael Showalter',
        year: 2017,
        genre: ['Comedy','Romance'],
        description: 'Kumail is a Pakistani comic, who meets an American graduate student named Emily at one of his stand-up shows. As their relationship blossoms, he soon becomes worried about what his traditional Muslim parents will think of her. When Emily suddenly comes down with an illness that leaves her in a coma, Kumail finds himself developing a bond with her deeply concerned mother and father.',
        imageUrl: 'https://resizing.flixster.com/hcSU__fyxWKySypL-9PjigD5Vc0=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2MzMjVhNWUxLWRmOGMtNGFiNS1hMTg2LTUxMTdmYjFkNjJkZi53ZWJw'
    },
    {
        title: 'Get Out',
        director: 'Jordan Peele',
        year: 2017,
        genre: ['Horror', 'Mystery', 'Thriller'],
        description: `Now that Chris and his girlfriend, Rose, have reached the meet-the-parents milestone of dating, she invites him for a weekend getaway with Missy and Dean. At first, Chris reads the family's overly accommodating behavior as nervous attempts to deal with their daughter's interracial relationship, but as the weekend progresses, a series of increasingly disturbing discoveries leads him to a truth that he never could have imagined.`,
        imageUrl: 'https://resizing.flixster.com/6bGQjhmuW9IZuzfpCKoO5FgdkYc=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzNiZGVhNTVmLWQzOGUtNGMwZC1hYmZjLTIxZWE5NThkMTdjNS53ZWJw'
    },
    {
        title: 'Soul',
        director: 'Pete Docter',
        year: 2020,
        genre: ['Animation','Comedy','Drama','Musical'],
        description: `Joe is a middle-school band teacher whose life hasn't quite gone the way he expected. His true passion is jazz -- and he's good. But when he travels to another realm to help someone find their passion, he soon discovers what it means to have soul.`,
        imageUrl: 'https://resizing.flixster.com/cjNsjE5VnWWbmyLDWZAXtrEUIMw=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2E3NTJkZGFlLTA4MTQtNDQ1Ny1hYWRhLTMxMjJlNzI2ZGQxZC5qcGc='
    },
    {
        title: 'The Diving Bell and the Butterfly',
        director: 'Julian Schnabel',
        year: 2007,
        genre: ['Drama','Biography'],
        description: 'Jean-Dominique Bauby (Mathieu Amalric), editor-in-chief of French fashion bible Elle magazine, has a devastating stroke at age 43. The damage to his brain stem results in locked-in syndrome, with which he is almost completely paralyzed and only able to communicate by blinking an eye. Bauby painstakingly dictates his memoir via the only means of expression left to him.',
        imageUrl: 'https://flxt.tmsimg.com/assets/p171617_p_v10_ae.jpg'
    },
    {
        title: 'Moonlight',
        director: 'Barry Jenkins',
        year: 2016,
        genre: ['Drama', 'Coming-of-age'],
        description: 'A look at three defining chapters in the life of Chiron, a young black man growing up in Miami. His epic journey to manhood is guided by the kindness, support and love of the community that helps raise him.',
        imageUrl: 'https://resizing.flixster.com/HE1uYAymQPCdYxRQ4SQHAOmKE60=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzQ1MTIzMDlhLWJiMWUtNGVhOS05MjFhLTkyMjVmNDkzNDA5Yi53ZWJw'
    },
    {
        title: 'Heartbeats',
        director: 'Xavier Dolan',
        year: 2011,
        genre: ['Romance','Comedy', 'Drama'],
        description: `Francis (Xavier Dolan) is a young gay man, Marie (Monia Chokri) is a young straight woman and the two of them are best friends -- until the day the gorgeous Nicolas (Niels Schneider) walks into a Montreal coffee shop. The two friends, instantly and equally infatuated, compete for Nicolas' indeterminate affections, a conflict that climaxes when the trio visit the vacation home of Nicolas' mother. The frothy comedy unfolds through narrative, fantasy sequences and confessional monologues.`,
        imageUrl: 'https://flxt.tmsimg.com/assets/p8153637_p_v10_ac.jpg'
    },
    {
        title: 'Paris Is Burning',
        director: 'Jennie Livingston',
        year: 1990,
        genre: ['Documentary'],
        description: 'This documentary focuses on drag queens living in New York City and their "house" culture, which provides a sense of community and support for the flamboyant and often socially shunned performers. Groups from each house compete in elaborate balls that take cues from the world of fashion. Also touching on issues of racism and poverty, the film features interviews with a number of renowned drag queens, including Willi Ninja, Pepper LaBeija and Dorian Corey.',
        imageUrl: 'https://flxt.tmsimg.com/assets/p54287_p_v10_ad.jpg'
    },
    {
        title: 'Disclosure',
        director: 'Sam Feder',
        year: 2020,
        genre: ['Documentary'],
        description: `An in-depth look at Hollywood's depiction of transgender people and the impact of those stories on transgender lives and American culture.`,
        imageUrl: 'https://flxt.tmsimg.com/assets/p18415918_p_v13_aa.jpg'
    },
    {
        title: 'Passing',
        director: 'Rebecca Hall',
        year: 2021,
        genre: ['Drama'],
        description: `In 1920s New York City, a Black woman finds her world upended when her life becomes intertwined with a former childhood friend who's passing as white.`,
        imageUrl: 'https://flxt.tmsimg.com/assets/p20588150_p_v10_aa.jpg'
    }
]

app.use(morgan('common'));

app.use(express.static('public',options));

// GET requests
app.get('/',(req,res)=>{
    res.send("<h1>This is just a default textual response. Nothing to worry about.</h1>")
})

// get all movies
app.get('/movies',(req,res)=>{
    res.json(movies)
})

// get specific movie
app.get('/movies/:title',(req,res)=>{
    res.json(movies.find((movie)=>{
        return movie.title ===req.params.title
    }))
})

// get genre description by name
app.get('/genres/:name',(req,res)=>{
    res.send('This is a description about the film genre ' + req.params.name)
})

// get director data by name
app.get('/directors/:name',(req,res)=>{
    res.send('This is the data about ' + req.params.name)
})

// get all users
app.get('/users',(req,res)=> {
    res.json(users)
})

// get user by id
app.get('/users/:id',(req,res)=>{
    res.json(users.find((user)=>{
        return req.params.id === user.id}));
    })

// add user 
app.post('/users',(req,res)=>{
    let newUser = req.body;

    if (!newUser.username){
        const message = 'Username is missing in request body';
        res.status(400).send(message);
    } else {  
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).send('User added');
}
})

// update username 
app.put('/users/:id/:username',(req,res)=>{
    let user = users.find((user)=>{
        return user.id === req.params.id
    });
    if (user) {
        user.username = req.params.username;
        res.status(201).send('Username changed to ' + user.username)
} else {
    res.status(404).send('User not found.')
}})

// deregister user
app.delete('/users/:username',(req,res)=>{
    res.send('Your user was deleted!')
})

// add movie to favorites
app.post('/users/:username/favorites',(req,res)=>{
    let user = users.find((user) => {
        return user.username === req.params.username})
        console.log(req.body)
    let newMovie = req.body;
    if (user.favorites.indexOf(newMovie) === -1){
        user.favorites.push(newMovie)
        res.status(201).send('Movie added to your Favslist')
    } else {
        res.send('Movie is already in your Favslist')
    }})

// remove movie from favorites
app.delete('/users/:username/favorites/:title',(req,res)=>{
    res.send('Movie removed from Favslist.')
})

// Error request
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oh oh, something went wrong!');
  });

// listen for requests
app.listen(8080, (req,res) => {
    console.log('My app is listening on port 8080!');
});