def on_button_a():
    global MyX
    led.unplot(MyX, 4)
    MyX += -1
    if MyX == -1:
        MyX = 0
input.on_button_event(Button.A, input.button_event_click(), on_button_a)

def on_button_b():
    global MyX
    led.unplot(MyX, 4)
    MyX += 1
input.on_button_event(Button.B, input.button_event_click(), on_button_b)

def on_received_value(name, value):
    led.plot(value, 0)
radio.on_received_value(on_received_value)

MyX = 0
radio.set_group(0)
MyX = 2

def on_forever():
    led.plot(MyX, 4)
    radio.send_value("MyX", MyX)
basic.forever(on_forever)
