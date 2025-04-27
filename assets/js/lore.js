document.addEventListener('DOMContentLoaded', () => {
    const abas = document.querySelectorAll('.aba-btn');
    const conteudos = document.querySelectorAll('.aba-conteudo');

    // Função para mostrar a aba selecionada
    const mostrarAba = (abaId) => {
        conteudos.forEach(conteudo => {
            conteudo.classList.remove('active');
            if (conteudo.id === abaId) {
                conteudo.classList.add('active');
            }
        });
    };

    // Evento de clique nas abas
    abas.forEach(aba => {
        aba.addEventListener('click', () => {
            // Remove a classe 'active' de todas as abas e conteúdos
            abas.forEach(a => a.classList.remove('active'));
            conteudos.forEach(c => c.classList.remove('active'));

            // Adiciona 'active' na aba e conteúdo clicados
            aba.classList.add('active');
            const abaId = aba.getAttribute('data-aba');
            mostrarAba(abaId);
        });
    });

    // Ativa a primeira aba por padrão
    mostrarAba('thedas');
});