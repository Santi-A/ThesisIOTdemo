function NodeChart(canvasX, canvasY, canvasZ){
    this.ctxNodeX = $(canvasX);
    this.ctxNodeY = $(canvasY);
    this.ctxNodeZ = $(canvasZ);
    this.dataX = [];
    this.dataY = [];
    this.dataZ = [];
    this.length = 0;
    this.chartX;
    this.chartY;
    this.chartZ;

    this.setData = function(dataX, dataY, dataZ){
        console.log('dataX')
        console.log(dataX)
        console.log('dataY')
        console.log(dataY)
        console.log('dataZ')
        console.log(dataZ)

        this.dataX = dataX;
        this.dataY = dataY;
        this.dataZ = dataZ;

        this.length = this.dataX.length;

        this.updateChart();
    }

    this.loadChart = function(){
        var labels = [];
        for(i = 0; i < this.length; i++){
            labels.push(i);
        }

        var cfgX = {
            type: 'line',
            data: {
                labels: labels,
                datasets:[{
                    data: this.dataX,
                    borderColor: "rgba(0,0,255,1)",
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }],
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                legend: {
                    display: false
                }
            }
        }

        var cfgY = {
            type: 'line',
            data: {
                labels: labels,
                datasets:[{
                    data: this.dataY,
                    borderColor: "rgba(0,255,0,1)",
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }],
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                legend: {
                    display: false
                }
            }
        }

        var cfgZ = {
            type: 'line',
            data: {
                labels: labels,
                datasets:[{
                    data: this.dataZ,
                    borderColor: "rgba(255,0,0,1)",
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        display: false
                    }],
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                legend: {
                    display: false
                }
            }
        }

        this.chartX = new Chart(this.ctxNodeX, cfgX);
        this.chartY = new Chart(this.ctxNodeY, cfgY);
        this.chartZ = new Chart(this.ctxNodeZ, cfgZ);
    }

    this.updateChart = function(){
        this.chartX.data.datasets[0].data = this.dataX;
        this.chartY.data.datasets[0].data = this.dataY;
        this.chartZ.data.datasets[0].data = this.dataZ;

        var labels = [];
        for(i = 0; i < this.length; i++){
            labels.push(i);
        }
        this.chartX.data.labels = labels;
        this.chartY.data.labels = labels;
        this.chartZ.data.labels = labels;

        this.chartX.update();
        this.chartY.update();
        this.chartZ.update();
    }
}

