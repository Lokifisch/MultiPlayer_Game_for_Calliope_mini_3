enum RadioMessage {
    message1 = 49434
}
function Win () {
    basic.showString("You Won")
    HisX.delete()
    MyX.delete()
    basic.pause(1000)
    control.reset()
}
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    music.play(music.createSoundExpression(WaveShape.Square, 742, 1, 91, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    MyX.move(-1)
    radio.sendValue("MyX", MyX.get(LedSpriteProperty.X))
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    music.play(music.createSoundExpression(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
    if (MyX.get(LedSpriteProperty.X) == HisX.get(LedSpriteProperty.X)) {
        radio.sendValue("Damage", 0)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    music.play(music.createSoundExpression(WaveShape.Square, 742, 1, 91, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    MyX.move(1)
    radio.sendValue("MyX", MyX.get(LedSpriteProperty.X))
})
input.onGesture(Gesture.Shake, function () {
    radio.sendValue("Reset", 0)
    control.reset()
})
radio.onReceivedValue(function (name, value) {
    if ("MyX" == name) {
        music.play(music.createSoundExpression(WaveShape.Square, 742, 1, 91, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
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
        music.play(music.createSoundExpression(WaveShape.Sawtooth, 5000, 0, 255, 0, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    } else if ("Win" == name) {
        Win()
    } else if ("Reset" == name) {
        Reset()
    }
})
function Reset () {
    control.reset()
}
function Lose () {
    radio.sendValue("Win", 0)
    basic.showString("Game Over")
    HisX.delete()
    MyX.delete()
    basic.pause(2000)
    control.reset()
}
let Health = 0
let HisX: game.LedSprite = null
let MyX: game.LedSprite = null
let Funk = 169
radio.setGroup(Funk)
MyX = game.createSprite(2, 4)
HisX = game.createSprite(2, 0)
Health = 3
basic.setLedColor(0x00ff00)
