document.addEventListener('DOMContentLoaded', () => {
    const nomes = {
        humano: {
            masculino: ['Aragorn', 'Boromir', 'Geralt', 'Eomer', 'Cedric', 'Roland', 'Godric'],
            feminino: ['Arwen', 'Eowyn', 'Yennefer', 'Ciri', 'Guinevere', 'Isolde', 'Morgana']
        },
        elfo: {
            masculino: ['Legolas', 'Thranduil', 'Elrond', 'Celeborn', 'Fëanor', 'Glorfindel', 'Haldir'],
            feminino: ['Galadriel', 'Lúthien', 'Arwen', 'Celebrian', 'Aredhel', 'Idril', 'Nimloth']
        },
        anao: {
            masculino: ['Gimli', 'Thorin', 'Balin', 'Dwalin', 'Gloin', 'Oin', 'Bifur'],
            feminino: ['Dís', 'Hilda', 'Frerin', 'Thora', 'Brunhilda', 'Hera', 'Sif']
        },
        orc: {
            masculino: ['Azog', 'Bolg', 'Uglúk', 'Grishnákh', 'Shagrat', 'Snaga', 'Lug'],
            feminino: ['Gothmog', 'Uruk', 'Mauhúr', 'Lugdush', 'Sharka', 'Ghorza', 'Mogra']
        }
    };

    let ultimoNomeGerado = '';
    
    const genderButtons = document.querySelectorAll('.gender-btn');
    const racaSelect = document.getElementById('raca-select');
    const nomeGerado = document.getElementById('nome-gerado');
    const btnGerar = document.getElementById('gerar-nome-btn');
    const btnCopiar = document.getElementById('copiar-nome');

    let generoSelecionado = 'masculino';

    genderButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            genderButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            generoSelecionado = btn.dataset.gender;
        });
    });

    btnGerar.addEventListener('click', gerarNome);
    btnCopiar.addEventListener('click', copiarNome);

    function gerarNome() {
        const raca = racaSelect.value;
        const listaNomes = nomes[raca][generoSelecionado];
        
        if (listaNomes.length > 1) {
            let novoNome;
            let tentativas = 0;
            const maxTentativas = 20; 
            
            do {
                novoNome = listaNomes[Math.floor(Math.random() * listaNomes.length)];
                tentativas++;
            } while (novoNome === ultimoNomeGerado && tentativas < maxTentativas);

            ultimoNomeGerado = novoNome;
        } else {
            ultimoNomeGerado = listaNomes[0];
        }

        exibirNomeComEfeito(ultimoNomeGerado);
    }

    function exibirNomeComEfeito(nome) {
        nomeGerado.style.opacity = '0';
        setTimeout(() => {
            nomeGerado.textContent = nome;
            nomeGerado.style.opacity = '1';
        }, 300);
    }

    function copiarNome() {
        navigator.clipboard.writeText(nomeGerado.textContent)
            .then(() => {
                btnCopiar.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                setTimeout(() => {
                    btnCopiar.innerHTML = '<i class="far fa-copy"></i> Copiar';
                }, 2000);
            })
            .catch(err => console.error('Erro ao copiar:', err));
    }

    gerarNome();
});