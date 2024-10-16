const repos = document.querySelector('.row')
fetch('https://api.github.com/users/JoseLSousa/repos')
    .then(async res => {
        if (!res.ok) {
            throw new Error(res.status);
        }
        let data = await res.json();
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        data.map(item => {
            let project = document.createElement('div');
            var Linguagem = item.language;
            var description = item.description;
            var CorLinguagem;
            var iconLinguage;
            var dataUTC = new Date(Date.parse(item.created_at));
            var datalocal = dataUTC.toLocaleString();

            if (!description) {
                description = "Sem descrição. Acesse o repositório para saber mais!";
            }

            if (Linguagem == "C#") {
                CorLinguagem = "green";
                iconLinguage = "bi bi-filetype-cs fs-4";
            } else if (Linguagem == "HTML") {
                CorLinguagem = "orange";
                iconLinguage = "bi bi-filetype-html fs-4";
            } else if (Linguagem == "TSQL") {
                CorLinguagem = "orange";
                iconLinguage = "bi bi-filetype-sql fs-4";
            } else if(Linguagem == "JavaScript"){
                CorLinguagem = "Yellow";
                iconLinguage = "bi bi-filetype-js fs-4";

            }else if(Linguagem == "Java"){
                CorLinguagem = "#42a4f5"
                iconLinguage = "bi bi-filetype-java fs-4"
            }
            else {
                item.language = "Outro";
                CorLinguagem = "yellow";
                iconLinguage = "bi bi-file-earmark-x fs-4";
            }

            project.innerHTML = `
                        <div class="col-12" data-bs-theme="dark">
                 <div class="card mb-2">
                <div class="card-header d-inline-flex justify-content-between">
                    <div>
                        <h5 class="card-title">${item.name}</h5>
                        <h6 class="card-subtitle">${datalocal}</h6c>
                    </div>
                      <div class="d-flex align-items-center">
                      <i class="${iconLinguage}" style="color:${CorLinguagem}; "></i>
                      <h5 class="card-title text-end ms-1 align-self-end fs-5">${item.language}</h5>
                </div>
                </div>
                <div class="card-body">
                <p class="card-text">${description}</p>
                <a href="${item.html_url}" target="_blank" class="btn btn-primary glow-on-hover onmousehoverrepositories text-decoration-none"><i class="bi bi-github"></i> Veja o código</a>
                </div>
                </div>
                `
            repos.appendChild(project);
        })
    });