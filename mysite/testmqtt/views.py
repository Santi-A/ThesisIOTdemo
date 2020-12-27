from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import paho.mqtt.client as mqtt
from .models import ReceivedString, Sensor, Node, Point
import json
import datetime
import sqlite3
import csv
import os.path

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

def export(request):
    BasePath = os.path.dirname(os.path.abspath(__file__))
    SqlitePath = os.path.abspath("db.sqlite3")
    dbtable = ["testmqtt_node", 
               "testmqtt_point", 
               "testmqtt_point_connectedNodes", 
               "testmqtt_receivedstring", 
               "testmqtt_sensor"]

    for i in range(len(dbtable)):
        connection = sqlite3.connect(SqlitePath)

        name = dbtable[i]
        c = connection.cursor()
        Select = "SELECT rowid, * FROM " + name
        FileName = name + ".csv"
        c.execute(Select)
        columns = [column[0] for column in c.description]
        results = []
        for row in c.fetchall():
            results.append(dict(zip(columns, row)))
        with open(FileName, "w", newline='') as new_file: 
            fieldnames = columns
            writer = csv.DictWriter(new_file,fieldnames=fieldnames)
            writer.writeheader()
            for line in results:
                writer.writerow(line)
        connection.close()
    return render(request, 'testmqtt/dashboard.html') 

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
