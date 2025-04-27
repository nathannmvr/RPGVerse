// Atualizar Visualização em Tempo Real
document.addEventListener('DOMContentLoaded', () => {
    const nomeInput = document.getElementById('nome');
    const racaSelect = document.getElementById('raca');
    const classeSelect = document.getElementById('classe');
    const atributos = document.querySelectorAll('.atributo input[type="range"]');

    // Elementos de Visualização
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

    // Atualizar Atributos (código corrigido)
    atributos.forEach((atributo) => {
        atributo.addEventListener('input', (e) => {
            const id = e.target.id; // Ex: "forca"
            const valor = e.target.value;

            // Atualiza o valor ao lado do slider
            const valorSpan = document.getElementById(`${id}-valor`);
            valorSpan.textContent = valor;

            // Atualiza a visualização
            const atributoNome = atributoMap[id]; // "Força"
            const todosLis = Array.from(visualizarAtributos.children);
            const liCorreto = todosLis.find(li => li.textContent.includes(atributoNome));

            if (liCorreto) {
                liCorreto.textContent = `${atributoNome}: ${valor}`;
            }
        });
    });

    // Atualizar Nome
    nomeInput.addEventListener('input', (e) => {
        visualizarNome.textContent = e.target.value || "Nome do Personagem";
    });

    // Atualizar Raça
    racaSelect.addEventListener('change', (e) => {
        visualizarRaca.textContent = e.target.options[e.target.selectedIndex].text;
    });

    // Atualizar Classe e Imagem
    classeSelect.addEventListener('change', (e) => {
        const classe = e.target.value;
        visualizarClasse.textContent = e.target.options[e.target.selectedIndex].text;
    });

    // Atualizar Atributos
    atributos.forEach((atributo) => {
        atributo.addEventListener('input', (e) => {
            const valorSpan = document.getElementById(`${e.target.id}-valor`);
            valorSpan.textContent = e.target.value;

            // Atualizar Visualização
            const li = Array.from(visualizarAtributos.children).find(
                (li) => li.textContent.includes(e.target.id.replace('-valor', ''))
            );
            if (li) li.textContent = `${capitalize(e.target.id.replace('-valor', ''))}: ${e.target.value}`;
        });
    });

    // Botão Salvar
    document.getElementById('salvar-personagem').addEventListener('click', () => {
        // Capturar o elemento da ficha
        const ficha = document.querySelector('.personagem-card');

        // Configurar opções (ajuste a escala para melhor qualidade)
        const options = {
            scale: 2,
            useCORS: true // Permite capturar imagens externas
        };

        html2canvas(ficha, options).then(canvas => {
            // Converter canvas para imagem
            const link = document.createElement('a');
            link.download = `ficha-${nomeInput.value || 'personagem'}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            console.error('Erro ao gerar imagem:', err);
            alert('Erro ao salvar a ficha!');
        });
    });

    // Função Auxiliar
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});