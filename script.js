/* 
ideias para melhorar o código
    Usar cloneNode para simplificar a criação de novos obstáculos
    Rever necessidade de setIntervals e possibilidade de criação de novos Observers
    Rever nomes das variáveis e posição de declaração (para reduzir redeclarações desnecessárias)

    Usar design patterns como factory e observer para simplificar e desacoplar o projeto
        Diminuir as responsabilidades de cada componente do projeto

    Transformar passaro em objeto com várias propriedades e métodos

    Usar função construtora para gerar novos canos

    função criarCanos está uma ameba, com infinitas responsabilidades. Tentar desacoplar sem perder a referência dos novos canos

    Estou tentando implementar um mutation observer no primeiro setInterval, sem sucesso

    getPosicao() funciona com passaro, mas não com espaço

    Padrão observer:
        class Observable()
            constructor()
            subscribe(observer)
            unsubscribe(observer)
            notify(dados)

    Como aplicar:
        Keyboard Event observável
            Início: subscribe observers:
                keydown -> voar()
                    Voar precisa ser um setInterval quebrável
                keyup -> cair()
                    Cair precisa ser um setInterval quebrável
            Fim: unsubscribe observers
            
        
*/

// class Observable {
//     constructor() {
//         this.observerList = []
//     }

//     subscribe(observer) {
//         this.observerList = [...this.observerList, observer]
//     }

//     unsubscribe(observer) {
//         this.observerList = this.observerList.filter(e => e !== observer)
//     }

//     notify(dados) {
//         this.observerList.forEach(e => e(dados))
//     }
// }



const   jogo = document.querySelector('[wm-flappy]'),
        passaro = document.getElementById('passaro'),
        alturaDoPassaro = passaro.clientHeight,
        alturaDaTela = parseFloat(document.body.clientHeight),
        observerOptions = { attributes: true }

function derrota() {
    jogo.setAttribute('status', 'gameover')
}

function getPosicao(elemento, lado) {
    return parseFloat(elemento.getBoundingClientRect()[lado]).toFixed(2) 
} 

function main() {

    // ↓ Tentativa de implementar padrão observer, ainda sem sucesso

    // const teclado = new Observable()

    // function movimentar(keyPressed) {
    //     const posicaoTopoPassaro = getPosicao(passaro, 'top')

    //     function cair() {
    //         return setInterval(() => {
    //             let alturaAtual = 0
    //             alturaAtual += parseFloat(passaro.style['top'])
    //             passaro.style.top = `${alturaAtual + 0.5}vh`
    //         }, 10)
    //     } 

    //     function voar() {
    //         return setInterval(() => {
                
    //         let alturaAtual = 0
    //         alturaAtual += parseFloat(passaro.style['top'])
    //         passaro.style.top = `${alturaAtual - 0.8}vh`
    //         }, 10)
    //     }

    //     if (jogo.getAttribute('status') === 'jogando'
    //     && keyPressed
    //     && posicaoTopoPassaro >= (0.008 * alturaDaTela)) {
    //         console.log('arrow up')
    //         voar()
    //         clearInterval(cair())
    //     }

    //     if(jogo.getAttribute('status') === 'jogando'
    //     && !keyPressed
    //     && posicaoTopoPassaro <= alturaDaTela - alturaDoPassaro - (0.005*alturaDaTela)) {
    //         console.log('arrow down')  
    //         cair()
    //         clearInterval(voar())
    //     }
    // }

    // teclado.subscribe(movimentar)

    // window.addEventListener('keydown', e => teclado.notify(true))
    // window.addEventListener('keyup', teclado.notify(false))

    function observarTeclado() {
        window.onkeydown = () => { 
            jogo.setAttribute('key-pressed', '')
        }
        
        window.onkeyup = () => {
            jogo.removeAttribute('key-pressed')
        }
    }
    
    function movimentar() {
        function voar() {
            let alturaAtual = 0
            alturaAtual += parseFloat(passaro.style['top'])
            passaro.style.top = `${alturaAtual - 0.8}vh`
        }
        
        function cair() {
            let alturaAtual = 0
            alturaAtual += parseFloat(passaro.style['top'])
            passaro.style.top = `${alturaAtual + 0.5}vh`
        }

        setInterval(() => {
            const posicaoTopoPassaro = getPosicao(passaro, 'top')
            let keyPressed = jogo.hasAttribute('key-pressed')

            if(jogo.getAttribute('status') === 'jogando') {
                if (keyPressed && posicaoTopoPassaro >= (0.008 * alturaDaTela)) { voar() }
                else if( !keyPressed && posicaoTopoPassaro <= alturaDaTela - alturaDoPassaro - (0.005*alturaDaTela))
                    { cair() }
                else if( posicaoTopoPassaro > alturaDaTela - alturaDoPassaro - (0.005*alturaDaTela))
                    { derrota() }
            }
        }, 10)
    }
    
    observarTeclado(); movimentar();

    let pontuacaoAtual = 0

    /* 
    Missão: desacoplar essa função (talvez usar observers)
    Responsabilidades atuais:
        descrever e criar um cano
        movimentar o cano criado
        checar colisão do cano criado com o passaro
        levar a derrota se houver colisão
        criar um novo cano do zero a cada 1,5s

    Ideias:
        Padrão observer
        clonar cano
        Separar funções sem perder a referência 
            Talvez usar um ID diferente para cada cano
            Talvez monitorar a lista de childs do jogo
            executar funções para o último elemento da lista?

    */

    function criarCano() {
        const alturaCano1 = Math.floor(Math.random() * 9) + 1
        const alturaCano2 = 10- alturaCano1
        
        const novoCano = document.createElement('div')
        novoCano.classList.add('cano')
        novoCano.style.right = '-14vw'
        novoCano.style['grid-template-rows'] = `${alturaCano1}fr 25vh ${alturaCano2}fr` 

        novoCano.innerHTML = 
    `
    <div class="cano1">
        <div class="extensao"></div>
        <div class="boca"></div>
    </div>
    <div class="espaco"></div>
    <div class="cano2">
        <div class="boca"></div>
        <div class="extensao"></div>
    </div>`;

        jogo.appendChild(novoCano)

        const espaco = novoCano.querySelector('.espaco')

        setInterval(() => {
            if (jogo.getAttribute('status') === 'jogando') {
                let posicao = 0
                posicao += parseFloat(novoCano.style.right)
                
                posicao >= 100 ? novoCano.remove() : novoCano.style.right = `${posicao + 0.20}vw`
                
                if(posicao == 50) {
                    pontuacaoAtual++
                    document.getElementById('pontuacao').innerText = pontuacaoAtual
                    document.getElementById('pontuacao-final').innerText = pontuacaoAtual
                }

                // checar colisão
                const posicaoEspaco = {
                    topo: parseFloat(espaco.getBoundingClientRect().top.toFixed(2)),
                    baixo: parseFloat(espaco.getBoundingClientRect().bottom.toFixed(2)),
                    esquerda: parseFloat(espaco.getBoundingClientRect().left.toFixed(2)),
                    direita: parseFloat(espaco.getBoundingClientRect().right.toFixed(2))
                }
                
                const contatoNoY = getPosicao(passaro, 'top') <= posicaoEspaco.topo 
                    || getPosicao(passaro, 'bottom') >= posicaoEspaco.baixo

                const contatoNoX = getPosicao(passaro, 'right') >= posicaoEspaco.esquerda 
                    && getPosicao(passaro, 'right') <= posicaoEspaco.direita

                if(contatoNoX && contatoNoY) {
                    derrota()
                }
            }
        }, 5)
    }
    
    setInterval(() => {
        if (jogo.getAttribute('status') === 'jogando') {criarCano()}}, 1500)

}

window.onkeydown = () => { 
    window.onkeydown = ''
    jogo.setAttribute('status','jogando')
}

function observarStatus() {
    function callback(mutationList, observer) {
        mutationList.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'status') {
            if (jogo.getAttribute('status') === 'gameover') {
                const fim = document.querySelector('.fim')
                const fundoPreto = document.querySelector('.fundo-preto')
    
                fim.style.display = 'grid'
                fundoPreto.style.display = 'block'
    
                window.onkeydown = () => {
                    window.onkeydown = ''
                    document.location.reload(true)
                }
    
            } else if( jogo.getAttribute('status') === 'jogando') {
                main()
            }
        }
        })
    }

    return new MutationObserver(callback)
}

observarStatus().observe(jogo, observerOptions)
