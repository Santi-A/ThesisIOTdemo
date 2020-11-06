from django.db import models


class ReceivedString(models.Model):
    sensorName = models.CharField('Name', default='', max_length=255)
    imuX = models.CharField('IMU-X', default='', max_length=255)
    imuY = models.CharField('IMU-Y', default='', max_length=255)
    imuZ = models.CharField('IMU-Z', default='', max_length=255)
    gyroX = models.CharField('GYRO-X', default='', max_length=255)
    gyroY = models.CharField('GYRO-Y', default='', max_length=255)
    gyroZ = models.CharField('GYRO-Z', default='', max_length=255)

    def __str__(self):
        return self.sensorName


class Node(models.Model):
    nodeName = models.CharField('Name', default='', max_length=255)
    vibrationLevel = models.CharField('Vibration', default='', max_length=255)

    def __str__(self):
        return self.nodeName


class Sensor(models.Model):
    sensorName = models.CharField('Name', default='', max_length=255)
    xCoordinate = models.CharField('X Coordinate', default='', max_length=255)
    yCoordinate = models.CharField('Y Coordinate', default='', max_length=255)
    zCoordinate = models.CharField('Z Coordinate', default='', max_length=255)
    vibrationLevel = models.CharField('Vibration', default='', max_length=255)
    parent = models.ForeignKey('Node', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.sensorName


class Point(models.Model):
    pointName = models.CharField('Name', default='', max_length=255)
    xCoordinate = models.CharField('X Coordinate', default='', max_length=255)
    yCoordinate = models.CharField('Y Coordinate', default='', max_length=255)
    zCoordinate = models.CharField('Z Coordinate', default='', max_length=255)
    parent = models.ForeignKey('Node', on_delete=models.SET_NULL, null=True, blank=True)
    connectedNodes = models.ManyToManyField('Point', null=True, blank=True)
    startRight = models.BooleanField()
    startUp = models.BooleanField()

    def __str__(self):
        return self.pointName
