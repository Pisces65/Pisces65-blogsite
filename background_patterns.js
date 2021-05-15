function createSquare(){
    const colors = [
        '#ff7473',
        '#ffc952',
        '#47b8e0',
        '#34314c'
    ]
    const section = document.querySelector('#background');
    const square = document.createElement('span');

    let size = Math.random()*50;

    square.style.width = 20 + size + 'px';
    square.style.height = 20 + size + 'px';

    square.style.top = Math.random() * innerHeight + 'px';
    square.style.left = Math.random() * innerWidth + 'px';

    const bg = colors[Math.floor(Math.random() * colors.length)];
    square.style.backgroundColor = bg;
    section.appendChild(square);

    setTimeout(()=>{
        square.remove()
    },5000)
}

setInterval(createSquare, 150);