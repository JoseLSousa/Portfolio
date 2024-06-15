const form = document.getElementById('contactForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    axios.post('/sendEmail', formData)
        .then(response => {
            console.log(response.data);
            alert('Email enviado com sucesso!');
            form.reset();
        })
        .catch(error => {
            console.error(error);
            alert('Houve um erro ao enviar o email.');
        });
});