window.onload = function () {
    callApi();

    $("#characters").change(function () {
        var element = $("option:selected", this);
        var id = element[0].index;
        var name = element[0].label;
        var image = element[0].dataset["image"];
        var status = element[0].dataset["status"];

        fillCard(id, name, image, status)
        element.remove();
    });
};

function createCard() {
    let title = $('#title').val();
    let content = $('#content').val();

    if (!(title == '') && !(content == '')) {
        $(".cards").append(`
            <div class="card">
                <div class="card-container">
                    <div>
                        <button onclick="removeCard(this)" style="float: right;">X</button>
                    </div>
                    <h4><b>`+ title + `</b></h4>
                    <p>`+ content + `</p>
                </div>
            </div>
        `);
    }
}

function removeCard(item) {
    const cardRow = item.closest(".card");
    cardRow.remove();
}


async function callApi() {
    const myRequest = new Request('https://rickandmortyapi.com/api/character', { method: 'GET' });

    fetch(myRequest)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on api server!');
            }
        })
        .then(response => {
            var sel = document.getElementById('characters');
            for (var i = 0; i < response.results.length; i++) {
                var opt = document.createElement('option');
                opt.innerHTML = response.results[i].name;
                opt.value = response.results[i].name;
                opt.setAttribute("data-image", response.results[i].image);
                opt.setAttribute("data-status", response.results[i].status);
                sel.appendChild(opt);
            }
        }).catch(error => {
            console.error(error);
        });
}

function fillCard(id, name, image, status) {
    $(".api-cards").append(`
    <div class="api-card">
        <div class="api-card-container">
            <div style="margin-bottom: 1rem">
            <img src="`+ image +`" alt="Avatar" style="width: 100%;">
            <h4><b>`+ name + `</b></h4>
            <p>`+ status + `</p>
        </div>
    </div>
`);
    // $(element).val() will give you what you are looking for
}