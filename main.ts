enum RadioMessage {
    message1 = 49434
}
function Won () {
    InGame = 0
    basic.showString("You Won")
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    led.unplot(MyX, 4)
    MyX += -1
    if (MyX == -1) {
        MyX = 0
    }
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    if (MyX == HisX) {
        radio.sendValue("Damage", 1)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    led.unplot(MyX, 4)
    MyX += 1
    if (MyX == 5) {
        MyX = 4
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "MyX") {
        HisX = value
    } else if (name == "Damage") {
        Health += -1
        if (Health == 2) {
            basic.setLedColors(0x00ff00, 0x00ff00, 0xff0000)
        } else if (Health == 1) {
            basic.setLedColors(0x00ff00, 0xff0000, 0xff0000)
        } else if (Health == 0) {
            basic.setLedColors(0xff0000, 0xff0000, 0xff0000)
        }
    } else if (name == "Winner") {
        if (value == 1) {
            Won()
        }
    }
})
function Lose () {
    InGame = 0
    basic.showString("You Lost")
}
let HisX = 0
let Health = 0
let MyX = 0
let InGame = 0
basic.setLedColors(0x00ff00, 0x00ff00, 0x00ff00)
InGame = 1
radio.setGroup(0)
MyX = 2
Health = 3
while (InGame == 1) {
    led.plot(MyX, 4)
    radio.sendValue("MyX", MyX)
    led.plot(HisX, 0)
    if (HisX == 0) {
        for (let index = 0; index < 1; index++) {
            led.unplot(1, 0)
            led.unplot(2, 0)
            led.unplot(3, 0)
            led.unplot(4, 0)
        }
    } else if (HisX == 1) {
        for (let index = 0; index < 1; index++) {
            led.unplot(0, 0)
            led.unplot(2, 0)
            led.unplot(3, 0)
            led.unplot(4, 0)
        }
    } else if (HisX == 2) {
        for (let index = 0; index < 1; index++) {
            led.unplot(0, 0)
            led.unplot(1, 0)
            led.unplot(3, 0)
            led.unplot(4, 0)
        }
    } else if (HisX == 3) {
        for (let index = 0; index < 1; index++) {
            led.unplot(0, 0)
            led.unplot(1, 0)
            led.unplot(2, 0)
            led.unplot(4, 0)
        }
    } else if (HisX == 4) {
        for (let index = 0; index < 1; index++) {
            led.unplot(0, 0)
            led.unplot(1, 0)
            led.unplot(3, 0)
            led.unplot(2, 0)
        }
    }
    if (Health == 0) {
        radio.sendValue("Winner", 1)
        Lose()
    }
}
