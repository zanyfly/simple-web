import './app3.css'
import $ from 'jquery'

const $circle = $("#app3 #circle")
$circle.on('click', e=>{
    $circle.toggleClass("active")
})
