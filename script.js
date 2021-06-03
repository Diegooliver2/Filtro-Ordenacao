let tagCards = document.querySelector('.cards')

const createCards = () => {
    let cards = {
        estrela: [],
        nivel: [],
        card: []
    }

    function cardConstructor(){

        let auxEstrela, auxNivel

        for(let i = 0; i < 24; i++){
            auxEstrela = (Math.floor(1 + Math.random() * 5))
            auxNivel = (Math.floor(Math.random() * 20))

            cards.estrela[i] = document.createElement('div')
            cards.estrela[i].setAttribute('class', 'estrela')
            cards.estrela[i].textContent = auxEstrela

            cards.nivel[i] = document.createElement('div')
            cards.nivel[i].setAttribute('class', 'nivel')
            cards.nivel[i].textContent = auxNivel

            cards.card[i] = document.createElement('div')
            cards.card[i].setAttribute('class', 'card')
            cards.card[i].appendChild(cards.estrela[i])
            cards.card[i].appendChild(cards.nivel[i])
        }
        return cards.card
    }
    cards.cardsConstruidos = cardConstructor()
    return cards
}

function addCards(tag, elementos){
    for(let i = 0; i < cardsSection.card.length; i++){
        tag.appendChild(elementos[i])
    }
}

function ordenacao(n1, n2, tag, elemF) {
    let auxE, auxN

    for(let i = 0; i < elemF.length; i++){
        tag.removeChild(elemF[i])
        elemF[i].removeChild(n1[i])
        elemF[i].removeChild(n2[i])
    }

    for(let i = 0; i < n1.length - 1; i++){
        for(let j = 0; j < n1.length - i - 1; j++){
            if(Number(n1[j].textContent) > Number(n1[j + 1].textContent)){
                auxE = n1[j]
                n1[j] = n1[j + 1]
                n1[j + 1] = auxE

                auxN = n2[j]
                n2[j] = n2[j + 1]
                n2[j + 1] = auxN
            }
        }
    }    
    
    for(let i = 0; i < elemF.length; i++){
        elemF[i].appendChild(n1[i])
        elemF[i].appendChild(n2[i])
        tag.appendChild(elemF[i])
    }
}

function ordEst(f1, f2, pai, avo){
    return ordenacao(f1, f2, pai, avo)
}

function ordNiv(f1, f2, pai, avo){
    return ordenacao(f2, f1, pai, avo)
}

let cardsSection = createCards()

addCards(tagCards, cardsSection.card)

document.querySelector('.down').addEventListener('click', () => {
    let display = document.querySelector('#opf')

    if(document.querySelector('#opcs').textContent == ''){

        document.querySelector('#opcs').innerHTML = '<p>Estrela</p><p>Nível</p>'
        document.querySelector('.down').style.transform = 'rotate(-180deg)'

        let opc = document.querySelector('#opcs')
        
        opc.children[0].addEventListener('click', () => {
            display.innerHTML = '<p>Estrela</p>'
            ordEst(cardsSection.estrela, cardsSection.nivel, tagCards, cardsSection.card)
        })
        opc.children[1].addEventListener('click', () => {
            display.innerHTML = '<p>Nível</p>'
            ordNiv(cardsSection.estrela, cardsSection.nivel, tagCards, cardsSection.card)
        })

    } else {
        document.querySelector('#opcs').innerHTML = ''
        document.querySelector('.down').style.transform = 'rotate(0deg)'
    }
})