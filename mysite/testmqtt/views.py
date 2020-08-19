from django.shortcuts import render
from django.http import HttpResponse
import paho.mqtt.client as mqtt
import json
import datetime

sensorA = '0,0,0,0,0,0'
sensorB = '0,0,0,0,0,0'
sensorC = '0,0,0,0,0,0'
sensorD = '0,0,0,0,0,0'


def getCurrentValue(request):
    global sensorA
    global sensorB
    global sensorC
    global sensorD

    JSONer = {}
    JSONer['sensorA'] = sensorA
    JSONer['sensorB'] = sensorB
    JSONer['sensorC'] = sensorC
    JSONer['sensorD'] = sensorD

    return HttpResponse(json.dumps(JSONer))


def index(request):
    return render(request, 'testmqtt/index.html')


def on_message(client, userdata, msg):
    global sensorA
    global sensorB
    global sensorC
    global sensorD

    arrived = json.loads(msg.payload)

    datastring = ""
    for number in arrived['IMU']:
        datastring += str(number) + ","
    for number in arrived['Gyro']:
        datastring += str(number) + ","

    sensor = arrived['device']
    if sensor == "A":
        sensorA = datastring
    if sensor == "B":
        sensorB = datastring
    if sensor == "C":
        sensorC = datastring
    if sensor == "D":
        sensorD = datastring

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
