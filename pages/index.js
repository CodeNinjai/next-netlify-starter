import Head from 'next/head'
import Header from '@components/Header'
import React, { useState, useEffect } from "react";
import moment from 'moment';

export default function Home() {

  const [duration, setDuration] = useState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDuration(durationAsString('2022-03-17 11:25:00'));
    }, 1000);
  });

  return (
    <div className="container">
      <Head>
        <title>Fuerteventura</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p>
          Bald geht es los!
        </p>
        <p>
          17.03.22 - 24.03.22
        </p>
        <Header title="Fuerteventura" />
        <p>
          {duration} bis zum Abflug
        </p>
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

