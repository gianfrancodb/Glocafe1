import React, { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, XAxis } from 'recharts';
import './home.css';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: 'transparent', padding: '5px', bottom: '20px' }}>
                {payload[0].value.toFixed(2)}
            </div>
        );
    }
    return null;
};

const CommoditiesPrices = () => {
    const [prices, setPrices] = useState({ COFFEE: null, ROBUSTA: null, KCZ23: null, KCH24: null, KCK24: null });
    const [units, setUnits] = useState({ COFFEE: null, ROBUSTA: null, KCZ23: null, KCH24: null, KCK24: null });
    const [coffeeChartData, setCoffeeChartData] = useState([]);
    const [robustaChartData, setRobustaChartData] = useState([]);
    const [kcZ23ChartData, setKcZ23ChartData] = useState([]);
    const [kcH24ChartData, setKcH24ChartData] = useState([]);
    const [kcK24ChartData, setKcK24ChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    const divStyle = {
        padding: '20px',
        margin: '50px',
        width: '200px',
        background: 'rgba(0,255,133,0.35)',
        boxShadow: '20px 20px 40px -6px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10.5px)',
        WebkitBackdropFilter: 'blur(10.5px)',
        borderRadius: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://commodities-api.com/api/latest?access_key=nc4rq9ho37s9r4m7r7bd4jaw46b940amnq40h71wcj54cbfweprfm113awf4&base=USD&symbols=COFFEE,D00,KCZ23,KCH24,KCK24`);
                const { data } = await response.json();

                console.log("Latest Prices Response:", data);

                if (data && data.rates) {
                    setPrices({
                        COFFEE: data.rates.COFFEE,
                        ROBUSTA: data.rates.D00,
                        KCZ23: data.rates.KCZ23,
                        KCH24: data.rates.KCH24,
                        KCK24: data.rates.KCK24
                    });
                    if (data.unit) {
                        setUnits({
                            COFFEE: data.unit.COFFEE,
                            ROBUSTA: data.unit.D00,
                            KCZ23: data.unit.KCZ23,
                            KCH24: data.unit.KCH24,
                            KCK24: data.unit.KCK24
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching commodities data:", error);
            }
        };

        const fetchTimeSeries = async (symbol, setData) => {
            const currentDate = new Date();
            const endDate = new Date(currentDate.setDate(currentDate.getDate() - 1)).toISOString().split('T')[0];
            const startDate = new Date(currentDate.setDate(currentDate.getDate() - 20)).toISOString().split('T')[0];

            const response = await fetch(`https://commodities-api.com/api/timeseries?access_key=nc4rq9ho37s9r4m7r7bd4jaw46b940amnq40h71wcj54cbfweprfm113awf4&start_date=${startDate}&end_date=${endDate}&symbols=${symbol}`);
            const data = await response.json();

            console.log(`Raw API Response for ${symbol}:`, data);

            if (data && data.data && data.data.rates) {
                const ratesData = data.data.rates;
                const mappedData = Object.entries(ratesData).map(([date, rates]) => ({
                    date,
                    rate: rates[symbol] ? 1 / rates[symbol] : null
                }));

                console.log(`Mapped data for ${symbol} before filtering:`, mappedData);

                const transformedData = mappedData.filter(item => item.rate !== null);
                console.log(`Final transformed data for ${symbol}:`, transformedData);

                // Additional log to see if any rate is null
                const nullRates = mappedData.filter(item => item.rate === null);
                console.log(`Entries with null rates for ${symbol}:`, nullRates);

                setData(transformedData);
            }
            return data;
        };

        fetchData();

        Promise.all([
            fetchTimeSeries('COFFEE', setCoffeeChartData),
            fetchTimeSeries('D00', setRobustaChartData),
            fetchTimeSeries('KCZ23', setKcZ23ChartData),
            fetchTimeSeries('KCH24', setKcH24ChartData),
            fetchTimeSeries('KCK24', setKcK24ChartData)
        ]).then(() => {
            console.log("Chart Data State (Coffee): ", coffeeChartData);
            console.log("Chart Data State (Robusta): ", robustaChartData);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        console.log("Updated Chart Data State (Coffee): ", coffeeChartData);
        console.log("Updated Chart Data State (Robusta): ", robustaChartData);
    }, [coffeeChartData, robustaChartData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Determine the domain for Y-axis
    const coffeeRates = coffeeChartData.map(item => item.rate);
    const robustaRates = robustaChartData.map(item => item.rate);
    const kcZ23Rates = kcZ23ChartData.map(item => item.rate);
const kcH24Rates = kcH24ChartData.map(item => item.rate);
const kcK24Rates = kcK24ChartData.map(item => item.rate);


    const minCoffeeRate = Math.min(...coffeeRates);
    const maxCoffeeRate = Math.max(...coffeeRates);

    const minRobustaRate = Math.min(...robustaRates);
    const maxRobustaRate = Math.max(...robustaRates);

    const minKcZ23Rate = Math.min(...kcZ23Rates);
    const maxKcZ23Rate = Math.max(...kcZ23Rates);
    
    const minKcH24Rate = Math.min(...kcH24Rates);
    const maxKcH24Rate = Math.max(...kcH24Rates);
    
    const minKcK24Rate = Math.min(...kcK24Rates);
    const maxKcK24Rate = Math.max(...kcK24Rates);

    const coffeeDomain = [minCoffeeRate * 0.95, maxCoffeeRate * 1.05];
    const robustaDomain = [minRobustaRate * 0.95, maxRobustaRate * 1.05];
    const kcZ23Domain = [minKcZ23Rate * 0.95, maxKcZ23Rate * 1.05];
const kcH24Domain = [minKcH24Rate * 0.95, maxKcH24Rate * 1.05];
const kcK24Domain = [minKcK24Rate * 0.95, maxKcK24Rate * 1.05];

    return (
        <div className="prices" style={containerStyle}>
            <div style={divStyle}>
                <span style={{ color: 'grey', fontSize: '1rem' }}>Latest Price:</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}> ARABICA:</span>
                <br />
                <span style={{ color: 'black' }}>
                    {prices.COFFEE && (1 / prices.COFFEE).toFixed(2)} {units.COFFEE}
                </span>
                <ResponsiveContainer width="100%" height={80}>
                    <LineChart width={300} height={80} data={coffeeChartData}>
                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={{ r: 0.5 }}
                            activeDot={{ r: 4 }}
                        />
                        <YAxis domain={coffeeDomain} hide={true} />
                        <XAxis dataKey="date" hide={true} />
                        <Tooltip content={<CustomTooltip />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div style={divStyle}>
                <span style={{ color: 'grey', fontSize: '1rem' }}>Latest Price:</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}> ROBUSTA:</span>
                <br />
                <span style={{ color: 'black' }}>
                    {prices.ROBUSTA && (1 / prices.ROBUSTA).toFixed(2)} {units.ROBUSTA}
                </span>
                <ResponsiveContainer width="100%" height={80}>
                    <LineChart width={300} height={80} data={robustaChartData}>
                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={{ r: 0.5 }}
                            activeDot={{ r: 4 }}
                        />
                        <YAxis domain={robustaDomain} hide={true} />
                        <XAxis dataKey="date" hide={true} />
                        <Tooltip content={<CustomTooltip />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {/* The chart for KCZ23 symbol */}
            <div style={divStyle}>
                <span style={{ color: 'grey', fontSize: '1rem' }}>Latest Price:</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}> KCZ23:</span>
                <br />
                <span style={{ color: 'black' }}>
                    {prices.KCZ23 && (1 / prices.KCZ23).toFixed(2)} {units.KCZ23}
                </span>
                <ResponsiveContainer width="100%" height={80}>
                    <LineChart width={300} height={80} data={kcZ23ChartData}>
                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={{ r: 0.5 }}
                            activeDot={{ r: 4 }}
                        />
                        <YAxis domain={kcZ23Domain} hide={true} />
                        <XAxis dataKey="date" hide={true} />
                        <Tooltip content={<CustomTooltip />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {/* The chart for KCH24 symbol */}
            <div style={divStyle}>
                <span style={{ color: 'grey', fontSize: '1rem' }}>Latest Price:</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}> KCH24:</span>
                <br />
                <span style={{ color: 'black' }}>
                    {prices.KCH24 && (1 / prices.KCH24).toFixed(2)} {units.KCH24}
                </span>
                <ResponsiveContainer width="100%" height={80}>
                    <LineChart width={300} height={80} data={kcH24ChartData}>
                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={{ r: 0.5 }}
                            activeDot={{ r: 4 }}
                        />
                        <YAxis domain={kcH24Domain} hide={true} />
                        <XAxis dataKey="date" hide={true} />
                        <Tooltip content={<CustomTooltip />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {/* The chart for KCK24 symbol */}
            <div style={divStyle}>
                <span style={{ color: 'grey', fontSize: '1rem' }}>Latest Price:</span>
                <span style={{ color: 'white', fontWeight: 'bold' }}> KCK24:</span>
                <br />
                <span style={{ color: 'black' }}>
                    {prices.KCK24 && (1 / prices.KCK24).toFixed(2)} {units.KCK24}
                </span>
                <ResponsiveContainer width="100%" height={80}>
                    <LineChart width={300} height={80} data={kcK24ChartData}>
                        <Line
                            type="monotone"
                            dataKey="rate"
                            stroke="#8884d8"
                            strokeWidth={2}
                            dot={{ r: 0.5 }}
                            activeDot={{ r: 4 }}
                        />
                        <YAxis domain={kcK24Domain} hide={true} />
                        <XAxis dataKey="date" hide={true} />
                        <Tooltip content={<CustomTooltip />} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
    
};


export default CommoditiesPrices;
