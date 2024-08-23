console.log('This is News Website');

let accordionExample = document.getElementById('accordionExample');

// Instantiate XMLHttpsRequest = xhr
const xhr = new XMLHttpRequest();

// new api parameters
let source = 'bbc-news';
let apiKey = 'd428a6909434431e8a48a2d2ab880abe';

//AJAX get request
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);
// xhr.getResponseHeader('Content-type', 'application/json');

// what to do when response is ready
xhr.onload = function () {
    if (this.status == 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
        // console.log(json);
        let newsHtml = '';
        articles.forEach((element, index) => {
            // console.log(element);
            let news =
            `<div class="accordion-item">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                        ${element['title']}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        ${element['content']} <a href="${element['url']}" target="_blank">Read More</a>
                    </div>
                </div>
            </div>`;
            newsHtml += news;
        });
        accordionExample.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occurs");
    }
}

xhr.send();

