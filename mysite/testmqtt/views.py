from django.shortcuts import render
from django.http import HttpResponse
import paho.mqtt.client as mqtt
import json
import datetime

currentA = '0-0-0'
currentB = '0-0-0'
currentC = '0-0-0'
currentD = '0-0-0'


def getCurrentValue(request):
    global currentA
    global currentB
    global currentC
    global currentD

    JSONer = {}
    JSONer['currentA'] = currentA
    JSONer['currentB'] = currentB
    JSONer['currentC'] = currentC
    JSONer['currentD'] = currentD

    return HttpResponse(json.dumps(JSONer))


def index(request):
    return render(request, 'testmqtt/index.html')


def on_message(client, userdata, msg):
    global currentA
    global currentB
    global currentC
    global currentD

    arrived = msg.payload.decode()

    sensor = arrived.split(":")[0]
    if sensor == "A":
        currentA = arrived.split(":")[1]
    if sensor == "B":
        currentB = arrived.split(":")[1]
    if sensor == "C":
        currentC = arrived.split(":")[1]
    if sensor == "D":
        currentD = arrived.split(":")[1]

    print('new data: ', arrived)
    pass


def on_connect(client, userdata, flags, rc):
    print('connected')
    pass


client = mqtt.Client("test client")
client.on_connect = on_connect
client.on_message = on_message
client.connect("localhost", 1883, 60)
client.subscribe("Sensor")

client.loop_start()
