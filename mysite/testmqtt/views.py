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


def dashboard(request):
    return render(request, 'testmqtt/dashboard.html')


def threevisualization(request):
    context = {
        'nodes': Node.objects.all()
    }
    return render(request, 'testmqtt/threevisualization.html', context)

def csvexport(request):
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

def outputJSONObject(key, val, last):
	if val is None:
		val = ''
	obj = ''
	obj += '\t\t"' + str(key).lower() + '" : '
	obj += '"' + str(val) + '"'
	if last != True:
		obj+=','
	obj+='\n'
	return obj

def jsonexport(request):
    BasePath = os.path.dirname(os.path.abspath(__file__))
    SqlitePath = os.path.abspath("db.sqlite3")

    dbtable = ["testmqtt_node", 
               "testmqtt_point", 
               "testmqtt_point_connectedNodes", 
               "testmqtt_receivedstring", 
               "testmqtt_sensor"]

    for table in dbtable:
        connection = sqlite3.connect(SqlitePath)
        connection.row_factory = sqlite3.Row
        cur = connection.cursor()
        cur.execute("select * from " + table)

        colNames = [cn[0] for cn in cur.description]

        with open(table + ".json", "w") as f:
            f.write("[\n")

            values = cur.fetchall()
            for i, value in enumerate(values):
                if value == None:
                    break
                json = '\t{\n'
                for j, col in enumerate(colNames):
                    last = j == (len(colNames)-1)
                    json += outputJSONObject(col, value[col], last)
                    
                if i != (len(values)-1):
                    json += '\t},\n'
                else:
                    json += '\t}\n'
                f.write(json)
            f.write("]")
        cur.close()
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
