document.addEventListener('DOMContentLoaded', () => {
    const abas = document.querySelectorAll('.aba-btn');
    const conteudos = document.querySelectorAll('.aba-conteudo');

    const mostrarAba = (abaId) => {
        conteudos.forEach(conteudo => {
            conteudo.classList.remove('active');
            if (conteudo.id === abaId) {
                conteudo.classList.add('active');
            }
        });
    };

    abas.forEach(aba => {
        aba.addEventListener('click', () => {
            abas.forEach(a => a.classList.remove('active'));
            conteudos.forEach(c => c.classList.remove('active'));

            aba.classList.add('active');
            const abaId = aba.getAttribute('data-aba');
            mostrarAba(abaId);
        });
    });

    mostrarAba('thedas');
});