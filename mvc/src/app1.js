import './app1.css'
import $ from "jquery"

const $button1 = $('#add1')
const $button2 = $('#minus1')
const $button3 = $('#mul2')
const $button4 = $('#div2')
const $number = $('#num')

$button1.on('click', ()=>{
    let number = parseInt($number.text())
    number += 1
    $number.text(number)
})

$button2.on('click', ()=>{
    let number = parseInt($number.text())
    number -= 1
    $number.text(number)
})

$button3.on('click', ()=>{
    let number = parseInt($number.text())
    number *= 2
    $number.text(number)
})

$button4.on('click', ()=>{
    let number = parseInt($number.text())
    number /= 2
    $number.text(number)
})