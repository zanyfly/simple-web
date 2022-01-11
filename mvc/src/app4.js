import './app4.css'
import $ from 'jquery'

const $gradientcircle = $("#app4 #gradient-circle")
$gradientcircle.on('mouseenter', ()=>{
    $gradientcircle.addClass('active')
}).on('mouseleave', ()=>{
    $gradientcircle.removeClass('active')
})