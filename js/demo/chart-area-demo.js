// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';


function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}


// 데이터 포인트
var dataPoints = [40, 80, 95, 35, 55, 72, 48];

// 색상 설정 함수
function getColorForDataPoint(dataPoint) {
  return dataPoint < 70 ? '#ec8282' : 'rgb(215,204,192)'; // 70 초과시 빨간색, 아니면 기본 색상
}

// 색상 배열 생성
var backgroundColors = dataPoints.map(getColorForDataPoint);
var borderColors = dataPoints.map(getColorForDataPoint);


// Area Chart Example
// 주간 단백질 섭취량 막대 그래프
var ctx = document.getElementById("myAreaChart");
var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [{
      label: "주간 평균 단백질 섭취량(g)",
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      data: dataPoints
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
        value: 70, // 선을 그릴 y축 값
        borderColor: '#9f9386', // 선의 색
        borderWidth: 3 // 선의 두께
      }]
    }
  }
});

