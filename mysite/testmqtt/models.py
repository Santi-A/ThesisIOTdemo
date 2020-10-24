from django.db import models


class ReceivedStrings(models.Model):
    sensorName = models.CharField('Name', default='', max_length=255)
    imuX = models.CharField('IMU-X', default='', max_length=255)
    imuY = models.CharField('IMU-Y', default='', max_length=255)
    imuZ = models.CharField('IMU-Z', default='', max_length=255)
    gyroX = models.CharField('GYRO-X', default='', max_length=255)
    gyroY = models.CharField('GYRO-Y', default='', max_length=255)
    gyroZ = models.CharField('GYRO-Z', default='', max_length=255)


class Sensor(models.Model):
    arrayName = models.CharField('Name', default='', max_length=255)
    sensorCount = models.CharField('Number of Sensor nodes', default='0', max_length=2)
