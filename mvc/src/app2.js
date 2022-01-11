import './app2.css'
import $ from 'jquery'

const $tabbtns = $('#tabbutton')
const $tabcontent = $('#tabcontent')

$tabbtns.on('click', 'li', e=>{
    const $li = $(e.currentTarget)
    // console.log(e.currentTarget)
    $li.addClass("selected").siblings().removeClass("selected")
    const selectedIndex = $li.index()
    // console.log(selectedIndex)
    let $content = $tabcontent.children().eq(selectedIndex)
    console.log($content.text())
    $content.addClass("active").siblings().removeClass("active")
})