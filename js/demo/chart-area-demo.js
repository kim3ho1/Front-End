function setChart(){
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';

  function getColorForDataPoint(dataPoint) {
    return dataPoint < goalProtein ? '#ec8282' : 'rgb(215,204,192)'; // 70 초과시 빨간색, 아니면 기본 색상
  }
// 색상 배열 생성
  var backgroundColors = weeklyamount.map(getColorForDataPoint);
  var borderColors = weeklyamount.map(getColorForDataPoint);

// 주간 단백질 섭취량 막대 그래프
  var ctx = document.getElementById("myAreaChart");
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: weeklydate,
      datasets: [{
        label: "주간 평균 단백질 섭취량(g)",
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        data: weeklyamount
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            max: 100, // 최대값 55g
            min: 0,
            stepSize: 10
          }
        }]
      },
      legend: {
        display: false
      },
      annotation: {
        annotations: [{
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: goalProtein, // 선을 그릴 y축 값
          borderColor: '#9f9386', // 선의 색
          borderWidth: 3 // 선의 두께
        }]
      }
    }
  });
}