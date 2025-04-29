document.addEventListener('DOMContentLoaded', () => {
    const nomeInput = document.getElementById('nome');
    const racaSelect = document.getElementById('raca');
    const classeSelect = document.getElementById('classe');
    const atributos = document.querySelectorAll('.atributo input[type="range"]');

    const visualizarNome = document.getElementById('visualizar-nome');
    const visualizarRaca = document.getElementById('visualizar-raca');
    const visualizarClasse = document.getElementById('visualizar-classe');
    const visualizarAtributos = document.getElementById('visualizar-atributos');

    const atributoMap = {
        'forca': 'Força',
        'destreza': 'Destreza',
        'inteligencia': 'Inteligência',
        'constituicao': 'Constituição'
    };

    atributos.forEach((atributo) => {
        atributo.addEventListener('input', (e) => {
            const id = e.target.id; 
            const valor = e.target.value;

            const valorSpan = document.getElementById(`${id}-valor`);
            valorSpan.textContent = valor;

            const atributoNome = atributoMap[id]; 
            const todosLis = Array.from(visualizarAtributos.children);
            const liCorreto = todosLis.find(li => li.textContent.includes(atributoNome));

            if (liCorreto) {
                liCorreto.textContent = `${atributoNome}: ${valor}`;
            }
        });
    });

    nomeInput.addEventListener('input', (e) => {
        visualizarNome.textContent = e.target.value || "Nome do Personagem";
    });

    racaSelect.addEventListener('change', (e) => {
        visualizarRaca.textContent = e.target.options[e.target.selectedIndex].text;
    });

    classeSelect.addEventListener('change', (e) => {
        const classe = e.target.value;
        visualizarClasse.textContent = e.target.options[e.target.selectedIndex].text;
    });

    atributos.forEach((atributo) => {
        atributo.addEventListener('input', (e) => {
            const valorSpan = document.getElementById(`${e.target.id}-valor`);
            valorSpan.textContent = e.target.value;

            const li = Array.from(visualizarAtributos.children).find(
                (li) => li.textContent.includes(e.target.id.replace('-valor', ''))
            );
            if (li) li.textContent = `${capitalize(e.target.id.replace('-valor', ''))}: ${e.target.value}`;
        });
    });

    document.getElementById('salvar-personagem').addEventListener('click', () => {
        const ficha = document.querySelector('.personagem-card');

        const options = {
            scale: 2,
            useCORS: true 
        };

        html2canvas(ficha, options).then(canvas => {
            const link = document.createElement('a');
            link.download = `ficha-${nomeInput.value || 'personagem'}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            console.error('Erro ao gerar imagem:', err);
            alert('Erro ao salvar a ficha!');
        });
    });

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});