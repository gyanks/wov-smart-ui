import { PieChart } from 'react-minimal-pie-chart';

const VulnComponentChart = () => {

    const defaultLabelStyle = {
        fontSize: '5px',
        fontFamily: 'sans-serif',
      };
      

    return (

        <div>
            <PieChart style={{ width: "200px", height: "250px", align: "center" }}
                data={[
                    { title: 'Tomcat', value: 10, color: '#E38627' },
                    { title: 'Log4J', value: 15, color: '#C13C37' },
                    { title: 'Cache', value: 20, color: '#6A2135' },
                    { title: 'KeyClock', value: 8, color: 'blue' },
                ]}
                label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                labelStyle={{
                    ...defaultLabelStyle,
                }}
                options={{
                    legend: { display: true, position: "right" },
          
                    datalabels: {
                      display: true,
                      color: "white",
                    },
                    tooltips: {
                      backgroundColor: "#5a6e7f",
                    },
                  }}
            />;

        </div>
    )





}

export default VulnComponentChart;
