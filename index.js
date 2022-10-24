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
        director: [{name: 'Ryan Coogler', year of birth:'1986', year of death:'', bio:'Ryan Kyle Coogler is an African-American filmmaker and producer who is from Oakland, California. He is known for directing the Black Panther film series, Creed, a Rocky spin-off and Fruitvale Station. He frequently casts Michael B. Jordan in his works.'}],
        year: 2018,
        genre: [{name: 'Action', 
        description: 'Movies in the action genre are fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots. They can feature superheroes, martial arts, or exciting stunts. These high-octane films are more about the execution of the plot rather than the plot itself. Action movies are thrilling to watch and leave audience members on the edge of their seats. Cop movies, disaster films, and some spy films fall under the action category.'}, 
        {name: 'Adventure', 
        description: 'The adventure genre is so similar to the action genre that the billing for adventure films is sometimes action/adventure movies. Films in the adventure genre usually contain the same basic genre elements as an action movie, with the setting as the critical difference. Adventure movies are typically set in an exotic, far away, or unfamiliar locale. This category can include swashbuckler films and survival films.' }, 
        {name: 'Fantasy', 
        description: 'Films in the fantasy genre feature magical and supernatural elements that do not exist in the real world. Although some films juxtapose a real-world setting with fantastical elements, many create entirely imaginary universes with their own laws, logic, and populations of imaginary races and creatures. Like science fiction films, fantasy films are speculative but unrelated to reality or scientific fact. High fantasy, fairy tales, and magical realism are all fantasy subgenres.'}],
        description: `After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king. When a powerful enemy suddenly reappears, T'Challa's mettle as king -- and as Black Panther -- gets tested when he's drawn into a conflict that puts the fate of Wakanda and the entire world at risk. Faced with treachery and danger, the young king must rally his allies and release the full power of Black Panther to defeat his foes and secure the safety of his people.`,
        imageUrl: 'https://resizing.flixster.com/KBlur3LaA-y1U1yt6_Y2uO25ozA=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzMxOGI1YzBhLWMyMjEtNGUxMS1iM2Q0LWQ4OGMyYzQyZjQyYS53ZWJw',
    },
    {
        title: 'The Big Sick',
        director: [{name:'Michael Showalter', year of birth:'1970',year of death:'', bio:'Michael Showalter is an American comedian, actor, writer, and director. He is one third of the sketch comedy \'trio Stella\'. Showalter first came to recognition as a cast member on MTV\'s \'The State\', which aired from 1993 to 1995. He co-wrote (with David Wain) and starred in Wet Hot American Summer (2001) and he wrote, directed, and starred in \’The Baxter\' (2005). Both of these movies featured many of his co-stars from \'The State\', and so do several of his other projects.'}],
        year: 2017,
        genre: [{name:'Comedy',
        description:'Comedy films are funny and entertaining. The films in this genre center around a comedic premise—usually putting someone in a challenging, amusing, or humorous situation they’re not prepared to handle. Good comedy movies are less about making constant jokes and more about presenting a universally relatable, real-life story with complex characters who learn an important lesson. Mockumentary, dark comedy (or black comedy), romantic comedy, parody/spoof, and slapstick comedy are all examples of comedy subgenres.'},
        {name: 'Romance', 
        description: 'Romance films are love stories. They center around two protagonists exploring some of the elements of love like relationships, sacrifice, marriage, obsession, or destruction. Romance movies sometimes feature hardships like illness, infidelity, tragedy, or other obstacles for the love interests to overcome. Romantic comedies, gothic romance, and romantic action are some popular romance subgenres.'}],
        description: 'Kumail is a Pakistani comic, who meets an American graduate student named Emily at one of his stand-up shows. As their relationship blossoms, he soon becomes worried about what his traditional Muslim parents will think of her. When Emily suddenly comes down with an illness that leaves her in a coma, Kumail finds himself developing a bond with her deeply concerned mother and father.',
        imageUrl: 'https://resizing.flixster.com/hcSU__fyxWKySypL-9PjigD5Vc0=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2MzMjVhNWUxLWRmOGMtNGFiNS1hMTg2LTUxMTdmYjFkNjJkZi53ZWJw'
    },
    {
        title: 'Get Out',
        director: [{name:'Jordan Peele', year of birth:'1979',year of death:'', bio:'Jordan Peele, born in New York City, is an American comedian, writer, director, and producer who was known for creating both comedy and horror films and TV shows that address popular culture and social issues, especially race relations.'}],
        year: 2017,
        genre: [{name:'Horror',
        description:'Horror films feature elements that leave people with an overwhelming sense of fear and dread. Horror movies often include serial killers or monsters as persistent, evil antagonists to play on viewers’ fears or nightmares. Audiences who love the horror genre seek out these movies specifically for the adrenaline rush produced by ghosts, gore, monsters, and jump scares. Films that fall into the horror sub-genres include macabre, ghost stories, gothic horror movies, science fiction horror movies, supernatural movies, dark fantasy movies, psychological horror movies, and slasher movies.'},
        {name: 'Mystery',
        description:'Mystery films are all about the puzzle and often feature a detective or amateur sleuth trying to solve it. Mystery films are full of suspense, and the protagonist searches for clues or evidence throughout the movie, piecing together events and interviewing suspects to solve the central question. Hardboiled noirs and police procedurals are two subcategories that often fall under the mystery genre.'},
        {name:'Thriller',
        description:'Thrillers expertly blend mystery, tension, and anticipation into one exciting story. Successful thrillers are well-paced, often introducing red herrings, divulging plot twists, and revealing information at the exact right moments to keep the audience intrigued. Thrillers often include a “ticking clock” aspect, where the stakes are against a finite amount of time. Crime films, political thrillers, and techno-thrillers are all featured in the thriller genre.'}],
        description: `Now that Chris and his girlfriend, Rose, have reached the meet-the-parents milestone of dating, she invites him for a weekend getaway with Missy and Dean. At first, Chris reads the family's overly accommodating behavior as nervous attempts to deal with their daughter's interracial relationship, but as the weekend progresses, a series of increasingly disturbing discoveries leads him to a truth that he never could have imagined.`,
        imageUrl: 'https://resizing.flixster.com/6bGQjhmuW9IZuzfpCKoO5FgdkYc=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzNiZGVhNTVmLWQzOGUtNGMwZC1hYmZjLTIxZWE5NThkMTdjNS53ZWJw'
    },
    {
        title: 'Soul',
        director: [{name:'Pete Docter', year of birth:'1968',year of death:'', bio:'Pete Docter is an American animator, screenwriter, producer, voice actor and an Oscar-winning director of \'Monsters, Inc.\', \'Up\', and \'Inside Out\' – also Chief Creative Officer at Pixar Animation Studios. Starting at Pixar in 1990 as the studio\'s third animator, he animated and directed several commercials.'}],
        year: 2020,
        genre: [{name:'Animation', description:'The adventure genre is so similar to the action genre that the billing for adventure films is sometimes action/adventure movies. Films in the adventure genre usually contain the same basic genre elements as an action movie, with the setting as the critical difference. Adventure movies are typically set in an exotic, far away, or unfamiliar locale. This category can include swashbuckler films and survival films.'},{name:'Comedy', 
        description:'Comedy films are funny and entertaining. The films in this genre center around a comedic premise—usually putting someone in a challenging, amusing, or humorous situation they’re not prepared to handle. Good comedy movies are less about making constant jokes and more about presenting a universally relatable, real-life story with complex characters who learn an important lesson. Mockumentary, dark comedy (or black comedy), romantic comedy, parody/spoof, and slapstick comedy are all examples of comedy subgenres.'},
        {name:'Drama', 
        description:'The drama genre features stories with high stakes and many conflicts. They’re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters. Films that fall into drama sub-genres include historical drama or costume drama, romantic drama, teen drama, medical drama, docudrama, film noir, and neo-noir.'},
        {name:'Musical', 
        description:'Musical films weave songs or musical numbers into the narrative to progress the story or further develop the characters. Musicals are often tied to romance films but are not limited to that genre. Musical movies involve big stage-like productions, integrating necessary premises or character elements into the sequences.'}],
        description: `Joe is a middle-school band teacher whose life hasn't quite gone the way he expected. His true passion is jazz -- and he's good. But when he travels to another realm to help someone find their passion, he soon discovers what it means to have soul.`,
        imageUrl: 'https://resizing.flixster.com/cjNsjE5VnWWbmyLDWZAXtrEUIMw=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2E3NTJkZGFlLTA4MTQtNDQ1Ny1hYWRhLTMxMjJlNzI2ZGQxZC5qcGc='
    },
    {
        title: 'The Diving Bell and the Butterfly',
        director: [{name:'Julian Schnabel', year of birth:'1951',year of death:'', bio:'A key figure in the Neo-expressionist movement, American artist and filmmaker Julian Schnabel – born in Brooklyn – is known for his biographical films, as well as his paintings made from plate fragments, velvet, wood, and wax.'}],
        year: 2007,
        genre: [{name:'Drama', 
        description:'The drama genre features stories with high stakes and many conflicts. They’re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters. Films that fall into drama sub-genres include historical drama or costume drama, romantic drama, teen drama, medical drama, docudrama, film noir, and neo-noir.'},
        {name:'Biography', 
        description:'A biopic (short for "biographical picture”) is a type of motion picture that tells the life story of a non-fictional, real person. Biopic films typically revolve around a historical figure or a famous person, though they can be about anyone—as long as the person actually exists or existed in real life.'}],
        description: 'Jean-Dominique Bauby (Mathieu Amalric), editor-in-chief of French fashion bible Elle magazine, has a devastating stroke at age 43. The damage to his brain stem results in locked-in syndrome, with which he is almost completely paralyzed and only able to communicate by blinking an eye. Bauby painstakingly dictates his memoir via the only means of expression left to him.',
        imageUrl: 'https://flxt.tmsimg.com/assets/p171617_p_v10_ae.jpg'
    },
    {
        title: 'Moonlight',
        director: [{name:'Barry Jenkins', year of birth:'1979',year of death:'', bio:'Barry Jenkins is an American director, writer, and producer who was known for creating lyrical, empathetic films that centre on Black characters. Jenkins grew up in the economically distressed Liberty City neighbourhood of Miami.'}],
        year: 2016,
        genre: [{name:'Drama', 
        description:'The drama genre features stories with high stakes and many conflicts. They’re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters. Films that fall into drama sub-genres include historical drama or costume drama, romantic drama, teen drama, medical drama, docudrama, film noir, and neo-noir.'}, 
        {name:'Coming-of-age', 
        description:'A coming-of-age movie is a film that follows a protagonist as they transition from childhood to adulthood. This genre of storytelling is popular for literature and movies in Hollywood and often features stories about critical junctures between childhood and adulthood, such as first romantic relationships, graduating from middle school or high school, and moving away from home.'}],
        description: 'A look at three defining chapters in the life of Chiron, a young black man growing up in Miami. His epic journey to manhood is guided by the kindness, support and love of the community that helps raise him.',
        imageUrl: 'https://resizing.flixster.com/HE1uYAymQPCdYxRQ4SQHAOmKE60=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzQ1MTIzMDlhLWJiMWUtNGVhOS05MjFhLTkyMjVmNDkzNDA5Yi53ZWJw'
    },
    {
        title: 'Heartbeats',
        director: [{name:'Xavier Dolan', year of birth:'1989',year of death:'', bio:'Xavier Dolan is a Canadian actor, director, screenwriter, editor, costume designer, and voice actor. He began his career as a child actor in commercials before directing several arthouse feature films. He first received international acclaim in 2009 for his feature film directorial debut, \'I Killed My Mother\', which premiered at the Cannes Film Festival in the Director\'s Fortnight section. Since 2009, he has written and directed eight feature films, most of them have premiered at Cannes. Dolan has won many awards for his work, including the Jury Prize at the 2014 Cannes Film Festival for \'Mommy\' and the Grand Prix at the 2016 Cannes Film Festival for \'It\'s Only the End of the World\'. He has also won several Canadian Screen Awards and César Awards.'}],
        year: 2011,
        genre: [{name: 'Romance', 
        description: 'Romance films are love stories. They center around two protagonists exploring some of the elements of love like relationships, sacrifice, marriage, obsession, or destruction. Romance movies sometimes feature hardships like illness, infidelity, tragedy, or other obstacles for the love interests to overcome. Romantic comedies, gothic romance, and romantic action are some popular romance subgenres.'},
        {name:'Comedy',
        description:'Comedy films are funny and entertaining. The films in this genre center around a comedic premise—usually putting someone in a challenging, amusing, or humorous situation they’re not prepared to handle. Good comedy movies are less about making constant jokes and more about presenting a universally relatable, real-life story with complex characters who learn an important lesson. Mockumentary, dark comedy (or black comedy), romantic comedy, parody/spoof, and slapstick comedy are all examples of comedy subgenres.'}, 'Drama'],
        description: `Francis (Xavier Dolan) is a young gay man, Marie (Monia Chokri) is a young straight woman and the two of them are best friends -- until the day the gorgeous Nicolas (Niels Schneider) walks into a Montreal coffee shop. The two friends, instantly and equally infatuated, compete for Nicolas' indeterminate affections, a conflict that climaxes when the trio visit the vacation home of Nicolas' mother. The frothy comedy unfolds through narrative, fantasy sequences and confessional monologues.`,
        imageUrl: 'https://flxt.tmsimg.com/assets/p8153637_p_v10_ac.jpg'
    },
    {
        title: 'Paris Is Burning',
        director: [{name:'Jennie Livingston', year of birth:'1962',year of death:'', bio:'Jennie Livingston is an American filmmaker living in New York, known for her lively storytelling, nuanced character portraits, and thoughtful explorations of identity, class, race, death, sex, and gender. She works in both fiction and nonfiction. Jennie\'s taught at Yale, Connecticut College, and Brooklyn College, lectured widely, written for national magazines, and appeared as a subject or speaker in a number of documentaries and cultural programs. '}],
        year: 1990,
        genre: [{name: 'Documentary', 
        description:'A documentary film or documentary is a non-fictional motion-picture intended to "document reality, primarily for the purposes of instruction, education or maintaining a historical record". The american film critic Bill Nichols has characterized the documentary in terms of "a filmmaking practice, a cinematic tradition, and mode of audience reception [that remains] a practice without clear boundaries".Documentaries are very informative, and are often used within schools as a resource to teach various principles. Documentary filmmakers have a responsibility to be truthful to their vision of the world without intentionally misrepresenting a topic.'}],
        description: 'This documentary focuses on drag queens living in New York City and their "house" culture, which provides a sense of community and support for the flamboyant and often socially shunned performers. Groups from each house compete in elaborate balls that take cues from the world of fashion. Also touching on issues of racism and poverty, the film features interviews with a number of renowned drag queens, including Willi Ninja, Pepper LaBeija and Dorian Corey.',
        imageUrl: 'https://flxt.tmsimg.com/assets/p54287_p_v10_ad.jpg'
    },
    {
        title: 'Disclosure',
        director: [{name:'Sam Feder', year of birth:'N/A',year of death:'', bio:'Sam Feder is a Peabody Award nominated film director. Cited by Indiewire as one of the "exciting trans filmmakers shaking up Hollywood", Sam\'s films explore the intersection of visibility and politics along the lines of race, class, and gender. Sam\'s filmmaking practice models inclusion and equity in the industry.'}],
        year: 2020,
        genre: [{name: 'Documentary', 
        description:'A documentary film or documentary is a non-fictional motion-picture intended to "document reality, primarily for the purposes of instruction, education or maintaining a historical record". The american film critic Bill Nichols has characterized the documentary in terms of "a filmmaking practice, a cinematic tradition, and mode of audience reception [that remains] a practice without clear boundaries".Documentaries are very informative, and are often used within schools as a resource to teach various principles. Documentary filmmakers have a responsibility to be truthful to their vision of the world without intentionally misrepresenting a topic.'}],
        description: `An in-depth look at Hollywood's depiction of transgender people and the impact of those stories on transgender lives and American culture.`,
        imageUrl: 'https://flxt.tmsimg.com/assets/p18415918_p_v13_aa.jpg'
    },
    {
        title: 'Passing',
        director: [{name:'Rebecca Hall', bio:'Rebecca Maria Hall is an English actress and filmmaker from London.She made her first onscreen appearance at age 10 in the 1992 television adaptation of The Camomile Lawn, directed by her father, Sir Peter Hall. In 2006, following her film debut in \'Starter for 10\', Hall got her breakthrough role in Christopher Nolan\'s thriller film \'The Prestige\'. In 2008, she starred as Vicky in Woody Allen\'s romantic comedy-drama \'Vicky Cristina Barcelona\', for which she received a Golden Globe nomination for Best Actress. Hall then appeared in a wide array of films.She made her directorial debut with Passing (2021), receiving critical acclaim.', year of birth:'1982',year of death:''}],
        year: 2021,
        genre: [{name:'Drama', description:'The drama genre features stories with high stakes and many conflicts. They’re plot-driven and demand that every character and scene move the story forward. Dramas follow a clearly defined narrative plot structure, portraying real-life scenarios or extreme situations with emotionally-driven characters. Films that fall into drama sub-genres include historical drama or costume drama, romantic drama, teen drama, medical drama, docudrama, film noir, and neo-noir.'}],
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