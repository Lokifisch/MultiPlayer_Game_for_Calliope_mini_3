enum RadioMessage {
    message1 = 49434
}
function Win () {
    basic.showString("hi!")
    HisX.delete()
    MyX.delete()
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    MyX.move(-1)
    radio.sendValue("MyX", MyX.get(LedSpriteProperty.X))
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    if (MyX.get(LedSpriteProperty.X) == HisX.get(LedSpriteProperty.X)) {
        radio.sendValue("Damage", 0)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    MyX.move(1)
    radio.sendValue("MyX", MyX.get(LedSpriteProperty.X))
})
radio.onReceivedValue(function (name, value) {
    if ("MyX" == name) {
        HisX.set(LedSpriteProperty.X, value)
    } else if ("Damage" == name) {
        Health += -1
        if (Health == 2) {
            basic.setLedColors(0x00ff00, 0x00ff00, 0xff0000)
        } else if (Health == 1) {
            basic.setLedColors(0x00ff00, 0xff0000, 0xff0000)
        } else if (Health == 0) {
            basic.setLedColors(0xff0000, 0xff0000, 0xff0000)
            Lose()
        }
    } else if ("Win" == name) {
        Win()
    }
})
function Lose () {
    radio.sendValue("Win", 0)
}
let Health = 0
let HisX: game.LedSprite = null
let MyX: game.LedSprite = null
MyX = game.createSprite(2, 4)
HisX = game.createSprite(2, 0)
radio.setGroup(1)
Health = 3
basic.setLedColor(0x00ff00)
