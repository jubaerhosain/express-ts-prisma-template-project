console.log("CV Screener");

// Suppose this API comes from server side
let data = [
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/4.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/6.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/8.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/9.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/10.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/11.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/12.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/13.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/14.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/15.jpg'
    },
    {
        name: 'Jubaer',
        age: 21,
        city: 'Dhaka',
        framework: 'Django',
        image: 'https://randomuser.me/api/portraits/men/16.jpg'
    }
];


// Iterator
function CVIterator(profiles) {
    let lastIndex = 0;
    return {
        next: function () {
            return lastIndex < profiles.length ?
                { vlaue: profiles[lastIndex++], done: false } :
                { value: profiles[0], done: false}
        }
    }
}

let candidates = CVIterator(data);
nextCv();

let btn = document.getElementById('btn');
// cannot giv nextCv(), bcz it will be called before click once
btn.addEventListener('click', nextCv);

function nextCv() {
    let image = document.getElementById('image');
    let profile = document.getElementById('profile');
    let currCanditate = candidates.next().vlaue;
    image.innerHTML = `<img src='${currCanditate.image}'></img>`;
    profile.innerHTML = `
    <ul class="list-group">
        <li class="list-group-item">Name: ${currCanditate.name}</li>
        <li class="list-group-item">Age: ${currCanditate.age}</li>
        <li class="list-group-item">City: ${currCanditate.city}</li>
        <li class="list-group-item">Framework: ${currCanditate.framework}</li>
    </ul>`;
}




