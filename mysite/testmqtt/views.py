from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import paho.mqtt.client as mqtt
from .models import ReceivedString, Sensor, Node, Point
import json
import datetime

messageArray = []


def getCurrentValue(request):
    global messageArray
    JSONsend = json.dumps(messageArray)
    messageArray = []
    return HttpResponse(JSONsend)


def updateCanvas(request):
    arrayData = Node.objects.all().values()
    sensorData = Sensor.objects.all().values()

    return JsonResponse({"arrayData": list(arrayData), "sensorData": list(sensorData)})


def updateCanvasPoints(request):
    data = Point.objects.all().values()

    return JsonResponse({"data": list(data)})


def index(request):
    return render(request, 'testmqtt/index.html')


def dashboard(request):
    return render(request, 'testmqtt/dashboard.html')


def canvas(request):
    context = {
        'nodes': Node.objects.all()
    }
    return render(request, 'testmqtt/canvasTest.html', context)


def threevisualization(request):
    context = {
        'nodes': Node.objects.all()
    }
    return render(request, 'testmqtt/threevisualization.html', context)
    # return render(request, 'testmqtt/canvasWire.html', context)


def on_message(client, userdata, msg):
    global messageArray
    arrived = json.loads(msg.payload)

    p = ReceivedString(sensorName=arrived['device'], imuX=arrived['IMU'][0], imuY=arrived['IMU'][1], imuZ=arrived['IMU'][2], gyroX=arrived['Gyro'][0], gyroY=arrived['Gyro'][1], gyroZ=arrived['Gyro'][2])
    p.save()
    messageArray.append(arrived)
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
