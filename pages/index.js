import Head from 'next/head'
import Header from '@components/Header'
import React, { useState, useEffect } from "react";
import moment from 'moment';

let isBackgroundSet = false;

export default function Home() {

  var start1 = moment("2022-12-09", "YYYY-MM-DD");
  var start2 = moment();
  var end = moment("2023-02-28", "YYYY-MM-DD");
  var x = moment.duration(end.diff(start1)).asDays();
  var y = moment.duration(end.diff(start2)).asDays();
  var progress = (100-(Math.round(y/x * 100))) + '%';

  useEffect(() => {
    let frame_set = [
      'lapalma1.jpg',
      'lapalma2.jpg',
      'lapalma3.jpg',
      'lapalma4.jpg',
      'lapalma5.jpg',
      'lapalma6.jpg',
      'lapalma7.jpg',
      'lapalma8.jpg',
      'lapalma9.jpg',
      'lapalma10.jpg',
      'lapalma11.jpg',
      'lapalma12.jpg',
      'lapalma13.jpg',
      'lapalma14.jpg',
      'lapalma15.jpg',
      'lapalma16.jpg',
      'lapalma17.jpg',
      'lapalma18.jpg',
      'lapalma19.jpg',
      'lapalma20.jpg',
      'lapalma21.jpg',
      'lapalma22.jpg',
      'lapalma23.jpg'
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
    // 28.6870601,-17.7902822
    fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=28.6870601&lon=-17.7902822')
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
      setDuration(durationAsString('2023-02-28 09:00:00'));
    }, 1000);
  });


  return (
    <div className="container" style={{
      display: !isLoading?"flex":"none"
    }}>
      <Head>
        <title>La Palma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p>
          Bald geht es los!
        </p>
        <p>
          28.02.23 - 07.03.23
        </p>
        <Header title="La Palma" />
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

