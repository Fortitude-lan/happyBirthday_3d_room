(function ($) {
    /**@type {HTMLCanvasElement}**/
    const canvasbg = document.getElementById('canvas1')
    const ctxbg = canvasbg.getContext('2d')
    canvasbg.width = window.innerWidth - 16
    canvasbg.height = window.innerHeight
    const columnWidth = 20 //列宽
    const columnCount = Math.floor(canvasbg.width / columnWidth) //列数
    const columnNextIndexes = new Array(columnCount).fill(1)
    function draw() {
        ctxbg.fillStyle = 'rgba(250,250,250,.1)'
        ctxbg.fillRect(0, 0, canvasbg.width, canvasbg.height)
        const fn = 20
        ctxbg.fillStyle = getRandomColor()
        ctxbg.font = `${fn}px`
        for (let i = 0; i < columnCount; i++) {
            let x = i * columnWidth
            let y = fn * 0.8 * columnNextIndexes[i]
            ctxbg.fillText(getRandomChar(), x, y)
            if(y>canvasbg.height && Math.random()>0.7){
                columnNextIndexes[i]=0
            }else{
                columnNextIndexes[i]++
            }
        }

    }
    function getRandomColor() {
        const color = ['#cc0000', '#ff8800', '#ffe172', '#85e376', '#0099cc', '#6F38C5']
        return color[Math.floor(Math.random() * color.length)]
    }
    function getRandomChar() {
        const str = 'I love you forever'
        return str[Math.floor(Math.random() * str.length)]
    }
    draw()
    setInterval(draw,40)
})(jQuery)
