// Fetch Hello World
const buttonFetch = document.getElementById("button-fetch");

buttonFetch.addEventListener("click", getData);

async function getData() {
    const textarea = document.getElementById("text");

    fetch('http://localhost:3333/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK!');
            }

            throwMessage(true, 'Data received successfully!');

            return response.json();
        })
        .then(data => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            textarea.textContent += `${data['hello']} (${hours}:${minutes}:${seconds})` + '\n';
            console.log(data);
        })
        .catch(error => {
            throwMessage(false, error);
            console.error('Fetch error:', error);
        });
}

// Create Post
const buttonCreate = document.getElementById("button-create");

buttonCreate.addEventListener("click", sendData);

async function sendData() {
    const titleElement = document.getElementById("text-field-title"); const contentElement = document.getElementById("text-field-content");
    const title = titleElement.value; const content = contentElement.value;
    titleElement.value = ''; contentElement.value = '';

    const data = { title, content };

    title.value = "";
    content.value = "";

    fetch('http://localhost:3333/post/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK!');
        }

        throwMessage(true, 'Post created!');
    })
    .catch(error => {
        throwMessage(false, error);
        console.error('Fetch error:', error);
    });
}

// Get Posts
const buttonShow = document.getElementById("button-get");

buttonShow.addEventListener("click", getPosts);

async function getPosts() {
    const textareaPosts = document.getElementById("text-posts");

    fetch('http://localhost:3333/post/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch posts!');
            }

            throwMessage(true, 'Posts fetched successfully!');

            return response.json();
        })
        .then(data => {
            textareaPosts.value = '';

            data.data.forEach(post => {
                textareaPosts.value += `Title: ${post.title}\nContent: ${post.content}\n\n`;
            });
        })
        .catch(error => {
            throwMessage(false, error);
            console.error('Fetch error:', error);
        });
}

// Message Function
function throwMessage(succsess, message) {
    const wrongMessage = document.querySelector(".wrong");
    const succsessMessage = document.querySelector(".success");

    if (succsess) {
        succsessMessage.textContent = message;

        succsessMessage.style.display = "block";
        wrongMessage.style.display = "none";
    } else {
        wrongMessage.textContent = message;

        succsessMessage.style.display = "none";
        wrongMessage.style.display = "block";
    }
}