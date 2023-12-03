import Head from 'next/head'
import Header from '@components/Header'
import React, { useState, useEffect } from "react";
import moment from 'moment';

let isBackgroundSet = false;

export default function Home() {

  var start1 = moment("2023-12-03", "YYYY-MM-DD");
  var start2 = moment();
  var end = moment("2024-04-11", "YYYY-MM-DD");
  var x = moment.duration(end.diff(start1)).asDays();
  var y = moment.duration(end.diff(start2)).asDays();
  var progress = (100-(Math.round(y/x * 100))) + '%';

  useEffect(() => {
    let frame_set = [
      'fuerte1.jpg',
      'fuerte2.jpg',
      'fuerte3.jpg',
      'fuerte4.jpg',
      'fuerte5.jpg',
      'fuerte6.jpg',
      'fuerte7.jpg',
      'fuerte8.jpg',
      'fuerte9.jpg',
      'fuerte10.jpg',
      'fuerte11.jpg',
      'fuerte12.jpg',
      'fuerte13.jpg',
      'fuerte14.jpg',
      'fuerte15.jpg',
      'fuerte16.jpg',
      'fuerte17.jpg'
    ];

    if (!isBackgroundSet) {
      let frame_color = Math.floor((Math.random() * (frame_set).length));
      let url_p = "url(\"" + frame_set[frame_color] + "\")";
      document.body.style.backgroundImage = url_p;
      var x = document.getElementById('xxx');
      x.style.width = progress;
      isBackgroundSet = true;
    }
  });

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [temp, setTemp] = useState(0)

  useEffect(() => {
    setLoading(true)
    fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=28.0568188&lon=-14.3207891')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        setTemp(data.properties.timeseries[0].data.instant.details.air_temperature);
      })
  }, [])


  const [duration, setDuration] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDuration(durationAsString('2024-04-11 06:30:00'));
    }, 1000);
  });


  return (
    <div className="container" style={{
      display: !isLoading?"flex":"none"
    }}>
      <Head>
        <title>Fuerteventura</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p>
          Bald geht es los!
        </p>
        <p>
          11.04.24 - 21.04.24
        </p>
        <Header title="Fuerteventura" />
        <p>
          {duration} bis zum Abflug
        </p>
        <p>   
          Aktuelle Temperatur: {temp} °C
        </p>
        <div className="bar-container">
          <div className="bar">
            <div className="progress-line"><span id="xxx"></span></div>
          </div>
        </div>
      </main>
    </div>
  )
}

function durationAsString(end) {
  const duration = moment.duration(moment(end).diff(moment()));

  //Get Days
  const days = Math.floor(duration.asDays()); // .asDays returns float but we are interested in full days only
  const daysFormatted = days ? `${days}d ` : ''; // if no full days then do not display it at all

  //Get Hours
  const hours = duration.hours();
  const hoursFormatted = `${hours}h `;

  //Get Minutes
  const minutes = duration.minutes();
  const minutesFormatted = `${minutes}m `;

  //Get Seconds
  const seconds = duration.seconds();
  const secondsFormatted = `${seconds}s`;

  return [daysFormatted, hoursFormatted, minutesFormatted, secondsFormatted].join('');
}

